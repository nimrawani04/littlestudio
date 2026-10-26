import{j as e,r as s,L as D}from"./index-Bxn3H_eg.js";const R="/assets/photobooth-output-clean-UVRslyBU.png",X="/assets/photobooth-dispenser-lip-DW45fJOK.png",T="/assets/photobooth-curtain-billow-left-eLeynrAC.png",E="/assets/photobooth-curtain-billow-right-D5DW2R0Z.png",O="/assets/photobooth-modal-bg-8t-9Epnw.png";function L({imageUrl:o,onRetake:a,isPolaroid:i}){return i?e.jsx(Y,{imageUrl:o,onRetake:a}):e.jsx(W,{imageUrl:o,onRetake:a})}function W({imageUrl:o,onRetake:a}){const[i,d]=s.useState(!1),[n,m]=s.useState(!1),[b,l]=s.useState(!1),[p,x]=s.useState(!1),[g,w]=s.useState(!1),[y,v]=s.useState(!1),[j,N]=s.useState(!1),[k,z]=s.useState(!1),[S,C]=s.useState(!1),[P,h]=s.useState(!1);s.useEffect(()=>{d(!0);const t=setTimeout(()=>{m(!0),h(!0),setTimeout(()=>h(!1),2800),setTimeout(()=>l(!0),1200)},2200);return()=>clearTimeout(t)},[]);const r=t=>{t(!0),setTimeout(()=>t(!1),2400)},c=()=>{const t=document.createElement("a");t.href=o,t.download=`pixel-booth-strip-${Date.now()}.png`,t.click()},f=()=>{const t=window.open("","_blank");t&&(t.document.write(`
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
    `),t.document.close())},_=async()=>{try{const u=await(await fetch(o)).blob();await navigator.clipboard.write([new ClipboardItem({[u.type]:u})]),x(!0),setTimeout(()=>x(!1),2e3)}catch{c()}};return e.jsxs("div",{className:"w-screen h-screen bg-[#f5ede5] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0",children:[e.jsx("style",{children:`
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
      `}),e.jsxs("div",{className:`relative shadow-2xl transition-opacity duration-700 ${i?"opacity-100":"opacity-0"}`,style:{width:"min(100vw, calc(100vh * (1024 / 477)))",height:"min(100vh, calc(100vw * (477 / 1024)))",aspectRatio:"1024 / 477"},children:[e.jsx("img",{src:R,alt:"Pixel Photo Booth Final Output",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsx("img",{src:T,alt:"",className:"absolute pointer-events-none select-none z-10",style:{left:"45.12%",top:"27.25%",width:"7.81%",height:"54.51%",imageRendering:"pixelated",transformOrigin:"top center",animation:"curtain-billow-left 3.8s ease-in-out infinite"}}),e.jsx("img",{src:E,alt:"",className:"absolute pointer-events-none select-none z-10",style:{left:"54.49%",top:"27.25%",width:"8.20%",height:"52.41%",imageRendering:"pixelated",transformOrigin:"top center",animation:"curtain-billow-right 3.4s ease-in-out infinite 0.4s"}}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[12px] font-bold z-10 select-none",style:{left:"43.5%",top:"52.0%",animation:"wind-gust-anim 2.5s ease-in-out infinite"},children:"( ("}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[12px] font-bold z-10 select-none",style:{left:"62.0%",top:"56.0%",animation:"wind-gust-anim 2.2s ease-in-out infinite 0.7s"},children:") )"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffd166] text-[11px] z-10",style:{left:"52.0%",top:"50.0%",animation:"breeze-drift 3.5s ease-in-out infinite"},children:"✨"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ff758f] text-[9px] z-10",style:{left:"54.0%",top:"62.0%",animation:"breeze-drift 4s ease-in-out infinite 1.2s"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none text-white text-[10px] z-10",style:{left:"49.0%",top:"40.0%",animation:"breeze-drift 3s ease-in-out infinite 0.6s"},children:"✦"}),e.jsxs("div",{onClick:()=>l(!0),className:"absolute z-10 cursor-pointer group",style:{left:"32.6%",top:"71.0%",width:"5.8%",height:"22.6%",transformOrigin:"top left",transform:"rotate(4.8deg)",animation:n?"strip-idle-glow 2.5s ease-in-out infinite":"strip-slide-out 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards"},title:"Click to zoom / inspect your photo strip!",children:[e.jsx("div",{className:"w-full h-full relative rounded-xs overflow-hidden border border-[#5c3a1e] bg-white shadow-md group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(255,117,143,0.8)] transition-transform duration-200",children:e.jsx("img",{src:o,alt:"Your custom photo strip",className:"w-full h-full object-cover",style:{imageRendering:"pixelated"}})}),n&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"absolute -top-3 -left-3 text-[11px] animate-bounce pointer-events-none",children:"✨"}),e.jsx("span",{className:"absolute -bottom-2 -right-3 text-[10px] animate-pulse pointer-events-none",children:"💖"}),e.jsx("span",{className:"absolute top-1/2 -right-4 text-[9px] pointer-events-none animate-ping",children:"⭐"})]}),e.jsx("div",{className:"absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-[#2a133d] border border-[#ff758f] text-white text-[7px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-40 pixel-text pointer-events-none shadow-md",children:"🔍 Click to Zoom"})]}),e.jsx("img",{src:X,alt:"",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-20",style:{imageRendering:"pixelated"}}),P&&e.jsx("div",{className:"absolute z-40 whitespace-nowrap px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-lg pixel-text animate-bounce",style:{left:"28.5%",top:"63.0%"},children:"*Pop!* Your strip is ready! 📸💖"}),e.jsxs("div",{className:"absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none",children:[e.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto",children:[e.jsxs(D,{to:"/",className:"flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text",children:[e.jsx("span",{children:"←"})," STUDIO"]}),e.jsxs("button",{onClick:a,className:"flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text",title:"Take a new set of photos",children:[e.jsx("span",{children:"🔄"})," RETAKE"]})]}),e.jsxs("div",{className:"flex items-center gap-2 pointer-events-auto",children:[e.jsxs("button",{onClick:()=>l(!0),className:"flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffd166] border-2 border-[#5c3a1e] text-[#3a2210] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text",children:[e.jsx("span",{children:"🔍"})," PREVIEW"]}),e.jsxs("button",{onClick:f,className:"flex items-center gap-1.5 px-3 py-1 rounded bg-[#95d5b2] border-2 border-[#1b4332] text-[#1b4332] text-[8.5px] font-bold shadow-[0_2px_0_#1b4332] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text",children:[e.jsx("span",{children:"🖨️"})," PRINT"]}),e.jsxs("button",{onClick:c,className:"flex items-center gap-1.5 px-3.5 py-1 rounded bg-[#ff758f] border-2 border-[#5c3a1e] text-white text-[9px] font-bold shadow-[0_3px_0_#5c3a1e] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#5c3a1e] active:translate-y-0 active:shadow-none transition-all cursor-pointer pixel-text animate-pulse",children:[e.jsx("span",{children:"💾"})," DOWNLOAD"]})]})]}),e.jsx("div",{className:"absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none",children:e.jsxs("div",{className:"px-3 py-1 rounded-full bg-[#3a1d28]/85 border border-[#ff758f]/60 text-white text-[7.5px] font-bold pixel-text shadow-md flex items-center gap-2",children:[e.jsx("span",{children:"✨"}),e.jsx("span",{children:"Click strip to zoom • Ready to save & share!"}),e.jsx("span",{children:"💖"})]})}),e.jsx("div",{className:"absolute pointer-events-none text-white text-[12px]",style:{left:"19.5%",top:"7.5%",animation:"out-star-twinkle 3s ease-in-out infinite"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffe8a3] text-[10px]",style:{left:"93.5%",top:"5.5%",animation:"out-star-twinkle 2.5s ease-in-out infinite 0.8s"},children:"✨"}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"35.5%",top:"4.5%",width:"30px",height:"30px",background:"radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",animation:"out-lamp-glow 3s ease-in-out infinite"}}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"48.2%",top:"4.5%",width:"30px",height:"30px",background:"radial-gradient(circle, rgba(255,230,150,0.9) 0%, transparent 70%)",animation:"out-lamp-glow 2.8s ease-in-out infinite 0.5s"}}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"60.4%",top:"4.5%",width:"30px",height:"30px",background:"radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",animation:"out-lamp-glow 3.2s ease-in-out infinite 1s"}}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffb3c1] text-[10px]",style:{left:"12%",top:"-10px",animation:"out-petal-fall 6s linear infinite"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[9px]",style:{left:"75%",top:"-10px",animation:"out-petal-fall 7s linear infinite 1.2s"},children:"🌸"}),e.jsx("div",{onClick:()=>r(w),className:"absolute z-30 cursor-pointer rounded-full",style:{left:"63.5%",top:"4.5%",width:"8.5%",height:"8.5%"},title:"Pet the roof kitty!",children:g&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Thank you for visiting! (=^･ω･^=) ♥"})}),e.jsx("div",{onClick:()=>r(v),className:"absolute z-30 cursor-pointer rounded-2xl hover:ring-2 hover:ring-[#ff758f]/50 transition-all",style:{left:"67.5%",top:"41.0%",width:"7.0%",height:"33.0%"},title:"Mirror",children:y&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Looking cute in those photos! ✨🪞"})}),e.jsx("div",{onClick:()=>r(N),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all",style:{left:"21.5%",top:"35.0%",width:"14.0%",height:"31.0%"},title:"Photo wall",children:j&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Your memories look great up there! 📸"})}),e.jsx("div",{onClick:()=>r(z),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all",style:{left:"77.5%",top:"69.0%",width:"11.0%",height:"27.0%"},title:"Chalkboard",children:k&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Smile, Capture, Cherish! ♥"})}),e.jsx("div",{onClick:()=>r(C),className:"absolute z-30 cursor-pointer rounded-lg",style:{left:"13.5%",top:"65.0%",width:"8.5%",height:"25.0%"},title:"Flowers",children:S&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#52b788] text-[#1b4332] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Watered with love! 🌸"})}),b&&e.jsx("div",{onClick:()=>l(!1),className:"fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 m-0 animate-fade-in",children:e.jsxs("div",{onClick:t=>t.stopPropagation(),className:"relative shadow-2xl select-none",style:{width:"min(100vw, calc(100vh * (1024 / 483)))",height:"min(100vh, calc(100vw * (483 / 1024)))",aspectRatio:"1024 / 483"},children:[e.jsx("img",{src:O,alt:"Your Photo Strip Modal",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsx("button",{onClick:()=>l(!1),className:"absolute z-30 cursor-pointer rounded-full hover:scale-110 active:scale-95 transition-transform",style:{left:"61.3%",top:"18.5%",width:"3.2%",height:"5.5%"},title:"Close Modal"}),e.jsx("div",{className:"absolute z-20 overflow-hidden flex items-center justify-center pointer-events-auto",style:{left:"44.6%",top:"27.5%",width:"10.8%",height:"53.5%"},children:e.jsx("img",{src:o,alt:"Your Photo Strip",className:"w-full h-full object-contain",style:{imageRendering:"pixelated"}})}),e.jsx("button",{onClick:c,className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-white transition-all up-btn-hover",style:{left:"37.2%",top:"84.8%",width:"10.8%",height:"6.2%"},title:"Download PNG"}),e.jsx("button",{onClick:f,className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-white transition-all up-btn-hover",style:{left:"48.8%",top:"84.8%",width:"6.5%",height:"6.2%"},title:"Print Strip"}),e.jsx("button",{onClick:_,className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-white transition-all up-btn-hover",style:{left:"56.8%",top:"84.8%",width:"6.0%",height:"6.2%"},title:p?"Copied!":"Copy Image",children:p&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2a133d] border border-white text-white text-[7px] px-1.5 py-0.5 rounded pixel-text animate-bounce",children:"COPIED!"})})]})})]})]})}function Y({imageUrl:o,onRetake:a}){const i=()=>{const n=document.createElement("a");n.href=o,n.download=`pixel-polaroid-${Date.now()}.png`,n.click()},d=()=>{const n=window.open("","_blank");n&&(n.document.write(`
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
    `),n.document.close())};return e.jsxs("div",{className:"relative flex min-h-screen flex-col items-center justify-center overflow-hidden",style:{background:"linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)"},children:[e.jsx("h2",{className:"pixel-font text-sm text-white mb-2",style:{textShadow:"2px 2px 0 #8b1a56"},children:"💾 Keep Your Memory"}),e.jsx("p",{className:"pixel-font text-[8px] text-pink-300 mb-6 opacity-70",children:"your polaroid is ready!"}),e.jsx("div",{className:"relative pixel-bounce",children:e.jsx("div",{className:"pixel-glow rounded-lg overflow-hidden",style:{maxWidth:260},children:e.jsx("img",{src:o,alt:"Polaroid photo",className:"w-full rounded-lg",style:{boxShadow:"0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,105,180,0.2)"}})})}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-4 mt-8 z-10",children:[e.jsx("button",{onClick:i,className:"pixel-btn pixel-btn-pink text-xs",children:"💾 Download"}),e.jsx("button",{onClick:d,className:"pixel-btn pixel-btn-green text-xs",children:"🖨️ Print"}),e.jsx("button",{onClick:a,className:"pixel-btn pixel-btn-purple text-xs",children:"🔄 Retake"})]})]})}export{L as D};
