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

function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [toast, setToast] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDay, setSelectedDay] = useState(21);

  useEffect(() => {
    if (!isRunning) return undefined;

    const interval = window.setInterval(() => {
      setSeconds((value) => {
        if (value > 0) return value - 1;

        setIsRunning(false);
        return 25 * 60;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const remainder = String(seconds % 60).padStart(2, "0");

  const handleAction = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  };

  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(25 * 60);
  };

  const renderInsights = () => (
    <section className="dashboard-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">INSIGHTS</p>
          <h1>Your attention, decoded.</h1>
          <p>
            See where your focus goes and how your habits are changing.
          </p>
        </div>
      </div>

      <div className="insight-grid">
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">FOCUS SCORE</p>
              <h3>82 / 100</h3>
            </div>
            <TrendingUp size={20} />
          </div>

          <p className="muted-copy">
            You're maintaining a strong balance between deep work and recovery.
          </p>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">DEEP WORK</p>
              <h3>4h 18m</h3>
            </div>
            <Flame size={20} />
          </div>

          <p className="muted-copy">
            Your best focus window is currently in the morning.
          </p>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">STREAK</p>
              <h3>6 days</h3>
            </div>
            <Zap size={20} />
          </div>

          <p className="muted-copy">
            Keep going. One focused session at a time.
          </p>
        </div>
      </div>
    </section>
  );

  const renderTasks = () => (
    <section className="dashboard-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">TASKS</p>
          <h1>Make progress visible.</h1>
          <p>Turn your intentions into focused actions.</p>
        </div>

        <button
          className="primary-small-button"
          onClick={() => handleAction("New task selected.")}
        >
          + New task
        </button>
      </div>

      <div className="tasks-panel dashboard-card">
        {tasks.map((task) => (
          <div className="task-row" key={task.id}>
            <button
              className={`task-check ${task.done ? "checked" : ""}`}
              onClick={() => toggleTask(task.id)}
              aria-label={`Mark ${task.title} as ${
                task.done ? "incomplete" : "complete"
              }`}
            >
              {task.done && <Check size={14} />}
            </button>

            <div className="task-main">
              <h3 className={task.done ? "task-done" : ""}>
                {task.title}
              </h3>

              <div className="task-meta">
                <span>{task.project}</span>
                <span>•</span>
                <span>{task.due}</span>
                <span>•</span>
                <span>{task.priority}</span>
              </div>
            </div>

            <button
              className="icon-button"
              onClick={() => handleAction("Task options selected.")}
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  const renderCalendar = () => (
    <section className="dashboard-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CALENDAR</p>
          <h1>Your focus history.</h1>
          <p>See the days where you showed up.</p>
        </div>
      </div>

      <div className="calendar-card dashboard-card">
        <div className="calendar-header">
          <button className="icon-button">
            <ChevronDown size={18} />
          </button>

          <h2>August 2024</h2>

          <button
            className="icon-button"
            onClick={() => handleAction("Calendar options selected.")}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="calendar-weekdays">
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
            (day) => (
              <span key={day}>{day}</span>
            )
          )}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((item, index) => (
            <button
              key={`${item.day}-${index}`}
              className={`calendar-day
                ${item.muted ? "muted" : ""}
                ${item.today ? "today" : ""}
                ${selectedDay === item.day && !item.muted ? "selected" : ""}
              `}
              onClick={() => {
                if (!item.muted) setSelectedDay(item.day);
              }}
            >
              <span>{item.day}</span>

              {item.sessions && (
                <span className="calendar-sessions">
                  {Array.from({ length: item.sessions }).map((_, i) => (
                    <i key={i}></i>
                  ))}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFocusSessions = () => (
    <section className="dashboard-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">FOCUS SESSIONS</p>
          <h1>Your focused hours.</h1>
          <p>Review the work that actually moved things forward.</p>
        </div>
      </div>

      <div className="dashboard-card session-list">
        {activities.map((activity) => (
          <div className="session-row" key={`${activity.time}-${activity.title}`}>
            <div className={`session-dot ${activity.color}`}></div>

            <div className="session-time">
              {activity.time}
            </div>

            <div className="session-content">
              <h3>{activity.title}</h3>
              <p>{activity.detail}</p>
            </div>

            <div className="session-duration">
              {activity.duration}
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  const renderOverview = () => (
    <>
      <div className="dashboard-topbar">
        <div>
          <p className="eyebrow">THURSDAY, AUGUST 21</p>
          <h1>Good morning, Alex.</h1>
          <p className="topbar-subtitle">
            Your attention is your most valuable resource.
          </p>
        </div>

        <div className="topbar-actions">
          <button
            className="icon-button"
            onClick={() => handleAction("Notifications opened.")}
          >
            <Bell size={19} />
          </button>

          <button
            className="avatar-button"
            onClick={() => handleAction("Profile opened.")}
          >
            AK
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={18} />
          </div>
          <div>
            <p>FOCUS TIME</p>
            <strong>4h 18m</strong>
            <span>+32m from yesterday</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Target size={18} />
          </div>
          <div>
            <p>FOCUS SCORE</p>
            <strong>82/100</strong>
            <span>Excellent today</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Flame size={18} />
          </div>
          <div>
            <p>DEEP WORK STREAK</p>
            <strong>6 days</strong>
            <span>Personal best: 11 days</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Coffee size={18} />
          </div>
          <div>
            <p>BREAK BALANCE</p>
            <strong>Good</strong>
            <span>18% of active time</span>
          </div>
        </div>
      </div>

      <div className="overview-grid">
        <div className="timer-card dashboard-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">FOCUS TIMER</p>
              <h2>Build your next block.</h2>
            </div>

            <button
              className="icon-button"
              onClick={resetTimer}
              title="Reset timer"
            >
              <RotateCcw size={17} />
            </button>
          </div>

          <div className="timer-display">
            <span>{minutes}</span>
            <small>:</small>
            <span>{remainder}</span>
          </div>

          <div className="timer-status">
            <span className={isRunning ? "status-dot running" : "status-dot"}></span>
            {isRunning ? "Focus session in progress" : "Ready when you are"}
          </div>

          <button
            className="timer-button"
            onClick={() => setIsRunning((value) => !value)}
          >
            <Play
              size={17}
              fill="currentColor"
            />
            {isRunning ? "Pause focus" : "Start focus"}
          </button>
        </div>

        <div className="score-card dashboard-card">
          <div className="card-heading">
            <div>
              <p className="eyebrow">TODAY'S SCORE</p>
              <h2>Attention quality</h2>
            </div>

            <Sparkles size={19} />
          </div>

          <div className="score-content">
            <div className="score-dial">
              <div className="score-dial-inner">
                <strong>82</strong>
                <span>/100</span>
              </div>
            </div>

            <div className="score-copy">
              <h3>Strong day.</h3>
              <p>
                Your deep work is outweighing your shallow activity.
              </p>

              <div className="score-bar">
                <span></span>
              </div>

              <small>
                <TrendingUp size={13} />
                8 points above your average
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card timeline-card">
        <div className="card-heading">
          <div>
            <p className="eyebrow">ATTENTION TIMELINE</p>
            <h2>Where your time went today.</h2>
          </div>

          <button
            className="secondary-button"
            onClick={() => setActiveNav("Focus sessions")}
          >
            View details
          </button>
        </div>

        <div className="timeline">
          {activities.map((activity) => (
            <div className="timeline-row" key={`${activity.time}-timeline`}>
              <div className="timeline-time">{activity.time}</div>

              <div className={`timeline-line ${activity.color}`}>
                <span></span>
              </div>

              <div className="timeline-info">
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.detail}</p>
                </div>

                <strong>{activity.duration}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeNav) {
      case "Focus sessions":
        return renderFocusSessions();

      case "Insights":
        return renderInsights();

      case "Tasks":
        return renderTasks();

      case "Calendar":
        return renderCalendar();

      case "Settings":
        return (
          <section className="dashboard-view">
            <div className="page-heading">
              <div>
                <p className="eyebrow">SETTINGS</p>
                <h1>Shape your workspace.</h1>
                <p>Customize how FocusForge works for you.</p>
              </div>
            </div>

            <div className="dashboard-card settings-card">
              <div className="setting-row">
                <div>
                  <h3>Focus duration</h3>
                  <p>Default length for a focus session.</p>
                </div>

                <strong>25 min</strong>
              </div>

              <div className="setting-row">
                <div>
                  <h3>Website blocking</h3>
                  <p>Protect your focus from distracting websites.</p>
                </div>

                <button
                  className="secondary-button"
                  onClick={() =>
                    handleAction("Website blocking settings selected.")
                  }
                >
                  Configure
                </button>
              </div>

              <div className="setting-row">
                <div>
                  <h3>Notifications</h3>
                  <p>Control reminders and focus session alerts.</p>
                </div>

                <button
                  className="secondary-button"
                  onClick={() =>
                    handleAction("Notification settings selected.")
                  }
                >
                  Configure
                </button>
              </div>
            </div>
          </section>
        );

      default:
        return renderOverview();
    }
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand brand">
          <span className="brand-mark">
            <Flame size={18} strokeWidth={2.4} />
          </span>

          <span>
            forged<span>focus</span>
          </span>
        </div>

        <div className="profile-card">
          <div className="profile-avatar">AK</div>

          <div className="profile-info">
            <strong>Alex Kim</strong>
            <span>Personal workspace</span>
          </div>

          <ChevronDown size={15} />
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-label">WORKSPACE</p>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`nav-item ${
                  activeNav === item.label ? "active" : ""
                }`}
                onClick={() => setActiveNav(item.label)}
              >
                <Icon size={17} />
                <span>{item.label}</span>

                {item.count && (
                  <span className="nav-count">{item.count}</span>
                )}
              </button>
            );
          })}

          <p className="sidebar-label sidebar-label-spaced">
            ORGANIZE
          </p>

          <button
            className={`nav-item ${
              activeNav === "Calendar" ? "active" : ""
            }`}
            onClick={() => setActiveNav("Calendar")}
          >
            <CalendarDays size={17} />
            <span>Calendar</span>
          </button>

          <button
            className={`nav-item ${
              activeNav === "Settings" ? "active" : ""
            }`}
            onClick={() => setActiveNav("Settings")}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button
            className="help-button"
            onClick={() => handleAction("Help center opened.")}
          >
            <CircleHelp size={17} />
            <span>Help center</span>
          </button>

          <div className="sidebar-tip">
            <Sparkles size={16} />

            <div>
              <strong>Protect your attention.</strong>
              <p>
                Every focused hour compounds.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {renderContent()}
      </main>

      {toast && (
        <div className="toast">
          <Check size={15} />
          {toast}
        </div>
      )}
    </div>
  );
}

export default Dashboard;