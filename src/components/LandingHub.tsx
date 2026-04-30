import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function LandingHub() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #ffeef8 0%, #e8f4f8 50%, #f0e8ff 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute rounded-full opacity-20"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              background: i % 2 === 0 ? "#ff6b9d" : "#c44569",
              left: `${10 + i * 15}%`,
              top: `${-20 + i * 20}%`,
              animation: `float-slow ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Floating dots */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full"
            style={{
              width: "8px",
              height: "8px",
              background: i % 3 === 0 ? "#ff6b9d" : i % 3 === 1 ? "#ffa502" : "#6bcf7f",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              animation: `float-dot ${5 + Math.random() * 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Title */}
        <div
          className={`text-center transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #ff6b9d 0%, #ffa502 50%, #6bcf7f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "8px",
              letterSpacing: "-1px",
            }}
          >
            ✨ Creative Studio ✨
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#666",
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            Capture • Create • Share
          </p>
        </div>

        {/* One-line feature cards with icons */}
        <div
          className={`flex flex-wrap justify-center items-center gap-4 md:gap-6 transition-all duration-1000 ${
            loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{
            maxWidth: "1100px",
          }}
        >
          {/* Calendar */}
          <Link
            to="/calendar"
            className="group relative"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
              style={{
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #ff6b9d 0%, #ff8fab 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  boxShadow: "0 8px 24px rgba(255, 107, 157, 0.3)",
                  transition: "all 0.3s ease",
                }}
                className="group-hover:shadow-lg"
              >
                📅
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#333",
                  textAlign: "center",
                  minWidth: "70px",
                }}
              >
                Calendar
              </span>
            </div>
          </Link>

          {/* Photo Booth */}
          <Link
            to="/photobooth"
            className="group relative"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
              style={{
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #ffa502 0%, #ffb84d 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  boxShadow: "0 8px 24px rgba(255, 165, 2, 0.3)",
                  transition: "all 0.3s ease",
                }}
                className="group-hover:shadow-lg"
              >
                📸
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#333",
                  textAlign: "center",
                  minWidth: "70px",
                }}
              >
                Photo Booth
              </span>
            </div>
          </Link>

          {/* Polaroid */}
          <Link
            to="/polaroid"
            className="group relative"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
              style={{
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #6bcf7f 0%, #7ddf64 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  boxShadow: "0 8px 24px rgba(107, 207, 127, 0.3)",
                  transition: "all 0.3s ease",
                }}
                className="group-hover:shadow-lg"
              >
                🎞️
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#333",
                  textAlign: "center",
                  minWidth: "70px",
                }}
              >
                Polaroid
              </span>
            </div>
          </Link>

          {/* DigiCam */}
          <Link
            to="/digicam"
            className="group relative"
            style={{
              textDecoration: "none",
            }}
          >
            <div
              className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300"
              style={{
                transform: "translateY(0)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  boxShadow: "0 8px 24px rgba(0, 188, 212, 0.3)",
                  transition: "all 0.3s ease",
                }}
                className="group-hover:shadow-lg"
              >
                📷
              </div>
              <span
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#333",
                  textAlign: "center",
                  minWidth: "70px",
                }}
              >
                DigiCam
              </span>
            </div>
          </Link>
        </div>

        {/* Decorative text */}
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#999",
            fontStyle: "italic",
          }}
        >
          <p>Choose your creative adventure ✨</p>
        </div>
      </div>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(0px); }
          75% { transform: translateY(-20px) translateX(-10px); }
        }

        @keyframes float-dot {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-30px); opacity: 0.8; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fade-in-up 0.6s ease-out;
        }

        .fade-in {
          animation: fade-in-up 0.6s ease-out;
        }

        .zoom-in {
          animation: zoom-in 0.6s ease-out;
        }

        @keyframes zoom-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
