import { useSettings } from '../contexts/SettingsContext';

export function FAQView() {
    const { t } = useSettings();

    const faqs = [
        {
            q: t('faq_q1'),
            a: t('faq_a1')
        },
        {
            q: t('faq_q2'),
            a: t('faq_a2')
        },
        {
            q: t('faq_q3'),
            a: t('faq_a3')
        },
        {
            q: t('faq_q4'),
            a: t('faq_a4')
        }
    ];

    return (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', height: '100%', overflowY: 'auto' }}>
            <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Frequently Asked Questions</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                {faqs.map((faq, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                        <h3 style={{ color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>{faq.q}</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{faq.a}</p>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: 'auto',
                padding: '2rem',
                background: 'rgba(139, 92, 246, 0.1)',
                borderRadius: 'var(--radius-lg)',
                textAlign: 'center',
                border: '1px solid var(--accent-primary)'
            }}>
                <h3 style={{ marginBottom: '1rem' }}>Still have questions?</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    Found a bug or want to suggest a feature? Contact the developer directly.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a
                        href="mailto:deuskirx@gmail.com"
                        className="btn-primary"
                        style={{ display: 'inline-block', textDecoration: 'none' }}
                    >
                        ✉️ Write to Developer
                    </a>
                    <a
                        href="https://t.me/fsdevkalt"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                            display: 'inline-block',
                            textDecoration: 'none',
                            background: '#229ED9' // Telegram color
                        }}
                    >
                        ✈️ Join Telegram
                    </a>
                </div>
            </div>
        </div>
    );
}
