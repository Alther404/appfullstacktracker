
import { useState, useEffect } from 'react';
import { TaskBoard } from './components/TaskBoard';
import { StatsDashboard } from './components/StatsDashboard';
import { PomodoroTimer } from './components/PomodoroTimer';
import { MusicPlayer } from './components/MusicPlayer';
import { JourneyTimeline } from './components/JourneyTimeline';
import { NotesPanel } from './components/NotesPanel';
import { ResourceLibrary } from './components/ResourceLibrary';
import { DevLog } from './components/DevLog';
import { GitHubStats } from './components/GitHubStats';
import { FocusChart } from './components/FocusChart';
import { useGamification } from './hooks/useGamification';
import { useSettings } from './contexts/SettingsContext';

function App() {
  const { stats, addXP, getLevelTitle, getNextLevelXP } = useGamification();
  const { t, language, toggleLanguage, theme, toggleTheme } = useSettings();
  const [showJourney, setShowJourney] = useState(false);

  // Check for Freelance Readiness
  useEffect(() => {
    if (stats.level === 5) {
      // In a real app, we'd use a toast system. For now, a custom alert/banner.
      // We can add a state for "showCelebration"
    }
  }, [stats.level]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      gap: '2rem',
      position: 'relative'
    }}>
      {/* Freelance Notification Banner */}
      {stats.level >= 5 && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '0.5rem 1.5rem',
          borderRadius: 'var(--radius-lg)',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid var(--success)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'slideDown 0.5s ease'
        }}>
          <span>🚀</span>
          <span style={{ fontWeight: 'bold', color: 'var(--success)' }}>{t('freelanceReady')}</span>
        </div>
      )}

      {/* Journey Modal */}
      {showJourney && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          padding: '2rem',
          overflowY: 'auto'
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button
              onClick={() => setShowJourney(false)}
              style={{
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
                background: 'var(--accent-primary)',
                borderRadius: 'var(--radius-md)',
                color: 'white'
              }}
            >
              ← Back
            </button>
            <JourneyTimeline stats={stats} />
          </div>
        </div>
      )}

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2rem' }}>{t('appTitle')}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{t('level')} {stats.level} • {getLevelTitle(stats.level)}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {/* Settings Controls */}
          <div className="glass-panel" style={{ display: 'flex', gap: '0.5rem', padding: '0.4rem', borderRadius: 'var(--radius-md)', alignItems: 'center' }}>
            <button
              onClick={toggleLanguage}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: language === 'en' ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: 'var(--text-primary)',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                transition: 'all 0.2s ease'
              }}
              title="Switch Language / Сменить язык"
            >
              {language.toUpperCase()}
            </button>
            <div style={{ width: '1px', height: '15px', background: 'var(--text-secondary)', opacity: 0.3 }}></div>
            <button
              onClick={toggleTheme}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1.1rem',
                background: 'transparent',
                transition: 'transform 0.2s ease'
              }}
              title="Toggle Theme"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </button>
          </div>

          <button
            onClick={() => window.open('https://roadmap.sh/full-stack', '_blank')}
            className="glass-panel"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-primary)',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            🌐 {t('roadmap')}
          </button>
          <button
            onClick={() => setShowJourney(true)}
            className="glass-panel"
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontWeight: '600'
            }}
          >
            📈 {t('myLevels')}
          </button>
          <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)' }}>
            <span>🔥 {t('streak')}: {stats.streak} {t('days')}</span>
          </div>
        </div>
      </header>

      <main style={{ flex: 1, display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', overflow: 'hidden' }}>
        <section className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <h2 style={{ marginBottom: '1rem' }}>{t('activeTasks')}</h2>
          <TaskBoard onTaskComplete={addXP} />
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <h2>{t('stats')}</h2>
            <div style={{ marginTop: '1rem' }}>
              <StatsDashboard stats={stats} getLevelTitle={getLevelTitle} getNextLevelXP={getNextLevelXP} />
            </div>
          </div>

          <div style={{ height: '300px' }}>
            <NotesPanel />
          </div>

          <div style={{ height: '300px' }}>
            <ResourceLibrary />
          </div>

          <div style={{ height: '400px' }}>
            <DevLog />
          </div>

          <div style={{ height: '300px' }}>
            <GitHubStats />
          </div>

          <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
            <PomodoroTimer />
          </div>

          <div style={{ height: '300px' }}>
            <FocusChart />
          </div>

          <MusicPlayer />
        </aside>
      </main>
    </div>
  );
}

export default App;
