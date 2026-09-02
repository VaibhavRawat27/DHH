"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TRACKS, type Track } from "@/lib/tracks";

/* ---------- minimal YouTube IFrame API types ---------- */

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  loadVideoById: (id: string) => void;
  cueVideoById: (id: string) => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (v: number) => void;
  getDuration: () => number;
  getCurrentTime: () => number;
};

type YTEvent = { target: YTPlayer; data: number };

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: string | HTMLElement,
        opts: Record<string, unknown>,
      ) => YTPlayer;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

const HOST_ID = "dhh-yt-host";

let apiPromise: Promise<void> | null = null;
function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
  return apiPromise;
}

/* ---------- context ---------- */

type PlayerState = {
  tracks: Track[];
  current: Track;
  index: number;
  ready: boolean;
  started: boolean;
  isPlaying: boolean;
  /** 0..1 */
  progress: number;
  duration: number;
  volume: number;
  videoOpen: boolean;
  /** ids of tracks YouTube refused to play (removed / not embeddable) */
  broken: Set<string>;
  play: (index?: number) => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  seek: (fraction: number) => void;
  setVolume: (v: number) => void;
  setVideoOpen: (open: boolean) => void;
};

const PlayerContext = createContext<PlayerState | null>(null);

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside <PlayerProvider>");
  return ctx;
}

/* ---------- provider ---------- */

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const playerRef = useRef<YTPlayer | null>(null);
  const indexRef = useRef(0);

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [videoOpen, setVideoOpen] = useState(false);
  const [broken, setBroken] = useState<Set<string>>(new Set());

  indexRef.current = index;
  const current = TRACKS[index];

  const goTo = useCallback((next: number, autoplay: boolean) => {
    const clamped = (next + TRACKS.length) % TRACKS.length;
    setIndex(clamped);
    setProgress(0);
    setDuration(0);
    const pl = playerRef.current;
    if (!pl) return;
    if (autoplay) pl.loadVideoById(TRACKS[clamped].youtubeId);
    else pl.cueVideoById(TRACKS[clamped].youtubeId);
  }, []);

  const play = useCallback(
    (target?: number) => {
      if (typeof target === "number" && target !== indexRef.current) {
        goTo(target, true);
        return;
      }
      playerRef.current?.playVideo();
    },
    [goTo],
  );

  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const next = useCallback(
    () => goTo(indexRef.current + 1, started),
    [goTo, started],
  );
  const prev = useCallback(() => {
    const pl = playerRef.current;
    if (pl && pl.getCurrentTime() > 3) {
      pl.seekTo(0, true);
      return;
    }
    goTo(indexRef.current - 1, started);
  }, [goTo, started]);

  const seek = useCallback((fraction: number) => {
    const pl = playerRef.current;
    const d = pl?.getDuration() ?? 0;
    if (!pl || !d) return;
    pl.seekTo(fraction * d, true);
    setProgress(fraction);
  }, []);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    setVolumeState(clamped);
    playerRef.current?.setVolume(Math.round(clamped * 100));
  }, []);

  // Create the single, persistent player once.
  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || playerRef.current || !window.YT) return;
      const host = document.getElementById(HOST_ID);
      if (!host) return;

      playerRef.current = new window.YT.Player(HOST_ID, {
        videoId: TRACKS[0].youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: YTEvent) => {
            e.target.setVolume(Math.round(volume * 100));
            setReady(true);
          },
          onStateChange: (e: YTEvent) => {
            const S = window.YT!.PlayerState;
            if (e.data === S.PLAYING) {
              setIsPlaying(true);
              setStarted(true);
            } else if (e.data === S.PAUSED) {
              setIsPlaying(false);
            } else if (e.data === S.ENDED) {
              setIsPlaying(false);
              goTo(indexRef.current + 1, true);
            }
          },
          onError: () => {
            setBroken((prev) => new Set(prev).add(TRACKS[indexRef.current].id));
            setIsPlaying(false);
            goTo(indexRef.current + 1, true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Flag the document so the still background image fades out behind the video.
  useEffect(() => {
    document.body.dataset.video = videoOpen ? "on" : "off";
    return () => {
      delete document.body.dataset.video;
    };
  }, [videoOpen]);

  // Progress ticker.
  useEffect(() => {
    const iv = window.setInterval(() => {
      const pl = playerRef.current;
      if (!pl || !pl.getDuration) return;
      const d = pl.getDuration() || 0;
      const c = pl.getCurrentTime() || 0;
      setDuration(d);
      setProgress(d ? c / d : 0);
    }, 500);
    return () => window.clearInterval(iv);
  }, []);

  const value = useMemo<PlayerState>(
    () => ({
      tracks: TRACKS,
      current,
      index,
      ready,
      started,
      isPlaying,
      progress,
      duration,
      volume,
      videoOpen,
      broken,
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      setVolume,
      setVideoOpen,
    }),
    [
      current,
      index,
      ready,
      started,
      isPlaying,
      progress,
      duration,
      volume,
      videoOpen,
      broken,
      play,
      pause,
      toggle,
      next,
      prev,
      seek,
      setVolume,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
      {/* The one and only player. Lives here for the app's whole life so audio
          never stops on navigation. `videoOpen` only toggles a class: when on it
          fills the viewport behind the content in place of bg.png; when off it
          collapses to a 1px sliver and keeps playing. It is never unmounted. */}
      <div id="dhh-yt-bg" className={videoOpen ? "" : "is-hidden"} aria-hidden={!videoOpen}>
        <div id={HOST_ID} />
      </div>
    </PlayerContext.Provider>
  );
}
