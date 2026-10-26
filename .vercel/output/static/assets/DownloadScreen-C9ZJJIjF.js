import{j as e}from"./index-Dvb5QcNQ.js";function c({imageUrl:o,onRetake:i,isPolaroid:l}){const s=()=>{const t=document.createElement("a");t.href=o,t.download=`pixel-${l?"polaroid":"booth-strip"}-${Date.now()}.png`,t.click()},a=()=>{const t=window.open("","_blank");t&&(t.document.write(`
      <html>
        <head>
          <title>Print Photo Strip</title>
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
    `),t.document.close())};return e.jsxs("div",{className:"relative flex min-h-screen flex-col items-center justify-center overflow-hidden",style:{background:"linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)"},children:[e.jsx("style",{children:`
        @media print {
          .no-print { display: none !important; }
        }
      `}),e.jsx("h2",{className:"pixel-font text-sm text-white mb-2 no-print",style:{textShadow:"2px 2px 0 #8b1a56"},children:"💾 Keep Your Memory"}),e.jsxs("p",{className:"pixel-font text-[8px] text-pink-300 mb-6 opacity-70 no-print",children:["your ",l?"polaroid":"strip"," is ready!"]}),e.jsxs("div",{className:"relative pixel-bounce",children:[e.jsx("div",{className:"pixel-glow rounded-lg overflow-hidden",style:{maxWidth:220},children:e.jsx("img",{src:o,alt:l?"Polaroid photo":"Photo strip",className:"w-full rounded-lg",style:{boxShadow:"0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,105,180,0.2)"}})}),Array.from({length:6}).map((t,n)=>e.jsx("span",{className:"absolute twinkle text-lg pointer-events-none no-print",style:{left:`${[-10,100,-15,105,-5,95][n]}%`,top:`${[10,20,50,60,85,90][n]}%`,animationDelay:`${n*.3}s`},children:"✨"},n))]}),e.jsxs("div",{className:"flex flex-wrap justify-center gap-4 mt-8 z-10 no-print",children:[e.jsx("button",{onClick:s,className:"pixel-btn pixel-btn-pink text-xs",children:"💾 Download"}),e.jsx("button",{onClick:a,className:"pixel-btn pixel-btn-green text-xs",children:"🖨️ Print"}),e.jsx("button",{onClick:i,className:"pixel-btn pixel-btn-purple text-xs",children:"🔄 Retake"})]}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-16 block-texture no-print",style:{background:"#4a7c3f"}}),e.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-6 block-texture no-print",style:{background:"#6b4423"}})]})}export{c as D};
