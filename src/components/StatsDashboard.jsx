export function StatsDashboard({ stats, getLevelTitle, getNextLevelXP }) {
    const nextLevelXP = getNextLevelXP(stats.xp);
    const progress = Math.min(100, (stats.xp / nextLevelXP) * 100);

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Current Level</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <span className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1 }}>{stats.level}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>{getLevelTitle(stats.level)}</span>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                    <span>XP Progress</span>
                    <span style={{ color: 'var(--accent-primary)' }}>{stats.xp} / {nextLevelXP} XP</span>
                </div>
                <div style={{
                    height: '8px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '4px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'var(--accent-gradient)',
                        transition: 'width 0.5s ease-out'
                    }} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.streak}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Day Streak</div>
                </div>
                <div className="glass-panel" style={{ padding: '1rem', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Top 5%</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Productivity</div>
                </div>
            </div>
        </div>
    );
}
