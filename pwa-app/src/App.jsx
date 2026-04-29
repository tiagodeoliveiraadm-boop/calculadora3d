import { useState, useRef, useEffect } from "react";
import React from "react";

const COMPANY_LOGO_B64 = "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";

// ─── FLAT SVG ICONS ──────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const s = { width: size, height: size, display: "inline-block", verticalAlign: "middle", flexShrink: 0 };
  const paths = {
    thread:    "M12 2C9.24 2 7 4.24 7 7c0 1.08.33 2.08.89 2.91L2 16.5V20h3.5l6.59-5.89C12.92 14.67 13.92 15 15 15c2.76 0 5-2.24 5-5s-2.24-5-5-5c-.34 0-.68.03-1 .09V2h-2zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
    clock:     "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z",
    bolt:      "M7 2v11h3v9l7-12h-4l4-8z",
    wrench:    "M15.5 2.1L11 6.6l1.4 4-4 1.4-4.5 4.5c-.78.78-.78 2.05 0 2.83l.71.71c.78.78 2.05.78 2.83 0l4.5-4.5 1.4-4 4-1.4 4.5-4.5-1.83-1.83-3.55 3.55-1.41-1.41 3.55-3.55L15.5 2.1z",
    briefcase: "M20 6h-2.18c.07-.44.18-.88.18-1.36C18 3.17 16.83 2 15.36 2H8.64C7.17 2 6 3.17 6 4.64c0 .48.11.92.18 1.36H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4 0H8.82C8.4 5.74 8 5.22 8 4.64 8 4.28 8.28 4 8.64 4h6.72c.36 0 .64.28.64.64 0 .58-.4 1.1-.82 1.36H16v.36z",
    gift:      "M20 6h-2.18A3 3 0 0 0 12 4.18 3 3 0 0 0 6.18 6H4c-1.1 0-2 .9-2 2v2c0 .55.45 1 1 1h1v8c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h1c.55 0 1-.45 1-1V8c0-1.1-.9-2-2-2zm-8-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-4 2c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-2 0zm8 0zm-8 12V11h4v7H6zm6 0v-7h4v7h-4z",
    box:       "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3l4 4H8l4-4zm-5 9V9l5 5-5 1z",
    doc:       "M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z",
    lock:      "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
    user:      "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    save:      "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z",
    folder:    "M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z",
    star:      "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
    history:   "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z",
    tag:       "M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z",
    key:       "M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
    bag:       "M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm0 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",
    brush:     "M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z",
    magnet:    "M3.55 18.54l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8zM11 22.45h2V19.5h-2v2.95zM4 10.5H1v2h3v-2zm11-8.17V1.5h-2v.83c-3.94.93-6.5 4.27-6.5 7.67 0 4.54 3.2 7.5 6.5 8.44v.06h2v-.06c3.3-.94 6.5-3.9 6.5-8.44 0-3.4-2.56-6.74-6.5-7.67zM20 10.5v2h3v-2h-3z",
    package:   "M20.5 3.4L12 2 3.5 3.4C2.6 3.6 2 4.4 2 5.3V11c0 5.6 4.2 10.8 10 12 5.8-1.2 10-6.4 10-12V5.3c0-.9-.6-1.7-1.5-1.9zM13 16l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L20 9l-7 7z",
    send:      "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z",
    chart:     "M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z",
    trash:     "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
    eye:       "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
    photo:     "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
    plus:      "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
    close:     "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
    check:     "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
    building:  "M12 2L2 7l1 1h18l1-1L12 2zM4 8v12h3v-7h10v7h3V8H4zm5 12v-5h6v5H9z",
    printer:   "M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z",
    glue:      "M17 8C8 10 5.9 16.17 3.82 21h2.34l1-2.5a4.5 4.5 0 0 0 5.18-1.73L14 21h2.4l-.7-2.1A4.98 4.98 0 0 0 19 14V8h-2zm0 6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V9.6C13.42 9 15 8 17 8v6z",
    sandpaper: "M4 20h16v2H4zm0-2h16v-2H4zm0-4h16v-2H4zm0-4h16V8H4zM4 4h16V2H4z",
    info:      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  };
  const d = paths[name] || paths.info;
  return (
    <svg viewBox="0 0 24 24" style={s} fill={color}>
      <path d={d}/>
    </svg>
  );
};


// ─── DATA ─────────────────────────────────────────────────────────────────────
const PRINTERS = [
  { name: "Bambu Lab A1 Mini",       watts: 170,  lifespan: 5000 },
  { name: "Bambu Lab A1",            watts: 230,  lifespan: 5000 },
  { name: "Bambu Lab P1S",           watts: 350,  lifespan: 6000 },
  { name: "Bambu Lab X1 Carbon",     watts: 350,  lifespan: 6000 },
  { name: "Creality Ender 3 V2",     watts: 270,  lifespan: 3000 },
  { name: "Creality Ender 3 S1 Pro", watts: 350,  lifespan: 3500 },
  { name: "Creality Ender 3 V3 SE",  watts: 220,  lifespan: 3500 },
  { name: "Creality K1",             watts: 350,  lifespan: 4000 },
  { name: "Creality K1 Max",         watts: 1000, lifespan: 4000 },
  { name: "Prusa MK4",               watts: 280,  lifespan: 8000 },
  { name: "Prusa MK3S+",             watts: 240,  lifespan: 8000 },
  { name: "Prusa MINI+",             watts: 90,   lifespan: 6000 },
  { name: "Anycubic Kobra 2",        watts: 240,  lifespan: 3000 },
  { name: "Anycubic Kobra 2 Pro",    watts: 300,  lifespan: 3500 },
  { name: "Elegoo Neptune 4",        watts: 350,  lifespan: 3000 },
  { name: "Elegoo Neptune 4 Pro",    watts: 350,  lifespan: 3500 },
  { name: "Voron 2.4",               watts: 400,  lifespan: 8000 },
  { name: "Personalizado",           watts: null, lifespan: null },
];
const MATERIALS = [
  { name: "PLA", defaultPrice: 70 }, { name: "PLA+", defaultPrice: 85 },
  { name: "PETG", defaultPrice: 90 }, { name: "ABS", defaultPrice: 80 },
  { name: "ASA", defaultPrice: 110 }, { name: "TPU", defaultPrice: 130 },
  { name: "Nylon (PA12)", defaultPrice: 180 }, { name: "PC (Policarbonato)", defaultPrice: 200 },
  { name: "PLA Seda", defaultPrice: 95 }, { name: "PLA Marmorizado", defaultPrice: 95 },
  { name: "PLA com Fibra de Carbono", defaultPrice: 220 }, { name: "PETG com Fibra de Vidro", defaultPrice: 180 },
  { name: "Outro (personalizado)", defaultPrice: 80 },
];
const BASE_ADDONS = [
  { id: "keychain",  label: "Chaveiro",          icon: "key", description: "Argola / corrente / mosquetão",           defaultPrice: 1.50 },
  { id: "bag",       label: "Saquinho",           icon: "bag", description: "Saquinho para presente ou entrega",      defaultPrice: 1.50 },
  { id: "tag",       label: "Tag / Etiqueta",     icon: "tag", description: "Tag impressa ou adesiva",               defaultPrice: 0.50 },
  { id: "paint",     label: "Pintura",            icon: "brush", description: "Lixamento, primer, pintura",             defaultPrice: 8.00 },
  { id: "magnet",    label: "Imã",                icon: "magnet", description: "Imã embutido ou colado",                 defaultPrice: 1.00 },
  { id: "glue",      label: "Cola",               icon: "glue", description: "Cola instantânea ou epóxi",              defaultPrice: 0.30 },
  { id: "sandpaper", label: "Lixa",               icon: "sandpaper", description: "Lixa para acabamento superficial",       defaultPrice: 0.50 },
  { id: "shipping",  label: "Embalagem de Envio", icon: "package", description: "Custo médio por peça: caixa + proteção", defaultPrice: 4.00 },
];

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  olive: "#6b7c3a", oliveDark: "#4e5c29", oliveLight: "#8a9d4a",
  bg: "#f5f4ef", surface: "#ffffff", surface2: "#f0efe8",
  text: "#2a2d1e", textMuted: "#7a8060", textLight: "#a8ad8f", border: "#e0ddd3",
};
const fmt     = (v) => Number(v).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d) => new Date(d).toLocaleDateString("pt-BR");
const addDays = (d, n) => { const r = new Date(d); r.setDate(r.getDate() + n); return r; };
const newId   = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// ─── AUTH / STORAGE ───────────────────────────────────────────────────────────
const hashPw = async (pw) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw + "casa_oliver_2024"));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,"0")).join("");
};
const db = {
  async get(key)       { try { const r = await window.storage.get(key); return r ? JSON.parse(r.value) : null; } catch { return null; } },
  async set(key, val)  { await window.storage.set(key, JSON.stringify(val)); },
  async getUser(em)    { return db.get(`user:${em.toLowerCase()}`); },
  async setUser(em, d) { return db.set(`user:${em.toLowerCase()}`, d); },
  async getProfile(em) { return db.get(`profile:${em.toLowerCase()}`); },
  async setProfile(em,d){ return db.set(`profile:${em.toLowerCase()}`, d); },
  async getProducts(em){ return (await db.get(`products:${em.toLowerCase()}`)) || []; },
  async setProducts(em,d){ return db.set(`products:${em.toLowerCase()}`, d); },
  async getTemplates(em){ return (await db.get(`templates:${em.toLowerCase()}`)) || []; },
  async setTemplates(em,d){ return db.set(`templates:${em.toLowerCase()}`, d); },
  async getQuoteHistory(em){ return (await db.get(`quotes:${em.toLowerCase()}`)) || []; },
  async setQuoteHistory(em,d){ return db.set(`quotes:${em.toLowerCase()}`, d); },
};

