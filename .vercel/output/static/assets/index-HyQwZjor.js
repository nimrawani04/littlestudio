import{r as s,j as e,L as n,R as c}from"./index-CHgzxEKH.js";import{C as p,e as f}from"./export-pdf-Bo3bWNLp.js";import"./html2canvas-pro.esm-CP5GaE11.js";const u="/assets/home-bg-0FHjXfO6.png",h="/assets/tree-left-crop-xlXOudtK.png",x="/assets/tree-right-crop-J-CiUp4I.png";function m(){const[a,r]=s.useState(!1),[o,t]=s.useState(null),[l,i]=s.useState(!1);s.useEffect(()=>{r(!0)},[]);const d=()=>{i(!0),setTimeout(()=>i(!1),1200)};return e.jsxs("div",{className:"w-screen h-screen bg-[#8fb6dd] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        /* Tree Sway Keyframes */
        @keyframes sway-tree-left {
          0%, 100% {
            transform: rotate(0deg) skewX(0deg);
          }
          25% {
            transform: rotate(-1.4deg) skewX(-0.8deg);
          }
          75% {
            transform: rotate(1.1deg) skewX(0.6deg);
          }
        }

        @keyframes sway-tree-right {
          0%, 100% {
            transform: rotate(0deg) skewX(0deg);
          }
          30% {
            transform: rotate(1.3deg) skewX(0.7deg);
          }
          80% {
            transform: rotate(-1.0deg) skewX(-0.5deg);
          }
        }

        /* Lantern pulse */
        @keyframes lantern-glow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 6px rgba(255, 215, 0, 0.6));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 14px rgba(255, 215, 0, 0.9));
          }
        }

        /* Twinkle stars */
        @keyframes star-twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        /* Floating petal / sparkle */
        @keyframes drift-petal {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translate(120px, 140px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Card hover lift */
        .card-hotspot:hover {
          transform: translateY(-4px) scale(1.02);
        }

        .card-hotspot:active {
          transform: translateY(1px) scale(0.98);
        }

        /* Door knock bounce */
        @keyframes door-knock {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.04) rotate(-1deg); }
          40% { transform: scale(0.98) rotate(1deg); }
          60% { transform: scale(1.03) rotate(-0.5deg); }
          80% { transform: scale(0.99); }
        }

        .door-animated {
          animation: door-knock 0.8s ease-in-out;
        }
      `}),e.jsxs("div",{className:`relative shadow-2xl transition-opacity duration-700 ${a?"opacity-100":"opacity-0"}`,style:{width:"min(100vw, calc(100vh * (1024 / 471)))",height:"min(100vh, calc(100vw * (471 / 1024)))",aspectRatio:"1024 / 471"},children:[e.jsx("img",{src:u,alt:"Little Studio",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsx("div",{className:"absolute pointer-events-none",style:{left:"0.00%",top:"14.86%",width:"23.93%",height:"50.96%",transformOrigin:"55% 95%",animation:"sway-tree-left 4.6s ease-in-out infinite"},children:e.jsx("img",{src:h,alt:"Left Tree Canopy",className:"w-full h-full object-contain select-none",style:{imageRendering:"pixelated"}})}),e.jsx("div",{className:"absolute pointer-events-none",style:{left:"70.31%",top:"14.86%",width:"29.69%",height:"50.96%",transformOrigin:"45% 95%",animation:"sway-tree-right 5.2s ease-in-out infinite"},children:e.jsx("img",{src:x,alt:"Right Tree Canopy",className:"w-full h-full object-contain select-none",style:{imageRendering:"pixelated"}})}),e.jsx("div",{className:"absolute pointer-events-none text-white select-none",style:{left:"12.5%",top:"11%",animation:"star-twinkle 3.2s ease-in-out infinite"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-white select-none",style:{left:"22.8%",top:"16%",animation:"star-twinkle 2.8s ease-in-out infinite 0.9s"},children:"✧"}),e.jsx("div",{className:"absolute pointer-events-none text-white select-none",style:{left:"34.5%",top:"9.5%",animation:"star-twinkle 3.5s ease-in-out infinite 1.4s"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-white select-none",style:{left:"60.2%",top:"8.5%",animation:"star-twinkle 3.0s ease-in-out infinite 0.5s"},children:"✧"}),e.jsx("div",{className:"absolute pointer-events-none text-white select-none",style:{left:"68.6%",top:"14.5%",animation:"star-twinkle 3.3s ease-in-out infinite 1.8s"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-white select-none",style:{left:"87.0%",top:"10.0%",animation:"star-twinkle 2.7s ease-in-out infinite 0.3s"},children:"✧"}),e.jsx("div",{className:"absolute pointer-events-none select-none text-[8px] text-[#ffccd5]",style:{left:"8%",top:"30%",animation:"drift-petal 6s linear infinite 0.5s"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none select-none text-[8px] text-[#ffffff]",style:{left:"15%",top:"22%",animation:"drift-petal 7.5s linear infinite 2.5s"},children:"🤍"}),e.jsx("div",{className:"absolute pointer-events-none select-none text-[8px] text-[#ffccd5]",style:{left:"78%",top:"25%",animation:"drift-petal 6.8s linear infinite 1.2s"},children:"🌸"}),e.jsx("div",{className:"absolute rounded-full pointer-events-none bg-[#ffeb99]/40",style:{left:"6.8%",top:"60.0%",width:"3.6%",height:"7.8%",animation:"lantern-glow 2.5s ease-in-out infinite"}}),e.jsx("div",{className:"absolute rounded-full pointer-events-none bg-[#ffeb99]/40",style:{left:"86.8%",top:"60.0%",width:"3.6%",height:"7.8%",animation:"lantern-glow 2.5s ease-in-out infinite 1.2s"}}),e.jsxs(n,{to:"/calendar",onMouseEnter:()=>t("calendar"),onMouseLeave:()=>t(null),className:"card-hotspot absolute z-20 transition-all duration-200 cursor-pointer group no-underline rounded-lg",style:{left:"23.0%",top:"53.2%",width:"8.2%",height:"24.2%"},children:[e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#ffdb70] group-hover:bg-[#ffdb70]/15 group-hover:shadow-[0_0_12px_rgba(255,219,112,0.8)] transition-all flex flex-col items-center justify-between p-1"}),o==="calendar"&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2d1e18] text-[#ffe6a7] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#ffe6a7] whitespace-nowrap z-40 pointer-events-none tracking-wide",style:{fontFamily:"'Press Start 2P', monospace"},children:"📅 CALENDAR"})]}),e.jsxs(n,{to:"/polaroid",onMouseEnter:()=>t("polaroid"),onMouseLeave:()=>t(null),className:"card-hotspot absolute z-20 transition-all duration-200 cursor-pointer group no-underline rounded-lg",style:{left:"34.3%",top:"53.2%",width:"8.4%",height:"24.2%"},children:[e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#ff9470] group-hover:bg-[#ff9470]/15 group-hover:shadow-[0_0_12px_rgba(255,148,112,0.8)] transition-all"}),o==="polaroid"&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2d1e18] text-[#ffccd5] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#ffccd5] whitespace-nowrap z-40 pointer-events-none tracking-wide",style:{fontFamily:"'Press Start 2P', monospace"},children:"📷 POLAROID"})]}),e.jsxs("div",{onClick:d,onMouseEnter:()=>t("door"),onMouseLeave:()=>t(null),className:`absolute z-20 cursor-pointer group rounded-lg ${l?"door-animated":"card-hotspot"}`,style:{left:"44.8%",top:"52.8%",width:"10.4%",height:"33.5%"},children:[e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#70c7ff] group-hover:bg-[#70c7ff]/15 group-hover:shadow-[0_0_14px_rgba(112,199,255,0.8)] transition-all"}),l&&e.jsx("div",{className:"absolute -top-9 left-1/2 -translate-x-1/2 bg-[#1b3a57] text-[#ffffff] text-[8px] md:text-[9px] px-2.5 py-1 rounded-full shadow-xl border border-[#70c7ff] whitespace-nowrap z-40 animate-bounce pointer-events-none",style:{fontFamily:"'Quicksand', sans-serif"},children:"Knock knock! Welcome ♥"}),o==="door"&&!l&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1b3a57] text-[#cbe6ff] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#70c7ff] whitespace-nowrap z-40 pointer-events-none tracking-wide",style:{fontFamily:"'Press Start 2P', monospace"},children:"🚪 STUDIO"})]}),e.jsxs(n,{to:"/photobooth",onMouseEnter:()=>t("photobooth"),onMouseLeave:()=>t(null),className:"card-hotspot absolute z-20 transition-all duration-200 cursor-pointer group no-underline rounded-lg",style:{left:"56.9%",top:"53.2%",width:"8.0%",height:"24.2%"},children:[e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#ff94c2] group-hover:bg-[#ff94c2]/15 group-hover:shadow-[0_0_12px_rgba(255,148,194,0.8)] transition-all"}),o==="photobooth"&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2d1e18] text-[#ffccd5] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#ffccd5] whitespace-nowrap z-40 pointer-events-none tracking-wide",style:{fontFamily:"'Press Start 2P', monospace"},children:"🎞️ PHOTOBOOTH"})]}),e.jsxs(n,{to:"/digicam",onMouseEnter:()=>t("digicam"),onMouseLeave:()=>t(null),className:"card-hotspot absolute z-20 transition-all duration-200 cursor-pointer group no-underline rounded-lg",style:{left:"67.8%",top:"53.2%",width:"8.0%",height:"24.2%"},children:[e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#c494ff] group-hover:bg-[#c494ff]/15 group-hover:shadow-[0_0_12px_rgba(196,148,255,0.8)] transition-all"}),o==="digicam"&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2d1e18] text-[#e3ccff] text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#e3ccff] whitespace-nowrap z-40 pointer-events-none tracking-wide",style:{fontFamily:"'Press Start 2P', monospace"},children:"📸 DIGICAM"})]}),e.jsx("div",{onMouseEnter:()=>t("chalkboard"),onMouseLeave:()=>t(null),className:"absolute z-20 cursor-default rounded-lg",style:{left:"11.3%",top:"72.4%",width:"11.0%",height:"24.0%"},children:o==="chalkboard"&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#262423] text-[#ffffff] text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#e5dcd3] whitespace-nowrap z-40 pointer-events-none",style:{fontFamily:"'Quicksand', sans-serif"},children:"✨ Capture the moments that matter ✨"})}),e.jsxs("div",{className:"absolute top-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b3a57]/40 backdrop-blur-[2px] border border-white/20 text-white text-[9px] sm:text-[11px] font-semibold tracking-wider",children:[e.jsx("span",{children:"♥"}),e.jsx("span",{style:{fontFamily:"'Quicksand', sans-serif"},children:"LITTLE STUDIO"}),e.jsx("span",{children:"♥"})]})]})]})}function v(){const{mode:a}=c.useSearch();return a==="calendar"?e.jsx(p,{onExport:(r,o)=>f(r,o,"my-calendar.pdf")}):e.jsx(m,{})}export{v as component};
