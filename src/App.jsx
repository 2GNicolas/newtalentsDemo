import { useMemo, useState } from "react";
import {
  BarChartIcon, CalendarIcon, CheckCircledIcon, ChevronDownIcon,
  Cross2Icon, DotsHorizontalIcon, ExternalLinkIcon, HomeIcon,
  InfoCircledIcon, PlayIcon, ReaderIcon, Share2Icon, VideoIcon,
} from "@radix-ui/react-icons";

const TABS = [
  { id: "summary", label: "Resumen", icon: HomeIcon },
  { id: "statistics", label: "Estadísticas", icon: BarChartIcon },
  { id: "matches", label: "Partidos", icon: CalendarIcon },
  { id: "videos", label: "Videos", icon: VideoIcon },
];

const CAPACITIES = [
  ["Técnica", 8.2], ["Pase", 7.8], ["Finalización", 8.1],
  ["Defensa", 6.8], ["Decisión", 8.0], ["Participación", 7.6],
];

const MATCHES = [
  { date: "30 AGO", year: "2026", rival: "Andino Sub-13", competition: "Bogotá Youth Cup", score: "2 – 1", rating: "8.6", minutes: 82, role: "Delantero centro", note: "1 gol · 1 asistencia · 3 remates" },
  { date: "16 AGO", year: "2026", rival: "Real Juventud", competition: "Liga Formativa", score: "1 – 1", rating: "8.1", minutes: 75, role: "Segundo delantero", note: "1 asistencia · 2 pases clave" },
  { date: "02 AGO", year: "2026", rival: "Academia Sur", competition: "Liga Formativa", score: "3 – 0", rating: "8.4", minutes: 90, role: "Delantero centro", note: "2 goles · 5 remates" },
  { date: "19 JUL", year: "2026", rival: "Deportivo Norte", competition: "Amistoso", score: "2 – 2", rating: "7.9", minutes: 70, role: "Extremo izquierdo", note: "1 gol · 1 asistencia" },
  { date: "05 JUL", year: "2026", rival: "Club Unión", competition: "Liga Formativa", score: "1 – 0", rating: "7.6", minutes: 65, role: "Delantero centro", note: "1 asistencia · 3 remates" },
  { date: "21 JUN", year: "2026", rival: "Atlético Central", competition: "Liga Formativa", score: "0 – 1", rating: "7.1", minutes: 56, role: "Delantero centro", note: "2 remates · 1 al arco" },
];

const VIDEOS = [
  { title: "Gol tras desmarque al espacio", meta: "Min 34 · vs. Andino · 30 AGO 2026", image: "/assets/new-talents/match-finishing.png", tag: "Finalización", duration: "0:34" },
  { title: "Asistencia entre líneas", meta: "Min 61 · vs. Andino · 30 AGO 2026", image: "/assets/new-talents/match-passing.png", tag: "Creación", duration: "0:27" },
  { title: "Control orientado y remate", meta: "Min 52 · vs. Academia Sur · 02 AGO 2026", image: "/assets/new-talents/match-finishing.png", tag: "Técnica", duration: "0:31" },
  { title: "Recuperación que inicia ocasión", meta: "Min 68 · vs. Deportivo Norte · 19 JUL 2026", image: "/assets/new-talents/match-recovery.png", tag: "Sin balón", duration: "0:29" },
];

function Glass({ children, className = "" }) {
  return <section className={`glass ${className}`}>{children}</section>;
}

function BrandHeader() {
  return (
    <header className="brand-header">
      <img src="/assets/new-talents/new-talents-logo.png" alt="New Talents" />
      <div className="header-copy"><span>Pasaporte deportivo</span><strong>Perfil público verificado</strong></div>
      <div className="header-actions">
        <button aria-label="Compartir pasaporte"><Share2Icon /></button>
        <button aria-label="Más opciones"><DotsHorizontalIcon /></button>
      </div>
    </header>
  );
}

