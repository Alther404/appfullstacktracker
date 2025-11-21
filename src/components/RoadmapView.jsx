import { useState, useMemo, useEffect } from 'react';
import { curriculum as defaultCurriculum } from '../data/curriculum';
import { useTasks } from '../hooks/useTasks';
import { useResources } from '../hooks/useResources';
import { QuizModal } from './QuizModal';
import { useGamification } from '../hooks/useGamification';
import { useSettings } from '../contexts/SettingsContext';

export function RoadmapView({ initialTask, onTaskCleared, curriculumData }) {
    const { tasks, addTask, completeTask } = useTasks();
    const { addResource } = useResources();
    const { addXP } = useGamification();
    const { t, language } = useSettings();
    const [selectedTask, setSelectedTask] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);

    // Use provided data or default, but filter out 'english' type from default if no data provided
    // (assuming default view is Main Roadmap)
    const activeCurriculum = useMemo(() => {
        if (curriculumData) return curriculumData;
        return defaultCurriculum.filter(c => c.type !== 'english');
    }, [curriculumData]);

    // Helper for localized text
    const getLoc = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || '';
    };

    useEffect(() => {
        if (initialTask) {
            // Find the full task object from activeCurriculum
            let foundTask = null;
            for (const cat of activeCurriculum) {
                const t = cat.tasks.find(task => {
                    const title = getLoc(task.title);
                    const initTitle = typeof initialTask.title === 'string' ? initialTask.title : getLoc(initialTask.title);
                    return title === initTitle;
                });
                if (t) {
                    foundTask = { ...t, categoryName: getLoc(cat.category) };
                    break;
                }
            }

            if (foundTask) {
                setSelectedTask(foundTask);
            } else {
                setSelectedTask(initialTask);
            }

            if (onTaskCleared) onTaskCleared();
        }
    }, [initialTask, onTaskCleared, language, activeCurriculum]);

    // Calculate status for each node and global progress
    const { roadmapData, progress } = useMemo(() => {
        const completedTitles = new Set(tasks.filter(t => t.status === 'done').map(t => t.title));
        const activeTitles = new Set(tasks.filter(t => t.status !== 'done').map(t => t.title));

        let totalTasks = 0;
        let completedCount = 0;

        const data = activeCurriculum.map(category => {
            return {
                ...category,
                tasks: category.tasks.map(task => {
                    totalTasks++;

                    const titleEn = task.title['en'] || task.title;
                    const titleRu = task.title['ru'] || task.title;

                    let status = 'locked';
                    if (completedTitles.has(titleEn) || completedTitles.has(titleRu)) {
                        status = 'done';
                        completedCount++;
                    } else if (activeTitles.has(titleEn) || activeTitles.has(titleRu)) {
                        status = 'active';
                    } else {
                        status = 'available';
                    }

                    return { ...task, status, categoryName: getLoc(category.category) };
                })
            };
        });

        return {
            roadmapData: data,
            progress: totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
        };
    }, [tasks, language, activeCurriculum]);

    const handleStartTask = (task) => {
        if (task.status === 'active' || task.status === 'done') return;

        const titleToStore = getLoc(task.title);
        addTask(titleToStore, task.difficulty, 'in_progress');

        if (task.resources) {
            task.resources.forEach(r => addResource(r.url, r.title, r.type, task.categoryName || 'General'));
        }
    };

    const handleVerifyTask = () => {
        if (selectedTask.quizzes?.length > 0 || selectedTask.quiz) {
            setShowQuiz(true);
        } else {
            const titleToComplete = getLoc(selectedTask.title);
            completeTask(titleToComplete);
            addXP(100);
        }
    };

    const onQuizComplete = () => {
        setShowQuiz(false);
        const titleToComplete = getLoc(selectedTask.title);
        completeTask(titleToComplete);
        addXP(300);
    };

    return (
        <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', height: '100%', overflow: 'hidden' }}>
            {/* Main Roadmap Tree */}
            <div className="glass-panel" style={{
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                overflowY: 'auto',
                position: 'relative'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
                        {curriculumData ? (language === 'ru' ? 'Английский для IT' : 'English for IT') : (language === 'ru' ? 'Путь Full Stack Разработчика' : 'Full Stack Developer Path')}
                    </h2>
                    <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        border: '1px solid var(--accent-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            {language === 'ru' ? 'Прогресс:' : 'Progress:'}
                        </span>
                        <span style={{ fontWeight: 'bold', color: 'var(--accent-primary)' }}>{progress}%</span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '24px',
                        top: '40px',
                        bottom: '40px',
                        width: '2px',
                        background: 'rgba(255,255,255,0.1)',
                        zIndex: 0
                    }} />

                    {roadmapData.map((category, catIdx) => (
                        <div key={catIdx} style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: 'var(--bg-card)',
                                    border: '2px solid var(--accent-primary)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.2)'
                                }}>
                                    {catIdx + 1}
                                </div>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
                                    {getLoc(category.category)}
                                </h3>
                            </div>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                gap: '1rem',
                                paddingLeft: '3.5rem'
                            }}>
                                {category.tasks.map((task, taskIdx) => (
                                    <div
                                        key={taskIdx}
                                        onClick={() => setSelectedTask(task)}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: 'var(--radius-md)',
                                            background: task.status === 'done' ? 'rgba(16, 185, 129, 0.1)' :
                                                task.status === 'active' ? 'rgba(139, 92, 246, 0.1)' :
                                                    'rgba(255,255,255,0.03)',
                                            border: task.status === 'done' ? '1px solid var(--success)' :
                                                task.status === 'active' ? '1px solid var(--accent-primary)' :
                                                    (getLoc(selectedTask?.title) === getLoc(task.title)) ? '1px solid var(--text-secondary)' :
                                                        '1px solid transparent',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            opacity: task.status === 'locked' ? 0.5 : 1
                                        }}
                                        className="roadmap-node"
                                    >
                                        <div style={{
                                            fontSize: '0.8rem',
                                            color: task.status === 'done' ? 'var(--success)' :
                                                task.status === 'active' ? 'var(--accent-primary)' :
                                                    'var(--text-secondary)',
                                            marginBottom: '0.5rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase'
                                        }}>
                                            {task.status === 'done' ? (language === 'ru' ? '✓ Готово' : '✓ Completed') :
                                                task.status === 'active' ? (language === 'ru' ? '⚡ В процессе' : '⚡ In Progress') :
                                                    task.difficulty}
                                            {(task.quizzes?.length > 0 || task.quiz) && <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }} title="Has Quiz">📝</span>}
                                        </div>
                                        <div style={{ fontWeight: '600', lineHeight: '1.3' }}>
                                            {getLoc(task.title)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detail Panel */}
            <div className="glass-panel" style={{
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {selectedTask ? (
                    <div className="animate-fade-in">
                        <div style={{
                            fontSize: '0.9rem',
                            color: 'var(--accent-primary)',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase'
                        }}>
                            {language === 'ru' ? 'Детали задания' : 'Task Details'}
                        </div>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', lineHeight: '1.2' }}>
                            {getLoc(selectedTask.title)}
                        </h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                borderRadius: '100px',
                                background: 'rgba(255,255,255,0.1)',
                                fontSize: '0.8rem'
                            }}>
                                {language === 'ru' ? 'Сложность: ' : 'Difficulty: '}
                                <span style={{ fontWeight: 'bold' }}>{selectedTask.difficulty}</span>
                            </span>
                        </div>

                        {selectedTask.learningGoals && (
                            <div style={{ marginBottom: '2rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    {language === 'ru' ? 'ЦЕЛИ ОБУЧЕНИЯ:' : 'LEARNING GOALS:'}
                                </h4>
                                <p style={{ lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                                    {getLoc(selectedTask.learningGoals)}
                                </p>
                            </div>
                        )}

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                📚 {language === 'ru' ? 'Материалы' : 'Learning Resources'}
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {selectedTask.resources?.map((res, idx) => (
                                    <a
                                        key={idx}
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: 'var(--radius-md)',
                                            textDecoration: 'none',
                                            color: 'var(--text-primary)',
                                            border: '1px solid rgba(255,255,255,0.05)',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.8rem'
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                            e.currentTarget.style.transform = 'translateX(5px)';
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }}
                                    >
                                        <span style={{ fontSize: '1.2rem' }}>
                                            {res.type === 'video' ? '🎥' : res.type === 'tool' ? '🛠️' : '📄'}
                                        </span>
                                        <div>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{res.title}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {language === 'ru' ? 'Нажмите, чтобы открыть' : 'Click to open'}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto' }}>
                            {selectedTask.status === 'available' && (
                                <button
                                    onClick={() => handleStartTask(selectedTask)}
                                    className="btn-primary"
                                    style={{ width: '100%', fontSize: '1.1rem' }}
                                >
                                    {language === 'ru' ? 'Начать обучение' : 'Start Learning'}
                                </button>
                            )}
                            {selectedTask.status === 'active' && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{
                                        padding: '1rem',
                                        background: 'rgba(139, 92, 246, 0.1)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--accent-primary)',
                                        textAlign: 'center',
                                        fontWeight: 'bold'
                                    }}>
                                        ⚡ {language === 'ru' ? 'В процессе обучения' : 'Currently In Progress'}
                                    </div>
                                    <button
                                        onClick={handleVerifyTask}
                                        className="btn-primary"
                                        style={{ width: '100%', background: 'var(--bg-card)', border: '1px solid var(--accent-primary)' }}
                                    >
                                        {(selectedTask.quizzes?.length > 0 || selectedTask.quiz)
                                            ? (language === 'ru' ? 'Пройти тест и завершить' : 'Take Quiz & Complete')
                                            : (language === 'ru' ? 'Отметить как выполненное' : 'Mark as Complete')}
                                    </button>
                                </div>
                            )}
                            {selectedTask.status === 'done' && (
                                <div style={{
                                    padding: '1rem',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--success)',
                                    textAlign: 'center',
                                    fontWeight: 'bold'
                                }}>
                                    {language === 'ru' ? 'Завершено! 🎉' : 'Completed! 🎉'}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div style={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        textAlign: 'center',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <div style={{ fontSize: '3rem', opacity: 0.5 }}>🗺️</div>
                        <p>
                            {language === 'ru'
                                ? 'Выберите тему из карты,\nчтобы увидеть детали и материалы.'
                                : 'Select a topic from the roadmap\nto view details and resources.'}
                        </p>
                    </div>
                )}
            </div>

            {showQuiz && selectedTask && (
                <QuizModal
                    task={selectedTask}
                    onClose={() => setShowQuiz(false)}
                    onComplete={onQuizComplete}
                />
            )}
        </div>
    );
}
