import { useEffect, useState } from "react";
import { Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
import { Code2, Trophy, Flame, Target, Search, ChevronRight, Menu, X, LogOut, UserRound, Zap, ArrowUpRight, CheckCircle2, LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { signIn, signUp, signOut, request } from "./api";

const problems = [
  { id: 1, title: "Two Sum", topic: "Array · Hash Table", difficulty: "Easy", acceptance: "49.2%", done: true },
  { id: 2, title: "Valid Parentheses", topic: "Stack · String", difficulty: "Easy", acceptance: "40.8%" },
  { id: 3, title: "Longest Substring Without Repeating Characters", topic: "Hash Table · Sliding Window", difficulty: "Medium", acceptance: "34.7%" },
  { id: 4, title: "Median of Two Sorted Arrays", topic: "Array · Binary Search", difficulty: "Hard", acceptance: "41.3%" },
  { id: 5, title: "Best Time to Buy and Sell Stock", topic: "Array · Dynamic Programming", difficulty: "Easy", acceptance: "54.1%" },
  { id: 6, title: "Product of Array Except Self", topic: "Array · Prefix Sum", difficulty: "Medium", acceptance: "66.5%" }
];
const languages = ["C", "C++", "Python", "Java", "JavaScript"];

function Header({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  return <header className="topbar"><div className="nav-wrap">
    <Link to="/" className="brand"><span className="brand-mark"><Code2 size={21}/></span><span>code<span className="brand-accent">arena</span></span></Link>
    <nav className={open ? "nav-links show" : "nav-links"}>
      <NavLink to="/" end onClick={() => setOpen(false)}>Explore</NavLink>
      <a href="#problems" onClick={() => setOpen(false)}>Problems</a>
      <a href="#features" onClick={() => setOpen(false)}>Features</a>
    </nav>
    <div className="nav-actions">
      {user ? <><span className="user-chip"><span className="avatar">{user.name?.[0]?.toUpperCase()}</span>{user.name}</span><button className="icon-btn" title="Sign out" onClick={onLogout}><LogOut size={17}/></button></> :
        <><Link className="login-link" to="/login">Log in</Link><Link className="btn btn-primary btn-small" to="/signup">Sign up</Link></>}
    </div>
    <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button>
  </div></header>;
}

function Hero({ user }) {
  return <section className="hero">
    <div className="hero-grid"></div><div className="hero-content">
      <div className="eyebrow"><span className="pulse"></span> YOUR NEXT LEVEL STARTS HERE</div>
      <h1>Master the craft<br/>of <span className="gradient-text">code.</span></h1>
      <p className="hero-copy">Sharpen your problem-solving skills, prepare for interviews, and compete with developers around the world.</p>
      <div className="hero-buttons"><a href="#problems" className="btn btn-primary">Start practicing <ChevronRight size={17}/></a><a href="#features" className="btn btn-ghost">Explore platform</a></div>
      <div className="hero-proof"><div className="proof-avatars"><span>AK</span><span>JS</span><span>RM</span><span>+</span></div><span>Built for the next generation of developers</span></div>
    </div>
    <div className="hero-visual"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="code-card">
      <div className="code-card-head"><div className="window-dots"><i></i><i></i><i></i></div><span>solution.py</span><span className="code-status"><span></span> Ready</span></div>
      <div className="code-lines"><div><em>01</em><span><b className="purple">def</b> <b className="blue">two_sum</b>(nums, target):</span></div><div><em>02</em><span className="indent"><b className="purple">seen</b> = {"{}"}</span></div><div><em>03</em><span className="indent"><b className="purple">for</b> i, num <b className="purple">in</b> enumerate(nums):</span></div><div><em>04</em><span className="indent2">diff = target - num</span></div><div><em>05</em><span className="indent2"><b className="purple">if</b> diff <b className="purple">in</b> seen:</span></div><div><em>06</em><span className="indent3"><b className="purple">return</b> [seen[diff], i]</span></div><div><em>07</em><span className="indent2">seen[num] = i</span></div></div>
      <div className="run-result"><span><CheckCircle2 size={15}/> Accepted</span><span>Runtime: 48 ms</span><span>Memory: 16.2 MB</span></div>
    </div><div className="float-badge badge-top"><Zap size={15}/> Think. Code. Win.</div><div className="float-badge badge-bottom"><Trophy size={16}/> Keep climbing</div></div>
  </section>;
}

function Stats() {
  return <div className="stats-strip"><div><strong>5</strong><span>Languages planned</span></div><div><strong>3</strong><span>Difficulty levels</span></div><div><strong>∞</strong><span>Room to grow</span></div><div><strong>1</strong><span>Goal: get better daily</span></div></div>;
}

function Problems() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = problems.filter(p => (filter === "All" || p.difficulty === filter) && `${p.title} ${p.topic}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="section problems-section" id="problems"><div className="section-heading"><div><div className="eyebrow">THE PRACTICE ARENA</div><h2>Pick a challenge.<br/><span className="muted-heading">Build your edge.</span></h2></div><a href="/signup" className="text-link">View all problems <ArrowUpRight size={16}/></a></div>
    <div className="problem-toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search problems or topics..."/></div><div className="filter-tabs">{["All","Easy","Medium","Hard"].map(x=><button key={x} className={filter===x?"active":""} onClick={()=>setFilter(x)}>{x}</button>)}</div></div>
    <div className="problem-table"><div className="table-head"><span>STATUS</span><span>PROBLEM</span><span>DIFFICULTY</span><span>ACCEPTANCE</span></div>
      {filtered.map(p=><div className="problem-row" key={p.id}><span className="status-cell">{p.done?<CheckCircle2 size={17} className="done"/>:<span className="empty-status"/>}</span><div className="problem-name"><strong>{p.id}. {p.title}</strong><small>{p.topic}</small></div><span><i className={`difficulty ${p.difficulty.toLowerCase()}`}>{p.difficulty}</i></span><span className="acceptance">{p.acceptance}</span></div>)}
      {filtered.length===0&&<div className="empty-state">No problems match your search.</div>}
    </div><p className="demo-note">Preview data for Phase 1 · The coding judge and full problem library arrive in Phase 2.</p>
  </section>;
}

function Features() {
  const items = [
    { icon: <Target/>, title: "Practice with purpose", text: "Build consistency with curated challenges across core computer science topics." },
    { icon: <Flame/>, title: "Track your progress", text: "Create a daily habit, celebrate milestones, and keep your momentum going." },
    { icon: <Trophy/>, title: "Compete and climb", text: "Challenge yourself, compare progress, and work toward the top of the leaderboard." }
  ];
  return <section className="section features-section" id="features"><div className="section-heading centered"><div className="eyebrow">WHY CODEARENA</div><h2>Everything you need to<br/><span className="muted-heading">level up your skills.</span></h2></div><div className="feature-grid">{items.map((x,i)=><article className="feature-card" key={x.title}><div className="feature-icon">{x.icon}</div><span className="feature-number">0{i+1}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></section>;
}

function Footer() { return <footer className="footer"><Link to="/" className="brand"><span className="brand-mark"><Code2 size={18}/></span><span>code<span className="brand-accent">arena</span></span></Link><span>Practice smarter. Build boldly.</span><span>© {new Date().getFullYear()} CodeArena</span></footer>; }

function Home({ user }) { return <><Hero user={user}/><Stats/><Problems/><Features/><Footer/></>; }

function AuthPage({ mode, onAuth }) {
  const isSignup = mode === "signup";
  const [name,setName] = useState(""); const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [show,setShow] = useState(false); const [error,setError] = useState(""); const [busy,setBusy] = useState(false);
  const navigate = useNavigate();
  async function submit(e) { e.preventDefault(); setError(""); setBusy(true); try { const user = isSignup ? await signUp(name,email,password) : await signIn(email,password); onAuth(user); navigate("/"); } catch(err) { setError(err.message); } finally { setBusy(false); } }
  return <main className="auth-page"><div className="auth-decoration"></div><div className="auth-card"><Link to="/" className="brand auth-brand"><span className="brand-mark"><Code2 size={21}/></span><span>code<span className="brand-accent">arena</span></span></Link><div className="auth-title"><div className="eyebrow">{isSignup?"JOIN THE ARENA":"WELCOME BACK"}</div><h1>{isSignup?"Create your account.":"Good to see you."}</h1><p>{isSignup?"Your next breakthrough starts with one challenge.":"Sign in and get back to building your edge."}</p></div>
    <form onSubmit={submit} className="auth-form">{isSignup&&<label>Full name<div className="field"><UserRound size={17}/><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" minLength="2" maxLength="80" required/></div></label>}<label>Email address<div className="field"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></div></label><label>Password<div className="field"><LockKeyhole size={17}/><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 8 characters" minLength="8" required/><button type="button" className="reveal" onClick={()=>setShow(!show)}>{show?<EyeOff size={17}/>:<Eye size={17}/>}</button></div></label>
      {error&&<div className="form-error">{error}</div>}<button className="btn btn-primary submit-btn" disabled={busy}>{busy?"Please wait...":isSignup?"Create account":"Log in"} <ChevronRight size={17}/></button></form>
    <p className="auth-switch">{isSignup?"Already have an account?":"New to CodeArena?"} <Link to={isSignup?"/login":"/signup"}>{isSignup?"Log in":"Create an account"}</Link></p><p className="auth-terms">By continuing, you agree to use CodeArena responsibly.</p></div></main>;
}

function App() {
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(!!localStorage.getItem("codearena_token"));
  useEffect(()=>{ if(localStorage.getItem("codearena_token")) request("/api/auth/me").then(d=>setUser(d.user)).catch(()=>signOut()).finally(()=>setLoading(false)); },[]);
  function logout(){ signOut(); setUser(null); }
  if(loading) return <div className="loading-screen">Loading CodeArena...</div>;
  return <><Header user={user} onLogout={logout}/><Routes><Route path="/" element={<Home user={user}/>}/><Route path="/login" element={<AuthPage mode="login" onAuth={setUser}/>}/><Route path="/signup" element={<AuthPage mode="signup" onAuth={setUser}/>}/><Route path="*" element={<Home user={user}/>}/></Routes></>;
}
export default App;