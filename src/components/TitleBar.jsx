import { useState, useEffect } from 'react';

export function TitleBar() {
    const [isMaximized, setIsMaximized] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
                setIsMaximized(true);
            } else {
                setIsMaximized(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={{
            height: '32px',
            background: 'var(--bg-secondary)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            WebkitAppRegion: 'drag',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 9999
        }}>
            <div style={{ paddingLeft: '1rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1rem' }}>🚀</span> FSdev Learn
            </div>

            {/* Window Controls - These are just placeholders visually, 
                real controls are handled by Electron's titleBarOverlay or IPC if needed. 
                Since we used titleBarOverlay in main.cjs, we just need to reserve space 
                or let the overlay handle it. 
                However, for a truly custom look, we often hide the native ones and use IPC.
                Given the main.cjs config: titleBarStyle: 'hidden', titleBarOverlay: { color... }
                The native controls will appear over this area on Windows.
            */}
            <div style={{ width: '135px', height: '100%', WebkitAppRegion: 'no-drag' }}></div>
        </div>
    );
}
