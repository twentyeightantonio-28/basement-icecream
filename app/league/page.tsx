"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Difficulty = "easy" | "medium" | "hard" | "superhard";

type Item = {
  id: string;
  answers: string[];
  x: number;
  y: number;
  difficulty: Difficulty;
  splash?: string;
};

type RankTier = {
  name:
    | "Iron"
    | "Bronze"
    | "Silver"
    | "Gold"
    | "Platinum"
    | "Emerald"
    | "Diamond"
    | "Master"
    | "Grandmaster"
    | "Challenger";
  min: number;
  color: string;
  image: string;
};

const RAW_ITEMS = [
  { id: "Karthus", answers: ["karthus"], x: 33.1, y: 46.8, difficulty: "medium" },
  { id: "Rengar", answers: ["rengar"], x: 28.3, y: 80.1, difficulty: "hard" },
  { id: "Neeko", answers: ["neeko"], x: 19.1, y: 60.1, difficulty: "medium" },
  { id: "Ivern", answers: ["ivern"], x: 87.2, y: 56.5, difficulty: "hard" },
  { id: "Shaco", answers: ["shaco"], x: 50.2, y: 75.5, difficulty: "hard" },
  { id: "Nami", answers: ["nami"], x: 82.8, y: 89, difficulty: "easy" },
  { id: "Rakan", answers: ["rakan"], x: 35.1, y: 40.6, difficulty: "medium" },
  { id: "Yasuo", answers: ["yasuo"], x: 68.8, y: 41.3, difficulty: "easy" },
  {
    id: "Aurelion Sol",
    answers: ["aurelion sol", "aurelion_sol", "asol"],
    x: 36.4,
    y: 21.2,
    difficulty: "superhard",
  },
  {
    id: "Tahm Kench",
    answers: ["tahm kench", "tahm_kench", "tahm"],
    x: 86.5,
    y: 66.8,
    difficulty: "hard",
  },
  { id: "Zyra", answers: ["zyra"], x: 25.6, y: 44.4, difficulty: "medium" },
  { id: "Samira", answers: ["samira"], x: 67.3, y: 47.5, difficulty: "medium" },
  { id: "Malphite", answers: ["malphite"], x: 17.5, y: 39.9, difficulty: "easy" },
  { id: "Teemo", answers: ["teemo"], x: 55.2, y: 79.4, difficulty: "easy" },
  { id: "Yuumi", answers: ["yuumi"], x: 4.6, y: 73, difficulty: "medium" },
  {
    id: "Jarvan IV",
    answers: ["jarvan", "jarvan iv", "jarvan 4", "j4"],
    x: 16.1,
    y: 28.5,
    difficulty: "hard",
  },
  { id: "Kai'sa", answers: ["kai'sa", "kaisa", "kai sa"], x: 6.2, y: 92.9, difficulty: "medium" },
  { id: "Ryze", answers: ["ryze"], x: 37.9, y: 85.5, difficulty: "medium" },
  { id: "Illaoi", answers: ["illaoi"], x: 98.9, y: 85.5, difficulty: "superhard" },
  { id: "Zoe", answers: ["zoe"], x: 12.1, y: 61.2, difficulty: "medium" },
  { id: "Braum", answers: ["braum"], x: 46.2, y: 57.4, difficulty: "medium" },
  {
    id: "Twisted Fate",
    answers: ["twisted fate", "twisted_fate", "tf"],
    x: 64.9,
    y: 67.5,
    difficulty: "hard",
  },
  { id: "Leona", answers: ["leona"], x: 66, y: 57.9, difficulty: "easy" },
  { id: "Amumu", answers: ["amumu"], x: 36.7, y: 50.1, difficulty: "easy" },
  { id: "Pantheon", answers: ["pantheon", "panth"], x: 34.3, y: 38, difficulty: "medium" },
  { id: "Xayah", answers: ["xayah"], x: 33.6, y: 40.7, difficulty: "medium" },
  { id: "Evelynn", answers: ["evelynn", "eve", "evelyn"], x: 48.2, y: 37.9, difficulty: "hard" },
  { id: "Nautilus", answers: ["nautilus", "naut"], x: 78.1, y: 92.3, difficulty: "hard" },
  { id: "Blitzcrank", answers: ["blitzcrank", "blitz"], x: 31.7, y: 32.3, difficulty: "medium" },
  { id: "Darius", answers: ["darius"], x: 47.9, y: 23.9, difficulty: "easy" },
  { id: "Senna", answers: ["senna"], x: 27.4, y: 29.4, difficulty: "medium" },
  { id: "Heimerdinger", answers: ["heimerdinger", "heimer"], x: 61.8, y: 79.2, difficulty: "hard" },
  { id: "Bard", answers: ["bard"], x: 21.7, y: 57.6, difficulty: "hard" },
  { id: "Vi", answers: ["vi"], x: 36.7, y: 44.3, difficulty: "easy" },
  { id: "Elise", answers: ["elise"], x: 62.7, y: 47.2, difficulty: "medium" },
  { id: "Vayne", answers: ["vayne"], x: 59.6, y: 41.6, difficulty: "medium" },
  { id: "Sejuani", answers: ["sejuani", "sej"], x: 92.5, y: 63.2, difficulty: "hard" },
  { id: "Nidalee", answers: ["nidalee", "nida"], x: 63.6, y: 97.2, difficulty: "hard" },
  { id: "Sivir", answers: ["sivir"], x: 59.2, y: 91.9, difficulty: "medium" },
  { id: "Lulu", answers: ["lulu"], x: 93.2, y: 46.1, difficulty: "easy" },
  { id: "Katarina", answers: ["katarina", "kata"], x: 48.3, y: 93.5, difficulty: "medium" },
  { id: "Gwen", answers: ["gwen"], x: 69.4, y: 93.5, difficulty: "medium" },
  { id: "Gangplank", answers: ["gangplank", "gp"], x: 36.2, y: 94.3, difficulty: "hard" },
  { id: "Jax", answers: ["jax"], x: 41.3, y: 25.8, difficulty: "easy" },
  { id: "Alistar", answers: ["alistar"], x: 1.8, y: 67.9, difficulty: "medium" },
  { id: "Zilean", answers: ["zilean", "zil"], x: 68.2, y: 17.4, difficulty: "superhard" },
  { id: "Master Yi", answers: ["master yi", "master_yi", "yi"], x: 21.6, y: 42.2, difficulty: "easy" },
  { id: "Twitch", answers: ["twitch"], x: 2.6, y: 83.3, difficulty: "medium" },
  { id: "Kennen", answers: ["kennen"], x: 9.9, y: 88.3, difficulty: "medium" },
  { id: "Poppy", answers: ["poppy"], x: 32, y: 57.4, difficulty: "medium" },
  { id: "Soraka", answers: ["soraka"], x: 26.6, y: 67.2, difficulty: "easy" },
  { id: "Caitlyn", answers: ["caitlyn", "cait"], x: 2.3, y: 95.8, difficulty: "easy" },
  { id: "Ashe", answers: ["ashe"], x: 83.9, y: 24.9, difficulty: "easy" },
  { id: "Ziggs", answers: ["ziggs"], x: 72, y: 74.8, difficulty: "medium" },
  { id: "Zac", answers: ["zac"], x: 69.3, y: 69.6, difficulty: "medium" },
  { id: "Fizz", answers: ["fizz"], x: 57.2, y: 68.3, difficulty: "medium" },
  { id: "Jinx", answers: ["jinx"], x: 71.8, y: 49, difficulty: "easy" },
  { id: "Annie", answers: ["annie"], x: 20.2, y: 74.9, difficulty: "easy" },
  { id: "Orianna", answers: ["orianna"], x: 58.2, y: 54.6, difficulty: "medium" },
  { id: "Malzahar", answers: ["malzahar", "malz"], x: 56.5, y: 29.5, difficulty: "hard" },
  { id: "Vex", answers: ["vex"], x: 5.7, y: 32.5, difficulty: "hard" },
  { id: "Seraphine", answers: ["seraphine", "sera"], x: 72.3, y: 58.6, difficulty: "medium" },
  { id: "Diana", answers: ["diana"], x: 47.5, y: 17.8, difficulty: "medium" },
  { id: "Ekko", answers: ["ekko"], x: 13.2, y: 17.8, difficulty: "medium" },
  { id: "Jhin", answers: ["jhin"], x: 89.2, y: 37.4, difficulty: "hard" },
  { id: "Kindred", answers: ["kindred"], x: 22.3, y: 29, difficulty: "superhard" },
] satisfies Omit<Item, "splash">[];

