import{j as e,r as s,L as D}from"./index-mrRbAyGG.js";const R="/assets/photobooth-output-clean-UVRslyBU.png",O="/assets/photobooth-dispenser-lip-DW45fJOK.png",T="/assets/photobooth-curtain-billow-left-eLeynrAC.png",X="/assets/photobooth-curtain-billow-right-D5DW2R0Z.png";function I({imageUrl:o,onRetake:n,isPolaroid:i}){return i?e.jsx(E,{imageUrl:o,onRetake:n}):e.jsx(W,{imageUrl:o,onRetake:n})}function W({imageUrl:o,onRetake:n}){const[i,d]=s.useState(!1),[a,u]=s.useState(!1),[m,l]=s.useState(!1),[b,p]=s.useState(!1),[g,w]=s.useState(!1),[y,v]=s.useState(!1),[j,N]=s.useState(!1),[k,S]=s.useState(!1),[C,z]=s.useState(!1),[P,x]=s.useState(!1);s.useEffect(()=>{d(!0);const t=setTimeout(()=>{u(!0),x(!0),setTimeout(()=>x(!1),2800)},2200);return()=>clearTimeout(t)},[]);const r=t=>{t(!0),setTimeout(()=>t(!1),2400)},c=()=>{const t=document.createElement("a");t.href=o,t.download=`pixel-booth-strip-${Date.now()}.png`,t.click()},h=()=>{const t=window.open("","_blank");t&&(t.document.write(`
      <html>
        <head>
          <title>Print Photo Strip</title>
          <style>
            @page {
              size: 2in 6in;
              margin: 0;
            }
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              background: white;
            }
            img { 
              max-height: 98vh; 
              max-width: 98vw; 
              object-fit: contain; 
              image-rendering: pixelated;
            }
          </style>
        </head>
        <body>
          <img src="${o}" onload="window.print();window.close()" />
        </body>
      </html>
    `),t.document.close())},_=async()=>{try{const f=await(await fetch(o)).blob();await navigator.clipboard.write([new ClipboardItem({[f.type]:f})]),p(!0),setTimeout(()=>p(!1),2e3)}catch{c()}};return e.jsxs("div",{className:"w-screen h-screen bg-[#f5ede5] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        /* ── Curtain Billowing / Swaying Animations ── */
        @keyframes curtain-billow-left {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          30% {
            transform: skewX(-2deg) scaleX(0.97);
          }
          70% {
            transform: skewX(2.5deg) scaleX(1.02);
          }
        }

        @keyframes curtain-billow-right {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          35% {
            transform: skewX(3deg) scaleX(0.96);
          }
          75% {
            transform: skewX(-2deg) scaleX(1.03);
          }
        }

        /* Wind gust ripples */
        @keyframes wind-gust-anim {
          0%, 100% {
            opacity: 0.2;
            transform: translateX(0);
          }
          50% {
            opacity: 0.85;
            transform: translateX(6px);
          }
        }

        /* Breeze sparkle drift out of doorway */
        @keyframes breeze-drift {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          30% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translate(50px, -25px) scale(1.1);
            opacity: 0;
          }
        }

        /* Pulsing warm roof lamp glow */
        @keyframes out-lamp-glow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.7));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 1));
          }
        }

        /* Twinkling star animation */
        @keyframes out-star-twinkle {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Falling cherry blossom petal */
        @keyframes out-petal-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(480px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Strip slide out animation from slot */
        @keyframes strip-slide-out {
          0% {
            transform: translateY(-88%) rotate(4.8deg);
          }
          100% {
            transform: translateY(0%) rotate(4.8deg);
          }
        }

        /* Strip resting subtle pulse */
        @keyframes strip-idle-glow {
          0%, 100% {
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25)) drop-shadow(0 0 4px rgba(255, 117, 143, 0.3));
          }
          50% {
            filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 10px rgba(255, 117, 143, 0.8));
          }
        }
      `}),e.jsxs("div",{className:`relative shadow-2xl transition-opacity duration-700 ${i?"opacity-100":"opacity-0"}`,style:{width:"min(100vw, calc(100vh * (1024 / 477)))",height:"min(100vh, calc(100vw * (477 / 1024)))",aspectRatio:"1024 / 477"},children:[e.jsx("img",{src:R,alt:"Pixel Photo Booth Final Output",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsx("img",{src:T,alt:"",className:"absolute pointer-events-none select-none z-10",style:{left:"45.12%",top:"27.25%",width:"7.81%",height:"54.51%",imageRendering:"pixelated",transformOrigin:"top center",animation:"curtain-billow-left 3.8s ease-in-out infinite"}}),e.jsx("img",{src:X,alt:"",className:"absolute pointer-events-none select-none z-10",style:{left:"54.49%",top:"27.25%",width:"8.20%",height:"52.41%",imageRendering:"pixelated",transformOrigin:"top center",animation:"curtain-billow-right 3.4s ease-in-out infinite 0.4s"}}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[12px] font-bold z-10 select-none",style:{left:"43.5%",top:"52.0%",animation:"wind-gust-anim 2.5s ease-in-out infinite"},children:"( ("}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[12px] font-bold z-10 select-none",style:{left:"62.0%",top:"56.0%",animation:"wind-gust-anim 2.2s ease-in-out infinite 0.7s"},children:") )"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffd166] text-[11px] z-10",style:{left:"52.0%",top:"50.0%",animation:"breeze-drift 3.5s ease-in-out infinite"},children:"✨"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ff758f] text-[9px] z-10",style:{left:"54.0%",top:"62.0%",animation:"breeze-drift 4s ease-in-out infinite 1.2s"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none text-white text-[10px] z-10",style:{left:"49.0%",top:"40.0%",animation:"breeze-drift 3s ease-in-out infinite 0.6s"},children:"✦"}),e.jsxs("div",{onClick:()=>l(!0),className:"absolute z-10 cursor-pointer group",style:{left:"32.6%",top:"71.0%",width:"5.8%",height:"22.6%",transformOrigin:"top left",transform:"rotate(4.8deg)",animation:a?"strip-idle-glow 2.5s ease-in-out infinite":"strip-slide-out 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards"},title:"Click to zoom / inspect your photo strip!",children:[e.jsx("div",{className:"w-full h-full relative rounded-xs overflow-hidden border border-[#5c3a1e] bg-white shadow-md group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(255,117,143,0.8)] transition-transform duration-200",children:e.jsx("img",{src:o,alt:"Your custom photo strip",className:"w-full h-full object-cover",style:{imageRendering:"pixelated"}})}),a&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"absolute -top-3 -left-3 text-[11px] animate-bounce pointer-events-none",children:"✨"}),e.jsx("span",{className:"absolute -bottom-2 -right-3 text-[10px] animate-pulse pointer-events-none",children:"💖"}),e.jsx("span",{className:"absolute top-1/2 -right-4 text-[9px] pointer-events-none animate-ping",children:"⭐"})]}),e.jsx("div",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-[#2a133d] border border-[#ff758f] text-white text-[7px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-40 pixel-text pointer-events-none shadow-md",children:"🔍 Click to Zoom"})]}),e.jsx("img",{src:O,alt:"",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-20",style:{imageRendering:"pixelated"}}),P&&e.jsx("div",{className:"absolute z-40 whitespace-nowrap px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-lg pixel-text animate-bounce",style:{left:"28.5%",top:"63.0%"},children:"*Pop!* Your strip is ready! 📸💖"}),e.jsxs("div",{className:"absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none",children:[e.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto",children:[e.jsxs(D,{to:"/",className:"flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text",children:[e.jsx("span",{children:"←"})," STUDIO"]}),e.jsxs("button",{onClick:n,className:"flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text",title:"Take a new set of photos",children:[e.jsx("span",{children:"🔄"})," RETAKE"]})]}),e.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto",children:[e.jsxs("button",{onClick:()=>l(!0),className:"flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffd166] border-2 border-[#5c3a1e] text-[#3a2210] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text",children:[e.jsx("span",{children:"🔍"})," PREVIEW"]}),e.jsxs("button",{onClick:h,className:"flex items-center gap-1.5 px-3 py-1 rounded bg-[#95d5b2] border-2 border-[#1b4332] text-[#1b4332] text-[8.5px] font-bold shadow-[0_2px_0_#1b4332] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text",children:[e.jsx("span",{children:"🖨️"})," PRINT"]}),e.jsxs("button",{onClick:c,className:"flex items-center gap-1.5 px-3.5 py-1 rounded bg-[#ff758f] border-2 border-[#5c3a1e] text-white text-[9px] font-bold shadow-[0_3px_0_#5c3a1e] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#5c3a1e] active:translate-y-0 active:shadow-none transition-all cursor-pointer pixel-text animate-pulse",children:[e.jsx("span",{children:"💾"})," DOWNLOAD"]})]})]}),e.jsx("div",{className:"absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none",children:e.jsxs("div",{className:"px-3 py-1 rounded-full bg-[#3a1d28]/85 border border-[#ff758f]/60 text-white text-[7.5px] font-bold pixel-text shadow-md flex items-center gap-2",children:[e.jsx("span",{children:"✨"}),e.jsx("span",{children:"Click strip to zoom • Ready to save & share!"}),e.jsx("span",{children:"💖"})]})}),e.jsx("div",{className:"absolute pointer-events-none text-white text-[12px]",style:{left:"19.5%",top:"7.5%",animation:"out-star-twinkle 3s ease-in-out infinite"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffe8a3] text-[10px]",style:{left:"93.5%",top:"5.5%",animation:"out-star-twinkle 2.5s ease-in-out infinite 0.8s"},children:"✨"}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"35.5%",top:"4.5%",width:"30px",height:"30px",background:"radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",animation:"out-lamp-glow 3s ease-in-out infinite"}}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"48.2%",top:"4.5%",width:"30px",height:"30px",background:"radial-gradient(circle, rgba(255,230,150,0.9) 0%, transparent 70%)",animation:"out-lamp-glow 2.8s ease-in-out infinite 0.5s"}}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"60.4%",top:"4.5%",width:"30px",height:"30px",background:"radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",animation:"out-lamp-glow 3.2s ease-in-out infinite 1s"}}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffb3c1] text-[10px]",style:{left:"12%",top:"-10px",animation:"out-petal-fall 6s linear infinite"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[9px]",style:{left:"75%",top:"-10px",animation:"out-petal-fall 7s linear infinite 1.2s"},children:"🌸"}),e.jsx("div",{onClick:()=>r(w),className:"absolute z-30 cursor-pointer rounded-full",style:{left:"63.5%",top:"4.5%",width:"8.5%",height:"8.5%"},title:"Pet the roof kitty!",children:g&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Thank you for visiting! (=^･ω･^=) ♥"})}),e.jsx("div",{onClick:()=>r(v),className:"absolute z-30 cursor-pointer rounded-2xl hover:ring-2 hover:ring-[#ff758f]/50 transition-all",style:{left:"67.5%",top:"41.0%",width:"7.0%",height:"33.0%"},title:"Mirror",children:y&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Looking cute in those photos! ✨🪞"})}),e.jsx("div",{onClick:()=>r(N),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all",style:{left:"21.5%",top:"35.0%",width:"14.0%",height:"31.0%"},title:"Photo wall",children:j&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Your memories look great up there! 📸"})}),e.jsx("div",{onClick:()=>r(S),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all",style:{left:"77.5%",top:"69.0%",width:"11.0%",height:"27.0%"},title:"Chalkboard",children:k&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Smile, Capture, Cherish! ♥"})}),e.jsx("div",{onClick:()=>r(z),className:"absolute z-30 cursor-pointer rounded-lg",style:{left:"13.5%",top:"65.0%",width:"8.5%",height:"25.0%"},title:"Flowers",children:C&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#52b788] text-[#1b4332] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Watered with love! 🌸"})}),m&&e.jsx("div",{onClick:()=>l(!1),className:"fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in",children:e.jsxs("div",{onClick:t=>t.stopPropagation(),className:"relative max-h-[90vh] flex flex-col items-center bg-[#2a133d] p-4 rounded-2xl border-4 border-[#ff758f] shadow-2xl space-y-4",children:[e.jsx("button",{onClick:()=>l(!1),className:"absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ff758f] border-2 border-white text-white font-bold flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer pixel-text text-[11px]",children:"✕"}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{className:"text-white text-xs font-bold pixel-text",children:"✨ YOUR PHOTO STRIP ✨"}),e.jsx("p",{className:"text-[#ffccd5] text-[7.5px] mt-1 pixel-text opacity-80",children:"Crisp 300DPI Studio Print Quality"})]}),e.jsx("div",{className:"max-h-[65vh] overflow-y-auto rounded-lg shadow-xl border-2 border-white/20",children:e.jsx("img",{src:o,alt:"High-res strip preview",className:"h-full max-h-[62vh] object-contain rounded-md",style:{imageRendering:"pixelated"}})}),e.jsxs("div",{className:"flex items-center gap-3 pt-1",children:[e.jsx("button",{onClick:c,className:"px-4 py-2 rounded-lg bg-[#ff758f] border-2 border-white text-white text-[9px] font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer pixel-text",children:"💾 DOWNLOAD PNG"}),e.jsx("button",{onClick:h,className:"px-4 py-2 rounded-lg bg-[#95d5b2] border-2 border-[#1b4332] text-[#1b4332] text-[9px] font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer pixel-text",children:"🖨️ PRINT"}),e.jsx("button",{onClick:_,className:"px-3.5 py-2 rounded-lg bg-[#ffd166] border-2 border-[#5c3a1e] text-[#3a2210] text-[9px] font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer pixel-text",children:b?"✓ COPIED!":"📋 COPY"})]})]})})]})]})}function E({imageUrl:o,onRetake:n}){const i=()=>{const a=document.createElement("a");a.href=o,a.download=`pixel-polaroid-${Date.now()}.png`,a.click()},d=()=>{const a=window.open("","_blank");a&&(a.document.write(`
      <html>
        <head>
          <title>Print Polaroid Photo</title>
          <style>
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              background: white;
            }
            img { 
              max-height: 95vh; 
              max-width: 95vw; 
              object-fit: contain; 
            }
          </style>
        </head>
        <body>
          <img src="${o}" onload="window.print();window.close()" />
        </body>
      </html>
    `),a.document.close())};return e.jsxs("div",{className:"relative flex min-h-screen flex-col items-center justify-center overflow-hidden",style:{background:"linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)"},children:[e.jsx("h2",{className:"pixel-font text-sm text-white mb-2",style:{textShadow:"2px 2px 0 #8b1a56"},children:"💾 Keep Your Memory"}),e.jsx("p",{className:"pixel-font text-[8px] text-pink-300 mb-6 opacity-70",children:"your polaroid is ready!"}),e.jsx("div",{className:"relative pixel-bounce",children:e.jsx("div",{className:"pixel-glow rounded-lg overflow-hidden",style:{maxWidth:260},children:e.jsx("img",{src:o,alt:"Polaroid photo",className:"w-full rounded-lg",style:{boxShadow:"0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,105,180,0.2)"}})})}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-4 mt-8 z-10",children:[e.jsx("button",{onClick:i,className:"pixel-btn pixel-btn-pink text-xs",children:"💾 Download"}),e.jsx("button",{onClick:d,className:"pixel-btn pixel-btn-green text-xs",children:"🖨️ Print"}),e.jsx("button",{onClick:n,className:"pixel-btn pixel-btn-purple text-xs",children:"🔄 Retake"})]})]})}export{I as D};
