import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function GitHubStats() {
    const { githubUsername, setGithubUsername } = useSettings();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [tempUsername, setTempUsername] = useState(githubUsername || '');

    useEffect(() => {
        if (!githubUsername) return;

        setLoading(true);
        fetch(`https://api.github.com/users/${githubUsername}/events?per_page=5`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setEvents(data);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [githubUsername]);

    const handleSave = (e) => {
        e.preventDefault();
        setGithubUsername(tempUsername);
        setIsEditing(false);
    };

    const formatEvent = (event) => {
        const date = new Date(event.created_at);
        const timeAgo = ((Date.now() - date) / (1000 * 60 * 60)).toFixed(0);

        switch (event.type) {
            case 'PushEvent':
                const commits = event.payload.commits?.length || 0;
                return `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${event.repo.name}`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in ${event.repo.name}`;
            case 'WatchEvent':
                return `Starred ${event.repo.name}`;
            default:
                return `${event.type.replace('Event', '')} on ${event.repo.name}`;
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>💻 GitHub Activity</h2>
                <button onClick={() => setIsEditing(!isEditing)} className="btn-icon">
                    {isEditing ? '×' : '✏️'}
                </button>
            </div>

            {isEditing && (
                <form onSubmit={handleSave} style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={tempUsername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        placeholder="GitHub username..."
                        style={{
                            flex: 1,
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(0,0,0,0.2)',
                            color: 'var(--text-primary)'
                        }}
                    />
                    <button type="submit" className="btn-primary">
                        Save
                    </button>
                </form>
            )}

            {loading && <div style={{ textAlign: 'center', opacity: 0.5 }}>Loading...</div>}

            {!githubUsername && !isEditing && (
                <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>
                    Click ✏️ to set your GitHub username
                </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {events.map((event, idx) => (
                    <div key={idx} style={{
                        padding: '0.8rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.9rem'
                    }}>
                        <div style={{ marginBottom: '0.3rem' }}>{formatEvent(event)}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {new Date(event.created_at).toLocaleString('ru-RU', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
