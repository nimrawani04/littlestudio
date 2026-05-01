import { useState } from "react";

export function BoothEntry({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleEnter = () => {
    setOpening(true);
    setTimeout(onEnter, 800);
  };

  const Sparkle = ({ className }: { className?: string }) => (
    <svg className={`text-[#fbce85] stroke-[#6a4c43] stroke-[1.5] ${className}`} viewBox="0 0 24 24" fill="currentColor" strokeLinejoin="round">
      <path d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z" />
    </svg>
  );

  const Heart = ({ className }: { className?: string }) => (
    <svg className={`text-[#f8aabf] stroke-[#6a4c43] stroke-2 ${className}`} viewBox="0 0 24 24" fill="currentColor" strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#fffaf6] flex flex-col items-center justify-center font-sans text-[#6a4c43] overflow-hidden select-none p-4 py-12">
      {/* The Photobooth Machine */}
      <div className="relative w-full max-w-[850px] flex flex-col items-center">
        
        {/* Top Sign */}
        <div className="bg-[#fac9d6] border-[4px] border-[#6a4c43] rounded-2xl p-[6px] z-10 relative w-[85%] md:w-[75%] mb-[-12px]">
          <div className="bg-[#fef3e2] border-[4px] border-[#6a4c43] rounded-xl py-4 flex items-center justify-center gap-4 md:gap-8 shadow-inner">
            <Heart className="w-8 h-8" />
            <h1 className="text-4xl md:text-[3.5rem] font-black tracking-wider text-[#6a4c43]">
              PHOTOBOOTH
            </h1>
            <Heart className="w-8 h-8" />
          </div>
        </div>

        {/* Machine Body */}
        <div className="w-full bg-[#fef3e2] border-[4px] border-[#6a4c43] rounded-2xl flex flex-col relative overflow-hidden shadow-sm" style={{ height: "600px" }}>
          
          {/* Pink Trim */}
          <div className="h-10 bg-[#fac9d6] border-b-[4px] border-[#6a4c43] w-full shrink-0" />

          {/* Main Content Area */}
          <div className="flex-1 flex">
            
            {/* Left Section: Screen and Coin Slot */}
            <div className="w-[42%] h-full relative px-4 flex flex-col items-center z-10 pt-8 pb-4">
               {/* Decor */}
               <Sparkle className="absolute top-12 left-6 w-6 h-6" />
               <Heart className="absolute bottom-32 left-10 w-8 h-8" />
               <Sparkle className="absolute top-56 right-8 w-7 h-7" />
               <Sparkle className="absolute bottom-16 left-24 w-5 h-5" />
               
               {/* Screen */}
               <div className="w-full max-w-[300px] bg-[#fac9d6] border-[4px] border-[#6a4c43] rounded-2xl p-4 relative mx-auto">
                  <div className="bg-[#fef3e2] border-[4px] border-[#6a4c43] h-[190px] rounded-xl flex justify-evenly items-center p-2 relative overflow-hidden">
                     {/* 4 Photo strips */}
                     {Array.from({ length: 4 }).map((_, i) => (
                       <div key={i} className="w-10 h-[96%] bg-white border-[3px] border-[#6a4c43] rounded-sm flex flex-col justify-between p-1">
                         {Array.from({ length: 4 }).map((_, j) => (
                           <div key={j} className="w-full flex-1 mb-[3px] border-[2px] border-[#6a4c43] bg-[#fac9d6] rounded-sm flex items-center justify-center overflow-hidden relative">
                              <div className="absolute bottom-0 w-full h-[55%] bg-[#6a4c43] rounded-t-full" />
                              <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] bg-[#6a4c43] rounded-full" />
                           </div>
                         ))}
                       </div>
                     ))}
                  </div>
                  {/* Heart emblem below screen */}
                  <div className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#fac9d6] border-[4px] border-[#6a4c43] rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 !stroke-0" />
                  </div>
               </div>
               
               {/* Coin Slot Container */}
               <div className="mt-[3.5rem] flex flex-col items-center gap-2 relative">
                  {/* Top square */}
                  <div className="w-12 h-12 bg-[#fef3e2] border-[4px] border-[#6a4c43] rounded-xl flex items-center justify-center relative">
                    <Heart className="w-5 h-5 !stroke-0" />
                    {/* Screws */}
                    <div className="absolute top-[4px] left-[4px] w-1.5 h-1.5 bg-[#fac9d6] border-[1px] border-[#6a4c43] rounded-full" />
                    <div className="absolute top-[4px] right-[4px] w-1.5 h-1.5 bg-[#fac9d6] border-[1px] border-[#6a4c43] rounded-full" />
                    <div className="absolute bottom-[4px] left-[4px] w-1.5 h-1.5 bg-[#fac9d6] border-[1px] border-[#6a4c43] rounded-full" />
                    <div className="absolute bottom-[4px] right-[4px] w-1.5 h-1.5 bg-[#fac9d6] border-[1px] border-[#6a4c43] rounded-full" />
                  </div>
                  {/* Bottom coin slot */}
                  <div className="w-12 h-[80px] bg-[#fac9d6] border-[4px] border-[#6a4c43] rounded-xl flex justify-center py-2 relative">
                     <div className="w-3 h-[85%] bg-[#6a4c43] rounded-full mx-auto" />
                     <div className="w-8 h-3 bg-[#6a4c43] rounded-sm absolute top-3" />
                  </div>
               </div>
            </div>

            {/* Middle Section: Curtain and Stool */}
            <div className="w-[38%] h-full border-x-[4px] border-[#6a4c43] relative flex flex-col justify-end items-center bg-[#b1acb4] overflow-hidden">
               {/* Stool */}
               <div className="w-[100px] flex flex-col items-center mb-6 relative z-0">
                  {/* Seat top */}
                  <div className="w-full h-8 bg-[#fac9d6] border-[4px] border-[#6a4c43] rounded-full z-10" />
                  {/* Seat base */}
                  <div className="w-[90%] h-6 bg-white border-x-[4px] border-b-[4px] border-[#6a4c43] rounded-b-full -mt-4 relative z-0" />
                  {/* Pole */}
                  <div className="w-4 h-20 bg-[#e0dde2] border-x-[4px] border-[#6a4c43] -mt-1" />
                  {/* Base ring */}
                  <div className="w-20 h-5 bg-[#b1acb4] border-[4px] border-[#6a4c43] rounded-t-full" />
               </div>
               
               {/* Inner Shadow / Depth */}
               <div className="absolute inset-0 border-[16px] border-[#97939a] pointer-events-none" style={{ borderTop: "none" }} />

               {/* Curtain overlay */}
               <div className={`absolute inset-0 z-10 flex flex-col origin-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${opening ? '-translate-y-[110%]' : 'translate-y-0'}`}>
                  {/* Main curtain fabric */}
                  <div className="flex-1 bg-[#fac9d6] relative w-full border-x-[4px] border-b-0 border-[#6a4c43]">
                    {/* Folds */}
                    <div className="absolute inset-0 flex justify-evenly px-2">
                      <div className="w-0.5 h-full bg-[#eb9ab1] opacity-70" />
                      <div className="w-0.5 h-full bg-[#eb9ab1] opacity-70" />
                      <div className="w-0.5 h-full bg-[#eb9ab1] opacity-70" />
                      <div className="w-0.5 h-full bg-[#eb9ab1] opacity-70" />
                    </div>
                  </div>
                  {/* Scallops */}
                  <svg className="w-full block text-[#fac9d6]" viewBox="0 0 100 15" preserveAspectRatio="none" style={{ height: "40px", marginTop: "-1px" }}>
                    <path d="M-2,0 C 5,15 15,15 20,0 C 25,15 35,15 40,0 C 45,15 55,15 60,0 C 65,15 75,15 80,0 C 85,15 95,15 102,0 L 102,-5 L -2,-5 Z" fill="currentColor" stroke="#6a4c43" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </div>
               
               {/* Enter Button */}
               <button onClick={handleEnter} className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-[#fef3e2] border-[4px] border-[#6a4c43] rounded-2xl px-8 py-3 font-black text-2xl md:text-3xl text-[#6a4c43] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_6px_0_#fac9d6] ${opening ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
                 enter <span className="text-3xl ml-1 leading-none">➔</span>
                 {/* Inner soft highlight */}
                 <div className="absolute inset-0 border-4 border-white/50 rounded-xl pointer-events-none" />
               </button>
            </div>

            {/* Right Section: Mirror */}
            <div className="w-[20%] h-full relative px-4 py-12 flex flex-col items-center z-10">
               <Sparkle className="absolute top-[45%] left-2 w-4 h-4" />
               <Sparkle className="absolute bottom-28 right-6 w-8 h-8 text-[#fbce85]" />
               
               {/* Tall Mirror */}
               <div className="w-full max-w-[80px] h-[320px] bg-[#fac9d6] border-[4px] border-[#6a4c43] rounded-2xl p-2 relative flex flex-col shadow-sm">
                 <div className="w-full flex-1 bg-[#e8edf4] border-[4px] border-[#6a4c43] rounded-xl" />
                 <Heart className="w-4 h-4 !stroke-0 absolute bottom-[18px] left-1/2 -translate-x-1/2" />
               </div>
            </div>
          </div>

          {/* Bottom Trim */}
          <div className="h-5 bg-[#fac9d6] border-t-[4px] border-[#6a4c43] w-full shrink-0 mt-auto" />
        </div>



      </div>
    </div>
  );
}
