import { useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import { curriculum } from '../data/curriculum';
import { useSettings } from '../contexts/SettingsContext';

export function RoadmapProgress() {
    const { tasks } = useTasks();
    const { t } = useSettings();

    const roadmapData = useMemo(() => {
        const completedTitles = tasks.filter(t => t.status === 'done').map(t => t.title);

        return curriculum.map(category => {
            const totalTasks = category.tasks.length;
            const completedTasks = category.tasks.filter(task =>
                completedTitles.includes(task.title)
            ).length;
            const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

            return {
                name: category.category,
                completed: completedTasks,
                total: totalTasks,
                progress: Math.round(progress)
            };
        });
    }, [tasks]);

    const overallProgress = useMemo(() => {
        const totalTasks = curriculum.reduce((sum, cat) => sum + cat.tasks.length, 0);
        const completedTasks = roadmapData.reduce((sum, cat) => sum + cat.completed, 0);
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    }, [roadmapData]);

    return (
        <div className="glass-panel" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)'
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h2 style={{ fontSize: '1.3rem' }}>🗺️ {t('roadmapProgress') || 'Your Roadmap Progress'}</h2>
                    <div style={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--accent-primary)'
                    }}>
                        {overallProgress}%
                    </div>
                </div>
                <div style={{
                    height: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${overallProgress}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-primary), var(--success))',
                        transition: 'width 0.5s ease',
                        borderRadius: '10px'
                    }} />
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
            }}>
                {roadmapData.map((category, idx) => {
                    const isComplete = category.progress === 100;
                    const isInProgress = category.progress > 0 && category.progress < 100;
                    const isNotStarted = category.progress === 0;

                    return (
                        <div
                            key={idx}
                            style={{
                                padding: '1rem',
                                background: isComplete
                                    ? 'rgba(16, 185, 129, 0.1)'
                                    : isInProgress
                                        ? 'rgba(59, 130, 246, 0.1)'
                                        : 'rgba(255,255,255,0.03)',
                                borderRadius: 'var(--radius-md)',
                                border: isComplete
                                    ? '2px solid var(--success)'
                                    : isInProgress
                                        ? '2px solid var(--accent-primary)'
                                        : '2px solid transparent',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {isComplete && (
                                <div style={{
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.5rem',
                                    fontSize: '1.2rem'
                                }}>
                                    ✓
                                </div>
                            )}

                            <div style={{
                                fontSize: '0.9rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                                color: isComplete ? 'var(--success)' : 'var(--text-primary)',
                                paddingRight: '1.5rem'
                            }}>
                                {category.name}
                            </div>

                            <div style={{
                                fontSize: '0.8rem',
                                color: 'var(--text-secondary)',
                                marginBottom: '0.5rem'
                            }}>
                                {category.completed} / {category.total} tasks
                            </div>

                            <div style={{
                                height: '6px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    width: `${category.progress}%`,
                                    height: '100%',
                                    background: isComplete
                                        ? 'var(--success)'
                                        : 'var(--accent-primary)',
                                    transition: 'width 0.5s ease',
                                    borderRadius: '10px'
                                }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
