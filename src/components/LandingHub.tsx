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
        background: "#a9d6fc", // Sky blue
        fontFamily: "'Nunito', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Background SVGs (Sky, Clouds, Stars) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          {/* Sparkles / Stars */}
          <g fill="#ffffff">
            <path d="M 200 150 Q 210 150, 210 140 Q 210 150, 220 150 Q 210 150, 210 160 Q 210 150, 200 150 Z" />
            <path d="M 850 100 Q 860 100, 860 90 Q 860 100, 870 100 Q 860 100, 860 110 Q 860 100, 850 100 Z" />
            <path d="M 1050 250 Q 1060 250, 1060 240 Q 1060 250, 1070 250 Q 1060 250, 1060 260 Q 1060 250, 1050 250 Z" />
            <path d="M 150 350 Q 160 350, 160 340 Q 160 350, 170 350 Q 160 350, 160 360 Q 160 350, 150 350 Z" />
          </g>

          {/* Clouds */}
          <g stroke="#1c3b5e" strokeWidth="4" fill="#ffffff" strokeLinejoin="round">
            {/* Left Cloud */}
            <path d="M 180 180 a 30 30 0 0 1 30 -30 a 40 40 0 0 1 70 0 a 30 30 0 0 1 30 30 z" />
            {/* Right Cloud */}
            <path d="M 900 200 a 40 40 0 0 1 40 -40 a 50 50 0 0 1 80 0 a 40 40 0 0 1 40 40 z" />
          </g>
        </svg>
      </div>

      {/* Main Container */}
      <div
        className={`relative z-10 flex flex-col items-center justify-end w-full h-full min-h-screen transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Tent Graphics container */}
        <div className="relative w-full max-w-[1200px] flex-grow-0 flex items-end justify-center" style={{ height: "650px" }}>
          
          {/* Back SVG (Tent, Ground, Bushes) */}
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1200 650"
            preserveAspectRatio="xMidYMax meet"
            style={{ pointerEvents: "none" }}
          >
            <defs>
              <linearGradient id="doorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f8c6d4" />
                <stop offset="100%" stopColor="#f2a4bc" />
              </linearGradient>
            </defs>

            {/* Tent Base Shadow */}
            <ellipse cx="600" cy="580" rx="450" ry="20" fill="rgba(0,0,0,0.1)" />

            {/* Grass & Path */}
            <rect x="0" y="580" width="1200" height="70" fill="#a0dc78" stroke="#1c3b5e" strokeWidth="4" />
            <path d="M 450 650 L 520 580 L 680 580 L 750 650 Z" fill="#e8cfa1" stroke="#1c3b5e" strokeWidth="4" />

            {/* Tent Body Walls */}
            <path
              d="M 220 350 L 980 350 L 1020 580 L 180 580 Z"
              fill="#fffafb"
              stroke="#1c3b5e"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            
            {/* Wall Folds (Subtle pink lines) */}
            <path d="M 380 350 L 400 580" stroke="#ffb8d1" strokeWidth="3" opacity="0.5" />
            <path d="M 820 350 L 800 580" stroke="#ffb8d1" strokeWidth="3" opacity="0.5" />

            {/* Tent Door */}
            <path
              d="M 500 580 L 500 480 A 100 100 0 0 1 700 480 L 700 580 Z"
              fill="#ffb8d1"
              stroke="#1c3b5e"
              strokeWidth="5"
            />
            {/* Inner Door */}
            <path
              d="M 520 580 L 520 490 A 80 80 0 0 1 680 490 L 680 580 Z"
              fill="url(#doorGradient)"
              stroke="#1c3b5e"
              strokeWidth="5"
            />
            {/* Door Heart */}
            <path
              d="M 600 535 C 600 535, 580 515, 580 500 C 580 485, 600 485, 600 500 C 600 485, 620 485, 620 500 C 620 515, 600 535, 600 535 Z"
              fill="#1c3b5e"
            />
            {/* Door Knob */}
            <circle cx="540" cy="540" r="8" fill="#fff" stroke="#1c3b5e" strokeWidth="4" />

            {/* Tent Roof Canopy */}
            {/* White Base of Roof */}
            <path
              d="M 600 80 L 180 350 L 1020 350 Z"
              fill="#fffafb"
              stroke="#1c3b5e"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            
            {/* Pink Stripes */}
            {/* Panel 2 */}
            <path
              d="M 600 80 L 380 350 L 520 350 Z"
              fill="#ffb8d1"
              stroke="#1c3b5e"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Panel 4 */}
            <path
              d="M 600 80 L 680 350 L 820 350 Z"
              fill="#ffb8d1"
              stroke="#1c3b5e"
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Pink Polka Dots on White Panels */}
            <g fill="#ffb8d1">
              {/* Left Panel */}
              <circle cx="280" cy="280" r="15" />
              <circle cx="230" cy="330" r="10" />
              {/* Center Panel */}
              <circle cx="600" cy="200" r="25" />
              <circle cx="600" cy="300" r="15" />
              {/* Right Panel */}
              <circle cx="920" cy="280" r="15" />
              <circle cx="970" cy="330" r="10" />
            </g>

            {/* Scalloped Edges (awning) */}
            <g fill="#fffafb" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round">
              <path d="M 160 350 Q 200 400 240 350 Z" fill="#ffb8d1" />
              <path d="M 240 350 Q 280 400 320 350 Z" fill="#fffafb" />
              <path d="M 320 350 Q 360 400 400 350 Z" fill="#fffafb" />
              <path d="M 400 350 Q 440 400 480 350 Z" fill="#ffb8d1" />
              <path d="M 480 350 Q 520 400 560 350 Z" fill="#ffb8d1" />
              <path d="M 560 350 Q 600 400 640 350 Z" fill="#fffafb" />
              <path d="M 640 350 Q 680 400 720 350 Z" fill="#fffafb" />
              <path d="M 720 350 Q 760 400 800 350 Z" fill="#ffb8d1" />
              <path d="M 800 350 Q 840 400 880 350 Z" fill="#ffb8d1" />
              <path d="M 880 350 Q 920 400 960 350 Z" fill="#fffafb" />
              <path d="M 960 350 Q 1000 400 1040 350 Z" fill="#ffb8d1" />
            </g>

            {/* Top Heart */}
            <g transform="translate(600, 70)">
              <path
                d="M 0 25 C 0 25, -30 0, -30 -20 C -30 -40, 0 -40, 0 -20 C 0 -40, 30 -40, 30 -20 C 30 0, 0 25, 0 25 Z"
                fill="#ffb8d1"
                stroke="#1c3b5e"
                strokeWidth="5"
                strokeLinejoin="round"
              />
              <path
                d="M -15 -25 A 5 5 0 0 1 -5 -25"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* Bushes & Flowers - Left */}
            <g transform="translate(150, 500)">
              {/* Bush Back */}
              <path d="M 0 100 C -50 100, -80 50, -40 20 C -20 -20, 40 -20, 60 10 C 90 -10, 140 10, 130 50 C 160 70, 140 100, 100 100 Z" fill="#588c42" stroke="#1c3b5e" strokeWidth="5" />
              {/* Bush Front */}
              <path d="M 20 100 C -10 100, -20 60, 0 40 C 20 10, 60 10, 80 30 C 100 20, 130 30, 120 60 C 140 80, 120 100, 90 100 Z" fill="#75b35a" stroke="#1c3b5e" strokeWidth="4" />
              {/* Yellow Flower */}
              <g transform="translate(20, 30)">
                <circle cx="0" cy="-10" r="6" fill="#fbd148" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="10" cy="-3" r="6" fill="#fbd148" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="6" cy="8" r="6" fill="#fbd148" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-6" cy="8" r="6" fill="#fbd148" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-10" cy="-3" r="6" fill="#fbd148" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#fff" stroke="#1c3b5e" strokeWidth="2" />
              </g>
              {/* Orange Flower */}
              <g transform="translate(80, 20)">
                <circle cx="0" cy="-10" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="10" cy="-3" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="6" cy="8" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-6" cy="8" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-10" cy="-3" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#fff" stroke="#1c3b5e" strokeWidth="2" />
              </g>
              {/* Blue Flower */}
              <g transform="translate(50, 70)">
                <circle cx="0" cy="-10" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="10" cy="-3" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="6" cy="8" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-6" cy="8" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-10" cy="-3" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#fff" stroke="#1c3b5e" strokeWidth="2" />
              </g>
            </g>

            {/* Bushes & Flowers - Right */}
            <g transform="translate(950, 500)">
              {/* Bush Back */}
              <path d="M 0 100 C -40 100, -60 70, -30 50 C -40 10, 10 -10, 40 10 C 60 -20, 120 -20, 140 20 C 180 50, 150 100, 100 100 Z" fill="#588c42" stroke="#1c3b5e" strokeWidth="5" />
              {/* Bush Front */}
              <path d="M 20 100 C -10 100, -20 60, 0 40 C 20 10, 60 10, 80 30 C 100 20, 130 30, 120 60 C 140 80, 120 100, 90 100 Z" fill="#75b35a" stroke="#1c3b5e" strokeWidth="4" />
              {/* Pink Flower */}
              <g transform="translate(20, 30)">
                <circle cx="0" cy="-10" r="6" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="10" cy="-3" r="6" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="6" cy="8" r="6" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-6" cy="8" r="6" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-10" cy="-3" r="6" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#fff" stroke="#1c3b5e" strokeWidth="2" />
              </g>
              {/* Orange Flower */}
              <g transform="translate(80, 20)">
                <circle cx="0" cy="-10" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="10" cy="-3" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="6" cy="8" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-6" cy="8" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-10" cy="-3" r="6" fill="#fb8f48" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#fff" stroke="#1c3b5e" strokeWidth="2" />
              </g>
              {/* Blue Flower */}
              <g transform="translate(50, 70)">
                <circle cx="0" cy="-10" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="10" cy="-3" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="6" cy="8" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-6" cy="8" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="-10" cy="-3" r="6" fill="#5ea1f8" stroke="#1c3b5e" strokeWidth="2" />
                <circle cx="0" cy="0" r="5" fill="#fff" stroke="#1c3b5e" strokeWidth="2" />
              </g>
            </g>

          </svg>

          {/* Cards overlay container */}
          <div className="absolute top-[280px] w-full flex justify-center z-20 px-4">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              
              {/* Calendar Card */}
              <Link to="/calendar" className="group outline-none" style={{ textDecoration: "none" }}>
                <div className="bg-white border-4 border-[#1c3b5e] rounded-2xl p-4 w-[160px] h-[190px] flex flex-col items-center justify-center shadow-[0_8px_0_#1c3b5e] hover:-translate-y-2 hover:shadow-[0_16px_0_#1c3b5e] transition-all duration-300 relative cursor-pointer">
                  {/* Decorative Hearts */}
                  <svg className="absolute top-2 left-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <svg className="absolute top-2 right-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  
                  {/* Icon */}
                  <div className="w-[80px] h-[80px] mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Notebook */}
                      <rect x="20" y="25" width="60" height="60" rx="8" fill="#fff" stroke="#1c3b5e" strokeWidth="5" />
                      {/* Spirals */}
                      <path d="M 30 15 v 20 M 50 15 v 20 M 70 15 v 20" stroke="#fb6f92" strokeWidth="6" strokeLinecap="round" />
                      {/* Grid lines */}
                      <line x1="25" y1="45" x2="75" y2="45" stroke="#e0e0e0" strokeWidth="3" />
                      <line x1="25" y1="65" x2="75" y2="65" stroke="#e0e0e0" strokeWidth="3" />
                      <line x1="40" y1="30" x2="40" y2="80" stroke="#e0e0e0" strokeWidth="3" />
                      <line x1="60" y1="30" x2="60" y2="80" stroke="#e0e0e0" strokeWidth="3" />
                      {/* Red Heart on Date */}
                      <path d="M 65 75 C 65 75, 60 70, 60 65 C 60 60, 65 60, 65 65 C 65 60, 70 60, 70 65 C 70 70, 65 75, 65 75 Z" fill="#fb6f92" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-[#1c3b5e] text-[14px] tracking-wide text-center uppercase">
                    Calendar
                  </span>
                </div>
              </Link>

              {/* Polaroid Card */}
              <Link to="/polaroid" className="group outline-none" style={{ textDecoration: "none" }}>
                <div className="bg-white border-4 border-[#1c3b5e] rounded-2xl p-4 w-[160px] h-[190px] flex flex-col items-center justify-center shadow-[0_8px_0_#1c3b5e] hover:-translate-y-2 hover:shadow-[0_16px_0_#1c3b5e] transition-all duration-300 relative cursor-pointer">
                  <svg className="absolute top-2 left-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <svg className="absolute top-2 right-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  
                  <div className="w-[80px] h-[80px] mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Polaroid Camera Base */}
                      <rect x="15" y="25" width="70" height="55" rx="8" fill="#f4ecd8" stroke="#1c3b5e" strokeWidth="5" />
                      {/* Top part */}
                      <rect x="25" y="15" width="50" height="15" rx="4" fill="#e5dbbe" stroke="#1c3b5e" strokeWidth="5" />
                      <circle cx="35" cy="22" r="4" fill="#1c3b5e" />
                      {/* Rainbow Stripe */}
                      <rect x="45" y="60" width="10" height="20" fill="#fb6f92" />
                      <rect x="55" y="60" width="10" height="20" fill="#fbd148" />
                      <rect x="65" y="60" width="10" height="20" fill="#5ea1f8" />
                      {/* Lens Base */}
                      <circle cx="50" cy="50" r="18" fill="#fff" stroke="#1c3b5e" strokeWidth="5" />
                      {/* Lens Inner */}
                      <circle cx="50" cy="50" r="10" fill="#1c3b5e" />
                      <circle cx="47" cy="47" r="3" fill="#fff" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-[#1c3b5e] text-[13px] leading-tight tracking-wide text-center uppercase">
                    Polaroid<br/>Camera
                  </span>
                </div>
              </Link>

              {/* Photobooth Card */}
              <Link to="/photobooth" className="group outline-none" style={{ textDecoration: "none" }}>
                <div className="bg-white border-4 border-[#1c3b5e] rounded-2xl p-4 w-[160px] h-[190px] flex flex-col items-center justify-center shadow-[0_8px_0_#1c3b5e] hover:-translate-y-2 hover:shadow-[0_16px_0_#1c3b5e] transition-all duration-300 relative cursor-pointer">
                  <svg className="absolute top-2 left-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <svg className="absolute top-2 right-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  
                  <div className="w-[80px] h-[80px] mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Booth Body */}
                      <rect x="25" y="25" width="50" height="60" rx="4" fill="#eaddcd" stroke="#1c3b5e" strokeWidth="5" />
                      {/* Sign */}
                      <rect x="30" y="15" width="40" height="15" fill="#fff" stroke="#1c3b5e" strokeWidth="4" />
                      <text x="50" y="26" fontSize="10" fontWeight="bold" fill="#1c3b5e" textAnchor="middle">PHOTO</text>
                      {/* Curtains opening */}
                      <rect x="30" y="35" width="40" height="45" fill="#1c3b5e" />
                      <path d="M 30 35 L 45 35 Q 45 60 30 80 Z" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="3" />
                      <path d="M 70 35 L 55 35 Q 55 60 70 80 Z" fill="#fb6f92" stroke="#1c3b5e" strokeWidth="3" />
                      {/* Heart on side */}
                      <path d="M 80 50 C 80 50, 77 47, 75 45 C 73 43, 77 43, 77 45 C 77 43, 81 43, 81 45 C 81 47, 80 50, 80 50 Z" fill="#fb6f92" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-[#1c3b5e] text-[13px] tracking-wide text-center uppercase">
                    Photobooth
                  </span>
                </div>
              </Link>

              {/* Digicam Card */}
              <Link to="/digicam" className="group outline-none" style={{ textDecoration: "none" }}>
                <div className="bg-white border-4 border-[#1c3b5e] rounded-2xl p-4 w-[160px] h-[190px] flex flex-col items-center justify-center shadow-[0_8px_0_#1c3b5e] hover:-translate-y-2 hover:shadow-[0_16px_0_#1c3b5e] transition-all duration-300 relative cursor-pointer">
                  <svg className="absolute top-2 left-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <svg className="absolute top-2 right-2 w-4 h-4 text-[#ffb8d1]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  
                  <div className="w-[80px] h-[80px] mb-4">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Camera Body */}
                      <rect x="15" y="30" width="70" height="45" rx="6" fill="#3b4252" stroke="#1c3b5e" strokeWidth="5" />
                      {/* Top Button */}
                      <rect x="25" y="25" width="15" height="5" rx="2" fill="#1c3b5e" />
                      {/* Flash */}
                      <rect x="65" y="38" width="10" height="6" rx="2" fill="#e0e0e0" stroke="#1c3b5e" strokeWidth="2" />
                      {/* Big Lens */}
                      <circle cx="45" cy="52" r="16" fill="#4c566a" stroke="#1c3b5e" strokeWidth="4" />
                      <circle cx="45" cy="52" r="10" fill="#2e3440" stroke="#1c3b5e" strokeWidth="2" />
                      <circle cx="41" cy="48" r="3" fill="#fff" />
                      {/* Heart Sticker */}
                      <path d="M 25 45 C 25 45, 20 40, 20 35 C 20 30, 25 30, 25 35 C 25 30, 30 30, 30 35 C 30 40, 25 45, 25 45 Z" fill="#fb6f92" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-[#1c3b5e] text-[14px] tracking-wide text-center uppercase">
                    Digicam
                  </span>
                </div>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
