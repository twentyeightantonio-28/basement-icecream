"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [value, setValue] = useState<T>(initialValue);
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

  const play = (name: keyof NonNullable<typeof sounds>) => {
    const sound = sounds?.[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };

  return { play };
}

export default function Home() {
  const { value: found, setValue: setFound, reset: resetFound, ready } = useLocalStorageState<string[]>(
    STORAGE_KEY,
    []
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Find all the champions.");
  const [lives, setLives] = useState(MAX_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [lastClick, setLastClick] = useState<{ x: number; y: number } | null>(null);
  const [freshlyFound, setFreshlyFound] = useState<string[]>([]);
  const [hoveredChampion, setHoveredChampion] = useState<string | null>(null);
  const { play } = useAudio();

  const foundSet = useMemo(() => new Set(found), [found]);
  const freshSet = useMemo(() => new Set(freshlyFound), [freshlyFound]);
  const foundCount = found.length;

  function findMatch(input: string) {
    const clean = normalize(input);
    if (!clean) return null;
    return ITEMS.find((item) => item.answers.some((ans) => normalize(ans) === clean)) ?? null;
  }

  function submitGuess() {
    if (gameOver) return;

    const match = findMatch(guess);
    if (!match) {
      setMessage("❌ Wrong!");
      play("wrong");
      setGuess("");
      setLives((current) => {
        const next = Math.max(current - 1, 0);
        if (next === 0) setGameOver(true);
        return next;
      });
      return;
    }

    if (foundSet.has(match.id)) {
      setMessage("❗ Already found!");
      play("already");
      setGuess("");
      return;
    }

    const nextFound = [...found, match.id];
    setFound(nextFound);
    setFreshlyFound((current) => [...current, match.id]);
    setMessage(`✅ Correct: ${match.id}`);
    play("correct");
    setGuess("");
  }

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
      resetFound();
      setFreshlyFound([]);
      setHoveredChampion(null);
      setLives(MAX_LIVES);
      setGameOver(false);
      setMessage("Find all the champions.");
      setGuess("");
      setLastClick(null);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, [gameOver, play, resetFound]);

  function handleImageClick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLastClick({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  }

  function resetGame() {
    resetFound();
    setFreshlyFound([]);
    setHoveredChampion(null);
    setGuess("");
    setMessage("Find all the champions.");
    setLives(MAX_LIVES);
    setGameOver(false);
    setLastClick(null);
  }

  if (!ready) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
        <p>Loading game...</p>
      </main>
    );
  }

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          width: "100vw",
          padding: 20,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          background: "linear-gradient(180deg, #0f172a 0%, #111827 100%)",
          color: "#f8fafc",
        }}
      >
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "clamp(28px, 4vw, 42px)", letterSpacing: "0.02em" }}>
              Basement Icecream
            </h1>
            <p style={{ margin: "8px 0 0", opacity: 0.85, fontSize: 16 }}>{message}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <div
              style={{
                padding: "10px 16px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                fontSize: 15,
                fontWeight: 700,
                backdropFilter: "blur(10px)",
              }}
            >
              Score: <span style={{ color: "#ffffff" }}>{foundCount}</span> / {ITEMS.length}
            </div>

            <button onClick={resetGame} style={secondaryButtonStyle}>
              Reset
            </button>
          </div>
        </header>

        <section aria-label="Lives" style={{ margin: "4px 0 0", display: "flex", gap: 10 }}>
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: i < lives ? "#fb7185" : "rgba(148,163,184,0.35)",
                boxShadow: i < lives ? "0 0 0 4px rgba(251,113,133,0.14)" : "none",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </section>

        <section
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
            padding: 14,
            borderRadius: 18,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <label htmlFor="guess" style={{ position: "absolute", left: -9999 }}>
            Your guess
          </label>
          <input
            id="guess"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Guess a champion..."
            onKeyDown={(e) => {
              if (e.key === "Enter") submitGuess();
            }}
            disabled={gameOver}
            autoComplete="off"
            style={{
              flex: "1 1 260px",
              minWidth: 220,
              padding: "14px 16px",
              fontSize: 16,
              borderRadius: 14,
              border: `1px solid ${gameOver ? "rgba(148,163,184,0.4)" : "rgba(255,255,255,0.18)"}`,
              outline: "none",
              background: "rgba(15,23,42,0.72)",
              color: "#f8fafc",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          />
          <button onClick={submitGuess} disabled={gameOver} style={primaryButtonStyle(gameOver)}>
            Guess
          </button>
        </section>

        {lastClick && (
          <p style={{ fontSize: 14, opacity: 0.72, margin: 0 }}>
            Last click: {lastClick.x}% / {lastClick.y}%
          </p>
        )}

        <section
          style={{
            position: "relative",
            width: "100%",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          <img
            src="/scene.png"
            alt="Game scene"
            onClick={handleImageClick}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              cursor: "crosshair",
              userSelect: "none",
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
                  pointerEvents: "auto",
                }}
                onMouseEnter={() => setHoveredChampion(item.id)}
                onMouseLeave={() => setHoveredChampion((current) => (current === item.id ? null : current))}
              >
                {isFresh && <div style={pulseRingStyle} />}

                <div style={markerDotStyle} />

                {hoveredChampion === item.id && <div style={tooltipStyle}>{item.id}</div>}
              </div>
            );
          })}
        </section>
      </main>

      <style>{`
        @keyframes markerPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.45);
            opacity: 0;
          }
          20% {
            opacity: 0.95;
          }
          70% {
            opacity: 0.3;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.6);
            opacity: 0;
          }
        }

        button {
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        input::placeholder {
          color: rgba(226, 232, 240, 0.6);
        }
      `}</style>
    </>
  );
}

const baseButtonStyle = {
  padding: "12px 18px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.12)",
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer",
  color: "#f8fafc",
} as const;

const secondaryButtonStyle = {
  ...baseButtonStyle,
  background: "rgba(255,255,255,0.08)",
  boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
} as const;

const primaryButtonStyle = (disabled: boolean) =>
  ({
    ...baseButtonStyle,
    background: disabled
      ? "rgba(71,85,105,0.7)"
      : "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
    border: disabled ? "1px solid rgba(148,163,184,0.22)" : "1px solid rgba(99,102,241,0.35)",
    boxShadow: disabled ? "none" : "0 14px 30px rgba(79,70,229,0.34)",
    cursor: disabled ? "not-allowed" : "pointer",
  }) as const;

const markerDotStyle = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: "rgba(255,255,255,0.98)",
  boxShadow: "0 0 0 2px rgba(255,255,255,0.15), 0 0 16px rgba(255,255,255,0.28)",
} as const;

const pulseRingStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 14,
  height: 14,
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
  bottom: "calc(100% + 10px)",
  transform: "translateX(-50%)",
  whiteSpace: "nowrap",
  padding: "7px 10px",
  borderRadius: 10,
  background: "rgba(15,23,42,0.92)",
  color: "#f8fafc",
  fontSize: 13,
  fontWeight: 600,
  border: "1px solid rgba(255,255,255,0.12)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.28)",
  pointerEvents: "none",
} as const;