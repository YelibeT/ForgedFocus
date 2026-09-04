import { useEffect, useState } from "react";
import {
  BarChart3,
  Bell,
  CalendarDays,
  Check,
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
} from "lucide-react";

const activities = [
  {
    time: "09:08",
    duration: "1h 42m",
    title: "Product strategy",
    detail: "Linear, Notion, Figma",
    type: "deep",
    color: "gold",
  },
  {
    time: "11:06",
    duration: "24m",
    title: "Inbox zero",
    detail: "Superhuman, Slack",
    type: "shallow",
    color: "blue",
  },
  {
    time: "11:30",
    duration: "1h 18m",
    title: "Build session",
    detail: "VS Code, Terminal",
    type: "deep",
    color: "gold",
  },
  {
    time: "13:14",
    duration: "42m",
    title: "Lunch & reset",
    detail: "Offline time",
    type: "break",
    color: "muted",
  },
  {
    time: "14:02",
    duration: "52m",
    title: "Research sprint",
    detail: "Chrome, Readwise",
    type: "deep",
    color: "purple",
  },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Focus sessions", icon: TimerReset },
  { label: "Insights", icon: BarChart3 },
  { label: "Tasks", icon: ListTodo, count: 4 },
];

const initialTasks = [
  {
    id: 1,
    title: "Outline Q3 product strategy",
    project: "Product",
    due: "Today",
    priority: "High",
    done: false,
  },
  {
    id: 2,
    title: "Review onboarding notes",
    project: "Research",
    due: "Today",
    priority: "Medium",
    done: false,
  },
  {
    id: 3,
    title: "Write weekly reflection",
    project: "Personal",
    due: "Tomorrow",
    priority: "Low",
    done: false,
  },
  {
    id: 4,
    title: "Prepare design critique",
    project: "Product",
    due: "Aug 24",
    priority: "Medium",
    done: false,
  },
];

const calendarDays = [
  { day: 28, muted: true },
  { day: 29, muted: true },
  { day: 30, muted: true },
  { day: 31, muted: true },
  { day: 1, sessions: 2 },
  { day: 2, sessions: 1 },
  { day: 3 },
  { day: 4, sessions: 3 },
  { day: 5 },
  { day: 6, sessions: 2 },
  { day: 7 },
  { day: 8 },
  { day: 9, sessions: 1 },
  { day: 10 },
  { day: 11, sessions: 2 },
  { day: 12 },
  { day: 13 },
  { day: 14, sessions: 1 },
  { day: 15 },
  { day: 16, sessions: 2 },
  { day: 17 },
  { day: 18 },
  { day: 19, sessions: 3 },
  { day: 20 },
  { day: 21, today: true, sessions: 2 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25, sessions: 1 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29, sessions: 2 },
  { day: 30 },
  { day: 31 },
];

