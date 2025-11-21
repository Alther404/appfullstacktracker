export function JourneyTimeline({ currentLevel }) {
    const milestones = [
        { level: 1, title: "Start Journey", desc: "Hello World!" },
        { level: 5, title: "Junior Developer", desc: "Ready for basic freelance gigs" },
        { level: 10, title: "Mid-Level Developer", desc: "Solid portfolio, ready for full-time work" },
        { level: 20, title: "Senior Architect", desc: "Master of systems" },
        { level: 50, title: "Fullstack Boss", desc: "The ultimate goal" }
    ];

    return (
        <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginTop: '1rem' }}>
            <h2>Your Path</h2>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {milestones.map((m, i) => {
                    const isUnlocked = currentLevel >= m.level;
                    const isNext = !isUnlocked && (i === 0 || currentLevel >= milestones[i - 1].level);

                    return (
                        <div key={m.level} style={{
                            display: 'flex',
                            gap: '1rem',
                            opacity: isUnlocked || isNext ? 1 : 0.4,
                            filter: isUnlocked || isNext ? 'none' : 'grayscale(1)'
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: isUnlocked ? 'var(--success)' : (isNext ? 'var(--accent-primary)' : 'var(--bg-card)'),
                                    border: '2px solid rgba(255,255,255,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem'
                                }}>
                                    {isUnlocked ? '✓' : ''}
                                </div>
                                {i < milestones.length - 1 && (
                                    <div style={{ width: '2px', flex: 1, background: 'rgba(255,255,255,0.1)', minHeight: '20px' }} />
                                )}
                            </div>
                            <div>
                                <div style={{ fontWeight: 'bold', color: isUnlocked ? 'var(--success)' : 'inherit' }}>
                                    {m.title} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>(Lvl {m.level})</span>
                                </div>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{m.desc}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
