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
          minHeight: "calc(100vh - 40px)",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            padding: "8px 4px",
          }}
        >
          <div>
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
          </div>

          <div
            style={{
              padding: "12px 16px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(226,232,240,0.88)",
              fontWeight: 600,
            }}
          >
            Can you get every pop culture references ?
          </div>
        </header>

        <section
          style={{
            flex: 1,
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
      </div>
    </main>
  );
}