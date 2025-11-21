import { useState } from 'react';
import { useDevLog } from '../hooks/useDevLog';
import { useSettings } from '../contexts/SettingsContext';

export function DevLog() {
    const { logs, addLog, deleteLog } = useDevLog();
    const { t } = useSettings();
    const [content, setContent] = useState('');
    const [mood, setMood] = useState('neutral');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return;
        addLog(content, mood);
        setContent('');
        setMood('neutral');
    };

    const getMoodEmoji = (m) => {
        switch (m) {
            case 'happy': return '😊';
            case 'excited': return '🚀';
            case 'frustrated': return '😤';
            default: return '😐';
        }
    };

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginBottom: '1rem' }}>📝 {t('devLog') || 'DevLog'}</h2>

            <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem' }}>
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="What did you learn today?"
                    style={{
                        width: '100%',
                        height: '80px',
                        padding: '0.8rem',
                        borderRadius: 'var(--radius-md)',
                        border: 'none',
                        background: 'rgba(0,0,0,0.2)',
                        color: 'white',
                        resize: 'none',
                        marginBottom: '0.5rem'
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {['happy', 'excited', 'neutral', 'frustrated'].map(m => (
                            <button
                                key={m}
                                type="button"
                                onClick={() => setMood(m)}
                                style={{
                                    background: mood === m ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '50%',
                                    width: '30px',
                                    height: '30px',
                                    cursor: 'pointer',
                                    fontSize: '1.2rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                title={m}
                            >
                                {getMoodEmoji(m)}
                            </button>
                        ))}
                    </div>
                    <button
                        type="submit"
                        style={{
                            padding: '0.5rem 1.5rem',
                            background: 'var(--accent-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        {t('post') || 'Post'}
                    </button>
                </div>
            </form>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {logs.map(log => (
                    <div key={log.id} style={{
                        padding: '1rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: `3px solid ${log.mood === 'frustrated' ? 'var(--error)' : 'var(--accent-primary)'}`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            <span>{formatDate(log.date)} {getMoodEmoji(log.mood)}</span>
                            <button onClick={() => deleteLog(log.id)} style={{ opacity: 0.5, cursor: 'pointer' }}>×</button>
                        </div>
                        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{log.content}</div>
                    </div>
                ))}
                {logs.length === 0 && (
                    <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '1rem' }}>
                        Write your first entry!
                    </div>
                )}
            </div>
        </div>
    );
}
