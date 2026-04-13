"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Item = {
  id: string;
  answers: string[];
  x: number;
  y: number;
};

const ITEMS: Item[] = [
  { id: "Karthus", answers: ["karthus"], x: 33.1, y: 46.8 },
  { id: "Rengar", answers: ["rengar"], x: 28.3, y: 80.1 },
  { id: "Neeko", answers: ["neeko"], x: 19.1, y: 60.1 },
  { id: "Ivern", answers: ["ivern"], x: 87.2, y: 56.5 },
  { id: "Shaco", answers: ["shaco"], x: 50.2, y: 75.5 },
  { id: "Nami", answers: ["nami"], x: 82.8, y: 89 },
  { id: "Rakan", answers: ["rakan"], x: 35.1, y: 40.6 },
  { id: "Yasuo", answers: ["yasuo"], x: 68.8, y: 41.3 },
  { id: "Aurelion Sol", answers: ["aurelion sol", "aurelion_sol", "asol"], x: 36.4, y: 21.2 },
  { id: "Tahm Kench", answers: ["tahm kench", "tahm_kench", "tahm"], x: 86.5, y: 66.8 },
  { id: "Zyra", answers: ["zyra"], x: 25.6, y: 44.4 },
  { id: "Samira", answers: ["samira"], x: 67.3, y: 47.5 },
  { id: "Malphite", answers: ["malphite"], x: 17.5, y: 39.9 },
  { id: "Teemo", answers: ["teemo"], x: 55.2, y: 79.4 },
  { id: "Yuumi", answers: ["yuumi"], x: 4.6, y: 73 },
  { id: "Jarvan IV", answers: ["jarvan", "jarvan iv", "jarvan 4", "j4"], x: 16.1, y: 28.5 },
  { id: "Kai'sa", answers: ["kai'sa", "kaisa", "kai sa"], x: 6.2, y: 92.9 },
  { id: "Ryze", answers: ["ryze"], x: 37.9, y: 85.5 },
  { id: "Illaoi", answers: ["illaoi"], x: 98.9, y: 85.5 },
  { id: "Zoe", answers: ["zoe"], x: 12.1, y: 61.2 },
  { id: "Braum", answers: ["braum"], x: 46.2, y: 57.4 },
  { id: "Twisted Fate", answers: ["twisted fate", "twisted_fate", "tf"], x: 64.9, y: 67.5 },
  { id: "Leona", answers: ["leona"], x: 66, y: 57.9 },
  { id: "Amumu", answers: ["amumu"], x: 36.7, y: 50.1 },
  { id: "Pantheon", answers: ["pantheon", "panth"], x: 34.3, y: 38 },
  { id: "Xayah", answers: ["xayah"], x: 33.6, y: 40.7 },
  { id: "Evelynn", answers: ["evelynn", "eve", "evelyn"], x: 48.2, y: 37.9 },
  { id: "Nautilus", answers: ["nautilus", "naut"], x: 78.1, y: 92.3 },
  { id: "Blitzcrank", answers: ["blitzcrank", "blitz"], x: 31.7, y: 32.3 },
  { id: "Darius", answers: ["darius"], x: 47.9, y: 23.9 },
  { id: "Senna", answers: ["senna"], x: 27.4, y: 29.4 },
  { id: "Heimerdinger", answers: ["heimerdinger", "heimer"], x: 61.8, y: 79.2 },
  { id: "Bard", answers: ["bard"], x: 21.7, y: 57.6 },
  { id: "Vi", answers: ["vi"], x: 36.7, y: 44.3 },
  { id: "Elise", answers: ["elise"], x: 62.7, y: 47.2 },
  { id: "Vayne", answers: ["vayne"], x: 59.6, y: 41.6 },
  { id: "Sejuani", answers: ["sejuani", "sej"], x: 92.5, y: 63.2 },
  { id: "Nidalee", answers: ["nidalee", "nida"], x: 63.6, y: 97.2 },
  { id: "Sivir", answers: ["sivir"], x: 59.2, y: 91.9 },
  { id: "Lulu", answers: ["lulu"], x: 93.2, y: 46.1 },
  { id: "Katarina", answers: ["katarina", "kata"], x: 48.3, y: 93.5 },
  { id: "Gwen", answers: ["gwen"], x: 69.4, y: 93.5 },
  { id: "Gangplank", answers: ["gangplank", "gp"], x: 36.2, y: 94.3 },
  { id: "Jax", answers: ["jax"], x: 41.3, y: 25.8 },
  { id: "Alistar", answers: ["alistar"], x: 1.8, y: 67.9 },
  { id: "Zilean", answers: ["zilean", "zil"], x: 68.2, y: 17.4 },
  { id: "Master Yi", answers: ["master yi", "master_yi", "yi"], x: 21.6, y: 42.2 },
  { id: "Twitch", answers: ["twitch"], x: 2.6, y: 83.3 },
  { id: "Kennen", answers: ["kennen"], x: 9.9, y: 88.3 },
  { id: "Poppy", answers: ["poppy"], x: 32, y: 57.4 },
  { id: "Soraka", answers: ["soraka"], x: 26.6, y: 67.2 },
  { id: "Caitlyn", answers: ["caitlyn", "cait"], x: 2.3, y: 95.8 },
  { id: "Ashe", answers: ["ashe"], x: 83.9, y: 24.9 },
  { id: "Ziggs", answers: ["ziggs"], x: 72, y: 74.8 },
  { id: "Zac", answers: ["zac"], x: 69.3, y: 69.6 },
  { id: "Fizz", answers: ["fizz"], x: 57.2, y: 68.3 },
  { id: "Jinx", answers: ["jinx"], x: 71.8, y: 49 },
  { id: "Annie", answers: ["annie"], x: 20.2, y: 74.9 },
  { id: "Orianna", answers: ["orianna"], x: 58.2, y: 54.6 },
  { id: "Malzahar", answers: ["malzahar", "malz"], x: 56.5, y: 29.5 },
  { id: "Vex", answers: ["vex"], x: 5.7, y: 32.5 },
  { id: "Seraphine", answers: ["seraphine", "sera"], x: 72.3, y: 58.6 },
  { id: "Diana", answers: ["diana"], x: 47.5, y: 17.8 },
  { id: "Ekko", answers: ["ekko"], x: 13.2, y: 17.8 },
  { id: "Jhin", answers: ["jhin"], x: 89.2, y: 37.4 },
  { id: "Kindred", answers: ["kindred"], x: 22.3, y: 29 },
];

