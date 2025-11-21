import { useState } from 'react';
import { useResources } from '../hooks/useResources';
import { useSettings } from '../contexts/SettingsContext';

export function ResourceLibrary() {
    const { resources, addResource, deleteResource } = useResources();
    const { t } = useSettings();
    const [isAdding, setIsAdding] = useState(false);
    const [newUrl, setNewUrl] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newType, setNewType] = useState('article');
    const [filterTag, setFilterTag] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newUrl) return;
        addResource(newUrl, newTitle, newType);
        setNewUrl('');
        setNewTitle('');
        setIsAdding(false);
    };

    const filteredResources = filterTag
        ? resources.filter(r => r.type === filterTag)
        : resources;

    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2>📚 {t('resources') || 'Library'}</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    style={{
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer'
                    }}
                >
                    {isAdding ? '×' : '+'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-md)' }}>
                    <input
                        type="text"
                        placeholder="URL..."
                        value={newUrl}
                        onChange={e => setNewUrl(e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    />
                    <input
                        type="text"
                        placeholder="Title (optional)..."
                        value={newTitle}
                        onChange={e => setNewTitle(e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    />
                    <select
                        value={newType}
                        onChange={e => setNewType(e.target.value)}
                        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: 'none' }}
                    >
                        <option value="article">📄 Article</option>
                        <option value="video">🎥 Video</option>
                        <option value="tool">🛠️ Tool</option>
                    </select>
                    <button type="submit" style={{ width: '100%', padding: '0.5rem', background: 'var(--success)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)' }}>
                        Save
                    </button>
                </form>
            )}

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button onClick={() => setFilterTag('')} style={{ opacity: filterTag === '' ? 1 : 0.5 }}>All</button>
                <button onClick={() => setFilterTag('article')} style={{ opacity: filterTag === 'article' ? 1 : 0.5 }}>📄 Articles</button>
                <button onClick={() => setFilterTag('video')} style={{ opacity: filterTag === 'video' ? 1 : 0.5 }}>🎥 Videos</button>
                <button onClick={() => setFilterTag('tool')} style={{ opacity: filterTag === 'tool' ? 1 : 0.5 }}>🛠️ Tools</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {filteredResources.map(res => (
                    <div key={res.id} style={{
                        padding: '0.8rem',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {res.type === 'video' ? '🎥' : res.type === 'tool' ? '🛠️' : '📄'} {res.title}
                            </div>
                            <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', opacity: 0.8 }}>
                                {res.url}
                            </a>
                        </div>
                        <button onClick={() => deleteResource(res.id)} style={{ opacity: 0.5, fontSize: '1.2rem' }}>×</button>
                    </div>
                ))}
                {filteredResources.length === 0 && (
                    <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '2rem' }}>
                        No resources found.
                    </div>
                )}
            </div>
        </div>
    );
}
