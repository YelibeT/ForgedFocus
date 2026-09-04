import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  Clock3,
  Coffee,
  Flame,
  LayoutDashboard,
  ListTodo,
  MoreHorizontal,
  Play,
  RotateCcw,
  Settings,
  Sparkles,
  Target,
  TimerReset,
  TrendingUp,
  Zap,
} from 'lucide-react'

const activities = [
  { time: '09:08', duration: '1h 42m', title: 'Product strategy', detail: 'Linear, Notion, Figma', type: 'deep', color: 'gold' },
  { time: '11:06', duration: '24m', title: 'Inbox zero', detail: 'Superhuman, Slack', type: 'shallow', color: 'blue' },
  { time: '11:30', duration: '1h 18m', title: 'Build session', detail: 'VS Code, Terminal', type: 'deep', color: 'gold' },
  { time: '13:14', duration: '42m', title: 'Lunch & reset', detail: 'Offline time', type: 'break', color: 'muted' },
  { time: '14:02', duration: '52m', title: 'Research sprint', detail: 'Chrome, Readwise', type: 'deep', color: 'purple' },
]

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Focus sessions', icon: TimerReset },
  { label: 'Insights', icon: BarChart3 },
  { label: 'Tasks', icon: ListTodo, count: 4 },
]

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(25 * 60)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!isRunning) return undefined
    const interval = window.setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 25 * 60)), 1000)
    return () => window.clearInterval(interval)
  }, [isRunning])

  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0')
  const remainder = String(seconds % 60).padStart(2, '0')

  const handleAction = (message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2200)
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark"><Flame size={18} strokeWidth={2.4} /></span><span>forged<span>focus</span></span></div>
        <div className="workspace-switcher"><span className="avatar">AK</span><span className="workspace-copy"><strong>Alex Kim</strong><small>Personal workspace</small></span><ChevronDown size={15} /></div>
        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon, count }) => <button className={`nav-item ${activeNav === label ? 'active' : ''}`} key={label} onClick={() => setActiveNav(label)}><Icon size={17} /><span>{label}</span>{count && <em>{count}</em>}</button>)}
          <p className="nav-label nav-spacer">Your space</p>
          <button className="nav-item" onClick={() => handleAction('Calendar coming right up')}><CalendarDays size={17} /><span>Calendar</span></button>
          <button className="nav-item" onClick={() => handleAction('Settings opened')}><Settings size={17} /><span>Settings</span></button>
        </nav>
        <div className="sidebar-bottom"><div className="upgrade-card"><Sparkles size={17} /><div><strong>Make time for what matters</strong><span>Unlock your complete focus history.</span></div><button aria-label="Learn more" onClick={() => handleAction('You are already doing great work')}>+</button></div><button className="help-link" onClick={() => handleAction('Help center opened')}><CircleHelp size={16} /> Help center</button></div>
      </aside>

      <main className="main-content">
        <header className="topbar"><div className="crumb"><span>Wednesday, August 21</span><span className="live-dot"></span><span>Today</span></div><div className="top-actions"><button className="icon-button" aria-label="Notifications" onClick={() => handleAction('No new notifications')}><Bell size={18} /><i></i></button><button className="top-avatar" aria-label="Account menu">AK</button></div></header>
        <div className="content-wrap">
          <div className="page-heading"><div><p className="eyebrow">WEDNESDAY / WEEK 34</p><h1>Good morning, Alex <span>✦</span></h1><p className="heading-sub">Here is how your attention is shaping up today.</p></div><button className="date-button" onClick={() => handleAction('Date picker opened')}><CalendarDays size={16} /> Aug 21, 2024 <ChevronDown size={14} /></button></div>
          <section className="stats-row"><div className="stat-card primary-stat"><div className="stat-icon"><Clock3 size={17} /></div><div><span>Focus time</span><strong>4h 18m</strong><small><TrendingUp size={13} /> 18% from last week</small></div></div><div className="stat-card"><div className="stat-icon violet"><Target size={17} /></div><div><span>Focus score</span><strong>82 <small className="out-of">/ 100</small></strong><small className="neutral">+6 points today</small></div></div><div className="stat-card"><div className="stat-icon blue"><Zap size={17} /></div><div><span>Deep work streak</span><strong>6 days</strong><small className="neutral">Best: 12 days</small></div></div><div className="stat-card"><div className="stat-icon green"><Coffee size={17} /></div><div><span>Break balance</span><strong>Good</strong><small className="neutral">12% of workday</small></div></div></section>

          <div className="dashboard-grid">
            <section className="timer-panel panel"><div className="panel-heading"><div><p className="eyebrow">FOCUS TIMER</p><h2>Make some progress</h2></div><button className="more-button" aria-label="More timer options"><MoreHorizontal size={19} /></button></div><div className="timer-stage"><div className="timer-ring"><div className="timer-inner"><span className="timer-label">DEEP WORK</span><strong>{minutes}<b>:</b>{remainder}</strong><span className="timer-task">Product strategy</span></div></div></div><div className="timer-controls"><button className="reset-button" aria-label="Reset timer" onClick={() => { setSeconds(25 * 60); setIsRunning(false) }}><RotateCcw size={18} /></button><button className={`play-button ${isRunning ? 'running' : ''}`} onClick={() => setIsRunning((value) => !value)}>{isRunning ? <span className="pause-bars"><i></i><i></i></span> : <Play size={21} fill="currentColor" />}<span>{isRunning ? 'Pause session' : 'Start focus session'}</span></button><button className="reset-button" aria-label="Timer settings" onClick={() => handleAction('Timer settings opened')}><Settings size={18} /></button></div><div className="timer-footer"><span><span className="pulse"></span> Auto-tracking is on</span><button onClick={() => handleAction('Session picker opened')}>Change session <ChevronDown size={13} /></button></div></section>

            <section className="score-panel panel"><div className="panel-heading"><div><p className="eyebrow">YOUR ATTENTION</p><h2>Focus score</h2></div><button className="period-select" onClick={() => handleAction('Period changed')}>This week <ChevronDown size={14} /></button></div><div className="score-content"><div className="score-dial"><svg viewBox="0 0 160 160" aria-hidden="true"><circle className="dial-track" cx="80" cy="80" r="66" /><circle className="dial-progress" cx="80" cy="80" r="66" /></svg><div className="score-number"><strong>82</strong><span>Good</span></div></div><div className="score-copy"><p>Your attention is <strong>sharper</strong> than usual this week. Keep protecting your mornings.</p><div className="score-legend"><span><i className="legend-dot amber"></i>Deep work <b>64%</b></span><span><i className="legend-dot blue-dot"></i>Shallow work <b>24%</b></span><span><i className="legend-dot gray-dot"></i>Distracted <b>12%</b></span></div></div></div><div className="score-chart"><div className="chart-labels"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div><div className="bars">{[48, 62, 56, 78, 68, 0, 0].map((height, index) => <div className={`bar-col ${index === 2 ? 'current' : ''}`} key={index}><div className="bar" style={{ height: `${height || 8}px` }}></div></div>)}</div></div></section>
          </div>

          <section className="timeline-panel panel"><div className="panel-heading timeline-heading"><div><p className="eyebrow">TODAY / 09:08 - NOW</p><h2>Attention timeline</h2></div><button className="view-button" onClick={() => handleAction('Detailed timeline opened')}>View details <span>↗</span></button></div><div className="timeline"><div className="timeline-line"></div>{activities.map((activity) => <div className="activity" key={activity.time}><span className={`activity-marker ${activity.color}`}></span><span className="activity-time">{activity.time}</span><div className="activity-body"><div className="activity-main"><strong>{activity.title}</strong><span className={`activity-type ${activity.type}`}>{activity.type === 'deep' ? 'Deep work' : activity.type === 'break' ? 'Break' : 'Shallow work'}</span></div><small>{activity.detail}</small></div><span className="activity-duration">{activity.duration}</span><button className="activity-more" aria-label={`Options for ${activity.title}`} onClick={() => handleAction(`${activity.title} selected`)}><MoreHorizontal size={17} /></button></div>)}</div></section>
          <footer className="page-footer"><span>Last synced just now</span><span>ForgedFocus v1.0</span></footer>
        </div>
      </main>
      {toast && <div className="toast"><Sparkles size={15} />{toast}</div>}
    </div>
  )
}

export default App