function PlayerIdentity() {
  return (
    <section className="player-identity" aria-label="Información principal del jugador">
      <div className="portrait-wrap"><img src="/assets/new-talents/mateo-portrait.png" alt="Mateo González" /></div>
      <div className="player-data">
        <span className="active-pill"><i /> Perfil activo</span>
        <p className="kicker">Pasaporte NT–0049</p>
        <h1>Mateo González</h1>
        <p className="player-role"><strong>Delantero</strong><span>·</span>Sub-13</p>
        <dl>
          <div><dt>Academia</dt><dd>Horizonte FC</dd></div>
          <div><dt>Ubicación</dt><dd>Bogotá, Colombia</dd></div>
          <div><dt>Pie dominante</dt><dd>Derecha</dd></div>
          <div><dt>Partidos analizados</dt><dd>18</dd></div>
        </dl>
      </div>
      <div className="rating-panel"><span>Valoración actual</span><strong>8.1</strong><small>Sobre 10</small><p><b>+0.6</b> vs. periodo anterior</p></div>
    </section>
  );
}

function RadarChart() {
  const center = 150;
  const radius = 98;
  const getPoints = (factor) => CAPACITIES.map(([_, value], index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / CAPACITIES.length;
    const r = radius * (factor ?? value / 10);
    return `${center + Math.cos(angle) * r},${center + Math.sin(angle) * r}`;
  }).join(" ");
  const current = getPoints();
  return (
    <div className="radar-wrap" role="img" aria-label="Gráfica de capacidades deportivas">
      <svg viewBox="0 0 300 300" className="radar" aria-hidden="true">
        {[1, .8, .6, .4, .2].map(scale => <polygon key={scale} points={getPoints(scale)} className="radar-grid" />)}
        {CAPACITIES.map((_, index) => { const angle = -Math.PI / 2 + (Math.PI * 2 * index) / CAPACITIES.length; return <line key={index} x1={center} y1={center} x2={center + Math.cos(angle) * radius} y2={center + Math.sin(angle) * radius} className="radar-axis" />; })}
        <polygon points={getPoints(.68)} className="radar-average" />
        <polygon points={current} className="radar-current" />
        {current.split(" ").map((point, index) => { const [cx, cy] = point.split(","); return <circle key={index} cx={cx} cy={cy} r="4.5" className="radar-dot" />; })}
      </svg>
      {CAPACITIES.map(([label, value], index) => <div className={`radar-label label-${index}`} key={label}><span>{label}</span><strong>{Number(value).toFixed(1)}</strong></div>)}
    </div>
  );
}

function PeriodSelector({ value, setValue }) {
  const [open, setOpen] = useState(false);
  return <div className="selector"><button onClick={() => setOpen(!open)} aria-expanded={open}>{value}<ChevronDownIcon /></button>{open && <div className="selector-menu"><button onClick={() => { setValue("Últimos 6 análisis"); setOpen(false); }}>Últimos 6 análisis</button><button onClick={() => { setValue("Temporada 2026"); setOpen(false); }}>Temporada 2026</button></div>}</div>;
}

