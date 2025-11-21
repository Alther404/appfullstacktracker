import { useState } from 'react';

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);

    // Lofi Girl stream ID
    const VIDEO_ID = 'jfKfPfyJRdk';

    return (
        <div className="glass-panel" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Lo-Fi Radio</h2>
                <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: isPlaying ? 'var(--success)' : 'var(--danger)',
                    boxShadow: isPlaying ? '0 0 10px var(--success)' : 'none'
                }} />
            </div>

            <div style={{
                position: 'relative',
                paddingBottom: '56.25%', /* 16:9 */
                height: 0,
                overflow: 'hidden',
                borderRadius: 'var(--radius-md)',
                background: 'black'
            }}>
                <iframe
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1`}
                    title="Lo-Fi Music"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                Beats to relax/study to
            </p>
        </div>
    );
}
