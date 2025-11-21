import { useState, useEffect } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useResources } from '../hooks/useResources';
import { curriculum } from '../data/curriculum';
import { useSettings } from '../contexts/SettingsContext';

export function NextStepWidget({ onStartLearning }) {
    const { tasks, addTask } = useTasks();
    const { addResource } = useResources();
    const { t, language } = useSettings();
    const [nextTask, setNextTask] = useState(null);

    // Helper for localized text
    const getLoc = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || '';
    };

    useEffect(() => {
        // Find first task from curriculum that's NOT in TaskBoard at all
        // We assume tasks in TaskBoard are stored by their English title (or whatever was passed)
        // We check against both EN and RU titles to be safe
        const allTaskTitles = new Set(tasks.map(t => t.title));

        for (const category of curriculum) {
            for (const task of category.tasks) {
                const titleEn = task.title['en'] || task.title;
                const titleRu = task.title['ru'] || task.title;

                if (!allTaskTitles.has(titleEn) && !allTaskTitles.has(titleRu)) {
                    setNextTask({ ...task, category: category.category });
                    return;
                }
            }
        }

        // All tasks added!
        setNextTask(null);
    }, [tasks]);

    const handleStartLearning = () => {
        if (!nextTask) return;

        // Add task to board as IN PROGRESS immediately
        // We prefer storing the English title for consistency if available
        const titleToStore = nextTask.title['en'] || nextTask.title;

        addTask(titleToStore, nextTask.difficulty, 'in_progress');

        // Auto-add resources
        if (nextTask.resources && nextTask.resources.length > 0) {
            nextTask.resources.forEach(resource => {
                addResource(resource.url, resource.title, resource.type);
            });
        }

        // Navigate to roadmap and focus this task
        if (onStartLearning) {
            onStartLearning(nextTask);
        }
    };

    if (!nextTask) {
        return (
            <div className="glass-panel" style={{
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))',
                border: '2px solid var(--success)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                    {language === 'ru' ? 'Поздравляем!' : 'Congratulations!'}
                </h2>
                <p style={{ color: '#d1d5db' }}>
                    {language === 'ru'
                        ? 'Вы добавили все задачи из программы обучения!'
                        : 'You have added all tasks from the curriculum!'}
                </p>
            </div>
        );
    }

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'var(--success)';
            case 'medium': return 'var(--accent-primary)';
            case 'hard': return '#f59e0b';
            case 'epic': return '#ef4444';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="glass-panel" style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
            border: '2px solid var(--accent-primary)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background effect */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                animation: 'pulse 3s ease-in-out infinite'
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                            🎯 {language === 'ru' ? 'Следующий Шаг' : 'Next Step'}
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                            {getLoc(nextTask.title)}
                        </h2>
                        <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>
                            {getLoc(nextTask.category)}
                        </div>
                    </div>
                    <div style={{
                        padding: '0.5rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        background: getDifficultyColor(nextTask.difficulty),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                    }}>
                        {nextTask.difficulty}
                    </div>
                </div>

                {nextTask.resources && nextTask.resources.length > 0 && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.5rem' }}>
                            📚 {nextTask.resources.length} {language === 'ru' ? 'материалов для изучения' : 'resources to learn'}
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {nextTask.resources.slice(0, 3).map((resource, idx) => (
                                <div key={idx} style={{
                                    fontSize: '0.75rem',
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#d1d5db'
                                }}>
                                    {resource.type === 'video' ? '🎥' : resource.type === 'tool' ? '🛠️' : '📄'} {resource.title.substring(0, 25)}...
                                </div>
                            ))}
                            {nextTask.resources.length > 3 && (
                                <div style={{
                                    fontSize: '0.75rem',
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-sm)',
                                    color: '#d1d5db'
                                }}>
                                    +{nextTask.resources.length - 3} {language === 'ru' ? 'ещё' : 'more'}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={handleStartLearning}
                    className="btn-primary btn-lg"
                    style={{
                        width: '100%',
                        fontSize: '1.1rem',
                        padding: '1rem',
                        background: 'linear-gradient(135deg, var(--accent-primary), #8b5cf6)',
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                    }}
                >
                    🚀 {language === 'ru' ? 'Начать Обучение' : 'Start Learning'}
                </button>
            </div>
        </div>
    );
}
