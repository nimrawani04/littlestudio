import { useState } from "react";
import { Link } from "@tanstack/react-router";

export function BoothEntry({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleEnter = () => {
    setOpening(true);
    setTimeout(onEnter, 1000); // Wait for curtain to fully open
  };

  const Heart = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  return (
    <div className="w-full min-h-screen bg-[#fcf8f2] flex items-center justify-center overflow-hidden font-sans select-none relative">
      {/* Optional: Navigation back to home */}
      <Link to="/" className="absolute top-6 left-6 z-50 text-[#4a3a31] hover:scale-110 transition-transform font-bold flex items-center gap-2">
        <span className="text-xl">←</span> Back to Studio
      </Link>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700;800&display=swap');
      `}</style>

      <div className="relative w-full max-w-[1800px] min-w-[1000px] aspect-[16/9] shadow-2xl overflow-hidden rounded-xl bg-[#fcf8f2] m-4">
        
        {/* ========================================= */}
        {/* SVG BACKGROUND ENVIRONMENT                  */}
        {/* ========================================= */}
        <svg viewBox="0 0 1600 900" className="absolute inset-0 w-full h-full pointer-events-none">
          <rect width="1600" height="900" fill="#fcf8f2" />

          {/* Distant Bushes (Soft Grey/Green) */}
          <path d="M -50 700 Q 150 600 350 720 Q 550 620 750 720 Q 950 620 1150 720 Q 1350 600 1650 700 L 1650 900 L -50 900 Z" fill="#b0bcb0" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 50 750 Q 250 650 450 750 Q 650 650 850 750 Q 1050 650 1250 750 Q 1450 650 1650 750 L 1650 900 L 50 900 Z" fill="#91a293" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />

          {/* Floor Pavement */}
          <rect x="0" y="820" width="1600" height="80" fill="#e8ddd4" stroke="#4a3a31" strokeWidth="5" />
          {/* Horizontal lines */}
          <line x1="0" y1="850" x2="1600" y2="850" stroke="#4a3a31" strokeWidth="3" />
          <line x1="0" y1="880" x2="1600" y2="880" stroke="#4a3a31" strokeWidth="3" />
          {/* Vertical grid lines */}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`grid-${i}`} x1={i * 100 + 50} y1="820" x2={i * 100} y2="900" stroke="#4a3a31" strokeWidth="3" />
          ))}

          {/* Golden Sparkles in Sky */}
          <g stroke="#dcb782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 200 230 L 210 240 M 210 230 L 200 240" />
            <path d="M 1400 160 L 1415 175 M 1415 160 L 1400 175" />
            <path d="M 80 400 L 90 410 M 90 400 L 80 410" />
            <path d="M 1120 460 L 1130 470 M 1130 460 L 1120 470" />
          </g>

          {/* Large Left Tree */}
          <g transform="translate(180, 520)">
            {/* Trunk */}
            <path d="M 0 300 L 15 150 L 35 150 L 50 300 Z" fill="#755e4b" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
            {/* Branches */}
            <path d="M 25 220 L -20 180" stroke="#755e4b" strokeWidth="10" strokeLinecap="round" />
            <path d="M 25 200 L 70 150" stroke="#755e4b" strokeWidth="10" strokeLinecap="round" />
            {/* Leaves */}
            <circle cx="-60" cy="80" r="80" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="110" cy="80" r="80" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="25" cy="-20" r="100" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="25" cy="120" r="90" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            {/* Flowers */}
            {[ {x: -60, y: 30}, {x: 40, y: 140}, {x: 30, y: -40}, {x: 100, y: 50} ].map((p, i) => (
              <g key={`tfL-${i}`} transform={`translate(${p.x}, ${p.y}) scale(0.9)`} fill="#fff" stroke="#4a3a31" strokeWidth="3">
                <circle cx="0" cy="-8" r="6" />
                <circle cx="8" cy="-2" r="6" />
                <circle cx="5" cy="8" r="6" />
                <circle cx="-5" cy="8" r="6" />
                <circle cx="-8" cy="-2" r="6" />
                <circle cx="0" cy="0" r="4" fill="#fbd148" />
              </g>
            ))}
          </g>

          {/* Large Right Tree */}
          <g transform="translate(1380, 520)">
            {/* Trunk */}
            <path d="M 0 300 L 15 150 L 35 150 L 50 300 Z" fill="#755e4b" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
            {/* Branches */}
            <path d="M 25 220 L -20 180" stroke="#755e4b" strokeWidth="10" strokeLinecap="round" />
            <path d="M 25 200 L 70 150" stroke="#755e4b" strokeWidth="10" strokeLinecap="round" />
            {/* Leaves */}
            <circle cx="-50" cy="100" r="80" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="100" cy="100" r="80" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="25" cy="-10" r="100" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="25" cy="130" r="90" fill="#7e9264" stroke="#4a3a31" strokeWidth="5" />
            {/* Flowers */}
            {[ {x: -50, y: 50}, {x: 40, y: 150}, {x: 30, y: -30}, {x: 110, y: 80} ].map((p, i) => (
              <g key={`tfR-${i}`} transform={`translate(${p.x}, ${p.y}) scale(0.9)`} fill="#fff" stroke="#4a3a31" strokeWidth="3">
                <circle cx="0" cy="-8" r="6" />
                <circle cx="8" cy="-2" r="6" />
                <circle cx="5" cy="8" r="6" />
                <circle cx="-5" cy="8" r="6" />
                <circle cx="-8" cy="-2" r="6" />
                <circle cx="0" cy="0" r="4" fill="#fbd148" />
              </g>
            ))}
          </g>

          {/* Ground Bushes Base */}
          <path d="M -50 820 C -50 720, 150 720, 200 820 Z" fill="#6a7d52" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 100 820 C 100 680, 350 680, 400 820 Z" fill="#5e7049" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 1200 820 C 1200 680, 1450 680, 1500 820 Z" fill="#5e7049" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
          <path d="M 1400 820 C 1400 720, 1650 720, 1650 820 Z" fill="#6a7d52" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />

          {/* Left Potted Plant */}
          <g transform="translate(250, 780)">
            {/* Plant Bush */}
            <circle cx="0" cy="-40" r="50" fill="#6a7d52" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="-30" cy="0" r="40" fill="#6a7d52" stroke="#4a3a31" strokeWidth="5" />
            <circle cx="30" cy="0" r="40" fill="#6a7d52" stroke="#4a3a31" strokeWidth="5" />
            {/* Flowers */}
            {[ {x: -20, y: -20}, {x: 20, y: 0}, {x: 5, y: -60} ].map((p, i) => (
              <g key={`pf-${i}`} transform={`translate(${p.x}, ${p.y}) scale(0.6)`} fill="#fff" stroke="#4a3a31" strokeWidth="3">
                <circle cx="0" cy="-8" r="6" />
                <circle cx="8" cy="-2" r="6" />
                <circle cx="5" cy="8" r="6" />
                <circle cx="-5" cy="8" r="6" />
                <circle cx="-8" cy="-2" r="6" />
                <circle cx="0" cy="0" r="4" fill="#fbd148" />
              </g>
            ))}
            {/* Pot */}
            <path d="M -45 10 L -35 70 Q 0 80 35 70 L 45 10 Z" fill="#f9f1e6" stroke="#4a3a31" strokeWidth="5" strokeLinejoin="round" />
            <rect x="-50" y="0" width="100" height="15" fill="#f4b9c7" stroke="#4a3a31" strokeWidth="5" rx="5" />
            {/* Small heart on pot */}
            <Heart className="w-4 h-4 text-[#f4b9c7] absolute" />
            <g transform="translate(0, 45) scale(0.5)">
               <path d="M 0 10 C 0 10, -15 -10, -15 -25 C -15 -40, 0 -40, 0 -25 C 0 -40, 15 -40, 15 -25 C 15 -10, 0 10, 0 10 Z" fill="#f4b9c7" stroke="none" />
            </g>
          </g>

          {/* Right A-Frame Sign */}
          <g transform="translate(1250, 680)">
             {/* Back leg */}
             <line x1="75" y1="180" x2="110" y2="30" stroke="#755e4b" strokeWidth="12" strokeLinecap="round" />
             {/* Main Frame */}
             <path d="M 20 180 L 50 15 L 140 15 L 110 180 Z" fill="#755e4b" stroke="#4a3a31" strokeWidth="6" strokeLinejoin="round" />
             {/* Canvas */}
             <path d="M 32 155 L 56 30 Q 80 25 125 30 L 100 155 Z" fill="#fdfbf5" stroke="#4a3a31" strokeWidth="4" strokeLinejoin="round" />
             {/* Text & Heart */}
             <text x="80" y="70" fill="#4a3a31" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="'Quicksand', sans-serif">SMILE</text>
             <text x="76" y="95" fill="#4a3a31" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="'Quicksand', sans-serif">CAPTURE</text>
             <text x="72" y="120" fill="#4a3a31" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="'Quicksand', sans-serif">CHERISH</text>
             <g transform="translate(70, 140) scale(0.6)">
                <path d="M 0 10 C 0 10, -15 -10, -15 -25 C -15 -40, 0 -40, 0 -25 C 0 -40, 15 -40, 15 -25 C 15 -10, 0 10, 0 10 Z" fill="#f4b9c7" stroke="#4a3a31" strokeWidth="4" />
             </g>
          </g>
        </svg>

        {/* ========================================= */}
        {/* HTML MACHINE OVERLAY                      */}
        {/* ========================================= */}
        <div className="absolute left-[50%] bottom-[80px] -translate-x-1/2 w-[65%] max-w-[1000px] aspect-[1.45] flex flex-col font-['Quicksand'] z-10 pointer-events-auto">
          
          {/* Top Roof & Signage Layer */}
          <div className="relative w-full h-[22%] z-20">
             
             {/* 3 Lamps */}
             <div className="absolute -top-[15%] left-0 w-full flex justify-evenly px-[20%] z-0">
                {[1,2,3].map(i => (
                   <div key={i} className="flex flex-col items-center">
                      <div className="w-6 h-3 border-[4px] border-b-0 border-[#4a3a31] bg-[#4a3a31] rounded-t-full" />
                      <div className="w-10 h-5 border-[4px] border-[#4a3a31] bg-[#3a2d26] rounded-t-lg rounded-b-sm relative z-10" />
                      <div className="w-8 h-8 -mt-4 bg-[#ffe6a0] rounded-full blur-[8px] mix-blend-screen opacity-90 z-20" />
                   </div>
                ))}
             </div>

             {/* Pink Roof Block */}
             <div className="absolute bottom-[20%] w-full h-[55%] bg-[#f4b9c7] border-[5px] border-[#4a3a31] rounded-t-2xl z-10" />
             <div className="absolute bottom-0 w-full h-[25%] bg-[#f4b9c7] border-x-[5px] border-b-[5px] border-t-[3px] border-[#4a3a31] z-10" />

             {/* Main "PHOTOBOOTH" Sign */}
             <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-[85%] h-[65%] bg-[#f9f1e6] border-[5px] border-[#4a3a31] rounded-3xl flex items-center justify-center gap-4 sm:gap-8 shadow-[0_6px_0_rgba(74,58,49,0.1)] z-20">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-transparent stroke-[#4a3a31] stroke-[2]" />
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#4a3a31] tracking-widest mt-1">
                  PHOTOBOOTH
                </h1>
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-transparent stroke-[#4a3a31] stroke-[2]" />
             </div>
          </div>

          {/* Machine Body container */}
          <div className="flex-1 w-full bg-[#f9f1e6] border-[5px] border-[#4a3a31] rounded-b-xl flex relative shadow-2xl overflow-hidden z-10">
             
             {/* Left Column (Screen & Controls) */}
             <div className="w-[42%] h-full border-r-[5px] border-[#4a3a31] flex flex-col items-center pt-[8%] relative">
                {/* Decorative sparks/hearts */}
                <svg className="absolute top-[10%] left-[8%] w-5 h-5 text-[#f4b9c7] fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                <div className="absolute bottom-[20%] left-[10%] w-4 h-4 bg-[#ffe6a0] rotate-45" />

                {/* Main Screen Panel */}
                <div className="w-[82%] bg-[#f4b9c7] border-[5px] border-[#4a3a31] rounded-3xl p-[4%] mb-[12%] relative shadow-inner">
                   <div className="w-full bg-[#f9f1e6] border-[4px] border-[#4a3a31] rounded-2xl aspect-[1.3] flex justify-evenly items-center p-[2%] relative shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]">
                      {/* Screen top lights */}
                      <div className="absolute top-[4%] left-0 w-full flex justify-around px-[10%]">
                         {[1,2,3,4].map(i => <div key={i} className="w-[4%] aspect-square rounded-full bg-[#ffe6a0] border-[2px] border-[#4a3a31]" />)}
                      </div>
                      
                      {/* 4 Photo Strips Display */}
                      {[1,2,3,4].map(i => (
                         <div key={i} className="w-[18%] h-[82%] mt-[8%] bg-white border-[3px] border-[#4a3a31] rounded flex flex-col justify-between p-[1.5%]">
                            {[1,2,3,4,5].map(j => (
                               <div key={j} className="w-full aspect-[4/3] bg-[#f4b9c7] border-[2px] border-[#4a3a31] rounded-[2px] relative overflow-hidden mb-[2%] flex-shrink-0">
                                  {/* Little person silhouette */}
                                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-[#4a3a31] rounded-t-full" />
                                  <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[35%] aspect-square bg-[#4a3a31] rounded-full" />
                               </div>
                            ))}
                         </div>
                      ))}
                   </div>
                   
                   {/* Heart Emblem Below Screen */}
                   <div className="absolute -bottom-[15%] left-1/2 -translate-x-1/2 w-[16%] aspect-square bg-[#f9f1e6] border-[4px] border-[#4a3a31] rounded-full flex items-center justify-center">
                      <Heart className="w-1/2 h-1/2 text-[#f4b9c7] fill-current" />
                   </div>
                </div>

                {/* Heart Square Button */}
                <div className="w-[15%] aspect-square bg-[#f9f1e6] border-[4px] border-[#4a3a31] rounded-xl flex items-center justify-center relative mb-[6%] hover:scale-105 transition-transform cursor-pointer shadow-[0_2px_0_#4a3a31]">
                   <Heart className="w-[50%] h-[50%] text-[#f4b9c7] fill-current" />
                   {/* Screws */}
                   <div className="absolute top-[10%] left-[10%] w-[15%] h-[15%] border-[2px] border-[#4a3a31] rounded-full" />
                   <div className="absolute top-[10%] right-[10%] w-[15%] h-[15%] border-[2px] border-[#4a3a31] rounded-full" />
                   <div className="absolute bottom-[10%] left-[10%] w-[15%] h-[15%] border-[2px] border-[#4a3a31] rounded-full" />
                   <div className="absolute bottom-[10%] right-[10%] w-[15%] h-[15%] border-[2px] border-[#4a3a31] rounded-full" />
                </div>

                {/* Coin Slot */}
                <div className="w-[12%] h-[18%] bg-[#f4b9c7] border-[4px] border-[#4a3a31] rounded-xl flex justify-center py-[6%] relative shadow-inner">
                   <div className="w-[25%] h-[90%] bg-[#4a3a31] rounded-full" />
                   <div className="w-[60%] h-[15%] bg-[#4a3a31] rounded-sm absolute top-[15%]" />
                </div>
             </div>

             {/* Center Column (Curtain & Entrance) */}
             <div className="w-[36%] h-full relative overflow-hidden bg-[#3a2d26] border-r-[5px] border-[#4a3a31]">
                
                {/* Glowing floor effect */}
                <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-[#ffe6a0] to-transparent opacity-90 z-0" />
                
                {/* Character Behind Curtain (Reveals when opening) */}
                <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-0">
                  <svg width="120" height="150" viewBox="0 0 100 120" className="drop-shadow-lg">
                    {/* Shadow */}
                    <ellipse cx="50" cy="115" rx="40" ry="5" fill="#251a14" opacity="0.6" />
                    {/* Ears */}
                    <path d="M 30 50 C 10 -10, 40 10, 45 40 Z" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M 70 50 C 90 -10, 60 10, 55 40 Z" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="4" strokeLinejoin="round" />
                    {/* Inner Ears */}
                    <path d="M 30 45 C 18 10, 35 20, 40 40 Z" fill="#f4b9c7" />
                    <path d="M 70 45 C 82 10, 65 20, 60 40 Z" fill="#f4b9c7" />
                    {/* Body */}
                    <path d="M 25 110 C 10 110, 15 65, 50 65 C 85 65, 90 110, 75 110 Z" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="4" strokeLinejoin="round" />
                    {/* Head */}
                    <ellipse cx="50" cy="55" rx="35" ry="25" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="4" />
                    {/* Face */}
                    <circle cx="38" cy="52" r="3" fill="#4a3a31" />
                    <circle cx="62" cy="52" r="3" fill="#4a3a31" />
                    <ellipse cx="28" cy="56" rx="4" ry="2.5" fill="#f4b9c7" opacity="0.8" />
                    <ellipse cx="72" cy="56" rx="4" ry="2.5" fill="#f4b9c7" opacity="0.8" />
                    <path d="M 46 58 Q 50 62 54 58" fill="none" stroke="#4a3a31" strokeWidth="3" strokeLinecap="round" />
                    <path d="M 50 55 L 50 58" stroke="#4a3a31" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="55" r="1.5" fill="#f4b9c7" />
                    
                    {/* Camera */}
                    <rect x="35" y="75" width="30" height="20" rx="4" fill="#d5e2e8" stroke="#4a3a31" strokeWidth="3" />
                    <circle cx="50" cy="85" r="7" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="3" />
                    <circle cx="50" cy="85" r="2.5" fill="#4a3a31" />
                    <circle cx="59" cy="80" r="2" fill="#4a3a31" />
                    <rect x="42" y="71" width="10" height="4" fill="#4a3a31" rx="1" />
                    
                    {/* Paws holding camera */}
                    <ellipse cx="35" cy="85" rx="5" ry="4" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="3" />
                    <ellipse cx="65" cy="85" rx="5" ry="4" fill="#fcf8f2" stroke="#4a3a31" strokeWidth="3" />
                  </svg>
                </div>

                {/* The Pink Curtain overlay */}
                <div className={`absolute top-0 left-0 w-full h-[105%] bg-[#f6aebc] flex flex-col z-10 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${opening ? '-translate-y-[100%]' : 'translate-y-0'}`}>
                   {/* Vertical curtain folds */}
                   <div className="flex-1 flex justify-evenly px-2 border-b-[4px] border-[#4a3a31]">
                      <div className="w-[2px] h-full bg-[#d98596] opacity-60" />
                      <div className="w-[3px] h-full bg-[#d98596] opacity-40" />
                      <div className="w-[2px] h-full bg-[#d98596] opacity-60" />
                      <div className="w-[3px] h-full bg-[#d98596] opacity-40" />
                      <div className="w-[2px] h-full bg-[#d98596] opacity-60" />
                   </div>
                   {/* Bottom Scallops */}
                   <svg className="w-full text-[#f6aebc] -mt-[4px] h-[5%]" viewBox="0 0 100 15" preserveAspectRatio="none">
                      <path d="M-2,0 C 5,15 15,15 20,0 C 25,15 35,15 40,0 C 45,15 55,15 60,0 C 65,15 75,15 80,0 C 85,15 95,15 102,0 L 102,-5 L -2,-5 Z" fill="currentColor" stroke="#4a3a31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                </div>

                {/* Enter Sign (Hanging) */}
                <button 
                  onClick={handleEnter} 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[80%] hover:scale-105 active:scale-95 transition-all duration-300 ${opening ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
                >
                   {/* Hanging strings */}
                   <div className="absolute -top-[20%] left-[10%] w-[3px] h-[25%] bg-[#4a3a31]" />
                   <div className="absolute -top-[20%] right-[10%] w-[3px] h-[25%] bg-[#4a3a31]" />
                   <div className="absolute -top-[25%] left-[10%] w-[12px] h-[12px] -translate-x-1 bg-[#4a3a31] rounded-full" />
                   <div className="absolute -top-[25%] right-[10%] w-[12px] h-[12px] translate-x-1 bg-[#4a3a31] rounded-full" />
                   
                   {/* Plaque */}
                   <div className="w-full bg-[#f9f1e6] border-[4px] border-[#4a3a31] rounded-2xl py-[8%] flex items-center justify-center font-bold text-[1.8rem] md:text-[2.2rem] text-[#4a3a31] shadow-[0_4px_0_rgba(74,58,49,0.15)]">
                      enter <span className="ml-2 leading-none mt-1">➔</span>
                   </div>
                </button>
             </div>

             {/* Right Column (Mirror) */}
             <div className="w-[22%] h-full flex flex-col items-center pt-[15%] relative">
                {/* Decorative spark */}
                <div className="absolute top-[25%] right-[15%] w-4 h-4 bg-[#ffe6a0] rotate-45" />

                {/* Mirror Frame */}
                <div className="w-[45%] h-[65%] bg-[#f4b9c7] border-[5px] border-[#4a3a31] rounded-full p-[5%] relative shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)]">
                   {/* Mirror Glass */}
                   <div className="w-full h-full bg-[#d5e2e8] border-[4px] border-[#4a3a31] rounded-full overflow-hidden relative">
                      {/* Reflection diagonal lines */}
                      <div className="absolute -top-[10%] right-[20%] w-[15%] h-[120%] bg-white opacity-60 rotate-12" />
                      <div className="absolute -top-[10%] right-[45%] w-[8%] h-[120%] bg-white opacity-40 rotate-12" />
                      
                      {/* Vanity string lights inside mirror frame */}
                      <div className="absolute top-[10%] left-[10%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      <div className="absolute top-[30%] left-[5%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      <div className="absolute top-[50%] left-[5%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      <div className="absolute top-[70%] left-[10%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      
                      <div className="absolute top-[10%] right-[10%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      <div className="absolute top-[30%] right-[5%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      <div className="absolute top-[50%] right-[5%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                      <div className="absolute top-[70%] right-[10%] w-[10%] aspect-square bg-[#ffe6a0] rounded-full" />
                   </div>
                   
                   {/* Small heart below mirror */}
                   <Heart className="w-[30%] h-[30%] text-[#f4b9c7] fill-current absolute -bottom-[12%] left-1/2 -translate-x-1/2" />
                </div>
             </div>

             {/* Pink Base Trim wrapping the bottom */}
             <div className="absolute bottom-0 w-full h-[4%] bg-[#f4b9c7] border-t-[5px] border-[#4a3a31] z-20 pointer-events-none" />
          </div>
        </div>

      </div>
    </div>
  );
}
