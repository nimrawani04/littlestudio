import{r as a,j as e,L as U}from"./index-sb3QicBR.js";import{h as F}from"./html2canvas-pro.esm-CP5GaE11.js";import{D as O}from"./DownloadScreen-DQPPTV5b.js";const W="/assets/polaroid-pixel-art-2sd7xUfg.png",G="/assets/polaroid-developing-bg-DrfzVCCQ.png";function L({onCapture:u}){const[s,l]=a.useState("entry"),i=a.useRef(null),d=a.useRef(null),m=a.useRef(null),[c,p]=a.useState(null),[b,g]=a.useState(""),[x,v]=a.useState(0),[S,y]=a.useState(!1),[j,N]=a.useState(!1),[P,z]=a.useState(""),[D,R]=a.useState(!1),[_,I]=a.useState(!1);a.useEffect(()=>{I(!0)},[]);const E=async()=>{try{const r=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:640,height:480}});p(r),l("viewfinder")}catch{z("Camera access denied or unavailable.")}},M=r=>{const o=r.target.files?.[0];if(o){const n=new FileReader;n.onload=()=>{g(n.result),l("printing")},n.readAsDataURL(o)}},h=()=>{R(!0),setTimeout(()=>R(!1),2e3)};a.useEffect(()=>(s==="viewfinder"&&c&&i.current&&(i.current.srcObject=c),()=>{s!=="viewfinder"&&c&&(c.getTracks().forEach(r=>r.stop()),p(null))}),[s,c]);const w=a.useCallback(()=>{const r=i.current,o=d.current;if(!r||!o)return;N(!0),y(!0),setTimeout(()=>y(!1),200),setTimeout(()=>N(!1),400),o.width=r.videoWidth||640,o.height=r.videoHeight||480;const n=o.getContext("2d");n.translate(o.width,0),n.scale(-1,1),n.drawImage(r,0,0);const k=o.toDataURL("image/png");setTimeout(()=>{g(k),l("printing")},600)},[]);return a.useEffect(()=>{if(s==="printing"){v(0);const r=Date.now(),o=3500,n=setInterval(()=>{const k=Date.now()-r,C=Math.min(100,Math.round(k/o*100));v(C),C>=100&&(clearInterval(n),setTimeout(()=>{u(b)},350))},40);return()=>clearInterval(n)}},[s,b,u]),P?e.jsx("div",{className:"flex min-h-screen items-center justify-center bg-[#ffe4e1]",children:e.jsxs("div",{className:"text-center p-8",children:[e.jsx("span",{className:"text-5xl block mb-4",children:"😿"}),e.jsx("p",{className:"pixel-font text-xs text-pink-600 mb-4",children:P}),e.jsx("button",{onClick:()=>{z(""),l("entry")},className:"pixel-btn pixel-btn-pink text-xs",children:"← Back"})]})}):e.jsxs("div",{className:"w-screen h-screen bg-[#ff9e5e] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        @keyframes polaroid-lantern {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 8px rgba(255, 235, 120, 0.7));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 16px rgba(255, 235, 120, 0.95));
          }
        }

        @keyframes polaroid-sun-glimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        @keyframes polaroid-float-heart {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.1); }
        }

        @keyframes polaroid-shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
        }

        @keyframes polaroid-dev-star {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes polaroid-print-slide {
          0% {
            transform: translateY(-55%);
            opacity: 0.6;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes polaroid-photo-reveal {
          0% {
            opacity: 0.15;
            filter: blur(2px) grayscale(90%) contrast(150%);
          }
          45% {
            opacity: 0.65;
            filter: blur(1px) sepia(45%) contrast(120%);
          }
          100% {
            opacity: 1;
            filter: blur(0px) none;
          }
        }

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .btn-hover-lift:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .btn-hover-lift:active {
          transform: translateY(1px) scale(0.98);
        }
      `}),e.jsxs("div",{className:`relative shadow-2xl transition-opacity duration-700 ${_?"opacity-100":"opacity-0"}`,style:{width:"min(100vw, calc(100vh * (1024 / 477)))",height:"min(100vh, calc(100vw * (477 / 1024)))",aspectRatio:"1024 / 477"},children:[s==="entry"&&e.jsxs(e.Fragment,{children:[e.jsx("img",{src:W,alt:"Polaroid Camera Sunset",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsxs(U,{to:"/",className:"absolute top-3 left-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3b1d11] border-2 border-[#ffcb8f] text-[#ffcb8f] text-[9px] font-bold shadow-[0_2px_0_#1f0d06] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#1f0d06] active:translate-y-0 active:shadow-none transition-all no-underline pixel-text",children:[e.jsx("span",{children:"←"})," STUDIO"]}),e.jsx("div",{className:"absolute rounded-full pointer-events-none bg-[#ffe082]/40",style:{left:"9.2%",top:"14.0%",width:"5.8%",height:"12.5%",animation:"polaroid-lantern 2.7s ease-in-out infinite"}}),e.jsx("div",{className:"absolute pointer-events-none bg-gradient-to-b from-transparent via-[#ffd166]/15 to-transparent",style:{left:"67%",top:"60%",width:"18%",height:"18%",animation:"polaroid-sun-glimmer 3.2s ease-in-out infinite"}}),e.jsx("div",{className:"absolute pointer-events-none text-[#ff6b8b] text-[12px]",style:{left:"41.0%",top:"42.0%",animation:"polaroid-float-heart 2.6s ease-in-out infinite"},children:"♥"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ff6b8b] text-[10px]",style:{left:"44.8%",top:"44.5%",animation:"polaroid-float-heart 2.6s ease-in-out infinite 0.7s"},children:"♥"}),e.jsx("div",{onClick:h,className:"absolute z-20 cursor-pointer",style:{left:"10.74%",top:"76.52%",width:"15.62%",height:"15.72%"},title:"Pet the sleepy cat!",children:D&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-[#5c3a1e] text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-[#f8a4c8] whitespace-nowrap z-40 animate-bounce pointer-events-none",style:{fontFamily:"'Quicksand', sans-serif"},children:"Purr~ zZz ♥"})}),e.jsx("button",{onClick:E,className:"btn-hover-lift absolute z-20 cursor-pointer rounded-md transition-all duration-150 border-2 border-transparent group bg-transparent p-0",style:{left:"34.96%",top:"66.67%",width:"14.65%",height:"9.22%"},title:"Start Webcam",children:e.jsx("div",{className:"w-full h-full rounded-md border-2 border-transparent group-hover:border-[#ff94c2] group-hover:bg-[#ff94c2]/20 group-hover:shadow-[0_0_12px_rgba(255,148,194,0.8)] transition-all flex items-center justify-center"})}),e.jsx("button",{onClick:()=>m.current?.click(),className:"btn-hover-lift absolute z-20 cursor-pointer rounded-md transition-all duration-150 border-2 border-transparent group bg-transparent p-0",style:{left:"50.59%",top:"66.67%",width:"14.26%",height:"9.22%"},title:"Upload Photo",children:e.jsx("div",{className:"w-full h-full rounded-md border-2 border-transparent group-hover:border-[#ffdb70] group-hover:bg-[#ffdb70]/20 group-hover:shadow-[0_0_12px_rgba(255,219,112,0.8)] transition-all flex items-center justify-center"})}),e.jsx("input",{ref:m,type:"file",accept:"image/*",className:"hidden",onChange:M})]}),s==="viewfinder"&&e.jsxs("div",{className:`relative flex flex-col items-center justify-center w-full h-full bg-[#1e110c] ${j?"animate-[polaroid-shake_0.4s_ease-in-out]":""}`,children:[e.jsx("button",{onClick:()=>l("entry"),className:"absolute top-4 left-4 z-50 px-2.5 py-1 rounded bg-[#3b1d11] border-2 border-[#ffcb8f] text-[#ffcb8f] text-[9px] font-bold pixel-text",children:"← CANCEL"}),e.jsxs("div",{className:"relative rounded-lg overflow-hidden border-4 border-[#fff] bg-black shadow-2xl",style:{width:"70%",maxWidth:540,aspectRatio:"4/3"},children:[e.jsx("video",{ref:i,autoPlay:!0,muted:!0,playsInline:!0,className:"w-full h-full object-cover",style:{transform:"scaleX(-1)"}}),e.jsxs("div",{className:"absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded",children:[e.jsx("div",{className:"w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"}),e.jsx("span",{className:"pixel-text text-[8px] text-white",children:"LIVE"})]}),e.jsx("div",{className:"absolute top-3 right-3 pixel-text text-[8px] text-white bg-black/50 px-2 py-0.5 rounded",children:"⚡ READY"}),e.jsxs("div",{className:"absolute inset-0 flex items-center justify-center pointer-events-none opacity-40",children:[e.jsx("div",{className:"w-6 h-px bg-white"}),e.jsx("div",{className:"absolute h-6 w-px bg-white"})]}),S&&e.jsx("div",{className:"absolute inset-0 bg-white z-40 opacity-100 transition-opacity duration-200"})]}),e.jsxs("div",{className:"mt-4 flex flex-col items-center gap-2",children:[e.jsx("button",{onClick:w,className:"w-14 h-14 rounded-full bg-[#ff4d6d] border-4 border-[#fff] shadow-[0_4px_0_#b32540] active:translate-y-1 active:shadow-none hover:scale-105 transition-all cursor-pointer flex items-center justify-center text-white",title:"Snap Photo",children:"📸"}),e.jsx("span",{className:"pixel-text text-[8px] text-[#ffd166]",children:"CLICK TO SNAP"})]})]}),s==="printing"&&e.jsxs("div",{className:"relative shadow-2xl transition-opacity duration-700 overflow-hidden select-none",style:{width:"min(100vw, calc(100vh * (1024 / 471)))",height:"min(100vh, calc(100vw * (471 / 1024)))",aspectRatio:"1024 / 471"},children:[e.jsx("img",{src:G,alt:"Developing Polaroid",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsx("div",{className:"absolute z-10 overflow-hidden",style:{left:"45.1%",top:"46.3%",width:"9.2%",height:"17.0%",animation:"polaroid-print-slide 3.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards"},children:e.jsx("div",{className:"w-full h-full bg-white shadow-md p-[6%] pb-[18%] flex flex-col rounded-xs border border-stone-200",children:e.jsx("div",{className:"w-full aspect-square bg-[#eae2d6] overflow-hidden relative rounded-xs",children:e.jsx("img",{src:b,alt:"Developing photo",className:"w-full h-full object-cover",style:{animation:"polaroid-photo-reveal 3s ease-in-out forwards"}})})})}),e.jsx("div",{className:"absolute pointer-events-none z-20 rounded-b-xs",style:{left:"44.6%",top:"45.6%",width:"10.2%",height:"1.4%",backgroundColor:"#201824",boxShadow:"0 2px 4px rgba(0,0,0,0.4)"}}),e.jsx("div",{className:"absolute z-20 overflow-hidden rounded-full p-[1px]",style:{left:"38.9%",top:"74.6%",width:"21.9%",height:"3.9%"},children:e.jsx("div",{className:"h-full rounded-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#fde047] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(251,191,36,0.9)]",style:{width:`${x}%`}})}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffe8a3] text-[13px] z-20",style:{left:"40.5%",top:"32.5%",animation:"polaroid-dev-star 2.5s ease-in-out infinite"},children:"✨"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffd166] text-[12px] z-20",style:{left:"59.2%",top:"33.5%",animation:"polaroid-dev-star 2.8s ease-in-out infinite 0.7s"},children:"✨"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffe8a3] text-[10px] z-20",style:{left:"31.2%",top:"15.5%",animation:"polaroid-dev-star 3s ease-in-out infinite 0.3s"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffd166] text-[11px] z-20",style:{left:"68.2%",top:"16.8%",animation:"polaroid-dev-star 2.7s ease-in-out infinite 1.1s"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffe8a3] text-[10px] z-20",style:{left:"22.0%",top:"44.0%",animation:"polaroid-dev-star 3.2s ease-in-out infinite 0.5s"},children:"✦"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffd166] text-[10px] z-20",style:{left:"79.5%",top:"43.0%",animation:"polaroid-dev-star 2.6s ease-in-out infinite 0.9s"},children:"✦"})]}),e.jsx("canvas",{ref:d,className:"hidden"})]})]})}const V="/assets/polaroid-decorate-bg-BeAClVIo.png",T=[{id:"white",hex:"#ffffff",name:"Classic White",icon:"⚪"},{id:"pink",hex:"#ffe4e6",name:"Pastel Pink",icon:"🌸"},{id:"lavender",hex:"#f3e8ff",name:"Lavender",icon:"💜"},{id:"mint",hex:"#dcfce7",name:"Mint Green",icon:"🍃"},{id:"honey",hex:"#fef9c3",name:"Warm Honey",icon:"🍯"},{id:"dark",hex:"#292524",name:"Dark Retro",icon:"🖤"}],H=["✨","💖","🌸","⭐","🦋","🎀","🍓","🐱","🐰","🥺","🔥","✌️","🌷","🍑","💎"];function Q({photo:u,onFinish:s}){const[l,i]=a.useState(!1),[d,m]=a.useState(T[0].hex),[c,p]=a.useState("Best Day Ever!"),[b,g]=a.useState([]),[x,v]=a.useState("caption"),[S,y]=a.useState(null),[j,N]=a.useState(!1),[P,z]=a.useState(!1),[D,R]=a.useState(!1),[_,I]=a.useState(!1),[E,M]=a.useState(!1),h=a.useRef(null);a.useEffect(()=>{i(!0)},[]);const w=t=>{t(!0),setTimeout(()=>t(!1),2400)},r=async()=>{if(!(!h.current||j)){N(!0);try{const t=await F(h.current,{scale:2.5,backgroundColor:null,useCORS:!0});s(t.toDataURL("image/png"))}catch(t){console.error(t),N(!1)}}},o=t=>{g(f=>[...f,{id:Math.random().toString(36).slice(2,9),emoji:t,x:35+Math.random()*30,y:25+Math.random()*40,size:28+Math.floor(Math.random()*8),rot:(Math.random()-.5)*30}])},n=(t,f)=>{t.stopPropagation(),y(f),t.target.setPointerCapture(t.pointerId)},k=t=>{if(!S||!h.current)return;const f=h.current.getBoundingClientRect(),$=(t.clientX-f.left)/f.width*100,A=(t.clientY-f.top)/f.height*100;g(Y=>Y.map(B=>B.id===S?{...B,x:$,y:A}:B))},C=()=>{y(null)};return e.jsxs("div",{className:"w-screen h-screen bg-[#2c1810] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Dancing+Script:wght@700&family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .hand-text {
          font-family: 'Caveat', 'Dancing Script', cursive;
        }

        /* Ambient Lamp Glow */
        @keyframes polaroid-lamp-glow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 10px rgba(255, 200, 100, 0.7));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 24px rgba(255, 200, 100, 1));
          }
        }

        /* Falling Blossom Petals */
        @keyframes polaroid-petal-fall {
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
            transform: translateY(520px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Gingham Tape Pattern */
        .washi-tape-pink {
          background-color: #ffd1dc;
          background-image: 
            linear-gradient(90deg, rgba(255, 105, 180, 0.35) 50%, transparent 50%),
            linear-gradient(rgba(255, 105, 180, 0.35) 50%, transparent 50%);
          background-size: 8px 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
      `}),e.jsxs("div",{className:`relative shadow-2xl transition-opacity duration-700 ${l?"opacity-100":"opacity-0"}`,style:{width:"min(100vw, calc(100vh * (1024 / 508)))",height:"min(100vh, calc(100vw * (508 / 1024)))",aspectRatio:"1024 / 508"},children:[e.jsx("img",{src:V,alt:"Polaroid Decorate Studio",className:"absolute inset-0 w-full h-full object-cover select-none pointer-events-none",style:{imageRendering:"pixelated"}}),e.jsx(U,{to:"/",className:"absolute z-30 cursor-pointer rounded-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group",style:{left:"2.2%",top:"4.5%",width:"21.0%",height:"13.5%"},title:"Return to Studio Home",children:e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-white/40"})}),e.jsx("button",{onClick:r,disabled:j,className:"absolute z-30 cursor-pointer rounded-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group p-0 m-0 border-0 bg-transparent",style:{left:"79.5%",top:"4.5%",width:"16.0%",height:"13.5%"},title:"Finish and save your polaroid",children:e.jsx("div",{className:"w-full h-full rounded-lg border-2 border-transparent group-hover:border-white/50 group-hover:shadow-[0_0_14px_rgba(46,204,113,0.6)] transition-all flex items-center justify-center",children:j&&e.jsx("span",{className:"text-white text-[9px] font-bold pixel-text animate-pulse",children:"SAVING..."})})}),e.jsx("div",{className:"absolute z-20",style:{left:"37.1%",top:"13.8%",width:"25.9%",height:"59.0%",transformOrigin:"center center",transform:"rotate(1.8deg)"},children:e.jsxs("div",{ref:h,onPointerMove:k,onPointerUp:C,onPointerCancel:C,className:"w-full h-full relative rounded-xs shadow-2xl flex flex-col transition-colors duration-200 select-none p-3 pb-8",style:{backgroundColor:d,boxShadow:"0 15px 35px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.2)"},children:[e.jsx("div",{className:"absolute -top-3.5 -left-4 w-14 h-5 washi-tape-pink rounded-xs pointer-events-none z-30 opacity-95",style:{transform:"rotate(-32deg)"}}),e.jsx("div",{className:"absolute -bottom-3 -right-3.5 w-14 h-5 washi-tape-pink rounded-xs pointer-events-none z-30 opacity-95",style:{transform:"rotate(-35deg)"}}),e.jsx("div",{className:"w-full aspect-square bg-[#f5ede5] overflow-hidden relative rounded-xs border border-stone-300 shadow-inner",children:e.jsx("img",{src:u,alt:"Polaroid memory",className:"w-full h-full object-cover",crossOrigin:"anonymous"})}),e.jsx("div",{className:"flex-1 flex items-center justify-center px-1 pt-1.5 overflow-hidden",children:e.jsxs("div",{className:"flex items-center gap-1.5 text-stone-800 drop-shadow-xs",children:[e.jsx("span",{className:"text-[#ff758f] text-xs",children:"♥"}),e.jsx("span",{className:"hand-text text-xl sm:text-2xl font-bold tracking-wide text-center truncate max-w-[200px]",style:{color:d==="#292524"?"#f5ede5":"#2c1810"},children:c||"Best Day Ever!"}),e.jsx("span",{className:"text-[#ff758f] text-xs",children:"♥"})]})}),b.map(t=>e.jsx("div",{onPointerDown:f=>n(f,t.id),className:"absolute cursor-grab active:cursor-grabbing hover:scale-115 transition-transform z-20 select-none",style:{left:`${t.x}%`,top:`${t.y}%`,transform:`translate(-50%, -50%) rotate(${t.rot}deg)`,fontSize:`${t.size}px`,touchAction:"none",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.3))"},title:"Drag sticker to move",children:t.emoji},t.id))]})}),e.jsxs("div",{className:"absolute z-30 flex items-center justify-between",style:{left:"30.5%",top:"77.5%",width:"39.0%",height:"7.8%"},children:[e.jsx("button",{onClick:()=>v("border"),className:"h-full w-[31%] cursor-pointer rounded-lg p-0 m-0 border-0 bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95",title:"Choose Border Color",children:e.jsxs("div",{className:`w-full h-full rounded-lg flex items-center justify-center gap-1 pixel-text text-[8px] font-bold transition-all ${x==="border"?"bg-white text-[#5c3a1e] border-2 border-[#ff758f] shadow-md -translate-y-0.5":"bg-[#4a2411]/80 text-[#ffd1dc] border border-[#ffccd5]/30 hover:bg-[#5a2e16]"}`,children:[e.jsx("span",{children:"🌸"}),e.jsx("span",{children:"Border"})]})}),e.jsx("button",{onClick:()=>v("caption"),className:"h-full w-[33%] cursor-pointer rounded-lg p-0 m-0 border-0 bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95",title:"Edit Caption Text",children:e.jsxs("div",{className:`w-full h-full rounded-lg flex items-center justify-center gap-1 pixel-text text-[8px] font-bold transition-all ${x==="caption"?"bg-white text-[#5c3a1e] border-2 border-[#ff758f] shadow-md -translate-y-0.5":"bg-[#4a2411]/80 text-[#ffd1dc] border border-[#ffccd5]/30 hover:bg-[#5a2e16]"}`,children:[e.jsx("span",{children:"✏️"}),e.jsx("span",{children:"Caption"})]})}),e.jsx("button",{onClick:()=>v("stickers"),className:"h-full w-[31%] cursor-pointer rounded-lg p-0 m-0 border-0 bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95",title:"Add Stickers",children:e.jsxs("div",{className:`w-full h-full rounded-lg flex items-center justify-center gap-1 pixel-text text-[8px] font-bold transition-all ${x==="stickers"?"bg-white text-[#5c3a1e] border-2 border-[#ff758f] shadow-md -translate-y-0.5":"bg-[#4a2411]/80 text-[#ffd1dc] border border-[#ffccd5]/30 hover:bg-[#5a2e16]"}`,children:[e.jsx("span",{children:"🦋"}),e.jsx("span",{children:"Stickers"})]})})]}),e.jsxs("div",{className:"absolute z-30 flex items-center justify-center",style:{left:"32.0%",top:"86.0%",width:"36.0%",height:"9.8%"},children:[x==="caption"&&e.jsxs("div",{className:"w-full h-full bg-[#fdfaf5] border-2 border-[#d4a373] rounded-xl shadow-md flex items-center justify-between px-3 relative overflow-hidden",children:[e.jsx("span",{className:"text-sm select-none",children:"🌸 ♥"}),e.jsx("input",{type:"text",value:c,onChange:t=>p(t.target.value),maxLength:26,placeholder:"Write your memory caption...",className:"flex-1 mx-2 bg-transparent text-center hand-text text-xl sm:text-2xl font-bold text-[#3a2210] outline-none placeholder:text-stone-400",autoFocus:!0}),e.jsx("span",{className:"text-sm select-none",children:"♥ 🌸"})]}),x==="border"&&e.jsx("div",{className:"w-full h-full bg-[#fdfaf5] border-2 border-[#d4a373] rounded-xl shadow-md flex items-center justify-center gap-2.5 px-3",children:T.map(t=>e.jsx("button",{onClick:()=>m(t.hex),className:`w-7 h-7 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center ${d===t.hex?"ring-3 ring-[#ff758f] scale-110":"hover:scale-105 border border-stone-300"}`,style:{backgroundColor:t.hex},title:t.name,children:d===t.hex&&e.jsx("span",{className:"text-[10px] text-[#ff758f] font-bold",children:"✓"})},t.id))}),x==="stickers"&&e.jsxs("div",{className:"w-full h-full bg-[#fdfaf5] border-2 border-[#d4a373] rounded-xl shadow-md flex items-center justify-between px-2 gap-1 overflow-x-auto cute-scrollbar",children:[e.jsx("div",{className:"flex items-center gap-1.5 flex-1 overflow-x-auto py-1",children:H.map(t=>e.jsx("button",{onClick:()=>o(t),className:"text-lg hover:scale-125 active:scale-95 transition-transform p-1 rounded-md hover:bg-[#fff0f3] cursor-pointer",title:`Add ${t}`,children:t},t))}),b.length>0&&e.jsx("button",{onClick:()=>g([]),className:"px-2 py-0.5 rounded bg-[#ff758f] text-white text-[7.5px] font-bold pixel-text shadow-xs hover:bg-[#e63946] transition-colors shrink-0",title:"Clear all stickers",children:"CLEAR"})]})]}),e.jsx("div",{className:"absolute pointer-events-none rounded-full",style:{left:"92.5%",top:"16.0%",width:"55px",height:"55px",background:"radial-gradient(circle, rgba(255,200,90,0.9) 0%, transparent 70%)",animation:"polaroid-lamp-glow 3s ease-in-out infinite"}}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffb3c1] text-[10px]",style:{left:"8.0%",top:"-10px",animation:"polaroid-petal-fall 6s linear infinite"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffccd5] text-[9px]",style:{left:"17.0%",top:"-10px",animation:"polaroid-petal-fall 7.5s linear infinite 1.5s"},children:"🌸"}),e.jsx("div",{className:"absolute pointer-events-none text-[#ffb3c1] text-[11px]",style:{left:"25.0%",top:"-10px",animation:"polaroid-petal-fall 6.5s linear infinite 0.8s"},children:"🌸"}),e.jsx("div",{onClick:()=>w(z),className:"absolute z-30 cursor-pointer rounded-2xl",style:{left:"0.8%",top:"70.5%",width:"12.0%",height:"20.5%"},title:"Pet the sleeping studio kitty!",children:P&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Zzz... dreaming of sunny naps... 🌸💤"})}),e.jsx("div",{onClick:()=>w(R),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all",style:{left:"6.5%",top:"56.0%",width:"15.0%",height:"20.0%"},title:"Studio books",children:D&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Smile, Capture, Cherish, Repeat! 📚"})}),e.jsx("div",{onClick:()=>w(I),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all",style:{left:"77.0%",top:"54.0%",width:"13.0%",height:"24.0%"},title:"Vintage Polaroid instant camera",children:_&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"*Click!* Instant retro memories! 📸✨"})}),e.jsx("div",{onClick:()=>w(M),className:"absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all",style:{left:"64.0%",top:"23.0%",width:"18.0%",height:"38.0%"},title:"Memories on the wall",children:E&&e.jsx("div",{className:"absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#ffd166] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce",children:"Good Photos, Happier Days ♡"})})]})]})}function q(){const[u,s]=a.useState("camera"),[l,i]=a.useState(""),d=p=>{i(p),s("editor")},m=p=>{i(p),s("download")},c=()=>{i(""),s("camera")};switch(u){case"camera":return e.jsx(L,{onCapture:d});case"editor":return e.jsx(Q,{photo:l,onFinish:m});case"download":return e.jsx(O,{imageUrl:l,onRetake:c,isPolaroid:!0});default:return e.jsx(L,{onCapture:d})}}const J=q;export{J as component};
