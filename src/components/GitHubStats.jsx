import { useState, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function GitHubStats() {
    const { t, githubUsername, setGithubUsername } = useSettings();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(!githubUsername);

    useEffect(() => {
        if (githubUsername && !isEditing) {
            fetchEvents();
        }
    }, [githubUsername, isEditing]);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.github.com/users/${githubUsername}/events?per_page=5`);
            if (!response.ok) throw new Error('User not found');
            const data = await response.json();
            setEvents(data);
        } catch (err) {
            setError(err.message);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
    };

    const getEventIcon = (type) => {
        switch (type) {
            case 'PushEvent': return '🔨';
            case 'CreateEvent': return '✨';
            case 'PullRequestEvent': return '🔀';
            case 'IssuesEvent': return '🐛';
            case 'WatchEvent': return '⭐';
            default: return '📦';
        }
    };

    const formatEvent = (event) => {
        switch (event.type) {
            case 'PushEvent':
                return `Pushed ${event.payload.size} commits to ${event.repo.name.split('/')[1]}`;
            case 'CreateEvent':
                return `Created ${event.payload.ref_type} in ${event.repo.name.split('/')[1]}`;
            case 'PullRequestEvent':
                return `Opened PR in ${event.repo.name.split('/')[1]}`;
            case 'WatchEvent':
                return `Starred ${event.repo.name.split('/')[1]}`;
            default:
                return event.type.replace('Event', '') + ` on ${event.repo.name.split('/')[1]}`;
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>🐱 GitHub</h2>
                <button onClick={() => setIsEditing(!isEditing)} style={{ opacity: 0.5, fontSize: '0.9rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>

            {isEditing ? (
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        value={githubUsername}
                        onChange={e => setGithubUsername(e.target.value)}
                        placeholder="GitHub Username"
                        style={{ padding: '0.8rem', borderRadius: 'var(--radius-md)', border: 'none', background: 'rgba(0,0,0,0.2)', color: 'white' }}
                    />
                    <button type="submit" style={{ padding: '0.5rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                        Save
                    </button>
                </form>
            ) : (
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {loading && <div style={{ textAlign: 'center', opacity: 0.7 }}>Loading...</div>}
                    {error && <div style={{ textAlign: 'center', color: 'var(--error)' }}>{error}</div>}

                    {!loading && !error && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                                <img
                                    src={`https://github.com/${githubUsername}.png`}
                                    alt="avatar"
                                    style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                />
                                <span style={{ fontWeight: 'bold' }}>{githubUsername}</span>
                            </div>

                            {events.map(event => (
                                <div key={event.id} style={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span>{getEventIcon(event.type)}</span>
                                    <span style={{ opacity: 0.8 }}>{formatEvent(event)}</span>
                                </div>
                            ))}

                            {events.length === 0 && (
                                <div style={{ textAlign: 'center', opacity: 0.5 }}>No recent public activity.</div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
