import { useNotes } from '../hooks/useNotes';
import { useSettings } from '../contexts/SettingsContext';

export function NotesPanel() {
    const { notes, setNotes } = useNotes();
    const { t } = useSettings();

    return (
        <div className="glass-panel" style={{
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%'
        }}>
            <h2>{t('notes')}</h2>
            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('notesPlaceholder')}
                style={{
                    flex: 1,
                    width: '100%',
                    background: 'rgba(0,0,0,0.1)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1rem',
                    color: 'var(--text-primary)',
                    resize: 'none',
                    fontFamily: 'inherit',
                    lineHeight: '1.6',
                    outline: 'none'
                }}
            />
        </div>
    );
}
