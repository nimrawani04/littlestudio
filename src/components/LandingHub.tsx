import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function LandingHub() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const Card = ({ title, to, icon, left, top }: { title: string, to: string, icon: React.ReactNode, left: number, top: number }) => (
    <div 
      className="absolute flex flex-col items-center pointer-events-auto" 
      style={{ left: `${left}%`, top: `${top}%`, width: '7.5%', height: '20%', transform: 'translate(-50%, -50%)' }}
    >
      {/* Wood Pin */}
      <div className="absolute -top-[5%] w-[22%] aspect-square bg-[#d4ab71] border-2 border-[#1c3b5e] rounded-full flex items-center justify-center z-10 shadow-[0_2px_0_#1c3b5e]">
        <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] text-white" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      
      {/* Card Body */}
      <Link 
        to={to} 
        className="w-full h-full bg-[#ffffff] border-[3px] md:border-[4px] border-[#1c3b5e] rounded-xl flex flex-col items-center justify-center p-1 sm:p-2 lg:p-4 hover:-translate-y-2 transition-transform shadow-[0_4px_0_#1c3b5e] md:shadow-[0_6px_0_#1c3b5e] no-underline group"
      >
        <div className="w-[65%] aspect-square mb-2 group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        <span 
          className="font-extrabold text-[#1c3b5e] text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] text-center leading-[1.1] tracking-wide" 
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          {title.split('\\n').map((l, i) => <div key={i}>{l}</div>)}
        </span>
      </Link>
    </div>
  );

  return (
    <div className="w-full h-screen bg-[#9fbce1] flex items-center justify-center overflow-hidden font-sans select-none">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@600;700&display=swap');
        
        @keyframes float-cloud {
          0% { transform: translateX(-20px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(-20px); }
        }
        
        @keyframes sway-tree-left {
          0% { transform: rotate(0deg); transform-origin: 250px 700px; }
          50% { transform: rotate(-1.5deg); transform-origin: 250px 700px; }
          100% { transform: rotate(0deg); transform-origin: 250px 700px; }
        }

        @keyframes sway-tree-right {
          0% { transform: rotate(0deg); transform-origin: 1370px 700px; }
          50% { transform: rotate(1.5deg); transform-origin: 1370px 700px; }
          100% { transform: rotate(0deg); transform-origin: 1370px 700px; }
        }

        @keyframes sway-bunting {
          0% { transform: translateY(0px); }
          50% { transform: translateY(3px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <div 
        className={`relative min-w-full min-h-full shrink-0 aspect-[16/9] transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        {/* ========================================= */}
        {/* SVG BACKGROUND ENVIRONMENT                  */}
        {/* ========================================= */}
        <svg viewBox="0 0 1600 900" className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="doorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#587a98" />
              <stop offset="100%" stopColor="#466782" />
            </linearGradient>
            <linearGradient id="tentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdfbf5" />
              <stop offset="100%" stopColor="#f2ede1" />
            </linearGradient>
          </defs>

          {/* Sky Gradient (Optional, currently solid CSS background) */}
          <rect width="1600" height="900" fill="#9fbce1" />

          {/* Stars */}
          <g fill="#ffffff">
            <path d="M 300 150 Q 305 160 315 160 Q 305 160 300 170 Q 295 160 285 160 Q 295 160 300 150 Z" />
            <path d="M 680 100 Q 685 110 695 110 Q 685 110 680 120 Q 675 110 665 110 Q 675 110 680 100 Z" opacity="0.8" />
            <path d="M 1080 160 Q 1085 170 1095 170 Q 1085 170 1080 180 Q 1075 170 1065 170 Q 1075 170 1080 160 Z" opacity="0.9" />
            <path d="M 1300 250 Q 1305 260 1315 260 Q 1305 260 1300 270 Q 1295 260 1285 260 Q 1295 260 1300 250 Z" opacity="0.7" />
          </g>

          {/* Clouds */}
          <g fill="#ffffff" stroke="#1c3b5e" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
            <path d="M 350 180 C 350 150 400 140 420 160 C 440 130 500 140 510 170 C 530 170 540 200 520 210 C 530 230 490 240 470 230 C 450 250 380 250 370 230 C 340 230 330 190 350 180 Z" style={{ animation: 'float-cloud 15s ease-in-out infinite' }} />
            <path d="M 1250 200 C 1250 170 1300 160 1320 180 C 1340 150 1400 160 1410 190 C 1430 190 1440 220 1420 230 C 1430 250 1390 260 1370 250 C 1350 270 1280 270 1270 250 C 1240 250 1230 210 1250 200 Z" style={{ animation: 'float-cloud 20s ease-in-out infinite reverse' }} />
          </g>

          {/* Distant Trees/Bushes */}
          <path d="M -50 650 Q 100 550 250 630 Q 400 550 600 620 Q 800 550 1000 620 Q 1200 550 1400 630 Q 1550 550 1700 650 L 1700 900 L -50 900 Z" fill="#7ba395" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />

          {/* Picket Fence */}
          <g fill="#ffffff" stroke="#1c3b5e" strokeWidth="4" strokeLinejoin="round">
            {/* Horizontal Rails */}
            <rect x="-10" y="660" width="1620" height="15" />
            <rect x="-10" y="710" width="1620" height="15" />
            {/* Vertical Pickets */}
            {Array.from({ length: 24 }).map((_, i) => {
              const x = i * 70 - 20;
              return (
                <path key={`picket-${i}`} d={`M ${x} 640 L ${x+12} 620 L ${x+24} 640 L ${x+24} 750 L ${x} 750 Z`} />
              );
            })}
          </g>

          {/* Main Large Trees */}
          <g stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round">
            {/* Left Tree */}
            <g style={{ animation: 'sway-tree-left 8s ease-in-out infinite' }}>
              <path d="M 220 700 L 230 450 L 270 450 L 280 700 Z" fill="#6d5242" />
              <circle cx="250" cy="450" r="130" fill="#a4c293" />
              <circle cx="170" cy="360" r="100" fill="#a4c293" />
              <circle cx="330" cy="360" r="100" fill="#a4c293" />
              <circle cx="250" cy="270" r="110" fill="#a4c293" />
            </g>

            {/* Right Tree */}
            <g style={{ animation: 'sway-tree-right 9s ease-in-out infinite 1s' }}>
              <path d="M 1340 700 L 1350 450 L 1390 450 L 1400 700 Z" fill="#6d5242" />
              <circle cx="1370" cy="450" r="130" fill="#a4c293" />
              <circle cx="1290" cy="360" r="100" fill="#a4c293" />
              <circle cx="1450" cy="360" r="100" fill="#a4c293" />
              <circle cx="1370" cy="270" r="110" fill="#a4c293" />
            </g>
          </g>

          {/* Grass Base */}
          <path d="M -50 720 Q 800 690 1650 720 L 1650 950 L -50 950 Z" fill="#b9d6a3" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />

          {/* Front Path */}
          <path d="M 690 900 L 730 750 L 870 750 L 910 900 Z" fill="#e8dcca" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />
          {/* Path slabs/lines */}
          <line x1="680" y1="860" x2="920" y2="860" stroke="#1c3b5e" strokeWidth="4" />
          <line x1="710" y1="810" x2="890" y2="810" stroke="#1c3b5e" strokeWidth="4" />
          <line x1="725" y1="775" x2="875" y2="775" stroke="#1c3b5e" strokeWidth="4" />
          <line x1="800" y1="750" x2="800" y2="900" stroke="#1c3b5e" strokeWidth="4" />

          {/* String Lights */}
          <g fill="none" stroke="#1c3b5e" strokeWidth="4">
            <path d="M 250 510 Q 295 530 340 450" />
            <path d="M 1370 510 Q 1315 530 1260 450" />
          </g>
          <g fill="#fce47c" stroke="#1c3b5e" strokeWidth="4">
            {/* Left lights */}
            <circle cx="280" cy="520" r="8" />
            <circle cx="310" cy="505" r="8" />
            <circle cx="330" cy="480" r="8" />
            {/* Right lights */}
            <circle cx="1330" cy="520" r="8" />
            <circle cx="1300" cy="505" r="8" />
            <circle cx="1280" cy="480" r="8" />
          </g>

          {/* ========================================= */}
          {/* TENT STRUCTURE                            */}
          {/* ========================================= */}
          {/* Wood Steps */}
          <rect x="710" y="750" width="180" height="15" fill="#c49a6c" stroke="#1c3b5e" strokeWidth="5" rx="4" />
          <rect x="690" y="765" width="220" height="15" fill="#a47a4c" stroke="#1c3b5e" strokeWidth="5" rx="4" />

          {/* Tent Main Walls */}
          <path d="M 340 450 L 1260 450 L 1280 760 L 320 760 Z" fill="url(#tentGradient)" stroke="#1c3b5e" strokeWidth="6" strokeLinejoin="round" />
          {/* Wall shadow lines */}
          <line x1="560" y1="450" x2="550" y2="760" stroke="#e0dbd3" strokeWidth="4" />
          <line x1="1040" y1="450" x2="1050" y2="760" stroke="#e0dbd3" strokeWidth="4" />

          {/* Tent Roof */}
          <path d="M 800 180 L 1290 450 L 310 450 Z" fill="#fdfbf5" stroke="#1c3b5e" strokeWidth="6" strokeLinejoin="round" />
          {/* Roof Creases */}
          <line x1="800" y1="180" x2="560" y2="450" stroke="#1c3b5e" strokeWidth="5" />
          <line x1="800" y1="180" x2="1040" y2="450" stroke="#1c3b5e" strokeWidth="5" />
          <line x1="800" y1="180" x2="680" y2="450" stroke="#e0dbd3" strokeWidth="3" />
          <line x1="800" y1="180" x2="920" y2="450" stroke="#e0dbd3" strokeWidth="3" />

          {/* Flag on top */}
          <line x1="920" y1="100" x2="920" y2="250" stroke="#1c3b5e" strokeWidth="6" strokeLinecap="round" />
          <path d="M 920 100 L 1000 115 L 980 135 L 1000 155 L 920 160 Z" fill="#2d3d4b" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />

          {/* Top Heart Finial */}
          <path d="M 800 180 C 800 180, 770 140, 800 130 C 830 140, 800 180, 800 180 Z" fill="#1c3b5e" stroke="#1c3b5e" strokeWidth="3" />

          {/* Scalloped Awning */}
          <g fill="#fdfbf5" stroke="#1c3b5e" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
            {Array.from({ length: 14 }).map((_, i) => {
              const startX = 310 + i * 70;
              return <path key={`scallop-${i}`} d={`M ${startX} 450 Q ${startX + 35} 500 ${startX + 70} 450 Z`} />;
            })}
          </g>

          {/* Bunting Strings */}
          <path d="M 560 450 Q 680 520 800 450" fill="none" stroke="#1c3b5e" strokeWidth="4" />
          <path d="M 800 450 Q 920 520 1040 450" fill="none" stroke="#1c3b5e" strokeWidth="4" />
          
          {/* Bunting Flags */}
          <g stroke="#1c3b5e" strokeWidth="4" strokeLinejoin="round" style={{ animation: 'sway-bunting 4s ease-in-out infinite' }}>
            {/* Left string flags */}
            <path d="M 570 460 L 595 520 L 620 475" fill="#587a98" />
            <path d="M 630 480 L 655 535 L 680 487" fill="#e3d6c5" />
            <path d="M 690 488 L 715 540 L 740 487" fill="#587a98" />
            <path d="M 750 480 L 775 525 L 795 460" fill="#e3d6c5" />
            
            {/* Right string flags */}
            <path d="M 805 460 L 825 525 L 850 480" fill="#587a98" />
            <path d="M 860 487 L 885 540 L 910 488" fill="#e3d6c5" />
            <path d="M 920 487 L 945 535 L 970 480" fill="#587a98" />
            <path d="M 980 475 L 1005 520 L 1030 460" fill="#e3d6c5" />
          </g>

          {/* ========================================= */}
          {/* DOOR                                      */}
          {/* ========================================= */}
          <rect x="730" y="530" width="140" height="220" fill="url(#doorGradient)" stroke="#1c3b5e" strokeWidth="6" rx="2" />
          <rect x="740" y="545" width="120" height="195" fill="none" stroke="#1c3b5e" strokeWidth="4" />
          <rect x="740" y="660" width="120" height="80" fill="none" stroke="#1c3b5e" strokeWidth="4" />
          <circle cx="750" cy="640" r="7" fill="#fbd148" stroke="#1c3b5e" strokeWidth="3" />

          {/* Door Sign "Closed/Open/Heart" */}
          <path d="M 765 580 L 800 560 L 835 580" fill="none" stroke="#c49a6c" strokeWidth="4" strokeLinecap="round" />
          <rect x="760" y="580" width="80" height="45" fill="#f8f3eb" stroke="#c49a6c" strokeWidth="5" rx="4" />
          <path d="M 800 610 C 800 610, 785 595, 785 585 C 785 575, 800 575, 800 585 C 800 575, 815 575, 815 585 C 815 595, 800 610, 800 610 Z" fill="#1c3b5e" />

          {/* ========================================= */}
          {/* FOREGROUND ELEMENTS                       */}
          {/* ========================================= */}
          {/* A-Frame Sign */}
          <g transform="translate(180, 680)">
            <line x1="45" y1="180" x2="60" y2="40" stroke="#c49a6c" strokeWidth="12" strokeLinecap="round" />
            <path d="M 20 180 L 40 20 Q 70 10 100 20 L 120 180" fill="#c49a6c" stroke="#1c3b5e" strokeWidth="6" strokeLinejoin="round" />
            <path d="M 32 150 L 46 35 Q 70 25 94 35 L 108 150 Z" fill="#2d3d4b" stroke="#1c3b5e" strokeWidth="4" strokeLinejoin="round" />
            
            <text x="70" y="80" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Quicksand', sans-serif">CAPTURE</text>
            <text x="70" y="100" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Quicksand', sans-serif">THE MOMENTS</text>
            <text x="70" y="120" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="'Quicksand', sans-serif">THAT MATTER</text>
            
            <path d="M 70 60 C 70 60, 62 52, 62 47 C 62 42, 70 42, 70 47 C 70 42, 78 42, 78 47 C 78 52, 70 60, 70 60 Z" fill="#ffffff" />
            
            {/* Little leaf decorations on the sign */}
            <path d="M 50 140 Q 60 130 70 140 Q 80 130 90 140" fill="none" stroke="#ffffff" strokeWidth="2" />
          </g>

          {/* Potted Plants near door */}
          {/* Left Pot */}
          <path d="M 370 790 L 375 830 L 415 830 L 420 790 Z" fill="#f8f3eb" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />
          <rect x="365" y="780" width="60" height="15" fill="#e2d1bb" stroke="#1c3b5e" strokeWidth="5" rx="3" />
          <circle cx="395" cy="760" r="25" fill="#588c42" stroke="#1c3b5e" strokeWidth="5" />
          {/* Right Pot */}
          <path d="M 1220 780 L 1225 840 L 1265 840 L 1270 780 Z" fill="#2d3d4b" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />
          <rect x="1215" y="765" width="60" height="15" fill="#2d3d4b" stroke="#1c3b5e" strokeWidth="5" rx="3" />
          <path d="M 1245 770 L 1225 670 L 1245 620 L 1265 670 Z" fill="#75b35a" stroke="#1c3b5e" strokeWidth="5" strokeLinejoin="round" />

          {/* Small foreground bushes/flowers */}
          <path d="M 430 810 C 430 790 470 780 480 810 Z" fill="#819b70" stroke="#1c3b5e" strokeWidth="4" />
          <path d="M 1150 820 C 1150 790 1190 780 1200 820 Z" fill="#588c42" stroke="#1c3b5e" strokeWidth="4" />
          
          {/* Daisies in grass */}
          <g fill="#ffffff" stroke="#1c3b5e" strokeWidth="2">
            {[ 
              {x: 200, y: 850}, {x: 350, y: 880}, {x: 500, y: 830},
              {x: 1050, y: 860}, {x: 1400, y: 840}, {x: 1550, y: 880}
            ].map((p, i) => (
              <g key={`flower-${i}`} transform={`translate(${p.x}, ${p.y}) scale(0.8)`}>
                <circle cx="0" cy="-6" r="4" />
                <circle cx="6" cy="-2" r="4" />
                <circle cx="4" cy="5" r="4" />
                <circle cx="-4" cy="5" r="4" />
                <circle cx="-6" cy="-2" r="4" />
                <circle cx="0" cy="0" r="3" fill="#fbd148" />
              </g>
            ))}
          </g>

        </svg>

        {/* ========================================= */}
        {/* HTML INTERACTIVE CARDS                    */}
        {/* ========================================= */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Card 1: Calendar */}
          <Card 
            title="CALENDAR" 
            to="/calendar" 
            left={29} 
            top={67} 
            icon={
              <svg viewBox="0 0 100 100" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
                <rect x="20" y="25" width="60" height="60" rx="6" fill="#fdfbf5" stroke="#1c3b5e" strokeWidth="6" />
                <path d="M 30 15 v 20 M 50 15 v 20 M 70 15 v 20" stroke="#c49a6c" strokeWidth="7" />
                <line x1="25" y1="45" x2="75" y2="45" stroke="#e0e0e0" strokeWidth="4" />
                <line x1="25" y1="65" x2="75" y2="65" stroke="#e0e0e0" strokeWidth="4" />
                <line x1="40" y1="30" x2="40" y2="80" stroke="#e0e0e0" strokeWidth="4" />
                <line x1="60" y1="30" x2="60" y2="80" stroke="#e0e0e0" strokeWidth="4" />
                <path d="M 65 75 C 65 75, 60 70, 60 65 C 60 60, 65 60, 65 65 C 65 60, 70 60, 70 65 C 70 70, 65 75, 65 75 Z" fill="#c49a6c" />
              </svg>
            } 
          />

          {/* Card 2: Polaroid */}
          <Card 
            title="POLAROID\nCAMERA" 
            to="/polaroid" 
            left={41} 
            top={67} 
            icon={
              <svg viewBox="0 0 100 100" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
                <rect x="15" y="25" width="70" height="55" rx="6" fill="#fdfbf5" stroke="#1c3b5e" strokeWidth="6" />
                <rect x="25" y="15" width="50" height="15" rx="3" fill="#e3d6c5" stroke="#1c3b5e" strokeWidth="6" />
                <circle cx="35" cy="22" r="4" fill="#1c3b5e" />
                <rect x="45" y="60" width="10" height="20" fill="#587a98" />
                <rect x="55" y="60" width="10" height="20" fill="#fbd148" />
                <rect x="65" y="60" width="10" height="20" fill="#ef8383" />
                <circle cx="50" cy="50" r="18" fill="#fff" stroke="#1c3b5e" strokeWidth="6" />
                <circle cx="50" cy="50" r="10" fill="#1c3b5e" />
                <circle cx="47" cy="47" r="3" fill="#fff" />
              </svg>
            } 
          />

          {/* Door is at center (50%) */}

          {/* Card 3: Photobooth */}
          <Card 
            title="PHOTOBOOTH" 
            to="/photobooth" 
            left={59} 
            top={67} 
            icon={
              <svg viewBox="0 0 100 100" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
                <rect x="25" y="25" width="50" height="60" rx="4" fill="#fdfbf5" stroke="#1c3b5e" strokeWidth="6" />
                <rect x="30" y="15" width="40" height="15" fill="#fff" stroke="#1c3b5e" strokeWidth="5" />
                <text x="50" y="26" fontSize="10" fontWeight="bold" fill="#1c3b5e" textAnchor="middle" fontFamily="'Nunito', sans-serif">PHOTO</text>
                <rect x="30" y="35" width="40" height="45" fill="#1c3b5e" />
                <path d="M 30 35 L 45 35 Q 45 60 30 80 Z" fill="#e3d6c5" stroke="#1c3b5e" strokeWidth="4" />
                <path d="M 70 35 L 55 35 Q 55 60 70 80 Z" fill="#e3d6c5" stroke="#1c3b5e" strokeWidth="4" />
                <path d="M 80 50 C 80 50, 77 47, 75 45 C 73 43, 77 43, 77 45 C 77 43, 81 43, 81 45 C 81 47, 80 50, 80 50 Z" fill="#ef8383" />
              </svg>
            } 
          />

          {/* Card 4: Digicam */}
          <Card 
            title="DIGICAM" 
            to="/digicam" 
            left={71} 
            top={67} 
            icon={
              <svg viewBox="0 0 100 100" className="w-full h-full" strokeLinecap="round" strokeLinejoin="round">
                <rect x="15" y="30" width="70" height="45" rx="6" fill="#2d3d4b" stroke="#1c3b5e" strokeWidth="6" />
                <rect x="25" y="25" width="15" height="5" rx="2" fill="#1c3b5e" />
                <rect x="65" y="38" width="10" height="6" rx="2" fill="#e0e0e0" stroke="#1c3b5e" strokeWidth="3" />
                <circle cx="45" cy="52" r="16" fill="#4c566a" stroke="#1c3b5e" strokeWidth="5" />
                <circle cx="45" cy="52" r="10" fill="#1c3b5e" />
                <circle cx="41" cy="48" r="3" fill="#fff" />
                <path d="M 25 45 C 25 45, 20 40, 20 35 C 20 30, 25 30, 25 35 C 25 30, 30 30, 30 35 C 30 40, 25 45, 25 45 Z" fill="#ef8383" />
              </svg>
            } 
          />
        </div>
      </div>
    </div>
  );
}