const STORAGE_KEY = "foundItems";
const MAX_LIVES = 3;
const MARKER_ANIMATION_MS = 2200;

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
    return {
      correct: new Audio("/correct.wav"),
      wrong: new Audio("/wrong.wav"),
      already: new Audio("/already.wav"),
      gameover: new Audio("/gameover.wav"),
    };
  }, []);

  const play = (name: "correct" | "wrong" | "already" | "gameover") => {
    const sound = sounds?.[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  return { play };
}

export default function LeaguePage() {
  const { value: found, setValue: setFound, reset: resetFound, ready } =
    useLocalStorageState<string[]>(STORAGE_KEY, []);

  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Press Enter to guess.");
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);
  const [freshlyFound, setFreshlyFound] = useState<string[]>([]);
  const [hoveredChampion, setHoveredChampion] = useState<string | null>(null);
  const [inputOpen, setInputOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const stageRef = useRef<HTMLElement | null>(null);

  const { play } = useAudio();

  const foundSet = useMemo(() => new Set(found), [found]);
  const freshSet = useMemo(() => new Set(freshlyFound), [freshlyFound]);
  const foundCount = found.length;

  function focusStage() {
    window.setTimeout(() => {
      stageRef.current?.focus();
    }, 0);
  }

  function openInput() {
    if (gameOver) return;
    setInputOpen(true);
  }

  function closeInput() {
    setInputOpen(false);
    setGuess("");
    focusStage();
  }

  function findMatch(input: string) {
    const clean = normalize(input);
    if (!clean) return null;
    return ITEMS.find((item) => item.answers.some((ans) => normalize(ans) === clean)) ?? null;
  }

  function submitGuess() {
    if (gameOver) return;

    const trimmed = guess.trim();
    if (!trimmed) {
      closeInput();
      setMessage("Press Enter to guess.");
      return;
    }

    const match = findMatch(trimmed);

    if (!match) {
      setMessage("❌ Wrong!");
      play("wrong");
      setLives((current) => {
        const next = Math.max(current - 1, 0);
        if (next === 0) setGameOver(true);
        return next;
      });
      closeInput();
      return;
    }

    if (foundSet.has(match.id)) {
      setMessage("❗ Already found!");
      play("already");
      closeInput();
      return;
    }

    const nextFound = [...found, match.id];
    setFound(nextFound);
    setFreshlyFound((current) => [...current, match.id]);
    setMessage(`✅ Correct: ${match.id}`);
    play("correct");
    closeInput();
  }

  function resetGame() {
    resetFound();
    setFreshlyFound([]);
    setHoveredChampion(null);
    setGuess("");
    setMessage("Press Enter to guess.");
    setLives(MAX_LIVES);
    setGameOver(false);
    setLastClick(null);
    setInputOpen(false);
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
    if (!gameOver) return;

    setMessage("💀 Game Over!");
    play("gameover");

    const timer = window.setTimeout(() => {
      resetGame();
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [gameOver]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typingInField =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.getAttribute("contenteditable") === "true";

      if (typingInField) return;

      if ((e.key === "Enter" || e.key === "/") && !inputOpen && !gameOver) {
        e.preventDefault();
        openInput();
      }

      if (e.key === "Escape" && inputOpen) {
        e.preventDefault();
        closeInput();
        setMessage("Press Enter to guess.");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [inputOpen, gameOver]);

  function handleImageClick(e: React.MouseEvent<HTMLDivElement>) {
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
              maxWidth: 520,
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
                minWidth: 180,
                maxWidth: 260,
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
                Status
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "rgba(248,250,252,0.94)",
                }}
              >
                {message}
              </div>
            </div>
          </div>

          <div style={{ pointerEvents: "auto", display: "flex", gap: 10 }}>
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
                  setMessage("Press Enter to guess.");
                }
              }}
              disabled={gameOver}
              autoComplete="off"
              spellCheck={false}
              style={{
                flex: "1 1 320px",
                minWidth: 260,
                padding: "16px 18px",
                fontSize: 16,
                borderRadius: 16,
                border: `1px solid ${
                  gameOver ? "rgba(148,163,184,0.4)" : "rgba(255,255,255,0.16)"
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
              disabled={gameOver}
              style={{
                ...baseButtonStyle,
                padding: "16px 22px",
                borderRadius: 16,
                background: gameOver
                  ? "rgba(71,85,105,0.72)"
                  : "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
                border: gameOver
                  ? "1px solid rgba(148,163,184,0.22)"
                  : "1px solid rgba(99,102,241,0.35)",
                boxShadow: gameOver ? "none" : "0 14px 30px rgba(79,70,229,0.34)",
                cursor: gameOver ? "not-allowed" : "pointer",
                minWidth: 110,
              }}
            >
              Guess
            </button>
          </div>
        </div>

        {!inputOpen && (
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
      </main>
    </>
  );
}