function App() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [toast, setToast] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDay, setSelectedDay] = useState(21);

  useEffect(() => {
    if (!isRunning) return undefined;
    const interval = window.setInterval(
      () => setSeconds((value) => (value > 0 ? value - 1 : 25 * 60)),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [isRunning]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");

  const handleAction = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  const toggleTask = (id) =>
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );

  const renderInsights = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">INSIGHTS / WEEK 34</p>
          <h1>Your attention, observed</h1>
          <p className="heading-sub">
            Patterns from the way you spent your time this week.
          </p>
        </div>
        <button
          className="date-button"
          onClick={() => handleAction("Date range changed")}
        >
          <CalendarDays size={16} /> Aug 19 - Aug 25 <ChevronDown size={14} />
        </button>
      </div>
      <section className="stats-row">
        <div className="stat-card primary-stat">
          <div className="stat-icon">
            <Clock3 size={17} />
          </div>
          <div>
            <span>Total focus time</span>
            <strong>18h 42m</strong>
            <small>
              <TrendingUp size={13} /> 18% from last week
            </small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon violet">
            <Target size={17} />
          </div>
          <div>
            <span>Average focus score</span>
            <strong>
              78 <small className="out-of">/ 100</small>
            </strong>
            <small className="neutral">Strong consistency</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <Zap size={17} />
          </div>
          <div>
            <span>Best focus day</span>
            <strong>Tuesday</strong>
            <small className="neutral">5h 12m focused</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <Flame size={17} />
          </div>
          <div>
            <span>Current streak</span>
            <strong>6 days</strong>
            <small className="neutral">Best: 12 days</small>
          </div>
        </div>
      </section>
      <div className="insights-grid">
        <section className="panel insight-chart-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">FOCUS HOURS</p>
              <h2>Weekly rhythm</h2>
            </div>
            <button
              className="period-select"
              onClick={() => handleAction("Weekly view selected")}
            >
              This week <ChevronDown size={14} />
            </button>
          </div>
          <div className="insight-bars">
            {[62, 82, 54, 72, 91, 36, 25].map((height, index) => (
              <div className="insight-bar-column" key={index}>
                <span>{index === 4 ? "5h 12m" : ""}</span>
                <div
                  className={`insight-bar ${index === 4 ? "highlight" : ""}`}
                  style={{ height: `${height}%` }}
                ></div>
                <small>
                  {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][index]}
                </small>
              </div>
            ))}
          </div>
        </section>
        <section className="panel insight-breakdown">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">ATTENTION MIX</p>
              <h2>Where your time went</h2>
            </div>
          </div>
          <div className="mix-row">
            <span className="mix-label">
              <i className="legend-dot amber"></i>Deep work
            </span>
            <strong>64%</strong>
            <div className="mix-track">
              <i className="mix-deep"></i>
            </div>
          </div>
          <div className="mix-row">
            <span className="mix-label">
              <i className="legend-dot blue-dot"></i>Shallow work
            </span>
            <strong>24%</strong>
            <div className="mix-track">
              <i className="mix-shallow"></i>
            </div>
          </div>
          <div className="mix-row">
            <span className="mix-label">
              <i className="legend-dot gray-dot"></i>Distracted
            </span>
            <strong>12%</strong>
            <div className="mix-track">
              <i className="mix-distracted"></i>
            </div>
          </div>
          <div className="insight-note">
            <Sparkles size={15} />
            <span>
              Your strongest window is <b>09:00 - 12:00</b>. Protect it for
              demanding work.
            </span>
          </div>
        </section>
      </div>
      <section className="panel insight-summary">
        <div>
          <p className="eyebrow">A SMALL OBSERVATION</p>
          <h2>Momentum is doing the heavy lifting.</h2>
          <p>
            You are starting earlier and taking fewer context switches between
            sessions. That extra 18% of focused time is coming from consistency,
            not longer days.
          </p>
        </div>
        <div className="summary-metric">
          <strong>+18%</strong>
          <span>
            focused time
            <br />
            week over week
          </span>
        </div>
      </section>
    </>
  );

  const renderTasks = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">TASKS / PERSONAL WORKSPACE</p>
          <h1>Make progress visible</h1>
          <p className="heading-sub">
            A short list for the work that deserves your attention.
          </p>
        </div>
        <button
          className="signin-submit task-add"
          onClick={() => handleAction("New task ready to add")}
        >
          <span>+</span> Add task
        </button>
      </div>
      <section className="panel tasks-panel">
        <div className="tasks-toolbar">
          <div className="task-tabs">
            <button className="selected">
              Today{" "}
              <span>
                {
                  tasks.filter((task) => task.due === "Today" && !task.done)
                    .length
                }
              </span>
            </button>
            <button>
              Upcoming <span>2</span>
            </button>
            <button>Completed</button>
          </div>
          <button
            className="period-select"
            onClick={() => handleAction("Task filters opened")}
          >
            All projects <ChevronDown size={14} />
          </button>
        </div>
        <div className="task-list">
          {tasks.map((task) => (
            <div
              className={`task-row ${task.done ? "complete" : ""}`}
              key={task.id}
            >
              <button
                className="task-check"
                aria-label={`${task.done ? "Mark incomplete" : "Complete"} ${task.title}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.done && <Check size={14} />}
              </button>
              <div className="task-copy">
                <strong>{task.title}</strong>
                <span>
                  {task.project} <i></i> Due {task.due}
                </span>
              </div>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <button
                className="activity-more"
                aria-label={`Options for ${task.title}`}
                onClick={() => handleAction(`${task.title} selected`)}
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
          ))}
        </div>
        <div className="tasks-footer">
          <span>
            <ListTodo size={14} /> {tasks.filter((task) => !task.done).length}{" "}
            tasks remaining
          </span>
          <button onClick={() => handleAction("Task sorting opened")}>
            Sort by priority <ChevronDown size={13} />
          </button>
        </div>
      </section>
      <div className="task-focus-strip">
        <Target size={18} />
        <div>
          <strong>Next up: 25 minutes of focused work</strong>
          <span>Choose a task above, then start a session from Overview.</span>
        </div>
        <button onClick={() => setActiveNav("Overview")}>
          Go to timer <ArrowRight size={15} />
        </button>
      </div>
    </>
  );

  const renderCalendar = () => (
    <>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CALENDAR / 2024</p>
          <h1>Plan your attention</h1>
          <p className="heading-sub">
            A clear view of sessions, tasks, and room to think.
          </p>
        </div>
        <button className="date-button" onClick={() => setSelectedDay(21)}>
          <CalendarDays size={16} /> Today <ChevronDown size={14} />
        </button>
      </div>
      <div className="calendar-layout">
        <section className="panel calendar-panel">
          <div className="calendar-header">
            <button
              aria-label="Previous month"
              onClick={() => handleAction("Previous month selected")}
            >
              ‹
            </button>
            <h2>August 2024</h2>
            <button
              aria-label="Next month"
              onClick={() => handleAction("Next month selected")}
            >
              ›
            </button>
          </div>
          <div className="calendar-weekdays">
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>
          <div className="calendar-grid">
            {calendarDays.map((date, index) => (
              <button
                key={`${date.day}-${index}`}
                className={`calendar-day ${date.muted ? "muted" : ""} ${date.today ? "today" : ""} ${selectedDay === date.day && !date.muted ? "selected" : ""}`}
                onClick={() => !date.muted && setSelectedDay(date.day)}
              >
                <b>{date.day}</b>
                {date.sessions && (
                  <span>
                    {date.sessions}{" "}
                    {date.sessions === 1 ? "session" : "sessions"}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>
        <aside className="panel day-agenda">
          <p className="eyebrow">WEDNESDAY, AUGUST {selectedDay}</p>
          <h2>
            {selectedDay === 21
              ? "A focused day ahead"
              : "Your plan for the day"}
          </h2>
          <div className="agenda-item">
            <span className="agenda-time">09:00</span>
            <div>
              <strong>Product strategy</strong>
              <small>Deep work · 90 min</small>
            </div>
            <i className="agenda-dot amber"></i>
          </div>
          <div className="agenda-item">
            <span className="agenda-time">11:30</span>
            <div>
              <strong>Build session</strong>
              <small>Deep work · 60 min</small>
            </div>
            <i className="agenda-dot blue"></i>
          </div>
          <div className="agenda-item">
            <span className="agenda-time">14:00</span>
            <div>
              <strong>Research sprint</strong>
              <small>Deep work · 45 min</small>
            </div>
            <i className="agenda-dot violet"></i>
          </div>
          <button
            className="agenda-add"
            onClick={() => handleAction("New calendar event ready to add")}
          >
            <span>+</span> Add focus block
          </button>
        </aside>
      </div>
    </>
  );

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <Flame size={18} strokeWidth={2.4} />
          </span>
          <span>
            forged<span>focus</span>
          </span>
        </div>
        <div className="workspace-switcher">
          <span className="avatar">AK</span>
          <span className="workspace-copy">
            <strong>Alex Kim</strong>
            <small>Personal workspace</small>
          </span>
          <ChevronDown size={15} />
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon, count }) => (
            <button
              className={`nav-item ${activeNav === label ? "active" : ""}`}
              key={label}
              onClick={() => setActiveNav(label)}
            >
              <Icon size={17} />
              <span>{label}</span>
              {count && <em>{count}</em>}
            </button>
          ))}
          <p className="nav-label nav-spacer">Your space</p>
          <button
            className="nav-item"
            onClick={() => handleAction("Calendar coming right up")}
          >
            <CalendarDays size={17} />
            <span>Calendar</span>
          </button>
          <button
            className="nav-item"
            onClick={() => handleAction("Settings opened")}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <Sparkles size={17} />
            <div>
              <strong>Make time for what matters</strong>
              <span>Unlock your complete focus history.</span>
            </div>
            <button
              aria-label="Learn more"
              onClick={() => handleAction("You are already doing great work")}
            >
              +
            </button>
          </div>
          <button
            className="help-link"
            onClick={() => handleAction("Help center opened")}
          >
            <CircleHelp size={16} /> Help center
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="crumb">
            <span>Wednesday, August 21</span>
            <span className="live-dot"></span>
            <span>Today</span>
          </div>
          <div className="top-actions">
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => handleAction("No new notifications")}
            >
              <Bell size={18} />
              <i></i>
            </button>
            <button className="top-avatar" aria-label="Account menu">
              AK
            </button>
          </div>
        </header>
        <div className="content-wrap">
          {activeNav === "Insights" ? (
            renderInsights()
          ) : activeNav === "Tasks" ? (
            renderTasks()
          ) : activeNav === "Calendar" ? (
            renderCalendar()
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">WEDNESDAY / WEEK 34</p>
                  <h1>
                    Good morning, Alex <span>✦</span>
                  </h1>
                  <p className="heading-sub">
                    Here is how your attention is shaping up today.
                  </p>
                </div>
                <button
                  className="date-button"
                  onClick={() => handleAction("Date picker opened")}
                >
                  <CalendarDays size={16} /> Aug 21, 2024{" "}
                  <ChevronDown size={14} />
                </button>
              </div>
              <section className="stats-row">
                <div className="stat-card primary-stat">
                  <div className="stat-icon">
                    <Clock3 size={17} />
                  </div>
                  <div>
                    <span>Focus time</span>
                    <strong>4h 18m</strong>
                    <small>
                      <TrendingUp size={13} /> 18% from last week
                    </small>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon violet">
                    <Target size={17} />
                  </div>
                  <div>
                    <span>Focus score</span>
                    <strong>
                      82 <small className="out-of">/ 100</small>
                    </strong>
                    <small className="neutral">+6 points today</small>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon blue">
                    <Zap size={17} />
                  </div>
                  <div>
                    <span>Deep work streak</span>
                    <strong>6 days</strong>
                    <small className="neutral">Best: 12 days</small>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon green">
                    <Coffee size={17} />
                  </div>
                  <div>
                    <span>Break balance</span>
                    <strong>Good</strong>
                    <small className="neutral">12% of workday</small>
                  </div>
                </div>
              </section>

              <div className="dashboard-grid">
                <section className="timer-panel panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">FOCUS TIMER</p>
                      <h2>Make some progress</h2>
                    </div>
                    <button
                      className="more-button"
                      aria-label="More timer options"
                    >
                      <MoreHorizontal size={19} />
                    </button>
                  </div>
                  <div className="timer-stage">
                    <div className="timer-ring">
                      <div className="timer-inner">
                        <span className="timer-label">DEEP WORK</span>
                        <strong>
                          {minutes}
                          <b>:</b>
                          {remainder}
                        </strong>
                        <span className="timer-task">Product strategy</span>
                      </div>
                    </div>
                  </div>
                  <div className="timer-controls">
                    <button
                      className="reset-button"
                      aria-label="Reset timer"
                      onClick={() => {
                        setSeconds(25 * 60);
                        setIsRunning(false);
                      }}
                    >
                      <RotateCcw size={18} />
                    </button>
                    <button
                      className={`play-button ${isRunning ? "running" : ""}`}
                      onClick={() => setIsRunning((value) => !value)}
                    >
                      {isRunning ? (
                        <span className="pause-bars">
                          <i></i>
                          <i></i>
                        </span>
                      ) : (
                        <Play size={21} fill="currentColor" />
                      )}
                      <span>
                        {isRunning ? "Pause session" : "Start focus session"}
                      </span>
                    </button>
                    <button
                      className="reset-button"
                      aria-label="Timer settings"
                      onClick={() => handleAction("Timer settings opened")}
                    >
                      <Settings size={18} />
                    </button>
                  </div>
                  <div className="timer-footer">
                    <span>
                      <span className="pulse"></span> Auto-tracking is on
                    </span>
                    <button
                      onClick={() => handleAction("Session picker opened")}
                    >
                      Change session <ChevronDown size={13} />
                    </button>
                  </div>
                </section>

                <section className="score-panel panel">
                  <div className="panel-heading">
                    <div>
                      <p className="eyebrow">YOUR ATTENTION</p>
                      <h2>Focus score</h2>
                    </div>
                    <button
                      className="period-select"
                      onClick={() => handleAction("Period changed")}
                    >
                      This week <ChevronDown size={14} />
                    </button>
                  </div>
                  <div className="score-content">
                    <div className="score-dial">
                      <svg viewBox="0 0 160 160" aria-hidden="true">
                        <circle className="dial-track" cx="80" cy="80" r="66" />
                        <circle
                          className="dial-progress"
                          cx="80"
                          cy="80"
                          r="66"
                        />
                      </svg>
                      <div className="score-number">
                        <strong>82</strong>
                        <span>Good</span>
                      </div>
                    </div>
                    <div className="score-copy">
                      <p>
                        Your attention is <strong>sharper</strong> than usual
                        this week. Keep protecting your mornings.
                      </p>
                      <div className="score-legend">
                        <span>
                          <i className="legend-dot amber"></i>Deep work{" "}
                          <b>64%</b>
                        </span>
                        <span>
                          <i className="legend-dot blue-dot"></i>Shallow work{" "}
                          <b>24%</b>
                        </span>
                        <span>
                          <i className="legend-dot gray-dot"></i>Distracted{" "}
                          <b>12%</b>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="score-chart">
                    <div className="chart-labels">
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span>SAT</span>
                      <span>SUN</span>
                    </div>
                    <div className="bars">
                      {[48, 62, 56, 78, 68, 0, 0].map((height, index) => (
                        <div
                          className={`bar-col ${index === 2 ? "current" : ""}`}
                          key={index}
                        >
                          <div
                            className="bar"
                            style={{ height: `${height || 8}px` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              <section className="timeline-panel panel">
                <div className="panel-heading timeline-heading">
                  <div>
                    <p className="eyebrow">TODAY / 09:08 - NOW</p>
                    <h2>Attention timeline</h2>
                  </div>
                  <button
                    className="view-button"
                    onClick={() => handleAction("Detailed timeline opened")}
                  >
                    View details <span>↗</span>
                  </button>
                </div>
                <div className="timeline">
                  <div className="timeline-line"></div>
                  {activities.map((activity) => (
                    <div className="activity" key={activity.time}>
                      <span
                        className={`activity-marker ${activity.color}`}
                      ></span>
                      <span className="activity-time">{activity.time}</span>
                      <div className="activity-body">
                        <div className="activity-main">
                          <strong>{activity.title}</strong>
                          <span className={`activity-type ${activity.type}`}>
                            {activity.type === "deep"
                              ? "Deep work"
                              : activity.type === "break"
                                ? "Break"
                                : "Shallow work"}
                          </span>
                        </div>
                        <small>{activity.detail}</small>
                      </div>
                      <span className="activity-duration">
                        {activity.duration}
                      </span>
                      <button
                        className="activity-more"
                        aria-label={`Options for ${activity.title}`}
                        onClick={() =>
                          handleAction(`${activity.title} selected`)
                        }
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
          <footer className="page-footer">
            <span>Last synced just now</span>
            <span>ForgedFocus v1.0</span>
          </footer>
        </div>
      </main>
      {toast && (
        <div className="toast">
          <Sparkles size={15} />
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
