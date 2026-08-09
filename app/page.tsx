"use client";

import { FormEvent, useMemo, useState } from "react";

type View = "Home" | "Discover" | "Communities" | "Market" | "Messages" | "Profile";
type Toggle = Record<string, boolean>;

const nav: { label: View; icon: string }[] = [
  { label: "Home", icon: "⌂" }, { label: "Discover", icon: "⌕" },
  { label: "Communities", icon: "◎" }, { label: "Market", icon: "◇" },
  { label: "Messages", icon: "✉" }, { label: "Profile", icon: "♙" },
];

const products = [
  ["50kg Cattle Feed", "Kalahari Agri Supplies", "P285", "Gaborone", "Livestock", "feed"],
  ["Solar Borehole Pump", "SunWater Botswana", "Request quote", "Molepolole", "Equipment", "solar"],
  ["Veterinary Farm Visit", "Dr. K. Moagi", "From P350", "Serowe", "Services", "vet"],
  ["Seedling Trays — 200 cell", "Tshimo Growers", "P78", "Tlokweng", "Crops", "seed"],
  ["Tractor Ploughing Service", "Delta Field Works", "Request quote", "Maun", "Services", "tractor"],
  ["Organic Compost — 40kg", "Green Kgetsi", "P95", "Francistown", "Inputs", "compost"],
];

const groups = [
  ["Botswana Livestock Network", "3.8K", "Cattle health, feed, breeding and local market knowledge.", "🐄", "sand"],
  ["Young Farmers BW", "2.4K", "A practical space for emerging farmers to learn and connect.", "🌱", "green"],
  ["Kgalagadi Farmers", "1.2K", "Local alerts, drought preparation and shared resources.", "☀️", "gold"],
  ["Crop Growers Botswana", "1.9K", "Seasonal planting, pests, irrigation and harvest advice.", "🌽", "leaf"],
];

function Logo() {
  return <div className="brand"><span className="brandMark">p</span><strong>Pula<span>Feed</span></strong></div>;
}
function Avatar({ text, tone = "forest", small = false }: { text: string; tone?: string; small?: boolean }) {
  return <span className={`avatar ${tone} ${small ? "small" : ""}`}>{text}</span>;
}
function Photo({ kind }: { kind: string }) {
  return <div className={`photo ${kind}`} role="img" aria-label={`${kind} agricultural listing`}><span>{kind.toUpperCase()}</span></div>;
}

