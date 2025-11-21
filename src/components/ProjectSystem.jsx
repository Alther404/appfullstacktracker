import { useState } from 'react';
import { projects } from '../data/curriculum';
import { useGamification } from '../hooks/useGamification';
import { useSettings } from '../contexts/SettingsContext';

export function ProjectSystem() {
    const { addXP } = useGamification();
    const { t, language } = useSettings();
    const [activeProjects, setActiveProjects] = useState(() => {
        return JSON.parse(localStorage.getItem('devjourney_projects') || '{}');
    });
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    // Reflection state
    const [reflection, setReflection] = useState({
        q1: '',
        q2: '',
        q3: ''
    });

    const handleStartProject = (projectId) => {
        const newProjects = {
            ...activeProjects,
            [projectId]: { status: 'in_progress', startedAt: new Date().toISOString() }
        };
        setActiveProjects(newProjects);
        localStorage.setItem('devjourney_projects', JSON.stringify(newProjects));
    };

    const openSubmitModal = (project) => {
        setSelectedProject(project);
        setReflection({ q1: '', q2: '', q3: '' });
        setShowSubmitModal(true);
    };

    const handleCompleteProject = () => {
        if (!reflection.q1 || !reflection.q2 || !reflection.q3) return;

        const newProjects = {
            ...activeProjects,
            [selectedProject.id]: {
                status: 'completed',
                completedAt: new Date().toISOString(),
                reflection: reflection
            }
        };
        setActiveProjects(newProjects);
        localStorage.setItem('devjourney_projects', JSON.stringify(newProjects));

        addXP(selectedProject.xp);
        setShowSubmitModal(false);
        alert(language === 'ru'
            ? `🎉 Поздравляем! Вы заработали ${selectedProject.xp} XP за завершение проекта ${selectedProject.title[language] || selectedProject.title}!`
            : `🎉 Congratulations! You earned ${selectedProject.xp} XP for completing ${selectedProject.title[language] || selectedProject.title}!`
        );
    };

    // Helper for localized text
    const getLoc = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || '';
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', height: '100%', overflowY: 'auto' }}>
            <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '2rem' }}>
                {language === 'ru' ? 'Курсовые Проекты' : 'Capstone Projects'}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                {language === 'ru'
                    ? 'Создавайте реальные приложения, чтобы закрепить навыки. Выполняйте проекты, получайте опыт и пополняйте портфолио.'
                    : 'Build real-world applications to master your skills. Complete these projects to earn massive XP and build your portfolio.'}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {projects.map(project => {
                    const status = activeProjects[project.id]?.status || 'available';
                    const title = getLoc(project.title);
                    const description = getLoc(project.description);
                    const requirements = getLoc(project.requirements) || [];

                    return (
                        <div key={project.id} style={{
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'rgba(255,255,255,0.03)',
                            border: status === 'completed' ? '1px solid var(--success)' : '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <h3 style={{ fontSize: '1.3rem' }}>{title}</h3>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '100px',
                                    background: 'rgba(255,255,255,0.1)',
                                    fontSize: '0.8rem',
                                    color: 'var(--accent-primary)'
                                }}>{project.difficulty}</span>
                            </div>

                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{description}</p>

                            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                                <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                                    {language === 'ru' ? 'ТРЕБОВАНИЯ:' : 'REQUIREMENTS:'}
                                </div>
                                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    {requirements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--warning)' }}>🏆 {project.xp} XP</div>

                                {status === 'available' && (
                                    <button
                                        onClick={() => handleStartProject(project.id)}
                                        className="btn-primary"
                                    >
                                        {language === 'ru' ? 'Начать проект' : 'Start Project'}
                                    </button>
                                )}
                                {status === 'in_progress' && (
                                    <button
                                        onClick={() => openSubmitModal(project)}
                                        className="btn-secondary"
                                        style={{ borderColor: 'var(--success)', color: 'var(--success)' }}
                                    >
                                        {language === 'ru' ? 'Завершить и Оценить' : 'Complete & Reflect'}
                                    </button>
                                )}
                                {status === 'completed' && (
                                    <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>
                                        ✓ {language === 'ru' ? 'Выполнено' : 'Completed'}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Reflection Modal */}
            {showSubmitModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                            {language === 'ru' ? 'Рефлексия по проекту' : 'Project Reflection'}
                        </h3>
                        <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                            {language === 'ru'
                                ? 'Ответьте на несколько вопросов, чтобы лучше осознать свой опыт и закрепить знания.'
                                : 'Answer a few questions to better understand your experience and solidify your knowledge.'}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    {language === 'ru' ? '1. Что было самым сложным в этом проекте?' : '1. What was the most challenging part of this project?'}
                                </label>
                                <textarea
                                    value={reflection.q1}
                                    onChange={(e) => setReflection({ ...reflection, q1: e.target.value })}
                                    style={{
                                        width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white', minHeight: '80px', resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    {language === 'ru' ? '2. Чему новому вы научились?' : '2. What new things did you learn?'}
                                </label>
                                <textarea
                                    value={reflection.q2}
                                    onChange={(e) => setReflection({ ...reflection, q2: e.target.value })}
                                    style={{
                                        width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white', minHeight: '80px', resize: 'vertical'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                                    {language === 'ru' ? '3. Как вы оцениваете свой результат (1-10)? Почему?' : '3. How do you rate your result (1-10)? Why?'}
                                </label>
                                <textarea
                                    value={reflection.q3}
                                    onChange={(e) => setReflection({ ...reflection, q3: e.target.value })}
                                    style={{
                                        width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-md)',
                                        background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'white', minHeight: '80px', resize: 'vertical'
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                            <button onClick={() => setShowSubmitModal(false)} className="btn-secondary">
                                {language === 'ru' ? 'Отмена' : 'Cancel'}
                            </button>
                            <button
                                onClick={handleCompleteProject}
                                className="btn-primary"
                                disabled={!reflection.q1 || !reflection.q2 || !reflection.q3}
                                style={{ opacity: (!reflection.q1 || !reflection.q2 || !reflection.q3) ? 0.5 : 1 }}
                            >
                                {language === 'ru' ? 'Завершить проект' : 'Complete Project'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
