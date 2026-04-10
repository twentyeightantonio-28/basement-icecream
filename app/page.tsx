import type { Metadata } from "next";
import Link from "next/link";

const games = [
  {
    title: "League Basement",
    subtitle: "Spot hidden League champions in the scene.",
    href: "/league",
    image: "/league-home.png",
    status: "Live now",
    align: "left" as const,
  },
  {
    title: "Series Basement",
    subtitle: "Find iconic TV series hidden across the image.",
    href: "/series",
    image: "/series-home.webp",
    status: "Coming soon",
    align: "right" as const,
  },
];

const steps = [
  {
    title: "Explore the scene",
    description:
      "Open a game and scan the full image carefully. Every corner can hide a clue.",
  },
  {
    title: "Spot the references",
    description:
      "Find champions, series, and other familiar details hidden across the artwork.",
  },
  {
    title: "Test your knowledge",
    description:
      "Challenge yourself, compare attempts, and come back for harder modes later on.",
  },
];

const testimonials = [
  {
    quote: "Surprisingly hard and really fun once you start spotting the details.",
    author: "Early tester",
  },
  {
    quote: "It's the perfect game to cast on the TV with your family!",
    author: "Random player",
  },
];

const roadmap = [
  "Series Basement launch.",
  "More universes and hidden-reference scenes.",
  "Difficulty modes and replay-friendly challenge formats.",
];

export const metadata: Metadata = {
  title: "Home",
  description:
    "Choose your next visual challenge. Spot hidden League champions or find iconic TV series.",
};

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(59,130,246,0.16) 0%, rgba(15,23,42,1) 30%, rgba(2,6,23,1) 100%)",
        color: "#f8fafc",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 1450,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 16,
            padding: "8px 4px",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Basement Plays
            </p>
            <h1
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(34px, 6vw, 68px)",
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
              }}
            >
              Choose your next visual challenge.
            </h1>
            <p
              style={{
                margin: "18px 0 0",
                maxWidth: 700,
                color: "rgba(226,232,240,0.82)",
                fontSize: "clamp(16px, 2vw, 20px)",
                lineHeight: 1.6,
              }}
            >
              Basement Plays is a collection of visual guessing games where you
              search each scene for hidden gaming and pop culture references.
            </p>
          </div>

          <p
            style={{
              margin: 0,
              padding: "12px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(226,232,240,0.88)",
              fontWeight: 600,
            }}
          >
            Can you spot every pop culture reference?
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {games.map((game) => {
            const isComingSoon = game.href === "/series";

            return (
              <article
                key={game.title}
                style={{
                  position: "relative",
                  minHeight: "70vh",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 30px 70px rgba(0,0,0,0.35)",
                  display: "flex",
                  alignItems: "flex-end",
                  backgroundImage: `linear-gradient(to top, rgba(2,6,23,0.88) 0%, rgba(2,6,23,0.45) 45%, rgba(2,6,23,0.25) 100%), url(${game.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      game.align === "left"
                        ? "linear-gradient(135deg, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.08) 45%, rgba(0,0,0,0) 100%)"
                        : "linear-gradient(225deg, rgba(249,115,22,0.18) 0%, rgba(239,68,68,0.08) 45%, rgba(0,0,0,0) 100%)",
                  }}
                />

                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    padding: 28,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  <div
                    style={{
                      alignSelf: "flex-start",
                      padding: "7px 11px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {game.status}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "clamp(28px, 4vw, 44px)",
                        lineHeight: 1,
                      }}
                    >
                      {game.title}
                    </h2>
                    <p
                      style={{
                        margin: 0,
                        maxWidth: 460,
                        color: "rgba(226,232,240,0.86)",
                        fontSize: 17,
                        lineHeight: 1.55,
                      }}
                    >
                      {game.subtitle}
                    </p>
                  </div>

                  {isComingSoon ? (
                    <div
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 8,
                        padding: "14px 18px",
                        borderRadius: 16,
                        background: "rgba(148,163,184,0.16)",
                        border: "1px solid rgba(148,163,184,0.18)",
                        color: "rgba(226,232,240,0.72)",
                        fontWeight: 800,
                      }}
                    >
                      Coming soon
                    </div>
                  ) : (
                    <Link
                      href={game.href}
                      className="play-button"
                      style={{
                        alignSelf: "flex-start",
                        marginTop: 8,
                        padding: "14px 20px",
                        borderRadius: 16,
                        textDecoration: "none",
                        color: "#f8fafc",
                        fontWeight: 800,
                        background:
                          game.align === "left"
                            ? "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)"
                            : "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
                        boxShadow: "0 18px 40px rgba(0,0,0,0.28)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        cursor: "pointer",
                        display: "inline-block",
                      }}
                    >
                      PLAY
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        <section
          style={{
            marginTop: 8,
            padding: "28px",
            borderRadius: 28,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ maxWidth: 820 }}>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(148,163,184,0.82)",
              }}
            >
              How it works
            </p>
            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.05,
              }}
            >
              Fast to start, hard to master.
            </h2>
            <p
              style={{
                margin: "14px 0 0",
                maxWidth: 700,
                color: "rgba(226,232,240,0.82)",
                fontSize: 17,
                lineHeight: 1.65,
              }}
            >
              Each game is built around observation, memory, and pop culture
              knowledge. The rules are simple, but the hidden details make every
              scene more challenging than it looks.
            </p>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {steps.map((step, index) => (
              <article
                key={step.title}
                style={{
                  padding: 22,
                  borderRadius: 22,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(99,102,241,0.18)",
                    border: "1px solid rgba(99,102,241,0.22)",
                    fontWeight: 800,
                    marginBottom: 14,
                  }}
                >
                  {index + 1}
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 22,
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: "10px 0 0",
                    color: "rgba(226,232,240,0.78)",
                    lineHeight: 1.6,
                    fontSize: 16,
                  }}
                >
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 20,
          }}
        >
          <article
            style={{
              padding: 28,
              borderRadius: 28,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(148,163,184,0.82)",
              }}
            >
              Why players like it
            </p>
            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(26px, 3vw, 38px)",
                lineHeight: 1.08,
              }}
            >
              Small challenge, big “one more try” energy.
            </h2>

            <div
              style={{
                marginTop: 20,
                display: "grid",
                gap: 14,
              }}
            >
              {testimonials.map((item) => (
                <blockquote
                  key={item.quote}
                  style={{
                    margin: 0,
                    padding: 20,
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 17,
                      lineHeight: 1.65,
                      color: "rgba(248,250,252,0.94)",
                    }}
                  >
                    “{item.quote}”
                  </p>
                  <footer
                    style={{
                      marginTop: 12,
                      color: "rgba(148,163,184,0.88)",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    — {item.author}
                  </footer>
                </blockquote>
              ))}
            </div>
          </article>

          <article
            style={{
              padding: 28,
              borderRadius: 28,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "rgba(148,163,184,0.82)",
              }}
            >
              What’s next
            </p>
            <h2
              style={{
                margin: "10px 0 0",
                fontSize: "clamp(26px, 3vw, 38px)",
                lineHeight: 1.08,
              }}
            >
              Basement Plays is just getting started.
            </h2>

            <ul
              style={{
                margin: "20px 0 0",
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 12,
              }}
            >
              {roadmap.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    padding: 16,
                    borderRadius: 18,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(226,232,240,0.84)",
                    lineHeight: 1.55,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 999,
                      marginTop: 8,
                      background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
                      flexShrink: 0,
                    }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}