export default function Home() {
  const [view, setView] = useState<View>("Home");
  const [category, setCategory] = useState("All");
  const [liked, setLiked] = useState<Toggle>({});
  const [saved, setSaved] = useState<Toggle>({});
  const [joined, setJoined] = useState<Toggle>({});
  const [followed, setFollowed] = useState<Toggle>({});
  const [comments, setComments] = useState<Toggle>({});
  const [composer, setComposer] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [draft, setDraft] = useState("");
  const [newPosts, setNewPosts] = useState<string[]>([]);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => products.filter(p => category === "All" || p[4] === category), [category]);
  const flash = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2500); };
  const go = (next: View) => { setView(next); setNotifications(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const submit = (e: FormEvent) => { e.preventDefault(); if (!draft.trim()) return; setNewPosts(p => [draft.trim(), ...p]); setDraft(""); setComposer(false); go("Home"); flash("Your post is now visible in the community feed"); };

  return <div className="app">
    <aside className="sidebar">
      <Logo />
      <nav>{nav.map(n => <button key={n.label} className={view === n.label ? "active" : ""} onClick={() => go(n.label)}><i>{n.icon}</i><span>{n.label}</span>{n.label === "Messages" && <em>3</em>}</button>)}</nav>
      <button className="primary create" onClick={() => setComposer(true)}>＋ Create post</button>
      <div className="userMini"><Avatar text="DK" /><div><strong>Desmond Khimbele</strong><small>Founder · PulaFeed</small></div><button>•••</button></div>
    </aside>

    <header className="mobileHead"><Logo /><div><button onClick={() => go("Discover")}>⌕</button><button onClick={() => setNotifications(!notifications)}>♢<b /></button></div></header>

    <main>
      {view === "Home" && <>
        <section className="welcome"><div><span className="eyebrow">Dumela, Desmond</span><h1>Your agriculture community</h1><p>See what Botswana's farmers and agricultural professionals are sharing today.</p></div><div className="weather"><b>☀</b><span><strong>27°C</strong><small>Gaborone</small></span></div></section>
        <section className="quick card"><Avatar text="DK" /><button onClick={() => setComposer(true)}>Share an update, question or need...</button><div><button onClick={() => setComposer(true)}>▧ Photo</button><button onClick={() => setComposer(true)}>❔ Ask</button><button onClick={() => setComposer(true)}>◇ Request</button></div></section>
        <div className="feedTabs"><button className="active">For you</button><button>Following</button><button>Nearby</button></div>
        {newPosts.map((text, i) => <Post key={i} id={`new${i}`} initials="DK" name="Desmond Khimbele" meta="Founder · Just now" text={text} tone="forest" liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved} comments={comments} setComments={setComments} flash={flash} />)}
        <Post id="p1" initials="TM" name="Tumisang Molefe" meta="Cattle farmer · Serowe · 2h" text="The grass is drying earlier than expected this year. What affordable feed mix are you using to keep cattle condition stable going into September?" tag="🐄 Livestock" tone="brown" stats="23 helpful reactions · 14 comments" liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved} comments={comments} setComments={setComments} flash={flash} />
        <Post id="p2" initials="KA" name="Kalahari Agri Supplies" meta="Feed supplier · Gaborone · 4h · Sponsored" text="New stock has arrived: drought-support cattle feed in 50kg bags. Available for individual and group orders. Ask us about delivery routes outside Gaborone." tone="ochre" photo="feed" stats="41 reactions · 9 comments · 6 shares" liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved} comments={comments} setComments={setComments} flash={flash} supplier />
        <Post id="p3" initials="KM" name="Dr. Kabelo Moagi" meta="Veterinarian · Central District · 6h" text="Farmers around the Central District: watch for sudden loss of appetite, drooling and lameness. Isolate affected animals and contact a veterinary professional—avoid treating on guesswork." tag="＋ Animal health" tone="blue" stats="68 helpful reactions · 21 shares" liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved} comments={comments} setComments={setComments} flash={flash} alert />
      </>}

      {view === "Discover" && <section className="page">
        <Heading overline="Explore PulaFeed" title="Discover people and knowledge" text="Find trusted stakeholders, useful discussions and services across Botswana agriculture." />
        <label className="search"><span>⌕</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search farmers, suppliers, vets or topics" /></label>
        <h2>Browse by interest</h2>
        <div className="interestGrid">{[["🐄","Livestock","1,240 discussions"],["🌽","Crop farming","860 discussions"],["💧","Water & irrigation","390 discussions"],["🚜","Equipment","215 providers"],["☀","Solar agriculture","148 providers"],["🩺","Animal health","96 professionals"]].filter(x => !search || x.join(" ").toLowerCase().includes(search.toLowerCase())).map(x => <button className="interest" key={x[1]} onClick={() => flash(`Showing ${x[1].toLowerCase()} results`)}><i>{x[0]}</i><span><strong>{x[1]}</strong><small>{x[2]}</small></span><b>›</b></button>)}</div>
        <div className="sectionTitle"><div><span className="eyebrow">Verified experts</span><h2>People worth following</h2></div><button>See all</button></div>
        <div className="people">{[["KM","Dr. Kabelo Moagi","Veterinarian · Central District","blue"],["TN","Tshephang Ntogeleng","Agriculture partnerships · Gaborone","plum"],["GM","Goaba Charles","Data protection & technology risk","ochre"]].map(x => <article className="person card" key={x[1]}><Avatar text={x[0]} tone={x[3]} /><b className="check">✓</b><strong>{x[1]}</strong><p>{x[2]}</p><button className={followed[x[1]] ? "following" : ""} onClick={() => setFollowed(v => ({...v,[x[1]]:!v[x[1]]}))}>{followed[x[1]] ? "✓ Following" : "+ Follow"}</button></article>)}</div>
      </section>}

      {view === "Communities" && <section className="page">
        <Heading overline="Learn together" title="Agricultural communities" text="Join groups based on your interests, activity and location." />
        <div className="groups">{groups.map(g => <article className="group card" key={g[0]}><div className={`groupCover ${g[4]}`}><span>{g[3]}</span></div><div className="groupBody"><h2>{g[0]}</h2><p>{g[2]}</p><div><span>{g[1]} members</span><span>Active today</span></div><button className={joined[g[0]] ? "joined" : ""} onClick={() => setJoined(v => ({...v,[g[0]]:!v[g[0]]}))}>{joined[g[0]] ? "✓ Joined" : "Join community"}</button></div></article>)}</div>
      </section>}

      {view === "Market" && <section className="page">
        <div className="marketHead"><Heading overline="Agricultural directory" title="Find products and services" text="Connect directly with providers. PulaFeed does not process payments." /><button className="primary" onClick={() => setComposer(true)}>＋ Post a need</button></div>
        <div className="chips">{["All","Livestock","Crops","Equipment","Services","Inputs"].map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <div className="market">{filtered.map(p => <article className="product card" key={p[0]}><Photo kind={p[5]} /><div><span className="eyebrow">{p[4]}</span><h2>{p[0]}</h2><strong className="price">{p[2]}</strong><p>✓ {p[1]}</p><small>⌖ {p[3]}</small><button onClick={() => flash(`${p[1]} has been added to your messages`)}>Contact provider</button></div></article>)}</div>
      </section>}

      {view === "Messages" && <section className="page"><Heading overline="Your network" title="Messages" text="Continue conversations with farmers, experts and providers." /><div className="messageList card">{[["KA","Kalahari Agri Supplies","Yes, we deliver to Kanye every Thursday.","2m","ochre"],["KM","Dr. Kabelo Moagi","Please send a clear photo of the affected hoof.","1h","blue"],["TM","Tumisang Molefe","I have added you to the group order.","3h","brown"]].map((m,i) => <button key={m[1]} onClick={() => flash(`Opening conversation with ${m[1]}`)}><Avatar text={m[0]} tone={m[4]} /><div><strong>{m[1]}</strong><p>{m[2]}</p></div><span>{m[3]}{i < 2 && <b />}</span></button>)}</div></section>}

      {view === "Profile" && <section className="page"><article className="profile card"><div className="cover"><span>PULAFEED</span></div><div className="profileInfo"><Avatar text="DK" /><button onClick={() => flash("Profile editing will be available in the MVP")}>Edit profile</button><h1>Desmond Khimbele</h1><p>Founder of PulaFeed · Connecting Botswana agriculture</p><span>⌖ Gaborone, Botswana</span><div><b>128<small>Connections</small></b><b>46<small>Following</small></b><b>12<small>Posts</small></b></div></div></article><div className="profileTabs"><button className="active">Posts</button><button>About</button><button>Communities</button></div><Post id="profile" initials="DK" name="Desmond Khimbele" meta="Founder · 2 days ago" text="Building a stronger agricultural network starts with making it easier for the right people to find and learn from one another. That is what we are creating with PulaFeed." tone="forest" stats="34 reactions · 8 comments" liked={liked} setLiked={setLiked} saved={saved} setSaved={setSaved} comments={comments} setComments={setComments} flash={flash} /></section>}
    </main>

    <aside className="rightRail">
      <div className="railSearch"><label><span>⌕</span><input placeholder="Search PulaFeed" onFocus={() => go("Discover")} /></label><button onClick={() => setNotifications(!notifications)}>♢<b /></button></div>
      <section className="railCard"><div className="railTitle"><div><span className="eyebrow">Happening now</span><h2>Across agriculture</h2></div><b /></div>{[["1","Drought feed planning","218 people discussing"],["2","Early planting advice","146 people discussing"],["3","Group input orders","89 people discussing"]].map(t => <button className="trend" key={t[0]} onClick={() => go("Discover")}><i>{t[0]}</i><span><strong>{t[1]}</strong><small>{t[2]}</small></span></button>)}<button className="textBtn" onClick={() => go("Discover")}>Explore all topics →</button></section>
      <section className="railCard"><div className="railTitle"><div><span className="eyebrow">Grow your network</span><h2>Suggested for you</h2></div></div>{[["KM","Dr. K. Moagi","Veterinarian","blue"],["TM","Tumisang Molefe","Cattle farmer","brown"],["BW","BW Solar Pumps","Service provider","ochre"]].map(s => <div className="suggestion" key={s[1]}><Avatar text={s[0]} tone={s[3]} small /><span><strong>{s[1]} <i>✓</i></strong><small>{s[2]}</small></span><button onClick={() => setFollowed(v => ({...v,[s[1]]:!v[s[1]]}))}>{followed[s[1]] ? "✓" : "+"}</button></div>)}</section>
      <footer>About · Safety · Guidelines · Privacy<br />© 2026 PulaFeed · Botswana</footer>
    </aside>

    <nav className="bottomNav">{nav.slice(0,5).map(n => <button key={n.label} className={view === n.label ? "active" : ""} onClick={() => go(n.label)}><i>{n.icon}</i><small>{n.label === "Communities" ? "Groups" : n.label}</small></button>)}<button className="float" onClick={() => setComposer(true)}>＋</button></nav>

    {notifications && <aside className="notifications card"><div className="panelHead"><h2>Notifications</h2><button onClick={() => setNotifications(false)}>×</button></div><Notice icon="💬" text={<><b>Tumisang</b> replied to your comment.</>} time="12 minutes ago" /><Notice icon="✓" text={<><b>Kalahari Agri Supplies</b> accepted your connection.</>} time="1 hour ago" /><Notice icon="🌱" text={<>A new discussion is trending in <b>Young Farmers BW</b>.</>} time="3 hours ago" /></aside>}

    {composer && <div className="backdrop" onMouseDown={e => { if (e.target === e.currentTarget) setComposer(false); }}><form className="modal card" onSubmit={submit}><div className="panelHead"><div><span className="eyebrow">Share with your network</span><h2>Create a post</h2></div><button type="button" onClick={() => setComposer(false)}>×</button></div><div className="modalUser"><Avatar text="DK" /><span><strong>Desmond Khimbele</strong><select><option>Anyone on PulaFeed</option><option>My connections</option><option>Botswana Livestock Network</option></select></span></div><textarea autoFocus value={draft} onChange={e => setDraft(e.target.value)} placeholder="Share an update, ask a question, or describe what you need..." /><div className="postTypes"><button type="button">▧ Photo</button><button type="button">❔ Question</button><button type="button">◇ Need / service</button></div><div className="modalFoot"><small>Posts should follow the community guidelines.</small><button className="primary" disabled={!draft.trim()}>Post to feed</button></div></form></div>}
    {toast && <div className="toast"><span>✓</span>{toast}</div>}
  </div>;
}

