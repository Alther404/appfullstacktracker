import { useState, useEffect } from 'react';
import { TaskBoard } from './components/TaskBoard';
import { StatsDashboard } from './components/StatsDashboard';
import { PomodoroTimer } from './components/PomodoroTimer';
import { NotesPanel } from './components/NotesPanel';
import { ResourceLibrary } from './components/ResourceLibrary';
import { NextStepWidget } from './components/NextStepWidget';
import { RoadmapView } from './components/RoadmapView';
import { ProjectSystem } from './components/ProjectSystem';
import { TitleBar } from './components/TitleBar';
import { LoadingScreen } from './components/LoadingScreen';
import { FAQView } from './components/FAQView';
import { useGamification } from './hooks/useGamification';
import { useSettings } from './contexts/SettingsContext';
import { useAchievements } from './hooks/useAchievements';
import { useTasks } from './hooks/useTasks';
import { englishCurriculum } from './data/curriculum';

function App() {
  const { stats, addXP, getLevelTitle, getNextLevelXP } = useGamification();
  const { t, language, toggleLanguage, theme, toggleTheme, resetProgress } = useSettings();
  const { checkAchievements } = useAchievements();
  const { tasks } = useTasks();

  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Check achievements when stats change
  useEffect(() => {
    const pomodoroSessions = JSON.parse(localStorage.getItem('devjourney_sessions') || '[]').length;
    const tasksCompleted = tasks.filter(t => t.status === 'done').length;
    const streak = stats.streak || 0;

    checkAchievements({
      tasksCompleted,
      totalXP: stats.xp,
      streak,
      pomodoroSessions
    });
  }, [stats.xp, tasks, checkAchievements]);

  const [focusedTask, setFocusedTask] = useState(null);

  const handleStartLearning = (task) => {
    setFocusedTask(task);
    setCurrentView('roadmap');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'roadmap':
        return <RoadmapView initialTask={focusedTask} onTaskCleared={() => setFocusedTask(null)} />;
      case 'english':
        return <RoadmapView curriculumData={englishCurriculum} />;
      case 'projects':
        return <ProjectSystem />;
      case 'faq':
        return <FAQView />;
      case 'resources':
        return <ResourceLibrary />;
      case 'notes':
        return <NotesPanel />;
      case 'dashboard':
      default:
        return (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', height: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
              <NextStepWidget onStartLearning={handleStartLearning} />
              <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '1rem' }}>{t('activeTasks')}</h2>
                <div style={{ flex: 1, overflow: 'auto' }}>
                  <TaskBoard onTaskComplete={addXP} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
              <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <h2>{t('stats')}</h2>
                <div style={{ marginTop: '1rem' }}>
                  <StatsDashboard stats={stats} getLevelTitle={getLevelTitle} getNextLevelXP={getNextLevelXP} />
                </div>
              </div>
              <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <PomodoroTimer />
              </div>
            </div>
          </div>
        );
    }
  };

  const NavButton = ({ view, icon, label }) => (
    <button
      onClick={() => setCurrentView(view)}
      style={{
        width: '100%',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: currentView === view ? 'var(--accent-gradient)' : 'transparent',
        color: currentView === view ? 'white' : 'var(--text-secondary)',
        borderRadius: 'var(--radius-md)',
        transition: 'all 0.2s ease',
        fontWeight: '600',
        marginBottom: '0.5rem',
        border: 'none',
        cursor: 'pointer'
      }}
      onMouseEnter={e => {
        if (currentView !== view) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
      onMouseLeave={e => {
        if (currentView !== view) e.currentTarget.style.background = 'transparent';
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>{icon}</span>
      {label}
    </button>
  );

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)'
    }}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <TitleBar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', paddingTop: '32px' }}>
        {/* Sidebar */}
        <aside style={{
          width: '280px',
          padding: '2rem',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 className="text-gradient" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t('appTitle')}</h1>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Level {stats.level} • {getLevelTitle(stats.level)}
            </div>
          </div>

          <nav style={{ flex: 1 }}>
            <NavButton view="dashboard" icon="📊" label={t('dashboard') || 'Dashboard'} />
            <NavButton view="roadmap" icon="🗺️" label={t('roadmap') || 'Roadmap'} />
            <NavButton view="english" icon="🇬🇧" label={language === 'ru' ? 'Английский для IT' : 'English for IT'} />
            <NavButton view="projects" icon="🚀" label={t('projects') || 'Projects'} />
            <NavButton view="resources" icon="📚" label={t('resources') || 'Resources'} />
            <NavButton view="notes" icon="📝" label={t('notes') || 'Notes'} />
            <NavButton view="faq" icon="❓" label={t('faq') || 'FAQ'} />
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={toggleTheme}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={toggleLanguage}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {language.toUpperCase()}
              </button>
            </div>
            <button
              onClick={resetProgress}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-sm)',
                color: '#ef4444',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              ⚠️ {t('reset') || 'Reset Progress'}
            </button>
          </div>

          <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Streak</span>
              <span style={{ fontWeight: 'bold', color: 'var(--warning)' }}>🔥 {stats.streak}</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
              {t('madeBy')}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '2rem', overflow: 'hidden' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
