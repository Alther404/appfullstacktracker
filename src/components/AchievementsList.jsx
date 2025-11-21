import { useAchievements } from '../hooks/useAchievements';
import { useSettings } from '../contexts/SettingsContext';

export function AchievementsList() {
    const { achievements, getProgress } = useAchievements();
    const { t } = useSettings();
    const progress = getProgress();

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1rem' }}>
                <h2>🎖️ Achievements</h2>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {progress.completed} / {progress.total} ({progress.percentage}%)
                </div>
                <div style={{
                    marginTop: '0.5rem',
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress.percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-primary), var(--success))',
                        transition: 'width 0.3s ease'
                    }} />
                </div>
            </div>

            <div style={{
                flex: 1,
                overflowY: 'auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem',
                alignContent: 'start'
            }}>
                {achievements.map(achievement => (
                    <div
                        key={achievement.id}
                        style={{
                            padding: '1rem',
                            background: achievement.unlocked
                                ? 'rgba(255,255,255,0.1)'
                                : 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-md)',
                            border: achievement.unlocked
                                ? '2px solid var(--accent-primary)'
                                : '2px solid transparent',
                            opacity: achievement.unlocked ? 1 : 0.5,
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {achievement.unlocked && (
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                width: '60px',
                                height: '60px',
                                background: 'var(--success)',
                                transform: 'rotate(45deg)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                paddingBottom: '8px',
                                color: 'white'
                            }}>
                                ✓
                            </div>
                        )}

                        <div style={{
                            fontSize: '2.5rem',
                            marginBottom: '0.5rem',
                            filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
                        }}>
                            {achievement.emoji}
                        </div>

                        <div style={{
                            fontWeight: 'bold',
                            marginBottom: '0.3rem',
                            fontSize: '0.95rem',
                            color: 'var(--text-primary)'
                        }}>
                            {achievement.title}
                        </div>

                        <div style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-secondary)',
                            lineHeight: '1.3'
                        }}>
                            {achievement.description}
                        </div>

                        {achievement.unlocked && achievement.unlockedAt && (
                            <div style={{
                                marginTop: '0.5rem',
                                fontSize: '0.7rem',
                                color: 'var(--accent-primary)',
                                fontStyle: 'italic'
                            }}>
                                {new Date(achievement.unlockedAt).toLocaleDateString('ru-RU', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