function SectionTitle({ eyebrow, title, text, action }) {
  return <div className="section-title"><div><span>{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}

function Summary({ period, setPeriod, setView }) {
  return <div className="summary-layout">
    <Glass className="capacity-card">
      <SectionTitle eyebrow="Lectura del scout" title="Perfil de capacidades" />
      <div className="legend"><span><i />Último partido</span><span><i className="dashed" />Promedio 6 partidos</span></div>
      <RadarChart />
      <p className="method-note"><InfoCircledIcon /> Cada capacidad se sustenta en eventos, contexto, complejidad y consecuencia.</p>
    </Glass>
    <Glass className="profile-stats">
      <SectionTitle eyebrow="Evidencia FEM" title="Estadísticas del perfil" text="Indicadores derivados de eventos analizados" action={<PeriodSelector value={period} setValue={setPeriod} />} />
      <div className="metric-grid">
        <article><span>Distribución</span><strong>85%</strong><p>268/316 pases</p><small>42 progresivos · 17 rompen líneas</small></article>
        <article><span>Creación</span><strong>12</strong><p>ocasiones creadas</p><small>4 asistencias · 21 pases clave</small></article>
        <article><span>Finalización</span><strong>58%</strong><p>15/26 al arco</p><small>7 goles en el periodo</small></article>
        <article><span>Recuperación</span><strong>38</strong><p>recuperaciones</p><small>14 intercepciones · 9 entradas</small></article>
      </div>
      <div className="context-grid"><div><span>Éxito bajo presión</span><strong>74%</strong></div><div><span>Alta complejidad</span><strong>19</strong></div><div><span>Cadenas de impacto</span><strong>11</strong></div></div>
      <button className="primary" onClick={() => setView("statistics")}><ReaderIcon />Ver análisis completo</button>
      <button className="text-action" onClick={() => setView("videos")}>Ver mejores momentos <ExternalLinkIcon /></button>
    </Glass>
  </div>;
}

function Statistics({ period, setPeriod }) {
  const groups = [
    ["Producción ofensiva", "8.4", [["Goles / 90", ".82", 82], ["Asistencias / 90", ".62", 62], ["Participaciones de gol / 90", "1.44", 90], ["Remates / 90", "3.70", 74]]],
    ["Creación y progresión", "8.1", [["Pases clave / 90", "2.47", 68], ["Ocasiones creadas / 90", "1.64", 51], ["Pases progresivos / 90", "6.20", 82], ["Regates exitosos", "61%", 61]]],
    ["Aporte sin balón", "7.2", [["Recuperaciones / 90", "7.81", 70], ["Intercepciones / 90", "2.88", 48], ["Duelos ganados", "56%", 56], ["Presiones efectivas / 90", "4.52", 62]]],
  ];
  return <div className="content-stack">
    <SectionTitle eyebrow="Lectura consolidada" title="Rendimiento estadístico" text="Delantero · Últimos 6 partidos" action={<PeriodSelector value={period} setValue={setPeriod} />} />
    <Glass className="scout-callout"><div className="score-orbit"><strong>8.1</strong><span>/10</span></div><div><span className="eyebrow">Valoración actual</span><h3>Delantero asociativo con impacto</h3><p>Destaca por progresión, creación y definición. Mantiene influencia incluso bajo presión.</p></div></Glass>
    <div className="stat-grid">{groups.map(([title, score, rows]) => <Glass className="stat-group" key={title}><header><h3>{title}</h3><strong>{score}</strong></header>{rows.map(([label, raw, value]) => <div className="stat-row" key={label}><div><span>{label}</span><b>{raw}</b></div><div className="meter"><i style={{ width: `${value}%` }} /></div></div>)}</Glass>)}</div>
    <Glass className="insight-card"><SectionTitle eyebrow="Lectura rápida" title="Fortalezas observables" /><div><span><CheckCircledIcon />Alta participación directa en gol</span><span><CheckCircledIcon />Finalización eficiente y sostenida</span><span><CheckCircledIcon />Contribuye en creación</span></div><button className="primary"><BarChartIcon />Comparar dos partidos</button></Glass>
  </div>;
}

function Matches() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState(null);
  const filtered = useMemo(() => filter === "Todos" ? MATCHES : MATCHES.filter(match => match.competition.includes(filter)), [filter]);
  return <div className="content-stack">
    <SectionTitle eyebrow="Historial analizado" title="Partidos analizados" text="6 análisis publicados · 438 minutos" />
    <div className="filter-row">{["Todos", "Liga", "Youth Cup"].map(item => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
    <Glass className="season-totals"><div><strong>6</strong><span>Partidos</span></div><div><strong>4</strong><span>Goles</span></div><div><strong>3</strong><span>Asistencias</span></div><div><strong>7</strong><span>Participaciones de gol</span></div></Glass>
    <Glass className="match-list">{filtered.map((match, index) => <button className="match-row" onClick={() => setSelected(match)} key={`${match.date}-${match.rival}`}><span className={`match-state ${index === 0 || index === 3 ? "complete" : ""}`}><CheckCircledIcon /></span><time>{match.date}<small>{match.year}</small></time><div className="match-copy"><span>{match.competition}</span><h3>Horizonte FC {match.score} <b>{match.rival}</b></h3><p>{match.minutes} min · {match.role}</p><small>{match.note}</small></div><strong className="match-rating">{match.rating}</strong><span className="open-label">Ver análisis</span></button>)}</Glass>
    <button className="primary wide"><BarChartIcon />Comparar 2 partidos</button>
    {selected && <Modal onClose={() => setSelected(null)}><span className="eyebrow">{selected.competition}</span><h2>vs. {selected.rival}</h2><div className="modal-score"><strong>{selected.score}</strong><span>Valoración {selected.rating}</span></div><p>{selected.minutes} minutos · {selected.role}</p><p>{selected.note}</p><button className="primary">Abrir análisis del partido</button></Modal>}
  </div>;
}

function Videos() {
  const [active, setActive] = useState(null);
  const [category, setCategory] = useState("Todos");
  const visible = category === "Todos" ? VIDEOS : VIDEOS.filter(video => video.tag === category);
  return <div className="content-stack">
    <SectionTitle eyebrow="Evidencia audiovisual" title="Evidencia en video" text="6 partidos completos · 14 momentos destacados" />
    <div className="filter-row">{["Todos", "Finalización", "Creación", "Técnica", "Sin balón"].map(item => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
    <button className="featured-video" onClick={() => setActive(VIDEOS[0])}><img src={VIDEOS[0].image} alt="Mateo finalizando una jugada" /><span className="play"><PlayIcon /></span><div><span>Video destacado</span><h3>Horizonte FC 2 – 1 Andino Sub-13</h3><p>30 AGO 2026 · 82 minutos</p></div></button>
    <Glass className="video-panel"><SectionTitle eyebrow="Selección del analista" title="Mejores momentos" /><div className="video-grid">{visible.map(video => <button className="video-row" onClick={() => setActive(video)} key={video.title}><div className="video-thumb"><img src={video.image} alt="" /><span><PlayIcon /></span><time>{video.duration}</time></div><div><span>{video.tag}</span><h3>{video.title}</h3><p>{video.meta}</p></div><ExternalLinkIcon /></button>)}</div><p className="method-note"><InfoCircledIcon /> Momentos seleccionados por analistas de New Talents.</p></Glass>
    <Glass className="youtube-card"><VideoIcon /><div><h3>Partidos completos</h3><p>6 videos publicados en YouTube</p></div><button>Ver canal <ExternalLinkIcon /></button></Glass>
    {active && <Modal className="video-modal" onClose={() => setActive(null)}><div className="modal-video"><img src={active.image} alt={active.title} /><span><PlayIcon /></span></div><span className="eyebrow">{active.tag}</span><h2>{active.title}</h2><p>{active.meta}</p><button className="primary"><PlayIcon />Abrir en YouTube</button></Modal>}
  </div>;
}

function Modal({ children, onClose, className = "" }) {
  return <div className="modal-layer" role="dialog" aria-modal="true"><button className="modal-backdrop" onClick={onClose} aria-label="Cerrar" /><section className={`modal ${className}`}><button className="modal-close" onClick={onClose} aria-label="Cerrar"><Cross2Icon /></button>{children}</section></div>;
}

export function App() {
  const [view, setView] = useState("summary");
  const [period, setPeriod] = useState("Últimos 6 análisis");
  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="page-frame">
      <BrandHeader />
      <PlayerIdentity />
      <nav className="section-tabs" aria-label="Secciones del pasaporte">{TABS.map(tab => { const Icon = tab.icon; return <button className={view === tab.id ? "active" : ""} onClick={() => setView(tab.id)} key={tab.id}><Icon /><span>{tab.label}</span></button>; })}</nav>
      <main className="view-content">
        {view === "summary" && <Summary period={period} setPeriod={setPeriod} setView={setView} />}
        {view === "statistics" && <Statistics period={period} setPeriod={setPeriod} />}
        {view === "matches" && <Matches />}
        {view === "videos" && <Videos />}
      </main>
      <footer><span>NEW TALENTS</span><p>Información deportiva demostrativa · Perfil visual</p></footer>
    </div>
  </div>;
}
