import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { curriculum } from '../data/curriculum';
import { useSettings } from '../contexts/SettingsContext';

export function TaskBoard({ onTaskComplete }) {
    const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();
    const { t } = useSettings();
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showCurriculum, setShowCurriculum] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;
        addTask(newTaskTitle);
        setNewTaskTitle('');
    };

    const handleStatusChange = (id, newStatus, xp) => {
        updateTaskStatus(id, newStatus);
        if (newStatus === 'done' && onTaskComplete) {
            onTaskComplete(xp);
        }
    };

    const columns = [
        { id: 'todo', label: t('todo'), color: 'var(--text-secondary)' },
        { id: 'in-progress', label: t('inProgress'), color: 'var(--accent-primary)' },
        { id: 'done', label: t('done'), color: 'var(--success)' }
    ];

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
                        <button
                            type="submit"
                            style={{
                                padding: '0 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--accent-primary)',
                                color: 'white',
                                fontWeight: '600'
                            }}
                        >
                            {t('add')}
                        </button>
                    </form>
                    <button
                        onClick={() => setShowCurriculum(!showCurriculum)}
                        className="glass-panel"
                        style={{
                            padding: '0 1rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-primary)',
                            fontWeight: '600'
                        }}
                    >
                        📚 {t('curriculum')}
                    </button>
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
                                {tasks.filter(t => t.status === col.id).map(task => (
                                    <div key={task.id} className="glass-panel" style={{
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        cursor: 'grab',
                                        borderLeft: `3px solid ${col.color}`
                                    }}>
                                        <div style={{ marginBottom: '0.5rem' }}>{task.title}</div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <span>+{task.xp} XP</span>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                {col.id !== 'todo' && (
                                                    <button onClick={() => handleStatusChange(task.id, 'todo', 0)}>⏮</button>
                                                )}
                                                {col.id !== 'done' && (
                                                    <button onClick={() => handleStatusChange(task.id, col.id === 'todo' ? 'in-progress' : 'done', task.xp)}>⏭</button>
                                                )}
                                                <button onClick={() => deleteTask(task.id)} style={{ color: 'var(--error)' }}>×</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Curriculum Sidebar */}
            {showCurriculum && (
                <div className="glass-panel" style={{
                    width: '300px',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    animation: 'slideLeft 0.3s ease'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{t('curriculum')}</h3>
                        <button onClick={() => setShowCurriculum(false)}>×</button>
                    </div>
                    <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {curriculum.map((cat, idx) => (
                            <div key={idx}>
                                <h4 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>{cat.category}</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {cat.tasks.map((task, tIdx) => (
                                        <div key={tIdx} style={{
                                            padding: '0.8rem',
                                            background: 'rgba(255,255,255,0.05)',
                                            borderRadius: 'var(--radius-sm)',
                                            fontSize: '0.9rem'
                                        }}>
                                            <div style={{ marginBottom: '0.5rem' }}>{task.title}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{
                                                    fontSize: '0.7rem',
                                                    padding: '0.2rem 0.5rem',
                                                    borderRadius: '10px',
                                                    background: 'rgba(255,255,255,0.1)'
                                                }}>
                                                    {task.difficulty}
                                                </span>
                                                <button
                                                    onClick={() => addTask(task.title, task.difficulty)}
                                                    style={{
                                                        color: 'var(--success)',
                                                        fontSize: '0.8rem',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    + {t('addToBoard')}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
