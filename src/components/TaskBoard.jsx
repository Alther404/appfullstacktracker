import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useResources } from '../hooks/useResources';
import { curriculum } from '../data/curriculum';
import { useSettings } from '../contexts/SettingsContext';
import { QuizModal } from './QuizModal';
import { useGamification } from '../hooks/useGamification';

export function TaskBoard({ onTaskComplete }) {
    const { tasks, addTask, updateTaskStatus, deleteTask, completeTask } = useTasks();
    const { addResource } = useResources();
    const { addXP } = useGamification();
    const { t, language } = useSettings();

    const [newTaskTitle, setNewTaskTitle] = useState('');
    // Removed showCurriculum state and button as requested

    // Quiz State
    const [quizTask, setQuizTask] = useState(null);
    const [pendingTaskId, setPendingTaskId] = useState(null);
    const [pendingTaskXP, setPendingTaskXP] = useState(0);

    // Helper for localized text
    const getLoc = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || '';
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        addTask(newTaskTitle);
        setNewTaskTitle('');
    };

    const handleStatusChange = (id, newStatus, xp, taskTitle) => {
        // If moving to DONE, check for quiz
        if (newStatus === 'done') {
            // Find the task in curriculum to get the quiz
            // We match by title (either EN or RU)
            let foundTask = null;
            for (const cat of curriculum) {
                const t = cat.tasks.find(ct => {
                    const tEn = ct.title['en'] || ct.title;
                    const tRu = ct.title['ru'] || ct.title;
                    return tEn === taskTitle || tRu === taskTitle;
                });
                if (t) {
                    foundTask = t;
                    break;
                }
            }

            if (foundTask && (foundTask.quizzes?.length > 0 || foundTask.quiz)) {
                // Trigger Quiz
                setQuizTask(foundTask);
                setPendingTaskId(id);
                setPendingTaskXP(xp);
                return; // Stop here, wait for quiz
            }
        }

        // Normal update if no quiz or not moving to done
        updateTaskStatus(id, newStatus);
        if (newStatus === 'done' && onTaskComplete) {
            onTaskComplete(xp);
        }
    };

    const onQuizPass = () => {
        if (pendingTaskId) {
            updateTaskStatus(pendingTaskId, 'done');
            if (onTaskComplete) onTaskComplete(pendingTaskXP);
            addXP(200); // Bonus for quiz
        }
        setQuizTask(null);
        setPendingTaskId(null);
        setPendingTaskXP(0);
    };

    const columns = [
        { id: 'todo', label: t('todo'), color: 'var(--text-secondary)' },
        { id: 'in_progress', label: t('inProgress'), color: 'var(--accent-primary)' }, // Fixed ID to match useTasks default? No, useTasks uses 'todo' default.
        // Wait, useTasks 'addTask' uses 'todo' default, but NextStepWidget uses 'in_progress'.
        // Let's ensure column IDs match what we use.
        // NextStepWidget: 'in_progress'
        // TaskBoard columns: 'todo', 'in-progress' (dash vs underscore). 
        // FIX: Let's normalize to 'in_progress' (underscore) as used in NextStepWidget.
        { id: 'done', label: t('done'), color: 'var(--success)' }
    ];

    // Normalize status for display if needed, but better to fix data.
    // I will use 'in_progress' for the column ID.

    return (
        <div style={{ height: '100%', display: 'flex', gap: '1.5rem' }}>
            {/* Main Board */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', flex: 1 }}>
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder={t('addTaskPlaceholder')}
                            style={{
                                flex: 1,
                                padding: '0.8rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(0,0,0,0.2)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem'
                            }}
                        />
                        <button type="submit" className="btn-primary">
                            {t('add')}
                        </button>
                    </form>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '1rem',
                    flex: 1,
                    overflow: 'hidden'
                }}>
                    {columns.map(col => (
                        <div key={col.id} style={{
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <h3 style={{ color: col.color, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {col.label}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'auto' }}>
                                {tasks.filter(t => {
                                    // Handle legacy 'in-progress' vs 'in_progress'
                                    if (col.id === 'in_progress') return t.status === 'in_progress' || t.status === 'in-progress';
                                    return t.status === col.id;
                                }).map(task => (
                                    <div key={task.id} className="glass-panel" style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        cursor: 'grab',
                                        borderLeft: `3px solid ${col.color}`
                                    }}>
                                        <div style={{ marginBottom: '0.5rem' }}>
                                            {getLoc(task.title)}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <span>+{task.xp} XP</span>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                {col.id !== 'todo' && (
                                                    <button onClick={() => handleStatusChange(task.id, 'todo', 0, task.title)} className="btn-icon btn-sm">⏮</button>
                                                )}
                                                {col.id !== 'done' && (
                                                    <button
                                                        onClick={() => handleStatusChange(task.id, col.id === 'todo' ? 'in_progress' : 'done', task.xp, task.title)}
                                                        className="btn-icon btn-sm"
                                                    >
                                                        ⏭
                                                    </button>
                                                )}
                                                <button onClick={() => deleteTask(task.id)} className="btn-icon btn-sm" style={{ color: 'var(--error)' }}>×</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {quizTask && (
                <QuizModal
                    task={quizTask}
                    onClose={() => {
                        setQuizTask(null);
                        setPendingTaskId(null);
                    }}
                    onComplete={onQuizPass}
                />
            )}
        </div>
    );
}