const ITEMS: Item[] = RAW_ITEMS.map((item) => ({
  ...item,
  splash: `/champions/${item.id
    .toLowerCase()
    .replace(/['.]/g, "")
    .replace(/\s+/g, "-")}.jpg`,
}));

const RANKS: RankTier[] = [
  { name: "Iron", min: 0, color: "#9ca3af", image: "/ranks/iron.png" },
  { name: "Bronze", min: 120, color: "#b45309", image: "/ranks/bronze.png" },
  { name: "Silver", min: 260, color: "#cbd5e1", image: "/ranks/silver.png" },
  { name: "Gold", min: 420, color: "#facc15", image: "/ranks/gold.png" },
  { name: "Platinum", min: 620, color: "#67e8f9", image: "/ranks/platinum.png" },
  { name: "Emerald", min: 850, color: "#34d399", image: "/ranks/emerald.png" },
  { name: "Diamond", min: 1120, color: "#60a5fa", image: "/ranks/diamond.png" },
  { name: "Master", min: 1450, color: "#c084fc", image: "/ranks/master.png" },
  { name: "Grandmaster", min: 1800, color: "#f87171", image: "/ranks/grandmaster.png" },
  { name: "Challenger", min: 2200, color: "#f8fafc", image: "/ranks/challenger.png" },
];

