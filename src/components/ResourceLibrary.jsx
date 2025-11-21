import { useState, useMemo } from 'react';
import { useResources } from '../hooks/useResources';
import { useSettings } from '../contexts/SettingsContext';

export function ResourceLibrary() {
    const { resources, addResource, removeResource, toggleResourceComplete } = useResources();
    const { t, language } = useSettings();

    const [filter, setFilter] = useState('all'); // all, video, article, tool
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alpha

    const [showAddForm, setShowAddForm] = useState(false);
    const [newRes, setNewRes] = useState({ url: '', title: '', type: 'article', category: '' });

    // Get unique categories
    const categories = useMemo(() => {
        const cats = new Set(resources.map(r => r.category || 'General'));
        return ['all', ...Array.from(cats)];
    }, [resources]);

    const filteredResources = useMemo(() => {
        let res = [...resources];

        // Filter by Type
        if (filter !== 'all') {
            res = res.filter(r => r.type === filter);
        }

        // Filter by Category
        if (categoryFilter !== 'all') {
            res = res.filter(r => (r.category || 'General') === categoryFilter);
        }

        // Sort
        res.sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.addedAt) - new Date(a.addedAt);
            if (sortBy === 'oldest') return new Date(a.addedAt) - new Date(b.addedAt);
            if (sortBy === 'alpha') return a.title.localeCompare(b.title);
            return 0;
        });

        return res;
    }, [resources, filter, categoryFilter, sortBy]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newRes.url || !newRes.title) return;
        addResource(newRes.url, newRes.title, newRes.type, newRes.category || 'General');
        setNewRes({ url: '', title: '', type: 'article', category: '' });
        setShowAddForm(false);
    };

    const selectStyle = {
        padding: '0.8rem 1rem',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255,255,255,0.05)',
        color: 'white',
        border: '1px solid rgba(255,255,255,0.1)',
        cursor: 'pointer',
        outline: 'none',
        fontSize: '0.9rem',
        transition: 'all 0.2s ease'
    };

    return (
        <div className="glass-panel animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 className="text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
                    {language === 'ru' ? 'Библиотека Ресурсов' : 'Resource Library'}
                </h2>
                <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary">
                    {showAddForm ? (language === 'ru' ? 'Отмена' : 'Cancel') : (language === 'ru' ? '+ Добавить' : '+ Add Resource')}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleAdd} style={{
                    background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
                    display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <input
                        placeholder={language === 'ru' ? 'Название' : 'Title'}
                        value={newRes.title} onChange={e => setNewRes({ ...newRes, title: e.target.value })}
                        style={{ ...selectStyle, background: 'rgba(0,0,0,0.2)' }}
                    />
                    <input
                        placeholder="URL"
                        value={newRes.url} onChange={e => setNewRes({ ...newRes, url: e.target.value })}
                        style={{ ...selectStyle, background: 'rgba(0,0,0,0.2)' }}
                    />
                    <select
                        value={newRes.type} onChange={e => setNewRes({ ...newRes, type: e.target.value })}
                        style={{ ...selectStyle, background: 'rgba(0,0,0,0.2)' }}
                    >
                        <option value="article">Article</option>
                        <option value="video">Video</option>
                        <option value="tool">Tool</option>
                    </select>
                    <input
                        placeholder={language === 'ru' ? 'Категория (напр. React)' : 'Category (e.g. React)'}
                        value={newRes.category} onChange={e => setNewRes({ ...newRes, category: e.target.value })}
                        style={{ ...selectStyle, background: 'rgba(0,0,0,0.2)' }}
                    />
                    <button type="submit" className="btn-success">{language === 'ru' ? 'Сохранить' : 'Save'}</button>
                </form>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <select
                    value={filter} onChange={e => setFilter(e.target.value)}
                    style={selectStyle}
                >
                    <option value="all">{language === 'ru' ? 'Все типы' : 'All Types'}</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="tool">Tool</option>
                </select>

                <select
                    value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
                    style={selectStyle}
                >
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat === 'all' ? (language === 'ru' ? 'Все категории' : 'All Categories') : cat}</option>
                    ))}
                </select>

                <select
                    value={sortBy} onChange={e => setSortBy(e.target.value)}
                    style={{ ...selectStyle, marginLeft: 'auto' }}
                >
                    <option value="newest">{language === 'ru' ? 'Сначала новые' : 'Newest First'}</option>
                    <option value="oldest">{language === 'ru' ? 'Сначала старые' : 'Oldest First'}</option>
                    <option value="alpha">{language === 'ru' ? 'По алфавиту' : 'Alphabetical'}</option>
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', overflowY: 'auto' }}>
                {filteredResources.map(res => (
                    <div key={res.id} style={{
                        padding: '1.5rem',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: 'var(--radius-md)',
                        border: res.completed ? '1px solid var(--success)' : '1px solid rgba(255,255,255,0.05)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.8rem',
                        position: 'relative',
                        transition: 'transform 0.2s ease, background 0.2s ease',
                        cursor: 'default'
                    }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <span style={{ fontSize: '1.8rem' }}>
                                {res.type === 'video' ? '🎥' : res.type === 'tool' ? '🛠️' : '📄'}
                            </span>
                            <button onClick={() => removeResource(res.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
                        </div>

                        <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1.1rem', lineHeight: '1.4' }}>
                            {res.title}
                        </a>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem' }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>
                                {res.category || 'General'}
                            </span>
                            <button
                                onClick={() => toggleResourceComplete(res.id)}
                                style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    color: res.completed ? 'var(--success)' : 'var(--text-muted)',
                                    fontSize: '1.2rem'
                                }}
                                title={language === 'ru' ? 'Отметить как прочитанное' : 'Mark as read'}
                            >
                                {res.completed ? '✓' : '○'}
                            </button>
                        </div>
                    </div>
                ))}
                {filteredResources.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🔍</div>
                        {language === 'ru' ? 'Ресурсы не найдены' : 'No resources found'}
                    </div>
                )}
            </div>
        </div>
    );
}