function Heading({ overline, title, text }: { overline: string; title: string; text: string }) {
  return <div className="heading"><span className="eyebrow">{overline}</span><h1>{title}</h1><p>{text}</p></div>;
}

function Post({ id, initials, name, meta, text, tone, tag, stats = "Be the first to react", photo, supplier, alert, liked, setLiked, saved, setSaved, comments, setComments, flash }: { id: string; initials: string; name: string; meta: string; text: string; tone: string; tag?: string; stats?: string; photo?: string; supplier?: boolean; alert?: boolean; liked: Toggle; setLiked: React.Dispatch<React.SetStateAction<Toggle>>; saved: Toggle; setSaved: React.Dispatch<React.SetStateAction<Toggle>>; comments: Toggle; setComments: React.Dispatch<React.SetStateAction<Toggle>>; flash: (s:string)=>void }) {
  return <article className="post card"><header><Avatar text={initials} tone={tone} /><span><strong>{name} <i>✓</i></strong><small>{meta}</small></span><button>•••</button></header>{alert && <b className="alert">HEALTH AWARENESS</b>}<p>{text}</p>{tag && <span className={`tag ${alert ? "red" : ""}`}>{tag}</span>}{photo && <Photo kind={photo} />}{supplier && <div className="listing"><span><small>Available now</small><strong>Cattle feed · 50kg bags</strong></span><button onClick={() => flash("Supplier added to your messages")}>Message supplier</button></div>}<div className="stats">{stats}</div><div className="actions"><button className={liked[id] ? "active" : ""} onClick={() => setLiked(v => ({...v,[id]:!v[id]}))}>{liked[id] ? "♥" : "♡"}<span>Helpful</span></button><button className={comments[id] ? "active" : ""} onClick={() => setComments(v => ({...v,[id]:!v[id]}))}>◯<span>Comment</span></button><button onClick={() => flash("Post link copied — ready to share")}>↗<span>Share</span></button><button className={saved[id] ? "active" : ""} onClick={() => setSaved(v => ({...v,[id]:!v[id]}))}>{saved[id] ? "◆" : "◇"}</button></div>{comments[id] && <CommentBox />}</article>;
}

function CommentBox() {
  const [value,setValue] = useState(""); const [added,setAdded] = useState<string[]>([]);
  return <div className="comments"><div className="comment"><Avatar text="OM" tone="plum" small /><span><b>Onalenna M.</b><p>We use lablab hay and commercial concentrate. Introduce any feed change gradually.</p></span></div>{added.map((c,i) => <div className="comment" key={i}><Avatar text="DK" small /><span><b>Desmond Khimbele</b><p>{c}</p></span></div>)}<form onSubmit={e => {e.preventDefault(); if(value.trim()){setAdded(a => [...a,value]);setValue("");}}}><Avatar text="DK" small /><input value={value} onChange={e => setValue(e.target.value)} placeholder="Write a helpful comment..." /><button disabled={!value.trim()}>Send</button></form></div>;
}
function Notice({ icon, text, time }: { icon: string; text: React.ReactNode; time: string }) { return <div className="notice"><span>{icon}</span><p>{text}<small>{time}</small></p></div>; }