const STORAGE_KEY = "foundItems";
const MAX_LIVES = 3;
const MARKER_ANIMATION_MS = 2200;
const REVEAL_POPUP_MS = 2300;
const STREAK_WINDOW_MS = 7000;

const SCORE_BY_DIFFICULTY: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
  superhard: 50,
};

function difficultyLabel(difficulty: Difficulty) {
  if (difficulty === "easy") return "Easy";
  if (difficulty === "medium") return "Medium";
  if (difficulty === "hard") return "Hard";
  return "SUPER HARD";
}

function getRankFromScore(score: number) {
  return [...RANKS].reverse().find((rank) => score >= rank.min) ?? RANKS[0];
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ");
}

function useLocalStorageState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value, ready]);

  const reset = () => setValue(initialValue);
  return { value, setValue, reset, ready };
}

function useAudio() {
  const sounds = useMemo(() => {
    if (typeof window === "undefined") return null;

    const ambience = new Audio("/theme-song.mp3");
    ambience.loop = true;
    ambience.volume = 0.32;

    return {
      correct: new Audio("/correct.wav"),
      wrong: new Audio("/wrong.wav"),
      already: new Audio("/already.wav"),
      gameover: new Audio("/gameover.wav"),
      ambience,
    };
  }, []);

  const play = (name: "correct" | "wrong" | "already" | "gameover") => {
    const sound = sounds?.[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  const startAmbience = () => {
    const ambience = sounds?.ambience;
    if (!ambience) return;
    ambience.play().catch(() => {});
  };

  const stopAmbience = () => {
    const ambience = sounds?.ambience;
    if (!ambience) return;
    ambience.pause();
  };

  const setAmbienceMuted = (muted: boolean) => {
    const ambience = sounds?.ambience;
    if (!ambience) return;
    ambience.muted = muted;
  };

  return { play, startAmbience, stopAmbience, setAmbienceMuted };
}

export default function LeaguePage() {
  const { value: found, setValue: setFound, reset: resetFound, ready } =
    useLocalStorageState<string[]>(STORAGE_KEY, []);

  const [guess, setGuess] = useState("");
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);
  const [freshlyFound, setFreshlyFound] = useState<string[]>([]);
  const [hoveredChampion, setHoveredChampion] = useState<string | null>(null);
  const [inputOpen, setInputOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [comboText, setComboText] = useState<string | null>(null);
  const [revealChampion, setRevealChampion] = useState<Item | null>(null);
  const [musicMuted, setMusicMuted] = useState(false);
  const [ambienceStarted, setAmbienceStarted] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);
  const loseButtonRef = useRef<HTMLButtonElement | null>(null);
  const winButtonRef = useRef<HTMLButtonElement | null>(null);
  const streakTimerRef = useRef<number | null>(null);

  const { play, startAmbience, stopAmbience, setAmbienceMuted } = useAudio();

  const foundSet = useMemo(() => new Set(found), [found]);
  const freshSet = useMemo(() => new Set(freshlyFound), [freshlyFound]);
  const foundCount = found.length;
  const currentRank = getRankFromScore(score);

  function focusStage() {
    window.setTimeout(() => {
      stageRef.current?.focus();
    }, 0);
  }

  function ensureAmbienceStarted() {
    if (ambienceStarted || musicMuted) return;
    startAmbience();
    setAmbienceStarted(true);
  }

  function openInput() {
    if (gameOver || gameWon) return;
    ensureAmbienceStarted();
    setInputOpen(true);
  }

  function closeInput() {
    setInputOpen(false);
    setGuess("");
    focusStage();
  }

  function getMultiplier(nextStreak: number) {
    if (nextStreak >= 4) return 2;
    if (nextStreak === 3) return 1.5;
    if (nextStreak === 2) return 1.2;
    return 1;
  }

  function resetStreakTimer() {
    if (streakTimerRef.current) {
      window.clearTimeout(streakTimerRef.current);
    }

    streakTimerRef.current = window.setTimeout(() => {
      setStreak(0);
      setComboText(null);
    }, STREAK_WINDOW_MS);
  }

  function findMatch(input: string) {
    const clean = normalize(input);
    if (!clean) return null;
    return ITEMS.find((item) => item.answers.some((ans) => normalize(ans) === clean)) ?? null;
  }

  function submitGuess() {
    if (gameOver || gameWon) return;

    const trimmed = guess.trim();
    if (!trimmed) {
      closeInput();
      return;
    }

    const match = findMatch(trimmed);

    if (!match) {
      play("wrong");
      setStreak(0);
      setComboText(null);

      if (streakTimerRef.current) {
        window.clearTimeout(streakTimerRef.current);
      }

      setLives((current) => {
        const next = Math.max(current - 1, 0);
        if (next === 0) {
          setGameOver(true);
        }
        return next;
      });

      closeInput();
      return;
    }

    if (foundSet.has(match.id)) {
      play("already");
      closeInput();
      return;
    }

    ensureAmbienceStarted();

    const nextFound = [...found, match.id];
    setFound(nextFound);
    setFreshlyFound((current) => [...current, match.id]);

    const nextStreak = streak + 1;
    const multiplier = getMultiplier(nextStreak);
    const basePoints = SCORE_BY_DIFFICULTY[match.difficulty];
    const awarded = Math.round(basePoints * multiplier);

    setScore((current) => current + awarded);
    setStreak(nextStreak);
    setBestStreak((current) => Math.max(current, nextStreak));
    resetStreakTimer();

    const difficultyName = difficultyLabel(match.difficulty);
    const comboSuffix = multiplier > 1 ? ` x${multiplier.toFixed(1)}` : "";
    setComboText(`+${awarded} • ${difficultyName}${comboSuffix}`);

    setRevealChampion(match);
    play("correct");
    closeInput();

    if (nextFound.length === ITEMS.length) {
      setGameWon(true);
    }
  }

  function resetGame() {
    resetFound();
    setFreshlyFound([]);
    setHoveredChampion(null);
    setGuess("");
    setLives(MAX_LIVES);
    setGameOver(false);
    setGameWon(false);
    setLastClick(null);
    setInputOpen(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setComboText(null);
    setRevealChampion(null);

    if (streakTimerRef.current) {
      window.clearTimeout(streakTimerRef.current);
    }

    focusStage();
  }

  useEffect(() => {
    if (!ready) return;
    focusStage();
  }, [ready]);

  useEffect(() => {
    if (!inputOpen) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 40);
    return () => window.clearTimeout(timer);
  }, [inputOpen]);

  useEffect(() => {
    if (!freshlyFound.length) return;

    const timers = freshlyFound.map((id) =>
      window.setTimeout(() => {
        setFreshlyFound((current) => current.filter((value) => value !== id));
      }, MARKER_ANIMATION_MS)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [freshlyFound]);

  useEffect(() => {
    if (!revealChampion) return;
    const timer = window.setTimeout(() => {
      setRevealChampion(null);
    }, REVEAL_POPUP_MS);
    return () => window.clearTimeout(timer);
  }, [revealChampion]);

  useEffect(() => {
    setAmbienceMuted(musicMuted);
    if (musicMuted) {
      stopAmbience();
      return;
    }
    if (ambienceStarted) {
      startAmbience();
    }
  }, [musicMuted, ambienceStarted, setAmbienceMuted, startAmbience, stopAmbience]);

  useEffect(() => {
    if (!gameOver) return;
    play("gameover");
    setInputOpen(false);

    window.setTimeout(() => {
      loseButtonRef.current?.focus();
    }, 40);
  }, [gameOver, play]);

  useEffect(() => {
    if (!gameWon) return;
    setInputOpen(false);

    window.setTimeout(() => {
      winButtonRef.current?.focus();
    }, 40);
  }, [gameWon]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typingInField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.getAttribute("contenteditable") === "true";

      if (typingInField) return;

      if ((e.key === "Enter" || e.key === "/") && !inputOpen && !gameOver && !gameWon) {
        e.preventDefault();
        openInput();
      }

      if (e.key === "Escape" && inputOpen) {
        e.preventDefault();
        closeInput();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputOpen, gameOver, gameWon, ambienceStarted, musicMuted]);

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
    ensureAmbienceStarted();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLastClick({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
    focusStage();
  }

  if (!ready) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#020617",
          color: "#f8fafc",
        }}
      >
        Loading game...
      </div>
    );
  }

  const baseButtonStyle = {
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#f8fafc",
    cursor: "pointer",
    fontWeight: 700,
  } as const;

  const markerDotStyle = {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.98)",
    boxShadow: "0 0 0 2px rgba(255,255,255,0.16), 0 0 18px rgba(255,255,255,0.28)",
  } as const;

  const pulseRingStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.95)",
    boxShadow: "0 0 18px rgba(255,255,255,0.22)",
    animation: `markerPulse ${MARKER_ANIMATION_MS}ms ease-out forwards`,
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
  } as const;

  const tooltipStyle = {
    position: "absolute",
    left: "50%",
    bottom: "calc(100% + 12px)",
    transform: "translateX(-50%)",
    whiteSpace: "nowrap",
    padding: "8px 10px",
    borderRadius: 10,
    background: "rgba(15,23,42,0.94)",
    color: "#f8fafc",
    fontSize: 13,
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
    pointerEvents: "none",
  } as const;

  return (
    <>
      <style>{`
        @keyframes markerPulse {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.6);
          }
          70% {
            opacity: 0.7;
            transform: translate(-50%, -50%) scale(2.6);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3.4);
          }
        }

        @keyframes revealIn {
          0% {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes comboFloat {
          0% {
            opacity: 0;
            transform: translate(-50%, 10px) scale(0.96);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -36px) scale(1.05);
          }
        }

        .league-dock {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-50%) translateY(18px) scale(0.98);
          transition: opacity 180ms ease, transform 180ms ease;
        }

        .league-dock.is-open {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0) scale(1);
        }

        @media (max-width: 900px) {
          .league-topbar {
            top: 12px !important;
            left: 12px !important;
            right: 12px !important;
          }

          .league-dock {
            left: 12px !important;
            right: 12px !important;
            bottom: 12px !important;
            width: auto !important;
          }

          .league-dock.is-open {
            transform: translateY(0) scale(1) !important;
          }

          .league-dock-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }

          .league-input {
            min-width: 0 !important;
            width: 100% !important;
          }

          .league-submit {
            width: 100% !important;
          }

          .league-hint {
            bottom: 14px !important;
            right: 14px !important;
            font-size: 11px !important;
          }

          .league-reveal {
            left: 12px !important;
            right: 12px !important;
            top: auto !important;
            bottom: 78px !important;
            width: auto !important;
          }

          .league-modal-card {
            width: calc(100vw - 24px) !important;
          }

          .league-rank-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <main
        ref={stageRef}
        tabIndex={-1}
        style={{
          height: "100dvh",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top, rgba(59,130,246,0.12) 0%, rgba(15,23,42,1) 32%, rgba(2,6,23,1) 100%)",
          color: "#f8fafc",
          position: "relative",
          outline: "none",
        }}
      >
        <div
          className="league-topbar"
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            right: 20,
            zIndex: 30,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 16,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              pointerEvents: "auto",
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              maxWidth: 560,
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 18,
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.12)",
                minWidth: 118,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.88)",
                }}
              >
                Found
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 24,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {foundCount} / {ITEMS.length}
              </div>
            </div>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: 18,
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.12)",
                minWidth: 118,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.88)",
                }}
              >
                Lives
              </div>
              <div
                style={{
                  marginTop: 5,
                  display: "flex",
                  gap: 7,
                }}
              >
                {Array.from({ length: MAX_LIVES }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "999px",
                      background:
                        i < lives
                          ? "linear-gradient(135deg, #fb7185 0%, #ef4444 100%)"
                          : "rgba(148,163,184,0.28)",
                      boxShadow: i < lives ? "0 0 14px rgba(239,68,68,0.4)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: 18,
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.12)",
                minWidth: 118,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.88)",
                }}
              >
                Score
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 24,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                {score}
              </div>
            </div>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: 18,
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.12)",
                minWidth: 118,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.88)",
                }}
              >
                Streak
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 24,
                  fontWeight: 800,
                  lineHeight: 1,
                }}
              >
                x{getMultiplier(streak).toFixed(1)}
              </div>
            </div>
          </div>

          <div style={{ pointerEvents: "auto", display: "flex", gap: 10 }}>
            <button
              onClick={() => {
                const nextMuted = !musicMuted;
                setMusicMuted(nextMuted);
                if (!nextMuted) {
                  ensureAmbienceStarted();
                }
              }}
              style={{
                ...baseButtonStyle,
                width: 46,
                height: 46,
                borderRadius: "999px",
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
                fontSize: 17,
              }}
              aria-label={musicMuted ? "Unmute music" : "Mute music"}
              title={musicMuted ? "Unmute music" : "Mute music"}
            >
              {musicMuted ? "🔇" : "🎵"}
            </button>

            <button
              onClick={resetGame}
              style={{
                ...baseButtonStyle,
                width: 46,
                height: 46,
                borderRadius: "999px",
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
                fontSize: 18,
              }}
              aria-label="Reset game"
              title="Reset game"
            >
              ↺
            </button>

            <Link
              href="/"
              style={{
                ...baseButtonStyle,
                width: 46,
                height: 46,
                borderRadius: "999px",
                background: "rgba(15,23,42,0.54)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.24)",
                display: "grid",
                placeItems: "center",
                textDecoration: "none",
                fontSize: 18,
              }}
              aria-label="Go home"
              title="Go home"
            >
              ⌂
            </Link>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
          }}
        >
          <div
            onClick={handleImageClick}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "100vw",
              height: "56.25vw",
              maxWidth: "177.78vh",
              maxHeight: "100vh",
              transform: "translate(-50%, -50%)",
              overflow: "hidden",
              backgroundColor: "#020617",
              backgroundImage: "url('/league-home.png')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "100% 100%",
              cursor: "crosshair",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at top, rgba(99,102,241,0.08) 0%, rgba(2,6,23,0.02) 34%, rgba(2,6,23,0.06) 100%)",
                pointerEvents: "none",
              }}
            />

            {ITEMS.filter((item) => foundSet.has(item.id)).map((item) => {
              const isFresh = freshSet.has(item.id);

              return (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: "translate(-50%, -50%)",
                    zIndex: 4,
                  }}
                  onMouseEnter={() => setHoveredChampion(item.id)}
                  onMouseLeave={() =>
                    setHoveredChampion((current) => (current === item.id ? null : current))
                  }
                >
                  <div style={markerDotStyle} />
                  {isFresh && <div style={pulseRingStyle} />}
                  {hoveredChampion === item.id && <div style={tooltipStyle}>{item.id}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {comboText && !gameOver && !gameWon && (
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: 132,
              transform: "translateX(-50%)",
              zIndex: 38,
              padding: "12px 16px",
              borderRadius: 16,
              background: "rgba(14,165,233,0.16)",
              border: "1px solid rgba(56,189,248,0.34)",
              color: "#e0f2fe",
              fontWeight: 800,
              letterSpacing: "0.02em",
              boxShadow: "0 18px 48px rgba(2,132,199,0.18)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              animation: "comboFloat 1600ms ease-out forwards",
              pointerEvents: "none",
            }}
          >
            {comboText}
          </div>
        )}

        {revealChampion && !gameOver && !gameWon && (
          <div
            className="league-reveal"
            style={{
              position: "fixed",
              right: 20,
              top: 104,
              width: 300,
              zIndex: 40,
              borderRadius: 24,
              overflow: "hidden",
              background: "rgba(15,23,42,0.76)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 28px 80px rgba(0,0,0,0.45)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              animation: "revealIn 220ms ease-out forwards",
            }}
          >
            <div
              style={{
                height: 170,
                backgroundImage: `url('${revealChampion.splash}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#0f172a",
              }}
            />
            <div style={{ padding: 16 }}>
              <div
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "rgba(148,163,184,0.88)",
                }}
              >
                Champion found
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 24,
                  fontWeight: 800,
                  lineHeight: 1.1,
                }}
              >
                {revealChampion.id}
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: "inline-flex",
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: "rgba(56,189,248,0.14)",
                  color: "#bae6fd",
                  fontSize: 12,
                  fontWeight: 700,
                  border: "1px solid rgba(56,189,248,0.22)",
                }}
              >
                {difficultyLabel(revealChampion.difficulty)}
              </div>
            </div>
          </div>
        )}

        <div
          className={`league-dock ${inputOpen ? "is-open" : ""}`}
          style={{
            position: "fixed",
            left: "50%",
            bottom: 16,
            transform: "translateX(-50%)",
            width: "min(680px, calc(100vw - 32px))",
            zIndex: 35,
            padding: 12,
            borderRadius: 24,
            background: "rgba(15,23,42,0.42)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.34)",
          }}
        >
          <div
            style={{
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "rgba(226,232,240,0.86)",
                fontWeight: 600,
              }}
            >
              Type a champion name, then press Enter.
            </span>

            {lastClick && (
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(148,163,184,0.86)",
                }}
              >
                Last click: {lastClick.x}% / {lastClick.y}%
              </span>
            )}
          </div>

          <div
            className="league-dock-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <input
              ref={inputRef}
              className="league-input"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Guess a champion..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitGuess();
                }
                if (e.key === "Escape") {
                  e.preventDefault();
                  closeInput();
                }
              }}
              disabled={gameOver || gameWon}
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: "1 1 320px",
                minWidth: 260,
                padding: "16px 18px",
                fontSize: 16,
                borderRadius: 16,
                border: `1px solid ${
                  gameOver || gameWon ? "rgba(148,163,184,0.4)" : "rgba(255,255,255,0.16)"
                }`,
                outline: "none",
                background: "rgba(255,255,255,0.08)",
                color: "#f8fafc",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            />

            <button
              className="league-submit"
              onClick={submitGuess}
              disabled={gameOver || gameWon}
              style={{
                ...baseButtonStyle,
                padding: "16px 22px",
                borderRadius: 16,
                background:
                  gameOver || gameWon
                    ? "rgba(71,85,105,0.72)"
                    : "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
                border:
                  gameOver || gameWon
                    ? "1px solid rgba(148,163,184,0.22)"
                    : "1px solid rgba(99,102,241,0.35)",
                boxShadow: gameOver || gameWon ? "none" : "0 14px 30px rgba(79,70,229,0.34)",
                cursor: gameOver || gameWon ? "not-allowed" : "pointer",
                minWidth: 110,
              }}
            >
              Guess
            </button>
          </div>
        </div>

        {!inputOpen && !gameOver && !gameWon && (
          <div
            className="league-hint"
            style={{
              position: "fixed",
              right: 18,
              bottom: 18,
              zIndex: 20,
              padding: "8px 10px",
              borderRadius: 12,
              background: "rgba(15,23,42,0.38)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(226,232,240,0.84)",
              fontSize: 12,
              fontWeight: 600,
              pointerEvents: "none",
            }}
          >
            Press Enter to guess
          </div>
        )}

        {gameOver && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-over-title"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "grid",
              placeItems: "center",
              background: "rgba(2,6,23,0.74)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: 16,
            }}
          >
            <div
              className="league-modal-card"
              style={{
                width: 720,
                maxWidth: "100%",
                borderRadius: 28,
                overflow: "hidden",
                background: "linear-gradient(180deg, rgba(15,23,42,0.97), rgba(2,6,23,0.97))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 32px 100px rgba(0,0,0,0.52)",
              }}
            >
              <div
                style={{
                  padding: "26px 24px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(148,163,184,0.84)",
                  }}
                >
                  Defeat
                </div>
                <h2
                  id="game-over-title"
                  style={{
                    marginTop: 10,
                    fontSize: 34,
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  Game Over
                </h2>
                <p
                  style={{
                    marginTop: 10,
                    color: "rgba(226,232,240,0.82)",
                    fontSize: 15,
                  }}
                >
                  You ran out of lives. Your final rank has been assigned.
                </p>
              </div>

              <div
                className="league-rank-layout"
                style={{
                  padding: 24,
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: 18,
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    borderRadius: 22,
                    padding: 18,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={currentRank.image}
                    alt={currentRank.name}
                    width={150}
                    height={150}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      marginBottom: 12,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(148,163,184,0.84)",
                    }}
                  >
                    Final rank
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 30,
                      fontWeight: 900,
                      color: currentRank.color,
                    }}
                  >
                    {currentRank.name}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "rgba(148,163,184,0.84)", textTransform: "uppercase" }}>
                      Score
                    </div>
                    <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>{score}</div>
                  </div>

                  <div
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "rgba(148,163,184,0.84)", textTransform: "uppercase" }}>
                      Found
                    </div>
                    <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>
                      {foundCount}/{ITEMS.length}
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "rgba(148,163,184,0.84)", textTransform: "uppercase" }}>
                      Best streak
                    </div>
                    <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>{bestStreak}</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "0 24px 24px",
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <button
                  ref={loseButtonRef}
                  onClick={resetGame}
                  style={{
                    ...baseButtonStyle,
                    flex: "1 1 220px",
                    padding: "16px 20px",
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
                    border: "1px solid rgba(99,102,241,0.35)",
                    boxShadow: "0 14px 30px rgba(79,70,229,0.34)",
                    fontSize: 16,
                  }}
                >
                  Retry
                </button>

                <Link
                  href="/"
                  style={{
                    ...baseButtonStyle,
                    flex: "1 1 220px",
                    padding: "16px 20px",
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.06)",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Back home
                </Link>
              </div>
            </div>
          </div>
        )}

        {gameWon && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="victory-title"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              display: "grid",
              placeItems: "center",
              background: "rgba(2,6,23,0.74)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: 16,
            }}
          >
            <div
              className="league-modal-card"
              style={{
                width: 720,
                maxWidth: "100%",
                borderRadius: 28,
                overflow: "hidden",
                background:
                  "linear-gradient(180deg, rgba(15,23,42,0.97), rgba(2,6,23,0.97))",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 32px 100px rgba(0,0,0,0.52)",
              }}
            >
              <div
                style={{
                  padding: "26px 24px 18px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "rgba(148,163,184,0.84)",
                  }}
                >
                  Victory
                </div>
                <h2
                  id="victory-title"
                  style={{
                    marginTop: 10,
                    fontSize: 34,
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  66 / 66 Found
                </h2>
                <p
                  style={{
                    marginTop: 10,
                    color: "rgba(226,232,240,0.82)",
                    fontSize: 15,
                  }}
                >
                  You cleared the full League basement and earned your final rank.
                </p>
              </div>

              <div
                className="league-rank-layout"
                style={{
                  padding: 24,
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: 18,
                  alignItems: "stretch",
                }}
              >
                <div
                  style={{
                    borderRadius: 22,
                    padding: 18,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    display: "grid",
                    placeItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={currentRank.image}
                    alt={currentRank.name}
                    width={150}
                    height={150}
                    style={{
                      width: 150,
                      height: 150,
                      objectFit: "contain",
                      marginBottom: 12,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "rgba(148,163,184,0.84)",
                    }}
                  >
                    Final rank
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontSize: 30,
                      fontWeight: 900,
                      color: currentRank.color,
                    }}
                  >
                    {currentRank.name}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "rgba(148,163,184,0.84)", textTransform: "uppercase" }}>
                      Score
                    </div>
                    <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>{score}</div>
                  </div>

                  <div
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "rgba(148,163,184,0.84)", textTransform: "uppercase" }}>
                      Found
                    </div>
                    <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>
                      {foundCount}/{ITEMS.length}
                    </div>
                  </div>

                  <div
                    style={{
                      borderRadius: 18,
                      padding: 16,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ fontSize: 12, color: "rgba(148,163,184,0.84)", textTransform: "uppercase" }}>
                      Best streak
                    </div>
                    <div style={{ marginTop: 6, fontSize: 28, fontWeight: 900 }}>{bestStreak}</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  padding: "0 24px 24px",
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <button
                  ref={winButtonRef}
                  onClick={resetGame}
                  style={{
                    ...baseButtonStyle,
                    flex: "1 1 220px",
                    padding: "16px 20px",
                    borderRadius: 18,
                    background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
                    border: "1px solid rgba(99,102,241,0.35)",
                    boxShadow: "0 14px 30px rgba(79,70,229,0.34)",
                    fontSize: 16,
                  }}
                >
                  Play again
                </button>

                <Link
                  href="/"
                  style={{
                    ...baseButtonStyle,
                    flex: "1 1 220px",
                    padding: "16px 20px",
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.06)",
                    textDecoration: "none",
                    textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  Back home
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}