// ─── INPUTS ───────────────────────────────────────────────────────────────────
function MoneyInput({ value, onChange, style = {} }) {
  const [raw, setRaw] = useState(() => Math.round(value * 100).toString());
  const [focused, setFocused] = useState(false);
  const prev = useRef(value);
  if (prev.current !== value && !focused) { prev.current = value; const n = Math.round(value*100).toString(); if (n !== raw) setRaw(n); }
  const display = () => (parseInt(raw||"0",10)/100).toLocaleString("pt-BR",{minimumFractionDigits:2,maximumFractionDigits:2});
  const onKey = (e) => {
    if (e.key==="Backspace"){e.preventDefault();const n=raw.slice(0,-1)||"0";setRaw(n);onChange(parseInt(n,10)/100);}
    else if(e.key>="0"&&e.key<="9"){e.preventDefault();const n=raw==="0"?e.key:raw+e.key;if(n.length>10)return;setRaw(n);onChange(parseInt(n,10)/100);}
  };
  return <input type="text" inputMode="numeric" value={display()} onKeyDown={onKey} onChange={()=>{}} onFocus={e=>{setFocused(true);e.target.select();}} onBlur={()=>setFocused(false)} style={{background:C.surface2,border:`1.5px solid ${focused?C.olive:C.border}`,borderRadius:"8px",padding:"8px 10px",color:C.text,fontSize:"14px",fontFamily:"monospace",width:"100%",outline:"none",...style}} />;
}
function NumInput({ value, onChange, min = 0 }) {
  const [focused, setFocused] = useState(false);
  const [disp, setDisp] = useState(value.toString());
  const prev = useRef(value);
  if (!focused && prev.current !== value) { prev.current = value; setDisp(value.toString()); }
  return <input type="text" inputMode="decimal" value={disp} onFocus={()=>{setFocused(true);setDisp(value.toString());}} onBlur={()=>{setFocused(false);const p=parseFloat(disp);if(isNaN(p)||disp.trim()==="")setDisp(value.toString());else{const c=Math.max(min,p);onChange(c);setDisp(c.toString());prev.current=c;}}} onChange={e=>setDisp(e.target.value)} style={{background:C.surface2,border:`1.5px solid ${focused?C.olive:C.border}`,borderRadius:"8px",padding:"8px 10px",color:C.text,fontSize:"14px",fontFamily:"monospace",width:"100%",outline:"none"}} />;
}
function SliderField({ label, value, onChange, min, max, step=1, prefix="", suffix="", isMonetary=false }) {
  return (
    <div style={{marginBottom:"14px"}}>
      <label style={{display:"block",fontSize:"11px",color:C.textMuted,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"6px",fontFamily:"monospace"}}>{label}</label>
      <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
        {prefix&&<span style={{color:C.olive,fontSize:"13px",fontFamily:"monospace",flexShrink:0}}>{prefix}</span>}
        <div style={{flex:1}}>
          {isMonetary?<MoneyInput value={value} onChange={onChange}/>:<NumInput value={value} onChange={onChange} min={min}/>}
          <input type="range" min={min} max={max} step={step} value={Math.min(value,max)} onChange={e=>onChange(isMonetary?parseFloat(e.target.value):step<1?parseFloat(e.target.value):parseInt(e.target.value))} style={{width:"100%",marginTop:"6px",accentColor:C.olive,cursor:"pointer"}}/>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:C.textLight,fontFamily:"monospace",marginTop:"1px"}}>
            <span>{prefix}{isMonetary?fmt(min):min}{suffix}</span><span>{prefix}{isMonetary?fmt(max):max}{suffix}</span>
          </div>
        </div>
        {suffix&&<span style={{color:C.textMuted,fontSize:"12px",fontFamily:"monospace",flexShrink:0}}>{suffix}</span>}
      </div>
    </div>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <div style={{marginBottom:"13px"}}>
      {label&&<label style={{display:"block",fontSize:"11px",color:C.textMuted,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px",fontFamily:"monospace"}}>{label}</label>}
      <select value={value} onChange={e=>onChange(e.target.value)} style={{background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"8px",padding:"8px 32px 8px 10px",color:C.text,fontSize:"13px",fontFamily:"monospace",width:"100%",outline:"none",cursor:"pointer",appearance:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%236b7c3a' d='M5 7L0 2h10z'/%3E%3C/svg%3E")`,backgroundRepeat:"no-repeat",backgroundPosition:"right 10px center"}}>
        {options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
function CollapsibleSection({ title, icon, children, advanced, badge }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"14px",padding:"16px 18px",marginBottom:"12px"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:children?"12px":"0"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          <Icon name={icon} size={18} color={C.olive}/>
          <h3 style={{margin:0,fontSize:"11px",letterSpacing:"2.5px",textTransform:"uppercase",color:C.olive,fontFamily:"monospace"}}>{title}</h3>
          {badge&&<span style={{background:`${C.olive}20`,color:C.olive,fontSize:"10px",padding:"2px 8px",borderRadius:"10px",fontFamily:"monospace"}}>{badge}</span>}
        </div>
        {advanced&&<button onClick={()=>setOpen(o=>!o)} style={{background:open?`${C.olive}18`:C.surface2,border:`1px solid ${open?C.olive:C.border}`,borderRadius:"20px",padding:"4px 12px",cursor:"pointer",fontSize:"11px",color:open?C.olive:C.textMuted,fontFamily:"monospace"}}>{open?"▲ menos":"▼ mais"}</button>}
      </div>
      {children}
      {advanced&&open&&<div style={{borderTop:`1px dashed ${C.border}`,paddingTop:"14px",marginTop:"4px"}}>{advanced}</div>}
    </div>
  );
}
function AddonRow({ addon, state, onToggle, onFieldChange, onRemove }) {
  const a = state;
  return (
    <div style={{marginBottom:"8px",border:`1.5px solid ${a.enabled?C.olive:C.border}`,borderRadius:"10px",overflow:"hidden",background:a.enabled?`${C.olive}09`:C.surface}}>
      <div onClick={onToggle} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 13px",cursor:"pointer",userSelect:"none"}}>
        <div style={{width:"20px",height:"20px",borderRadius:"5px",flexShrink:0,border:`2px solid ${a.enabled?C.olive:"#c0bdb0"}`,background:a.enabled?C.olive:"transparent",display:"flex",alignItems:"center",justifyContent:"center"}}>
          {a.enabled&&<Icon name="check" size={12} color="#fff"/>}
        </div>
        <Icon name={addon.icon} size={18} color={C.olive}/>
        <div style={{flex:1}}><div style={{fontSize:"13px",color:C.text,fontWeight:a.enabled?"bold":"normal"}}>{addon.label}</div><div style={{fontSize:"10px",color:C.textLight}}>{addon.description}</div></div>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {a.enabled&&<span style={{fontSize:"12px",color:C.olive,fontWeight:"bold",fontFamily:"monospace"}}>R$ {fmt(a.qty*a.unitPrice)}</span>}
          {onRemove&&<span onClick={e=>{e.stopPropagation();onRemove();}} style={{fontSize:"14px",color:C.textLight,cursor:"pointer",padding:"2px 4px"}}>✕</span>}
        </div>
      </div>
      {a.enabled&&(
        <div style={{padding:"0 13px 12px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px",borderTop:`1px solid ${C.olive}20`}}>
          <div><label style={{display:"block",fontSize:"10px",color:C.textMuted,letterSpacing:"1px",textTransform:"uppercase",margin:"8px 0 4px"}}>Qtd.</label><NumInput value={a.qty} min={1} onChange={v=>onFieldChange("qty",Math.round(v))}/></div>
          <div><label style={{display:"block",fontSize:"10px",color:C.textMuted,letterSpacing:"1px",textTransform:"uppercase",margin:"8px 0 4px"}}>Custo unit. (R$)</label><MoneyInput value={a.unitPrice} onChange={v=>onFieldChange("unitPrice",v)}/></div>
        </div>
      )}
    </div>
  );
}

// ─── QUOTE HTML BUILDER ───────────────────────────────────────────────────────
function buildQuoteHTML(q) {
  const { companyName, companyContact, logoDataUrl, clientName, validityDays, observations, items, activeAddons, taxRate, today } = q;
  const logoSrc   = logoDataUrl || `data:image/png;base64,${COMPANY_LOGO_B64}`;
  const validUntil= addDays(today, validityDays);
  const qNum      = `ORC-${new Date(today).getFullYear()}${String(new Date(today).getMonth()+1).padStart(2,"0")}${String(new Date(today).getDate()).padStart(2,"0")}-${Math.floor(Math.random()*9000+1000)}`;
  const grandTotal= items.reduce((s,i)=>s+(i.finalPrice*i.quantity),0);

  const itemRows = items.map(it=>`
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e0ddd3;font-weight:600;">${it.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0ddd3;text-align:center;">${it.quantity}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0ddd3;text-align:right;font-family:monospace;">R$ ${fmt(it.finalPrice)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e0ddd3;text-align:right;font-weight:700;font-family:monospace;">R$ ${fmt(it.finalPrice*it.quantity)}</td>
    </tr>
    ${it.discountAmount>0?`<tr><td colspan="2" style="padding:6px 12px;font-size:12px;color:#c0392b;">Desconto${it.discountType==="percent"?` (${it.discountValue}%)`:""}:</td><td style="padding:6px 12px;text-align:right;color:#c0392b;font-family:monospace;">−R$ ${fmt(it.discountAmount)}</td><td style="padding:6px 12px;text-align:right;font-weight:700;color:#c0392b;font-family:monospace;">−R$ ${fmt(it.discountAmount*it.quantity)}</td></tr>`:""}
  `).join("");

  const addonsRows = activeAddons.length>0 ? activeAddons.map(a=>`<tr><td style="padding:7px 12px;border-bottom:1px solid #eee;font-size:12px;color:#7a8060;">${a.label}</td><td style="padding:7px 12px;border-bottom:1px solid #eee;font-size:12px;text-align:right;">${a.qty}x — R$ ${fmt(a.qty*a.unitPrice)}</td></tr>`).join("") : "";

  return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Orcamento ${qNum}</title>
<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;background:#f0efe8;color:#2a2d1e;-webkit-print-color-adjust:exact;print-color-adjust:exact;}.page{max-width:760px;margin:0 auto;background:#fff;}.tb{background:#4e5c29;padding:12px 20px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;}.tb button{background:#fff;border:none;border-radius:6px;color:#4e5c29;padding:9px 22px;font-size:14px;font-weight:700;cursor:pointer;}@media print{.tb{display:none!important;}body{background:#fff;}.page{max-width:100%;}}</style>
</head><body onload="setTimeout(()=>window.print(),600)">
<div class="tb"><span style="color:#fff;font-size:13px;font-weight:bold;">${qNum}</span><button onclick="window.print()">Imprimir / Salvar PDF</button></div>
<div class="page">
<div style="background:#6b7c3a;padding:28px 36px;display:flex;justify-content:space-between;align-items:center;">
  <img src="${logoSrc}" style="max-height:64px;max-width:180px;object-fit:contain;"/>
  <div style="text-align:right;"><div style="font-size:10px;color:rgba(255,255,255,0.6);text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">Orcamento</div><div style="font-size:20px;font-weight:800;color:#fff;">${qNum}</div>${companyContact?`<div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:6px;line-height:1.6;">${companyContact.replace(/\n/g,"<br/>")}</div>`:""}</div>
</div>
<div style="background:#4e5c29;padding:10px 36px;display:flex;gap:40px;">
  <div><div style="font-size:10px;color:rgba(255,255,255,0.55);text-transform:uppercase;">Emissao</div><div style="font-size:13px;color:#fff;font-weight:600;">${fmtDate(today)}</div></div>
  <div><div style="font-size:10px;color:rgba(255,255,255,0.55);text-transform:uppercase;">Valido ate</div><div style="font-size:13px;color:#fff;font-weight:600;">${fmtDate(validUntil)}</div></div>
  ${clientName?`<div><div style="font-size:10px;color:rgba(255,255,255,0.55);text-transform:uppercase;">Cliente</div><div style="font-size:13px;color:#fff;font-weight:600;">${clientName}</div></div>`:""}
</div>
<div style="padding:32px 36px;">
<div style="background:#f5f4ef;border-radius:12px;padding:24px;margin-bottom:24px;">
<table style="width:100%;border-collapse:collapse;">
<thead><tr style="border-bottom:2px solid #6b7c3a;">
  <th style="text-align:left;padding:8px 12px;font-size:11px;color:#6b7c3a;text-transform:uppercase;">Produto</th>
  <th style="text-align:center;padding:8px 12px;font-size:11px;color:#6b7c3a;text-transform:uppercase;">Qtd.</th>
  <th style="text-align:right;padding:8px 12px;font-size:11px;color:#6b7c3a;text-transform:uppercase;">Unit.</th>
  <th style="text-align:right;padding:8px 12px;font-size:11px;color:#6b7c3a;text-transform:uppercase;">Total</th>
</tr></thead>
<tbody>${itemRows}</tbody>
</table>
<div style="display:flex;justify-content:flex-end;margin-top:16px;">
  <div style="background:#6b7c3a;border-radius:10px;padding:16px 24px;text-align:right;min-width:220px;">
    <div style="font-size:10px;color:rgba(255,255,255,0.65);text-transform:uppercase;letter-spacing:2px;margin-bottom:4px;">Total Geral</div>
    <div style="font-size:28px;font-weight:800;color:#fff;">R$ ${fmt(grandTotal)}</div>
    ${taxRate>0?`<div style="font-size:10px;color:rgba(255,255,255,0.6);margin-top:2px;">Inclui ${taxRate}% impostos</div>`:""}
  </div>
</div>
</div>
${addonsRows?`<div style="margin-bottom:24px;"><div style="font-size:10px;color:#7a8060;text-transform:uppercase;letter-spacing:2px;margin-bottom:10px;">Itens Incluidos</div><table style="width:100%;border-collapse:collapse;background:#f5f4ef;border-radius:10px;overflow:hidden;">${addonsRows}</table></div>`:""}
${observations?`<div style="border-left:3px solid #6b7c3a;padding:14px 18px;background:#f5f4ef;border-radius:0 8px 8px 0;margin-bottom:24px;"><div style="font-size:10px;color:#6b7c3a;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px;">Observacoes</div><div style="font-size:13px;color:#4a4d3a;line-height:1.6;white-space:pre-wrap;">${observations}</div></div>`:""}
<div style="background:#fff8e6;border:1px solid #e8d87a;border-radius:8px;padding:12px 16px;margin-bottom:24px;">Valido por <strong>${validityDays} dias</strong> ate <strong>${fmtDate(validUntil)}</strong>.</div>
<div style="border-top:1px solid #e0ddd3;padding-top:18px;display:flex;justify-content:space-between;">
  <div style="font-size:11px;color:#a8ad8f;">Gerado com Calculadora de Impressao 3D FDM</div>
  <div style="font-size:11px;color:#7a8060;">${companyName||"Casa Oliver"} - ${fmtDate(today)}</div>
</div>
</div></div></body></html>`;
}

// ─── QUOTE PREVIEW ────────────────────────────────────────────────────────────
function QuotePreview({ quoteObj, onBack }) {
  const printHref = "data:text/html;charset=utf-8," + encodeURIComponent(buildQuoteHTML(quoteObj));
  const items = quoteObj.items || [];
  const grandTotal = items.reduce((s,i)=>s+(i.finalPrice*i.quantity),0);
  const logoSrc = quoteObj.logoDataUrl || `data:image/png;base64,${COMPANY_LOGO_B64}`;
  const validUntil = addDays(quoteObj.today, quoteObj.validityDays);

  return (
    <div style={{minHeight:"100vh",fontFamily:"monospace"}}>
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:"#4e5c29",padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"8px",boxShadow:"0 2px 12px rgba(0,0,0,0.3)",flexWrap:"wrap"}}>
        <button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"8px",color:"#fff",padding:"9px 18px",cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"600"}}>← Voltar</button>
        <span style={{color:"#fff",fontSize:"13px",fontWeight:"bold",letterSpacing:"1px"}}>PRÉVIA DO ORÇAMENTO</span>
        <a href={printHref} target="_blank" rel="noopener noreferrer" style={{background:"#fff",border:"none",borderRadius:"8px",color:"#4e5c29",padding:"8px 14px",cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"bold",textDecoration:"none",display:"inline-block"}}><Icon name="printer" size={15} color="#4e5c29"/> Imprimir / Salvar PDF</a>
      </div>
      <div style={{background:"#e8e6de",minHeight:"100vh",paddingTop:"64px",paddingBottom:"40px"}}>
        <div style={{maxWidth:"760px",margin:"0 auto",background:"#fff",boxShadow:"0 4px 32px rgba(0,0,0,0.18)"}}>
          <div style={{background:"#6b7c3a",padding:"28px 36px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <img src={logoSrc} alt="logo" style={{maxHeight:"64px",maxWidth:"180px",objectFit:"contain"}}/>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:"10px",color:"rgba(255,255,255,0.6)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"4px"}}>Orçamento</div>
              <div style={{fontSize:"18px",fontWeight:"800",color:"#fff"}}>Casa Oliver</div>
              {quoteObj.companyContact&&<div style={{fontSize:"11px",color:"rgba(255,255,255,0.75)",marginTop:"6px",lineHeight:"1.6",whiteSpace:"pre-line"}}>{quoteObj.companyContact}</div>}
            </div>
          </div>
          <div style={{background:"#4e5c29",padding:"10px 36px",display:"flex",gap:"40px",flexWrap:"wrap"}}>
            {[["Emissão",fmtDate(quoteObj.today)],["Válido até",fmtDate(validUntil)],quoteObj.clientName?["Cliente",quoteObj.clientName]:null].filter(Boolean).map(([l,v])=>(
              <div key={l}><div style={{fontSize:"10px",color:"rgba(255,255,255,0.55)",textTransform:"uppercase"}}>{l}</div><div style={{fontSize:"13px",color:"#fff",fontWeight:"600"}}>{v}</div></div>
            ))}
          </div>
          <div style={{padding:"32px 36px"}}>
            <div style={{background:"#f5f4ef",borderRadius:"12px",padding:"24px",marginBottom:"24px"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{borderBottom:"2px solid #6b7c3a"}}>
                  {["Produto","Qtd.","Valor unit.","Total"].map((h,i)=><th key={h} style={{padding:"8px 12px",fontSize:"11px",color:"#6b7c3a",textTransform:"uppercase",textAlign:i===0?"left":i===1?"center":"right"}}>{h}</th>)}
                </tr></thead>
                <tbody>
                  {items.map(it=>(
                    <React.Fragment key={it.id}>
                      <tr>
                        <td style={{padding:"10px 12px",borderBottom:"1px solid #e0ddd3",fontWeight:"600"}}>{it.name}</td>
                        <td style={{padding:"10px 12px",borderBottom:"1px solid #e0ddd3",textAlign:"center"}}>{it.quantity}</td>
                        <td style={{padding:"10px 12px",borderBottom:"1px solid #e0ddd3",textAlign:"right",fontFamily:"monospace"}}>R$ {fmt(it.finalPrice)}</td>
                        <td style={{padding:"10px 12px",borderBottom:"1px solid #e0ddd3",textAlign:"right",fontWeight:"700",fontFamily:"monospace"}}>R$ {fmt(it.finalPrice*it.quantity)}</td>
                      </tr>
                      {it.discountAmount>0&&<tr>
                        <td colSpan={2} style={{padding:"6px 12px",fontSize:"12px",color:"#c0392b"}}>Desconto{it.discountType==="percent"?` (${it.discountValue}%)`:""}</td>
                        <td style={{padding:"6px 12px",textAlign:"right",color:"#c0392b",fontFamily:"monospace"}}>−R$ {fmt(it.discountAmount)}</td>
                        <td style={{padding:"6px 12px",textAlign:"right",fontWeight:"700",color:"#c0392b",fontFamily:"monospace"}}>−R$ {fmt(it.discountAmount*it.quantity)}</td>
                      </tr>}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div style={{display:"flex",justifyContent:"flex-end",marginTop:"16px"}}>
                <div style={{background:"#6b7c3a",borderRadius:"10px",padding:"16px 24px",textAlign:"right",minWidth:"220px"}}>
                  <div style={{fontSize:"10px",color:"rgba(255,255,255,0.65)",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"4px"}}>Total Geral</div>
                  <div style={{fontSize:"28px",fontWeight:"800",color:"#fff"}}>R$ {fmt(grandTotal)}</div>
                  {quoteObj.taxRate>0&&<div style={{fontSize:"10px",color:"rgba(255,255,255,0.6)",marginTop:"2px"}}>Inclui {quoteObj.taxRate}% impostos</div>}
                </div>
              </div>
            </div>
            {quoteObj.activeAddons?.length>0&&<div style={{marginBottom:"24px"}}><div style={{fontSize:"10px",color:"#7a8060",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"10px"}}>Itens Incluídos</div><table style={{width:"100%",borderCollapse:"collapse",background:"#f5f4ef",borderRadius:"10px",overflow:"hidden"}}><tbody>{quoteObj.activeAddons.map(a=><tr key={a.id}><td style={{padding:"7px 12px",borderBottom:"1px solid #e8e6de",fontSize:"12px",color:"#7a8060"}}>{a.label}</td><td style={{padding:"7px 12px",borderBottom:"1px solid #e8e6de",fontSize:"12px",textAlign:"right"}}>{a.qty}x — R$ {fmt(a.qty*a.unitPrice)}</td></tr>)}</tbody></table></div>}
            {quoteObj.observations&&<div style={{borderLeft:"3px solid #6b7c3a",padding:"14px 18px",background:"#f5f4ef",borderRadius:"0 8px 8px 0",marginBottom:"24px"}}><div style={{fontSize:"10px",color:"#6b7c3a",textTransform:"uppercase",letterSpacing:"2px",marginBottom:"6px"}}>Observações</div><div style={{fontSize:"13px",color:"#4a4d3a",lineHeight:"1.6",whiteSpace:"pre-wrap"}}>{quoteObj.observations}</div></div>}
            <div style={{background:"#fff8e6",border:"1px solid #e8d87a",borderRadius:"8px",padding:"12px 16px",marginBottom:"24px"}}>⏰ Válido por <strong>{quoteObj.validityDays} dias</strong> até <strong>{fmtDate(validUntil)}</strong>.</div>
            <div style={{borderTop:"1px solid #e0ddd3",paddingTop:"18px",display:"flex",justifyContent:"space-between"}}>
              <div style={{fontSize:"11px",color:"#a8ad8f"}}>Gerado com Calculadora de Impressão 3D FDM</div>
              <div style={{fontSize:"11px",color:"#7a8060"}}>{quoteObj.companyName||"Casa Oliver"} · {fmtDate(quoteObj.today)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── QUOTE MODAL (multi-item) ────────────────────────────────────────────────
function QuoteModal({ onClose, onShowPreview, calcState }) {
  const { finalPrice, material, printerModel, printHours, printMinutes, activeAddons, taxRate, defaultCompanyName, defaultCompanyContact, batchItems = [], unitQty = 1 } = calcState;

  // Pre-populate items: current calc item + any batch items
  const [items, setItems] = useState(() => {
    const current = { id: newId(), name: "", quantity: unitQty, suggestedPrice: finalPrice, useCustomPrice: false, customPrice: finalPrice, discountType: "percent", discountValue: 0 };
    const fromBatch = batchItems.map(b => ({ id: newId(), name: b.name, quantity: b.qty, suggestedPrice: b.price, useCustomPrice: false, customPrice: b.price, discountType: "percent", discountValue: 0 }));
    return [current, ...fromBatch];
  });

  const [clientName,     setClientName]     = useState("");
  const [companyName,    setCompanyName]    = useState(defaultCompanyName);
  const [companyContact, setCompanyContact] = useState(defaultCompanyContact);
  const [logoImg,        setLogoImg]        = useState(null);
  const [validityDays,   setValidityDays]   = useState(7);
  const [observations,   setObservations]   = useState("");
  const [step,           setStep]           = useState(1);
  const logoRef = useRef();

  const handleImg = (e,s) => { const f=e.target.files[0]; if(!f)return; const r=new FileReader(); r.onload=ev=>s(ev.target.result); r.readAsDataURL(f); };

  const updateItem = (id, field, val) => setItems(p => p.map(it => it.id===id ? {...it,[field]:val} : it));
  const addItem    = () => setItems(p => [...p, { id:newId(), name:"", quantity:1, suggestedPrice:finalPrice, useCustomPrice:false, customPrice:finalPrice, discountType:"percent", discountValue:0 }]);
  const removeItem = (id) => setItems(p => p.filter(it => it.id!==id));

  const getItemPrice   = (it) => it.useCustomPrice ? it.customPrice : it.suggestedPrice;
  const getDiscount    = (it) => it.discountType==="percent" ? getItemPrice(it)*(it.discountValue/100) : Math.min(it.discountValue, getItemPrice(it));
  const getFinalPrice  = (it) => getItemPrice(it) - getDiscount(it);
  const getLineTotal   = (it) => getFinalPrice(it) * it.quantity;
  const grandTotal     = items.reduce((s,it) => s + getLineTotal(it), 0);

  const handleGenerate = () => {
    const enriched = items.map(it => ({
      ...it,
      finalPrice: getFinalPrice(it),
      discountAmount: getDiscount(it),
    }));
    onShowPreview({
      companyName, companyContact, logoDataUrl: logoImg,
      clientName, validityDays, observations,
      items: enriched, activeAddons, taxRate,
      today: new Date(),
    });
    onClose();
  };

  const iS = {background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"8px",padding:"9px 12px",color:C.text,fontSize:"14px",fontFamily:"monospace",width:"100%",outline:"none"};
  const lS = {display:"block",fontSize:"11px",color:C.textMuted,letterSpacing:"1px",textTransform:"uppercase",marginBottom:"5px",fontFamily:"monospace"};
  const fb = e=>e.target.style.borderColor=C.olive, bb=e=>e.target.style.borderColor=C.border;
  const allNamed = items.every(it=>it.name.trim());

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(30,35,15,0.55)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000,padding:"0"}}>
      <div style={{background:C.surface,borderRadius:"18px 18px 0 0",width:"100%",maxWidth:"580px",boxShadow:"0 -8px 40px rgba(0,0,0,0.25)",overflow:"hidden",maxHeight:"94vh",display:"flex",flexDirection:"column"}}>
        {/* Header */}
        <div style={{background:C.olive,padding:"18px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div><div style={{fontSize:"16px",fontWeight:"bold",color:"#fff"}}>{step===1 ? <><Icon name="box" size={16} color="#fff"/> Produtos do Orçamento</> : <><Icon name="building" size={16} color="#fff"/> Dados da Empresa</>}</div><div style={{fontSize:"11px",color:"rgba(255,255,255,0.65)",marginTop:"2px"}}>Passo {step} de 2</div></div>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:"8px",color:"#fff",width:"32px",height:"32px",cursor:"pointer",fontSize:"16px"}}>✕</button>
        </div>
        <div style={{display:"flex",height:"4px",flexShrink:0}}><div style={{flex:1,background:C.olive}}/><div style={{flex:1,background:step===2?C.olive:C.border}}/></div>

        {/* Body */}
        <div style={{padding:"20px 24px",overflowY:"auto",flex:1}}>
          {step===1 && <>
            {/* Grand total */}
            <div style={{background:`${C.olive}12`,border:`1.5px solid ${C.olive}30`,borderRadius:"12px",padding:"12px 18px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div><div style={{fontSize:"10px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px"}}>Total do orçamento</div><div style={{fontSize:"22px",fontWeight:"bold",color:C.olive,fontFamily:"monospace"}}>R$ {fmt(grandTotal)}</div></div>
              <div style={{fontSize:"12px",color:C.textMuted}}>{items.length} item(s)</div>
            </div>

            {/* Client name */}
            <div style={{marginBottom:"14px"}}><label style={lS}>Nome do cliente (opcional)</label><input value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Ex: João Silva" style={iS} onFocus={fb} onBlur={bb}/></div>

            {/* Items */}
            {items.map((it,idx)=>(
              <div key={it.id} style={{border:`1.5px solid ${C.border}`,borderRadius:"12px",padding:"14px",marginBottom:"12px",background:C.surface2}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                  <span style={{fontSize:"12px",fontWeight:"bold",color:C.olive,fontFamily:"monospace"}}>ITEM {idx+1}</span>
                  {items.length>1&&<button onClick={()=>removeItem(it.id)} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:"18px",padding:"0 4px"}}>✕</button>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"10px",marginBottom:"10px"}}>
                  <div><label style={{...lS,marginBottom:"4px"}}>Nome do produto *</label><input value={it.name} onChange={e=>updateItem(it.id,"name",e.target.value)} placeholder="Ex: Chaveiro personalizado" style={{...iS,padding:"8px 10px"}} onFocus={fb} onBlur={bb}/></div>
                  <div><label style={{...lS,marginBottom:"4px"}}>Qtd.</label>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <button onClick={()=>updateItem(it.id,"quantity",Math.max(1,it.quantity-1))} style={{width:"30px",height:"36px",borderRadius:"6px",border:`1.5px solid ${C.border}`,background:C.surface,cursor:"pointer",fontSize:"16px",color:C.olive}}>−</button>
                      <input type="number" value={it.quantity} min={1} onChange={e=>updateItem(it.id,"quantity",Math.max(1,parseInt(e.target.value)||1))} style={{...iS,width:"52px",textAlign:"center",padding:"8px 4px"}}/>
                      <button onClick={()=>updateItem(it.id,"quantity",it.quantity+1)} style={{width:"30px",height:"36px",borderRadius:"6px",border:`1.5px solid ${C.border}`,background:C.surface,cursor:"pointer",fontSize:"16px",color:C.olive}}>+</button>
                    </div>
                  </div>
                </div>

                {/* Price control */}
                <div style={{background:C.surface,borderRadius:"8px",padding:"10px 12px",marginBottom:"8px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}}>
                    <span style={{fontSize:"11px",color:C.textMuted,textTransform:"uppercase",letterSpacing:"1px"}}>Preço unitário</span>
                    <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                      <span style={{fontSize:"11px",color:C.textMuted}}>Sugerido: <strong style={{color:C.olive,fontFamily:"monospace"}}>R$ {fmt(it.suggestedPrice)}</strong></span>
                      <label style={{display:"flex",alignItems:"center",gap:"5px",cursor:"pointer",fontSize:"11px",color:C.textMuted}}>
                        <input type="checkbox" checked={it.useCustomPrice} onChange={e=>updateItem(it.id,"useCustomPrice",e.target.checked)} style={{accentColor:C.olive}}/>
                        Usar valor diferente
                      </label>
                    </div>
                  </div>
                  {it.useCustomPrice && (
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <span style={{color:C.olive,fontSize:"13px",fontFamily:"monospace",flexShrink:0}}>R$</span>
                      <MoneyInput value={it.customPrice} onChange={v=>updateItem(it.id,"customPrice",v)}/>
                    </div>
                  )}
                </div>

                {/* Discount */}
                <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"8px",alignItems:"end"}}>
                  <div>
                    <label style={{...lS,marginBottom:"4px"}}>Desconto</label>
                    <div style={{display:"flex",gap:"4px"}}>
                      {[["percent","%"],["fixed","R$"]].map(([t,l])=><button key={t} onClick={()=>{updateItem(it.id,"discountType",t);updateItem(it.id,"discountValue",0);}} style={{padding:"6px 10px",borderRadius:"6px",cursor:"pointer",border:`1px solid ${it.discountType===t?C.olive:C.border}`,background:it.discountType===t?`${C.olive}15`:C.surface,color:it.discountType===t?C.olive:C.textMuted,fontSize:"12px",fontFamily:"monospace"}}>{l}</button>)}
                    </div>
                  </div>
                  <div>
                    <label style={{...lS,marginBottom:"4px"}}>{it.discountType==="percent"?"Desconto (%)":"Desconto (R$)"}</label>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      {it.discountType==="fixed"&&<span style={{color:C.olive,fontSize:"13px",fontFamily:"monospace",flexShrink:0}}>R$</span>}
                      {it.discountType==="percent"?<NumInput value={it.discountValue} onChange={v=>updateItem(it.id,"discountValue",Math.min(100,v))} min={0}/>:<MoneyInput value={it.discountValue} onChange={v=>updateItem(it.id,"discountValue",v)}/>}
                      {it.discountType==="percent"&&<span style={{color:C.textMuted,fontSize:"12px",fontFamily:"monospace"}}>%</span>}
                    </div>
                  </div>
                </div>
                {/* Line summary */}
                <div style={{marginTop:"8px",display:"flex",justifyContent:"space-between",fontSize:"12px",color:C.textMuted}}>
                  <span>Qtd. {it.quantity} × R$ {fmt(getFinalPrice(it))}</span>
                  <strong style={{color:C.olive,fontFamily:"monospace"}}>= R$ {fmt(getLineTotal(it))}</strong>
                </div>
              </div>
            ))}

            {/* Add item button */}
            <button onClick={addItem} style={{width:"100%",padding:"11px",borderRadius:"10px",border:`1.5px dashed ${C.olive}`,background:`${C.olive}08`,color:C.olive,cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"bold",marginBottom:"4px"}}>
              + Adicionar outro produto ao orçamento
            </button>
          </>}

          {step===2 && <>
            <div style={{marginBottom:"14px"}}><label style={lS}>Nome da empresa</label><input value={companyName} onChange={e=>setCompanyName(e.target.value)} style={iS} onFocus={fb} onBlur={bb}/></div>
            <div style={{marginBottom:"14px"}}><label style={lS}>Contato / informações</label><textarea value={companyContact} onChange={e=>setCompanyContact(e.target.value)} placeholder={"WhatsApp: (64) 9 9999-9999\nInstagram: @casaoliver"} rows={4} style={{...iS,resize:"vertical",lineHeight:"1.5"}} onFocus={fb} onBlur={bb}/></div>
            <div style={{marginBottom:"14px"}}><label style={lS}>Logo (opcional)</label>
              <div onClick={()=>logoRef.current.click()} style={{border:`2px dashed ${logoImg?C.olive:C.border}`,borderRadius:"10px",padding:"14px",cursor:"pointer",textAlign:"center",background:logoImg?`${C.olive}08`:C.surface2}}>
                {logoImg?<div style={{position:"relative",display:"inline-block"}}><img src={logoImg} alt="logo" style={{maxHeight:"60px",maxWidth:"180px",objectFit:"contain"}}/><button onClick={e=>{e.stopPropagation();setLogoImg(null);}} style={{position:"absolute",top:"-8px",right:"-8px",background:"#c0392b",color:"#fff",border:"none",borderRadius:"50%",width:"22px",height:"22px",cursor:"pointer",fontSize:"12px"}}>✕</button></div>:<><Icon name="tag" size={22} color={C.textMuted}/><div style={{fontSize:"12px",color:C.textMuted,marginTop:"4px"}}>Trocar logo</div></>}
              </div>
              <input ref={logoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleImg(e,setLogoImg)}/>
            </div>
            <div style={{marginBottom:"14px"}}><label style={lS}>Validade</label>
              <div style={{display:"flex",gap:"8px"}}>
                {[3,7,15,30].map(d=><button key={d} onClick={()=>setValidityDays(d)} style={{flex:1,padding:"8px 4px",borderRadius:"8px",cursor:"pointer",border:`1.5px solid ${validityDays===d?C.olive:C.border}`,background:validityDays===d?`${C.olive}15`:C.surface2,color:validityDays===d?C.olive:C.textMuted,fontSize:"13px",fontWeight:validityDays===d?"bold":"normal",fontFamily:"monospace"}}>{d}d</button>)}
              </div>
            </div>
            <div style={{marginBottom:"14px"}}><label style={lS}>Observações / condições</label><textarea value={observations} onChange={e=>setObservations(e.target.value)} placeholder={"50% no pedido, 50% na entrega.\nPrazo: 3 a 5 dias úteis."} rows={5} style={{...iS,resize:"vertical",lineHeight:"1.5"}} onFocus={fb} onBlur={bb}/></div>
          </>}
        </div>

        {/* Footer */}
        <div style={{padding:"16px 24px",borderTop:`1px solid ${C.border}`,display:"flex",gap:"10px",flexShrink:0,background:C.surface}}>
          <button onClick={step===1?onClose:()=>setStep(1)} style={{flex:1,padding:"12px",borderRadius:"10px",border:`1.5px solid ${C.border}`,background:C.surface2,color:C.text,fontSize:"14px",fontWeight:"600",cursor:"pointer",fontFamily:"monospace"}}>{step===1?"Cancelar":"← Voltar"}</button>
          {step===1
            ?<button onClick={()=>setStep(2)} disabled={!allNamed} style={{flex:2,padding:"12px",borderRadius:"10px",border:"none",background:allNamed?C.olive:C.textLight,color:"#fff",fontSize:"14px",fontWeight:"700",cursor:allNamed?"pointer":"not-allowed",fontFamily:"monospace"}}>Próximo →</button>
            :<button onClick={handleGenerate} style={{flex:2,padding:"12px",borderRadius:"10px",border:"none",background:C.olive,color:"#fff",fontSize:"14px",fontWeight:"700",cursor:"pointer",fontFamily:"monospace"}}><Icon name="doc" size={15} color="#fff"/> Ver Orçamento</button>
          }
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  // Auth
  const [user, setUser]               = useState(null);
  const [showAuthPanel, setShowAuthPanel] = useState(false);
  const [authMode, setAuthMode]       = useState("login");
  const [authEmail, setAuthEmail]     = useState("");
  const [authName, setAuthName]       = useState("");
  const [authPass, setAuthPass]       = useState("");
  const [authConfirm, setAuthConfirm] = useState("");
  const [authError, setAuthError]     = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [saveMsg, setSaveMsg]         = useState("");

  // Calculator
  const [material, setMaterial]               = useState("PLA");
  const [filamentWeight, setFilamentWeight]   = useState(100);
  const [filamentPrice, setFilamentPrice]     = useState(70);
  const [wasteFactor, setWasteFactor]         = useState(5);
  const [printHours, setPrintHours]           = useState(4);
  const [printMinutes, setPrintMinutes]       = useState(30);
  const [printerModel, setPrinterModel]       = useState("Bambu Lab A1 Mini");
  const [customWatts, setCustomWatts]         = useState(200);
  const [kwhPrice, setKwhPrice]               = useState(0.75);
  const [printerCost, setPrinterCost]         = useState(3000);
  const [printerLifespan, setPrinterLifespan] = useState(5000);
  const [lifespanEdited, setLifespanEdited]   = useState(false);
  const [prepHours, setPrepHours]             = useState(0.5);
  const [laborRate, setLaborRate]             = useState(40);
  const [failRate, setFailRate]               = useState(5);
  const [profitMargin, setProfitMargin]       = useState(40);
  const [taxRate, setTaxRate]                 = useState(6);
  const [addonStates, setAddonStates]         = useState(Object.fromEntries(BASE_ADDONS.map(a=>[a.id,{enabled:false,qty:1,unitPrice:a.defaultPrice}])));
  const [customAddons, setCustomAddons]       = useState([]);
  const [newAddonName, setNewAddonName]       = useState("");
  const [savedCompanyName, setSavedCompanyName]       = useState("Casa Oliver");
  const [savedCompanyContact, setSavedCompanyContact] = useState("");

  // Views
  const [showModal, setShowModal]             = useState(false);
  const [quotePreviewObj, setQuotePreviewObj] = useState(null);
  const [activeTab, setActiveTab]             = useState("calc");

  // Custom price override
  const [useCustomPrice, setUseCustomPrice]   = useState(false);
  const [customPriceValue, setCustomPriceValue] = useState(0);
  const [unitQty, setUnitQty]                 = useState(1);

  // Batch mode
  const [batchItems, setBatchItems] = useState([]);
  const [batchName, setBatchName]   = useState("");

  // Saved data
  const [savedProducts, setSavedProducts]   = useState([]);
  const [templates, setTemplates]           = useState([]);
  const [quoteHistory, setQuoteHistory]     = useState([]);
  const [productName, setProductName]       = useState("");
  const [templateName, setTemplateName]     = useState("");
  const [templatePhoto, setTemplatePhoto]   = useState(null);
  const templatePhotoRef = useRef();
  const [historyView, setHistoryView]       = useState(null); // quote object to view

  const [winW, setWinW] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const isMobile = winW < 640;

  useEffect(() => {
    try { const s=sessionStorage.getItem("co_user"); if(s){const u=JSON.parse(s);setUser(u);loadAllData(u.email);} } catch {}
  }, []);

  const loadAllData = async (email) => {
    const p=await db.getProfile(email); if(p)applyProfile(p);
    const prods=await db.getProducts(email); setSavedProducts(prods);
    const tmpl=await db.getTemplates(email); setTemplates(tmpl);
    const hist=await db.getQuoteHistory(email); setQuoteHistory(hist);
  };

  // Auth
  const handleAuthSubmit = async () => {
    setAuthError(""); setAuthLoading(true);
    try {
      if(!authEmail.includes("@")){setAuthError("E-mail inválido.");return;}
      if(authMode==="reset"){
        if(authPass.length<6){setAuthError("Senha mínimo 6 caracteres.");return;}
        if(authPass!==authConfirm){setAuthError("Senhas não coincidem.");return;}
        const ex=await db.getUser(authEmail); if(!ex){setAuthError("E-mail não encontrado.");return;}
        await db.setUser(authEmail,{...ex,hash:await hashPw(authPass)});
        setSaveMsg("✅ Senha redefinida!"); setTimeout(()=>setSaveMsg(""),3000);
        setAuthMode("login"); setAuthPass(""); setAuthConfirm(""); return;
      }
      if(authPass.length<6){setAuthError("Senha mínimo 6 caracteres.");return;}
      const hash=await hashPw(authPass);
      if(authMode==="register"){
        if(!authName.trim()){setAuthError("Informe seu nome.");return;}
        if(authPass!==authConfirm){setAuthError("Senhas não coincidem.");return;}
        if(await db.getUser(authEmail)){setAuthError("E-mail já cadastrado.");return;}
        await db.setUser(authEmail,{email:authEmail,name:authName,hash,createdAt:Date.now()});
        const u={email:authEmail,name:authName}; setUser(u); sessionStorage.setItem("co_user",JSON.stringify(u));
        setShowAuthPanel(false);
      } else {
        const u=await db.getUser(authEmail);
        if(!u||u.hash!==hash){setAuthError("E-mail ou senha incorretos.");return;}
        const ud={email:authEmail,name:u.name}; setUser(ud); sessionStorage.setItem("co_user",JSON.stringify(ud));
        loadAllData(authEmail); setShowAuthPanel(false);
      }
    } catch{setAuthError("Erro inesperado.");}
    finally{setAuthLoading(false);}
  };
  const handleLogout = () => { setUser(null); sessionStorage.removeItem("co_user"); };

  // Profile
  const applyProfile = (p) => {
    if(!p)return;
    if(p.material)setMaterial(p.material);
    if(p.filamentWeight!==undefined)setFilamentWeight(p.filamentWeight);
    if(p.filamentPrice!==undefined)setFilamentPrice(p.filamentPrice);
    if(p.wasteFactor!==undefined)setWasteFactor(p.wasteFactor);
    if(p.printHours!==undefined)setPrintHours(p.printHours);
    if(p.printMinutes!==undefined)setPrintMinutes(p.printMinutes);
    if(p.printerModel)setPrinterModel(p.printerModel);
    if(p.customWatts!==undefined)setCustomWatts(p.customWatts);
    if(p.kwhPrice!==undefined)setKwhPrice(p.kwhPrice);
    if(p.printerCost!==undefined)setPrinterCost(p.printerCost);
    if(p.printerLifespan!==undefined)setPrinterLifespan(p.printerLifespan);
    if(p.prepHours!==undefined)setPrepHours(p.prepHours);
    if(p.laborRate!==undefined)setLaborRate(p.laborRate);
    if(p.failRate!==undefined)setFailRate(p.failRate);
    if(p.profitMargin!==undefined)setProfitMargin(p.profitMargin);
    if(p.taxRate!==undefined)setTaxRate(p.taxRate);
    if(p.companyName)setSavedCompanyName(p.companyName);
    if(p.companyContact)setSavedCompanyContact(p.companyContact);
    if(p.addonStates)setAddonStates(p.addonStates);
    if(p.customAddons)setCustomAddons(p.customAddons);
  };
  const getCurrentProfile = () => ({ material,filamentWeight,filamentPrice,wasteFactor,printHours,printMinutes,printerModel,customWatts,kwhPrice,printerCost,printerLifespan,prepHours,laborRate,failRate,profitMargin,taxRate,addonStates,customAddons,companyName:savedCompanyName,companyContact:savedCompanyContact,savedAt:Date.now() });
  const saveProfile = async () => {
    if(!user)return;
    await db.setProfile(user.email, getCurrentProfile());
    setSaveMsg("✅ Salvo!"); setTimeout(()=>setSaveMsg(""),2500);
  };

  // Products
  const saveProduct = async () => {
    if(!productName.trim())return;
    const entry={id:newId(),name:productName.trim(),finalPrice,material,printerModel,printHours,printMinutes,profitMargin,taxRate,savedAt:new Date().toLocaleDateString("pt-BR")};
    const updated=[entry,...savedProducts].slice(0,100);
    setSavedProducts(updated);
    if(user) await db.setProducts(user.email,updated);
    setProductName(""); setSaveMsg("✅ Produto salvo!"); setTimeout(()=>setSaveMsg(""),2500);
  };
  const deleteProduct = async (id) => { const u=savedProducts.filter(p=>p.id!==id); setSavedProducts(u); if(user)await db.setProducts(user.email,u); };
  const loadProductCalc = (p) => {
    if(p.material){setMaterial(p.material);const m=MATERIALS.find(x=>x.name===p.material);if(m)setFilamentPrice(m.defaultPrice);}
    if(p.printerModel){setPrinterModel(p.printerModel);const pr=PRINTERS.find(x=>x.name===p.printerModel);if(pr?.lifespan)setPrinterLifespan(pr.lifespan);}
    if(p.printHours!==undefined)setPrintHours(p.printHours);
    if(p.printMinutes!==undefined)setPrintMinutes(p.printMinutes);
    if(p.profitMargin!==undefined)setProfitMargin(p.profitMargin);
    if(p.taxRate!==undefined)setTaxRate(p.taxRate);
    setActiveTab("calc");
  };

  // Templates
  const saveTemplate = async () => {
    if(!templateName.trim())return;
    const t={id:newId(),name:templateName.trim(),photo:templatePhoto,...getCurrentProfile(),savedAt:new Date().toLocaleDateString("pt-BR")};
    const updated=[t,...templates].slice(0,50);
    setTemplates(updated);
    if(user)await db.setTemplates(user.email,updated);
    setTemplateName(""); setTemplatePhoto(null);
    setSaveMsg("✅ Template salvo!"); setTimeout(()=>setSaveMsg(""),2500);
  };
  const loadTemplate = (t) => { applyProfile(t); setActiveTab("calc"); setSaveMsg("✅ Template carregado!"); setTimeout(()=>setSaveMsg(""),2500); };
  const deleteTemplate = async (id) => { const u=templates.filter(t=>t.id!==id); setTemplates(u); if(user)await db.setTemplates(user.email,u); };

  // Quote history
  const saveQuoteToHistory = async (quoteObj) => {
    const entry={...quoteObj,id:newId(),savedAt:Date.now()};
    const updated=[entry,...quoteHistory].slice(0,100);
    setQuoteHistory(updated);
    if(user)await db.setQuoteHistory(user.email,updated);
  };
  const deleteQuote = async (id) => { const u=quoteHistory.filter(q=>q.id!==id); setQuoteHistory(u); if(user)await db.setQuoteHistory(user.email,u); };

  // Addon helpers
  const toggleAddon   =(id)=>setAddonStates(p=>({...p,[id]:{...p[id],enabled:!p[id].enabled}}));
  const setAddonField =(id,f,v)=>setAddonStates(p=>({...p,[id]:{...p[id],[f]:v}}));
  const toggleCustom  =(id)=>setCustomAddons(p=>p.map(a=>a.id===id?{...a,enabled:!a.enabled}:a));
  const setCustomField=(id,f,v)=>setCustomAddons(p=>p.map(a=>a.id===id?{...a,[f]:v}:a));
  const removeCustom  =(id)=>setCustomAddons(p=>p.filter(a=>a.id!==id));
  const addCustomAddon=()=>{const n=newAddonName.trim();if(!n)return;setCustomAddons(p=>[...p,{id:"c_"+newId(),label:n,icon:"➕",description:"Item personalizado",unitPrice:1,qty:1,enabled:true}]);setNewAddonName("");};
  const handlePrinterChange=(name)=>{setPrinterModel(name);const p=PRINTERS.find(x=>x.name===name);if(p?.lifespan&&!lifespanEdited)setPrinterLifespan(p.lifespan);setLifespanEdited(false);};
  const handleMaterialChange=(name)=>{setMaterial(name);const m=MATERIALS.find(x=>x.name===name);if(m)setFilamentPrice(m.defaultPrice);};

  // Derived
  const printer    = PRINTERS.find(p=>p.name===printerModel);
  const watts      = printer?.watts??customWatts;
  const totalHours = printHours+printMinutes/60;
  const materialCost    =(filamentWeight/1000)*filamentPrice*(1+wasteFactor/100);
  const energyCost      =(watts/1000)*totalHours*kwhPrice;
  const depreciationCost=printerLifespan>0?(printerCost/printerLifespan)*totalHours:0;
  const laborCost       =prepHours*laborRate;
  const failCost        =(materialCost+energyCost+depreciationCost)*(failRate/100);
  const addonCost       =BASE_ADDONS.reduce((s,a)=>s+(addonStates[a.id]?.enabled?addonStates[a.id].unitPrice*addonStates[a.id].qty:0),0)+customAddons.reduce((s,a)=>s+(a.enabled?a.unitPrice*a.qty:0),0);
  const subtotal   =materialCost+energyCost+depreciationCost+laborCost+failCost+addonCost;
  const profit     =subtotal*(profitMargin/100);
  const preSaleTax =subtotal+profit;
  const finalPrice =taxRate<100?preSaleTax/(1-taxRate/100):preSaleTax;
  const taxValue   =finalPrice-preSaleTax;
  // Effective price: uses custom override if enabled, otherwise calculated
  const effectivePrice = useCustomPrice ? customPriceValue : finalPrice;
  const activeAddons=[...BASE_ADDONS.filter(a=>addonStates[a.id]?.enabled).map(a=>({...a,...addonStates[a.id]})),...customAddons.filter(a=>a.enabled)];
  const costItems=[
    {label:"Material",value:materialCost,color:C.olive},{label:"Energia",value:energyCost,color:"#8a9d4a"},
    {label:"Depreciação",value:depreciationCost,color:"#a0a86a"},{label:"Mão de obra",value:laborCost,color:"#7a9040"},
    {label:"Falhas",value:failCost,color:"#b8b080"},{label:"Agregados",value:addonCost,color:"#5c8c3a"},
    ...(taxRate>0?[{label:"Imposto",value:taxValue,color:"#9a7040"}]:[]),
  ];
  const barMax=Math.max(...costItems.map(i=>i.value),0.01);

  if(quotePreviewObj) return <QuotePreview quoteObj={quotePreviewObj} onBack={()=>setQuotePreviewObj(null)}/>;
  if(historyView) return <QuotePreview quoteObj={historyView} onBack={()=>setHistoryView(null)}/>;

  const iS={background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"7px",padding:"8px 11px",color:C.text,fontSize:"13px",fontFamily:"monospace",outline:"none",width:"100%"};
  const TABS=[["calc","calc","Calculadora"],["products","folder","Produtos"],["templates","star","Templates"],["history","history","Histórico"]];

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,fontFamily:"monospace"}}>
      <style>{`
        * { box-sizing: border-box; }
        input, select, textarea, button { font-size: 16px !important; }
        @media (min-width: 640px) { input, select, textarea, button { font-size: inherit !important; } }
        input[type=range] { height: 20px; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #6b7c3a55; border-radius: 2px; }
      `}</style>

      {/* HEADER */}
      <div style={{background:C.olive,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",background:"rgba(255,255,255,0.07)",borderRadius:"50%",pointerEvents:"none"}}/>
        <div style={{maxWidth:"980px",margin:"0 auto",padding:"14px 16px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
          <img src={`data:image/png;base64,${COMPANY_LOGO_B64}`} alt="Casa Oliver" style={{height:"40px",objectFit:"contain",filter:"brightness(0) invert(1)"}}/>
          <div style={{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",justifyContent:"flex-end"}}>
            {saveMsg&&<span style={{fontSize:"11px",color:"rgba(255,255,255,0.9)",background:"rgba(255,255,255,0.15)",padding:"4px 10px",borderRadius:"20px"}}>{saveMsg}</span>}
            {user?(
              <>
                {!isMobile&&<button onClick={saveProfile} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"8px",color:"#fff",padding:"7px 14px",cursor:"pointer",fontSize:"12px",fontFamily:"monospace",fontWeight:"600"}}>💾 Salvar predefinições</button>}
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:"12px",color:"rgba(255,255,255,0.9)",fontWeight:"bold",display:"flex",alignItems:"center",gap:"5px"}}><Icon name="user" size={14} color="rgba(255,255,255,0.9)"/> {user.name}</div>
                  <div style={{display:"flex",gap:"8px",justifyContent:"flex-end"}}>
                    {isMobile&&<button onClick={saveProfile} style={{background:"none",border:"none",color:"rgba(255,255,255,0.7)",fontSize:"11px",cursor:"pointer",fontFamily:"monospace",padding:0,textDecoration:"underline"}}><Icon name="save" size={14} color="#fff"/> Salvar predefinição</button>}
                    <button onClick={handleLogout} style={{background:"none",border:"none",color:"rgba(255,255,255,0.6)",fontSize:"11px",cursor:"pointer",fontFamily:"monospace",padding:0,textDecoration:"underline"}}>Sair</button>
                  </div>
                </div>
              </>
            ):(
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                {!isMobile&&<span style={{fontSize:"11px",color:"rgba(255,255,255,0.7)"}}>Faça login para salvar suas predefinições</span>}
                <button onClick={()=>{setShowAuthPanel(v=>!v);setAuthError("");}} style={{background:"rgba(255,255,255,0.18)",border:"1px solid rgba(255,255,255,0.3)",borderRadius:"8px",color:"#fff",padding:"7px 14px",cursor:"pointer",fontSize:"12px",fontFamily:"monospace",fontWeight:"600"}}>{showAuthPanel ? "✕ Fechar" : <><Icon name="lock" size={13} color="#fff" />{" Entrar"}</>}</button>
              </div>
            )}
          </div>
        </div>

        {showAuthPanel&&!user&&(
          <div style={{background:"rgba(0,0,0,0.25)",borderTop:"1px solid rgba(255,255,255,0.15)",padding:"20px 24px"}}>
            <div style={{maxWidth:"480px",margin:"0 auto"}}>
              <div style={{display:"flex",gap:"8px",marginBottom:"16px"}}>
                {[["login","Entrar"],["register","Criar conta"],["reset","Redefinir senha"]].map(([m,l])=>(
                  <button key={m} onClick={()=>{setAuthMode(m);setAuthError("");setAuthPass("");setAuthConfirm("");}} style={{flex:1,padding:"8px 4px",borderRadius:"8px",cursor:"pointer",border:`1.5px solid ${authMode===m?"rgba(255,255,255,0.6)":"rgba(255,255,255,0.2)"}`,background:authMode===m?"rgba(255,255,255,0.2)":"transparent",color:"#fff",fontSize:"12px",fontWeight:authMode===m?"bold":"normal",fontFamily:"monospace"}}>{l}</button>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":`1fr 1fr`,gap:"8px",marginBottom:"8px"}}>
                {authMode==="register"&&<input placeholder="Seu nome" value={authName} onChange={e=>setAuthName(e.target.value)} style={iS} onFocus={e=>e.target.style.borderColor="#fff"} onBlur={e=>e.target.style.borderColor=C.border}/>}
                <input type="email" placeholder="E-mail" value={authEmail} onChange={e=>setAuthEmail(e.target.value)} style={iS} onFocus={e=>e.target.style.borderColor="#fff"} onBlur={e=>e.target.style.borderColor=C.border}/>
                <input type="password" placeholder={authMode==="reset"?"Nova senha":"Senha"} value={authPass} onChange={e=>setAuthPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAuthSubmit()} style={iS} onFocus={e=>e.target.style.borderColor="#fff"} onBlur={e=>e.target.style.borderColor=C.border}/>
                {(authMode==="register"||authMode==="reset")&&<input type="password" placeholder="Confirmar senha" value={authConfirm} onChange={e=>setAuthConfirm(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleAuthSubmit()} style={iS} onFocus={e=>e.target.style.borderColor="#fff"} onBlur={e=>e.target.style.borderColor=C.border}/>}
              </div>
              {authMode==="reset"&&<div style={{fontSize:"11px",color:"rgba(255,255,255,0.6)",marginBottom:"8px"}}><Icon name="key" size={13} color="rgba(255,255,255,0.6)"/> Seus dados salvos serão mantidos.</div>}
              {authError&&<div style={{background:"rgba(192,57,43,0.3)",border:"1px solid rgba(192,57,43,0.5)",borderRadius:"6px",padding:"8px 12px",marginBottom:"8px",fontSize:"12px",color:"#ffdddd"}}>⚠️ {authError}</div>}
              <button onClick={handleAuthSubmit} disabled={authLoading} style={{width:"100%",padding:"10px",background:authLoading?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.9)",color:C.oliveDark,border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"bold",cursor:authLoading?"not-allowed":"pointer",fontFamily:"monospace"}}>
                {authLoading?"Aguarde...":authMode==="login"?"Entrar":authMode==="register"?"Criar conta":"Redefinir senha"}
              </button>
            </div>
          </div>
        )}

        {/* Nav tabs */}
        <div style={{maxWidth:"980px",margin:"0 auto",padding:"0 8px",display:"flex",gap:"2px",borderTop:"1px solid rgba(255,255,255,0.12)",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
          {TABS.map(([id,iconName,label])=>(
            <button key={id} onClick={()=>setActiveTab(id)} style={{padding:isMobile?"10px 12px":"10px 16px",background:activeTab===id?"rgba(255,255,255,0.15)":"transparent",border:"none",borderBottom:activeTab===id?"2px solid #fff":"2px solid transparent",color:activeTab===id?"#fff":"rgba(255,255,255,0.65)",cursor:"pointer",fontSize:isMobile?"11px":"12px",fontFamily:"monospace",fontWeight:activeTab===id?"bold":"normal",whiteSpace:"nowrap",flexShrink:0,display:"flex",alignItems:"center",gap:"5px"}}><Icon name={iconName==="calc"?"chart":iconName} size={14} color={activeTab===id?"#fff":"rgba(255,255,255,0.65)"}/>{label}</button>
          ))}
        </div>
      </div>

      {/* ── TAB: CALCULADORA ── */}
      {activeTab==="calc"&&(
        <div style={{maxWidth:"980px",margin:"0 auto",padding:isMobile?"16px 12px":"24px 16px",display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"14px"}}>
          {/* LEFT */}
          <div>
            <CollapsibleSection title="Material Usado" icon="thread" advanced={<><Select label="Tipo de filamento" value={material} onChange={handleMaterialChange} options={MATERIALS.map(m=>({value:m.name,label:m.name}))}/><SliderField label="Preço do filamento" value={filamentPrice} onChange={setFilamentPrice} min={30} max={400} step={5} isMonetary prefix="R$" suffix="/kg"/><SliderField label="Desperdício / suporte" value={wasteFactor} onChange={setWasteFactor} min={0} max={30} step={0.5} suffix="%"/></>}>
              <SliderField label="Peso utilizado" value={filamentWeight} onChange={setFilamentWeight} min={1} max={1000} step={1} suffix="g"/>
            </CollapsibleSection>

            <CollapsibleSection title="Tempo de Impressão" icon="clock">
              <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:"10px"}}>
                <SliderField label="Horas" value={printHours} onChange={setPrintHours} min={0} max={48} step={1} suffix="h"/>
                <SliderField label="Minutos" value={printMinutes} onChange={v=>setPrintMinutes(Math.min(59,v))} min={0} max={59} step={5} suffix="min"/>
              </div>
            </CollapsibleSection>

            <CollapsibleSection title="Energia Elétrica" icon="bolt" advanced={<><Select label="Modelo da impressora" value={printerModel} onChange={handlePrinterChange} options={PRINTERS.map(p=>({value:p.name,label:p.watts?`${p.name} — ${p.watts}W`:p.name}))}/>{printer?.watts!=null?<div style={{background:`${C.olive}12`,border:`1px solid ${C.olive}30`,borderRadius:"8px",padding:"9px 12px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"}}><Icon name="check" size={16} color={C.olive}/><span style={{fontSize:"11px",color:C.olive}}>Consumo oficial: <strong>{watts}W</strong></span></div>:<SliderField label="Consumo personalizado" value={customWatts} onChange={setCustomWatts} min={50} max={2000} step={10} suffix="W"/>}<SliderField label="Tarifa de energia" value={kwhPrice} onChange={setKwhPrice} min={0.3} max={2} step={0.01} isMonetary prefix="R$" suffix="/kWh"/></>}>
              <div style={{fontSize:"12px",color:C.textMuted,padding:"2px 0 8px"}}>Impressora: <strong style={{color:C.text}}>{printerModel.split(" ").slice(0,4).join(" ")}</strong> · <strong style={{color:C.olive}}>{watts}W</strong></div>
            </CollapsibleSection>

            <CollapsibleSection title="Depreciação" icon="wrench" advanced={<><SliderField label="Custo da impressora" value={printerCost} onChange={setPrinterCost} min={500} max={20000} step={100} isMonetary prefix="R$"/><SliderField label="Vida útil estimada" value={printerLifespan} onChange={v=>{setPrinterLifespan(v);setLifespanEdited(true);}} min={500} max={15000} step={100} suffix="h"/><div style={{fontSize:"10px",color:C.textLight,marginTop:"-8px",marginBottom:"8px"}}>Vida útil preenchida automaticamente pelo modelo selecionado</div></>}>
              <div style={{fontSize:"12px",color:C.textMuted,padding:"2px 0 8px"}}>Custo/hora: <strong style={{color:C.olive}}>R$ {fmt(printerLifespan>0?printerCost/printerLifespan:0)}</strong></div>
            </CollapsibleSection>

            <CollapsibleSection title="Mão de Obra & Margem" icon="briefcase" advanced={<><SliderField label="Horas de preparo / pós-proc." value={prepHours} onChange={setPrepHours} min={0} max={8} step={0.25} suffix="h"/><SliderField label="Valor da hora" value={laborRate} onChange={setLaborRate} min={10} max={200} step={5} isMonetary prefix="R$" suffix="/h"/><SliderField label="Taxa de falhas" value={failRate} onChange={setFailRate} min={0} max={30} step={1} suffix="%"/><SliderField label="Imposto sobre venda" value={taxRate} onChange={setTaxRate} min={0} max={30} step={0.5} suffix="%"/><div style={{fontSize:"10px",color:C.textLight,marginTop:"-8px"}}>Calculado sobre o preço final (após lucro)</div></>}>
              <SliderField label="Margem de lucro" value={profitMargin} onChange={setProfitMargin} min={0} max={200} step={5} suffix="%"/>
            </CollapsibleSection>
          </div>

          {/* RIGHT */}
          <div>
            <CollapsibleSection title="Agregados & Acabamentos" icon="gift" badge={activeAddons.length>0?`${activeAddons.length} ativo(s)`:undefined} advanced={<>{BASE_ADDONS.map(addon=><AddonRow key={addon.id} addon={addon} state={addonStates[addon.id]} onToggle={()=>toggleAddon(addon.id)} onFieldChange={(f,v)=>setAddonField(addon.id,f,v)}/>)}{customAddons.map(addon=><AddonRow key={addon.id} addon={addon} state={addon} onToggle={()=>toggleCustom(addon.id)} onFieldChange={(f,v)=>setCustomField(addon.id,f,v)} onRemove={()=>removeCustom(addon.id)}/>)}<div style={{marginTop:"10px",borderTop:`1px dashed ${C.olive}40`,paddingTop:"10px",display:"flex",gap:"8px"}}><input type="text" placeholder="Novo item..." value={newAddonName} onChange={e=>setNewAddonName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addCustomAddon()} style={{flex:1,background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"8px",padding:"8px 10px",color:C.text,fontSize:"13px",fontFamily:"monospace",outline:"none"}} onFocus={e=>e.target.style.borderColor=C.olive} onBlur={e=>e.target.style.borderColor=C.border}/><button onClick={addCustomAddon} style={{background:C.olive,color:"#fff",border:"none",borderRadius:"8px",padding:"8px 14px",cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"bold",flexShrink:0}}>+ Add</button></div></>}>
              <div style={{fontSize:"12px",color:C.textMuted,padding:"2px 0 6px"}}>{activeAddons.length>0?<>Custo adicional: <strong style={{color:C.olive}}>R$ {fmt(addonCost)}</strong></>:"Nenhum item ativo"}</div>
            </CollapsibleSection>

            {/* Preço final */}
            <div style={{background:C.olive,borderRadius:"16px",padding:"24px",marginBottom:"14px",textAlign:"center",position:"relative",overflow:"hidden",boxShadow:`0 8px 32px ${C.olive}44`}}>
              <div style={{position:"absolute",top:"-50px",right:"-50px",width:"160px",height:"160px",background:"rgba(255,255,255,0.07)",borderRadius:"50%",pointerEvents:"none"}}/>
              <p style={{margin:"0 0 2px",fontSize:"11px",color:"rgba(255,255,255,0.7)",letterSpacing:"3px",textTransform:"uppercase"}}>{useCustomPrice?"Preço Personalizado":"Preço Final Sugerido"}</p>
              <div style={{fontSize:"44px",fontWeight:"bold",color:"#fff",lineHeight:1.1,letterSpacing:"-1px"}}>R$ {fmt(effectivePrice)}</div>
              {useCustomPrice&&<div style={{fontSize:"11px",color:"rgba(255,255,255,0.6)",marginTop:"2px"}}>Calculado: R$ {fmt(finalPrice)}</div>}

              {/* Quantidade */}
              <div style={{marginTop:"14px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,0.65)",letterSpacing:"1px",textTransform:"uppercase"}}>Quantidade</span>
                <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                  <button onClick={()=>setUnitQty(q=>Math.max(1,q-1))} style={{width:"28px",height:"28px",borderRadius:"6px",border:"1.5px solid rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.12)",color:"#fff",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>−</button>
                  <input type="number" min={1} value={unitQty} onChange={e=>setUnitQty(Math.max(1,parseInt(e.target.value)||1))}
                    style={{width:"52px",textAlign:"center",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.35)",borderRadius:"6px",padding:"4px 6px",color:"#fff",fontSize:"15px",fontFamily:"monospace",fontWeight:"bold",outline:"none"}}/>
                  <button onClick={()=>setUnitQty(q=>q+1)} style={{width:"28px",height:"28px",borderRadius:"6px",border:"1.5px solid rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.12)",color:"#fff",cursor:"pointer",fontSize:"16px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold"}}>+</button>
                </div>
                {unitQty>1&&<span style={{fontSize:"13px",color:"rgba(255,255,255,0.9)",fontFamily:"monospace",fontWeight:"bold"}}>= R$ {fmt(effectivePrice*unitQty)}</span>}
              </div>

              <div style={{marginTop:"12px",display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
                {[["CUSTO BASE",fmt(subtotal)],["LUCRO "+profitMargin+"%",fmt(profit)],...(taxRate>0?[["IMPOSTO "+taxRate+"%",fmt(taxValue)]]:[])].map(([lbl,val],i,arr)=>(
                  <div key={lbl} style={{display:"flex",alignItems:"center"}}>
                    <div style={{textAlign:"center",padding:"0 12px"}}><div style={{fontSize:"10px",color:"rgba(255,255,255,0.6)",letterSpacing:"1px"}}>{lbl}</div><div style={{fontSize:"13px",color:"rgba(255,255,255,0.9)"}}>R$ {val}</div></div>
                    {i<arr.length-1&&<div style={{width:"1px",height:"28px",background:"rgba(255,255,255,0.2)"}}/>}
                  </div>
                ))}
              </div>
              {/* Custom price toggle */}
              <div style={{marginTop:"14px",borderTop:"1px solid rgba(255,255,255,0.15)",paddingTop:"12px"}}>
                <label style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"8px",cursor:"pointer",userSelect:"none"}}>
                  <div onClick={()=>{setUseCustomPrice(v=>{if(!v)setCustomPriceValue(finalPrice);return !v;})}} style={{width:"36px",height:"20px",borderRadius:"10px",background:useCustomPrice?"rgba(255,255,255,0.9)":"rgba(255,255,255,0.25)",position:"relative",transition:"background 0.2s",flexShrink:0,cursor:"pointer"}}>
                    <div style={{position:"absolute",top:"2px",left:useCustomPrice?"18px":"2px",width:"16px",height:"16px",borderRadius:"50%",background:useCustomPrice?C.olive:"#fff",transition:"left 0.2s"}}/>
                  </div>
                  <span style={{fontSize:"12px",color:"rgba(255,255,255,0.85)"}}>Usar preço diferente do sugerido</span>
                </label>
                {useCustomPrice&&(
                  <div style={{marginTop:"10px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
                    <span style={{fontSize:"13px",color:"rgba(255,255,255,0.8)",fontFamily:"monospace"}}>R$</span>
                    <MoneyInput value={customPriceValue} onChange={setCustomPriceValue} style={{maxWidth:"160px",background:"rgba(255,255,255,0.15)",border:"1.5px solid rgba(255,255,255,0.4)",color:"#fff",fontSize:"18px",fontWeight:"bold",textAlign:"center"}}/>
                  </div>
                )}
              </div>
            </div>

            {/* Composição */}
            <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"14px",padding:"20px",marginBottom:"14px"}}>
              <h3 style={{margin:"0 0 14px",fontSize:"11px",letterSpacing:"2.5px",textTransform:"uppercase",color:C.olive}}><Icon name="chart" size={14} color={C.olive}/> Composição dos Custos</h3>
              {costItems.map(item=>(
                <div key={item.label} style={{marginBottom:"10px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:"3px"}}>
                    <span style={{fontSize:"12px",color:C.textMuted}}>{item.label}</span>
                    <span style={{fontSize:"12px",color:item.color,fontWeight:"bold",fontFamily:"monospace"}}>R$ {fmt(item.value)}</span>
                  </div>
                  <div style={{height:"5px",background:"#eeecea",borderRadius:"3px",overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${(item.value/barMax)*100}%`,background:`linear-gradient(90deg,${item.color},${item.color}88)`,borderRadius:"3px",transition:"width 0.4s"}}/>
                  </div>
                  <div style={{fontSize:"10px",color:C.textLight,textAlign:"right",marginTop:"2px"}}>{finalPrice>0?((item.value/finalPrice)*100).toFixed(1):"0.0"}%</div>
                </div>
              ))}
            </div>

            {/* Salvar produto */}
            <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"14px",padding:"16px 18px",marginBottom:"14px"}}>
              <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.olive,marginBottom:"10px"}}><Icon name="save" size={13} color={C.olive}/> Salvar este cálculo</div>
              <div style={{display:"flex",gap:"8px"}}>
                <input type="text" placeholder="Nome do produto..." value={productName} onChange={e=>setProductName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveProduct()} style={{flex:1,background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"8px",padding:"9px 12px",color:C.text,fontSize:"13px",fontFamily:"monospace",outline:"none"}} onFocus={e=>e.target.style.borderColor=C.olive} onBlur={e=>e.target.style.borderColor=C.border}/>
                <button onClick={saveProduct} style={{background:C.olive,color:"#fff",border:"none",borderRadius:"8px",padding:"9px 16px",cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"bold",flexShrink:0}}>Salvar</button>
              </div>
              {!user&&<p style={{margin:"6px 0 0",fontSize:"10px",color:C.textLight}}>⚠️ Faça login para persistir entre sessões</p>}
            </div>

            {/* Modo lote */}
            <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"14px",padding:"16px 18px",marginBottom:"14px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"10px"}}>
                <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.olive}}><Icon name="box" size={13} color={C.olive}/> Modo Lote</div>
                {batchItems.length>0&&<span style={{fontSize:"11px",color:C.textMuted,fontFamily:"monospace"}}>{batchItems.length} peça(s) · Total: <strong style={{color:C.olive}}>R$ {fmt(batchItems.reduce((s,b)=>s+(b.price*b.qty),0))}</strong></span>}
              </div>
              <p style={{margin:"0 0 10px",fontSize:"11px",color:C.textMuted,lineHeight:"1.5"}}>
                Adicione esta peça (com as configurações atuais) ao lote. Depois ajuste os parâmetros e adicione outras peças diferentes.
              </p>
              <div style={{display:"flex",gap:"8px",marginBottom:"8px"}}>
                <input type="text" placeholder="Nome da peça..." value={batchName} onChange={e=>setBatchName(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&batchName.trim()&&setBatchItems(p=>[...p,{id:newId(),name:batchName.trim(),qty:1,price:effectivePrice,material,printerModel,printHours,printMinutes}])&&setBatchName("")}
                  style={{flex:1,background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"8px",padding:"8px 10px",color:C.text,fontSize:"13px",fontFamily:"monospace",outline:"none"}} onFocus={e=>e.target.style.borderColor=C.olive} onBlur={e=>e.target.style.borderColor=C.border}/>
                <button onClick={()=>{if(!batchName.trim())return;setBatchItems(p=>[...p,{id:newId(),name:batchName.trim(),qty:1,price:effectivePrice,material,printerModel,printHours,printMinutes}]);setBatchName("");}}
                  style={{background:C.olive,color:"#fff",border:"none",borderRadius:"8px",padding:"8px 14px",cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"bold",flexShrink:0}}>+ Adicionar</button>
              </div>
              {batchItems.length>0&&(
                <div style={{borderTop:`1px solid ${C.border}`,paddingTop:"10px"}}>
                  {batchItems.map((b,idx)=>(
                    <div key={b.id} style={{display:"flex",alignItems:"center",gap:"8px",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                      <div style={{flex:1}}>
                        <div style={{fontSize:"13px",fontWeight:"bold",color:C.text}}>{b.name}</div>
                        <div style={{fontSize:"10px",color:C.textMuted}}>{b.material} · {b.printHours}h{b.printMinutes}min</div>
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
                        <button onClick={()=>setBatchItems(p=>p.map(x=>x.id===b.id?{...x,qty:Math.max(1,x.qty-1)}:x))} style={{width:"24px",height:"24px",borderRadius:"5px",border:`1px solid ${C.border}`,background:C.surface2,cursor:"pointer",fontSize:"14px",color:C.olive,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                        <span style={{fontSize:"13px",fontFamily:"monospace",minWidth:"20px",textAlign:"center"}}>{b.qty}</span>
                        <button onClick={()=>setBatchItems(p=>p.map(x=>x.id===b.id?{...x,qty:x.qty+1}:x))} style={{width:"24px",height:"24px",borderRadius:"5px",border:`1px solid ${C.border}`,background:C.surface2,cursor:"pointer",fontSize:"14px",color:C.olive,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                      </div>
                      <div style={{fontSize:"13px",color:C.olive,fontFamily:"monospace",minWidth:"70px",textAlign:"right"}}>R$ {fmt(b.price*b.qty)}</div>
                      <button onClick={()=>setBatchItems(p=>p.filter(x=>x.id!==b.id))} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:"16px",padding:"0 2px"}}>✕</button>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:"8px"}}>
                    <button onClick={()=>setBatchItems([])} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:"12px",fontFamily:"monospace",textDecoration:"underline"}}>Limpar lote</button>
                    <div style={{fontSize:"15px",fontWeight:"bold",color:C.olive,fontFamily:"monospace"}}>
                      Total: R$ {fmt(batchItems.reduce((s,b)=>s+(b.price*b.qty),0))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gerar orçamento */}
            <button onClick={()=>setShowModal(true)} style={{width:"100%",padding:"18px",background:`linear-gradient(135deg,${C.olive},${C.oliveDark})`,color:"#fff",border:"none",borderRadius:"14px",fontSize:"16px",fontWeight:"bold",cursor:"pointer",fontFamily:"monospace",letterSpacing:"1px",boxShadow:`0 6px 20px ${C.olive}55`,display:"flex",alignItems:"center",justifyContent:"center",gap:"10px"}}
              onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.1)"} onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}>
              <Icon name="printer" size={20} color="#fff"/>GERAR ORÇAMENTO{batchItems.length>0?` (${batchItems.length+1} peças)`:""}
            </button>
          </div>
        </div>
      )}

      {/* ── TAB: PRODUTOS ── */}
      {activeTab==="products"&&(
        <div style={{maxWidth:"980px",margin:"0 auto",padding:isMobile?"16px 12px":"24px 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <h2 style={{margin:0,fontSize:"16px",color:C.text}}>Produtos calculados</h2>
            <span style={{fontSize:"12px",color:C.textMuted}}>{savedProducts.length} produto(s) salvo(s)</span>
          </div>
          {savedProducts.length===0?(
            <div style={{textAlign:"center",padding:"60px 20px",color:C.textMuted}}>
              <div style={{marginBottom:"16px"}}><Icon name="folder" size={48} color={C.border}/></div>
              <div style={{fontSize:"14px"}}>Nenhum produto salvo ainda.</div>
              <div style={{fontSize:"12px",marginTop:"6px"}}>Calcule um produto e salve na aba Calculadora.</div>
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(280px,1fr))",gap:"12px"}}>
              {savedProducts.map(p=>(
                <div key={p.id} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"12px",padding:"16px",display:"flex",flexDirection:"column",gap:"8px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{fontSize:"15px",fontWeight:"bold",color:C.text}}>{p.name}</div>
                    <button onClick={()=>deleteProduct(p.id)} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",padding:"0 2px",flexShrink:0,display:"flex",alignItems:"center"}}><Icon name="trash" size={16} color={C.textLight}/></button>
                  </div>
                  <div style={{fontSize:"12px",color:C.textMuted}}>{p.material} · {p.printerModel?.split(" ").slice(0,3).join(" ")}</div>
                  <div style={{fontSize:"12px",color:C.textMuted}}>{p.printHours}h {p.printMinutes}min · Margem: {p.profitMargin}%</div>
                  <div style={{fontSize:"20px",fontWeight:"bold",color:C.olive,fontFamily:"monospace"}}>R$ {fmt(p.finalPrice)}</div>
                  <div style={{fontSize:"10px",color:C.textLight}}>Salvo em {p.savedAt}</div>
                  <button onClick={()=>loadProductCalc(p)} style={{marginTop:"4px",padding:"8px",borderRadius:"8px",border:`1px solid ${C.olive}`,background:`${C.olive}10`,color:C.olive,cursor:"pointer",fontSize:"12px",fontFamily:"monospace",fontWeight:"bold"}}>
                    ↩ Carregar na calculadora
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: TEMPLATES ── */}
      {activeTab==="templates"&&(
        <div style={{maxWidth:"980px",margin:"0 auto",padding:isMobile?"16px 12px":"24px 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <h2 style={{margin:0,fontSize:"16px",color:C.text}}>Templates de produto</h2>
          </div>
          {/* Save template form */}
          <div style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"14px",padding:"20px",marginBottom:"20px"}}>
            <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:C.olive,marginBottom:"14px"}}><Icon name="star" size={13} color={C.olive}/> Salvar configuração atual como template</div>
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr auto",gap:"10px",marginBottom:"12px"}}>
              <input type="text" placeholder="Nome do template (ex: Chaveiro PLA padrão)" value={templateName} onChange={e=>setTemplateName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&saveTemplate()} style={{background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:"8px",padding:"9px 12px",color:C.text,fontSize:"13px",fontFamily:"monospace",outline:"none"}} onFocus={e=>e.target.style.borderColor=C.olive} onBlur={e=>e.target.style.borderColor=C.border}/>
              <button onClick={saveTemplate} style={{background:C.olive,color:"#fff",border:"none",borderRadius:"8px",padding:"9px 18px",cursor:"pointer",fontSize:"13px",fontFamily:"monospace",fontWeight:"bold"}}>Salvar template</button>
            </div>
            {/* Photo upload */}
            <div>
              <div style={{fontSize:"11px",color:C.textMuted,marginBottom:"6px",textTransform:"uppercase",letterSpacing:"1px"}}>Foto do produto (opcional)</div>
              <div onClick={()=>templatePhotoRef.current.click()} style={{border:`2px dashed ${templatePhoto?C.olive:C.border}`,borderRadius:"8px",padding:"12px",cursor:"pointer",textAlign:"center",background:templatePhoto?`${C.olive}08`:C.surface2,display:"inline-flex",alignItems:"center",gap:"8px"}}>
                {templatePhoto?<><img src={templatePhoto} style={{height:"40px",objectFit:"contain",borderRadius:"4px"}}/><span style={{fontSize:"12px",color:C.olive}}>Trocar foto</span><button onClick={e=>{e.stopPropagation();setTemplatePhoto(null);}} style={{background:"none",border:"none",color:"#c0392b",cursor:"pointer",fontSize:"16px"}}>✕</button></>:<><Icon name="photo" size={20} color={C.textMuted}/><span style={{fontSize:"12px",color:C.textMuted,marginLeft:"6px"}}>Adicionar foto</span></>}
              </div>
              <input ref={templatePhotoRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setTemplatePhoto(ev.target.result);r.readAsDataURL(f);}}/>
            </div>
            <div style={{marginTop:"12px",fontSize:"11px",color:C.textLight}}>
              Salva: {material} · {printerModel.split(" ").slice(0,3).join(" ")} · Margem {profitMargin}% · Imposto {taxRate}% · e todas as outras configurações atuais
            </div>
          </div>

          {templates.length===0?(
            <div style={{textAlign:"center",padding:"60px 20px",color:C.textMuted}}>
              <div style={{marginBottom:"16px"}}><Icon name="star" size={48} color={C.border}/></div>
              <div style={{fontSize:"14px"}}>Nenhum template salvo ainda.</div>
            </div>
          ):(
            <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(auto-fill,minmax(280px,1fr))",gap:"12px"}}>
              {templates.map(t=>(
                <div key={t.id} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"12px",overflow:"hidden"}}>
                  {t.photo&&<img src={t.photo} style={{width:"100%",height:"120px",objectFit:"cover"}}/>}
                  <div style={{padding:"14px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"}}>
                      <div style={{fontSize:"15px",fontWeight:"bold",color:C.text}}>{t.name}</div>
                      <button onClick={()=>deleteTemplate(t.id)} style={{background:"none",border:"none",color:C.textLight,cursor:"pointer",fontSize:"16px",padding:"0 2px"}}><Icon name="trash" size={16} color={C.textLight}/></button>
                    </div>
                    <div style={{fontSize:"12px",color:C.textMuted,marginBottom:"4px"}}>{t.material} · {t.printerModel?.split(" ").slice(0,3).join(" ")}</div>
                    <div style={{fontSize:"12px",color:C.textMuted,marginBottom:"10px"}}>Margem: {t.profitMargin}% · Imposto: {t.taxRate}%</div>
                    <div style={{fontSize:"10px",color:C.textLight,marginBottom:"10px"}}>Salvo em {t.savedAt}</div>
                    <button onClick={()=>loadTemplate(t)} style={{width:"100%",padding:"8px",borderRadius:"8px",border:`1px solid ${C.olive}`,background:`${C.olive}10`,color:C.olive,cursor:"pointer",fontSize:"12px",fontFamily:"monospace",fontWeight:"bold"}}>
                      ↩ Carregar template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB: HISTÓRICO ── */}
      {activeTab==="history"&&(
        <div style={{maxWidth:"980px",margin:"0 auto",padding:isMobile?"16px 12px":"24px 16px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <h2 style={{margin:0,fontSize:"16px",color:C.text}}>Histórico de orçamentos</h2>
            <span style={{fontSize:"12px",color:C.textMuted}}>{quoteHistory.length} orçamento(s)</span>
          </div>
          {quoteHistory.length===0?(
            <div style={{textAlign:"center",padding:"60px 20px",color:C.textMuted}}>
              <div style={{marginBottom:"16px"}}><Icon name="history" size={48} color={C.border}/></div>
              <div style={{fontSize:"14px"}}>Nenhum orçamento gerado ainda.</div>
              <div style={{fontSize:"12px",marginTop:"6px"}}>Gere um orçamento na aba Calculadora para vê-lo aqui.</div>
            </div>
          ):(
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {quoteHistory.map(q=>{
                const total=q.items?.reduce((s,i)=>s+(i.finalPrice*i.quantity),0)||0;
                const itemNames=q.items?.map(i=>i.name).join(", ")||"";
                return (
                  <div key={q.id} style={{background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:"12px",padding:"16px",display:"flex",alignItems:isMobile?"flex-start":"center",flexDirection:isMobile?"column":"row",gap:"12px"}}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}}>
                        <div style={{fontSize:"14px",fontWeight:"bold",color:C.text}}>{q.clientName||"(sem cliente)"}</div>
                        {q.companyName&&<span style={{fontSize:"11px",color:C.textMuted}}>· {q.companyName}</span>}
                      </div>
                      <div style={{fontSize:"12px",color:C.textMuted,marginBottom:"2px"}}>{itemNames}</div>
                      <div style={{fontSize:"11px",color:C.textLight}}>Gerado em {fmtDate(q.savedAt)} · Válido {q.validityDays} dias</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:"20px",fontWeight:"bold",color:C.olive,fontFamily:"monospace"}}>R$ {fmt(total)}</div>
                      <div style={{fontSize:"11px",color:C.textMuted}}>{q.items?.length||0} item(s)</div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
                      <button onClick={()=>setHistoryView(q)} style={{padding:"7px 14px",borderRadius:"8px",border:`1px solid ${C.olive}`,background:`${C.olive}10`,color:C.olive,cursor:"pointer",fontSize:"12px",fontFamily:"monospace",fontWeight:"bold"}}><Icon name="eye" size={14} color={C.olive}/> Ver</button>
                      <button onClick={()=>deleteQuote(q.id)} style={{padding:"7px 14px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.surface2,color:C.textMuted,cursor:"pointer",fontSize:"12px",fontFamily:"monospace"}}><Icon name="trash" size={16} color={C.textLight}/></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div style={{textAlign:"center",padding:"14px",borderTop:`1px solid ${C.border}`,color:C.textLight,fontSize:"10px",letterSpacing:"2px"}}>
        CASA OLIVER · CALCULADORA FDM · IMPRESSÃO 3D
      </div>

      {showModal&&(
        <QuoteModal
          onClose={()=>setShowModal(false)}
          onShowPreview={(q)=>{
            setShowModal(false);
            setQuotePreviewObj(q);
            saveQuoteToHistory(q);
          }}
          calcState={{finalPrice:effectivePrice,unitQty,material,printerModel,printHours,printMinutes,activeAddons,taxRate,defaultCompanyName:savedCompanyName,defaultCompanyContact:savedCompanyContact,batchItems}}
        />
      )}
    </div>
  );
}
