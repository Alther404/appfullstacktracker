import { useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function QuizModal({ task, onClose, onComplete }) {
    const { t, language } = useSettings();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Support both old single quiz object and new quizzes array
    const questions = task.quizzes || (task.quiz ? [task.quiz] : []);
    const currentQuestion = questions[currentQuestionIndex];

    // Helper to get localized content
    const getLocalized = (content) => {
        if (!content) return '';
        if (typeof content === 'string') return content;
        return content[language] || content['en'] || '';
    };

    const questionText = getLocalized(currentQuestion?.question);
    const options = getLocalized(currentQuestion?.options) || [];

    const handleSubmit = () => {
        if (selectedOption === null) return;

        const correct = selectedOption === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setIsSubmitted(true);

        if (correct) {
            setScore(s => s + 1);
        }

        // Auto-advance after short delay
        setTimeout(() => {
            handleNext();
        }, 1500);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
        } else {
            setShowResult(true);
        }
    };

    const handleFinish = () => {
        // Require 100% correctness or at least high enough?
        // Let's say 100% for now to be strict as requested ("Strict Learning Flow")
        if (score === questions.length) {
            onComplete();
        } else {
            // Reset to try again
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setIsSubmitted(false);
            setIsCorrect(false);
            setScore(0);
            setShowResult(false);
        }
    };

    if (questions.length === 0) {
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
            }}>
                <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                    <h3>{language === 'ru' ? 'Ошибка' : 'Error'}</h3>
                    <p>{language === 'ru' ? 'Для этого задания нет вопросов.' : 'No questions available for this task.'}</p>
                    <button onClick={onComplete} className="btn-primary" style={{ marginTop: '1rem' }}>
                        {language === 'ru' ? 'Пропустить' : 'Skip'}
                    </button>
                </div>
            </div>
        );
    }

    if (showResult) {
        const isPass = score === questions.length;
        return (
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
            }}>
                <div className="glass-panel" style={{
                    width: '500px', padding: '2rem', borderRadius: 'var(--radius-lg)',
                    textAlign: 'center', border: isPass ? '1px solid var(--success)' : '1px solid var(--error)'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                        {isPass ? '🎉' : '😕'}
                    </div>
                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                        {isPass
                            ? (language === 'ru' ? 'Тест пройден!' : 'Quiz Passed!')
                            : (language === 'ru' ? 'Тест не пройден' : 'Quiz Failed')}
                    </h3>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        {language === 'ru' ? 'Ваш результат:' : 'Your score:'} <span style={{ color: 'white', fontWeight: 'bold' }}>{score} / {questions.length}</span>
                    </p>

                    {isPass ? (
                        <button onClick={onComplete} className="btn-primary" style={{ width: '100%' }}>
                            {language === 'ru' ? 'Продолжить обучение' : 'Continue Learning'}
                        </button>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={onClose} className="btn-secondary" style={{ flex: 1 }}>
                                {language === 'ru' ? 'Закрыть' : 'Close'}
                            </button>
                            <button onClick={handleFinish} className="btn-primary" style={{ flex: 1 }}>
                                {language === 'ru' ? 'Попробовать снова' : 'Try Again'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{
                width: '600px',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--accent-primary)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.5rem' }}>
                        {language === 'ru' ? 'Проверка знаний' : 'Knowledge Check'}
                    </h3>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        {currentQuestionIndex + 1} / {questions.length}
                    </span>
                </div>

                <div style={{ marginBottom: '1rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                    <div style={{
                        height: '100%',
                        width: `${((currentQuestionIndex) / questions.length) * 100}%`,
                        background: 'var(--accent-primary)',
                        borderRadius: '2px',
                        transition: 'width 0.3s ease'
                    }} />
                </div>

                <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.5' }}>
                    {questionText}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => !isSubmitted && setSelectedOption(idx)}
                            style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: selectedOption === idx
                                    ? (isSubmitted
                                        ? (idx === currentQuestion.correctAnswer ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)')
                                        : 'rgba(139, 92, 246, 0.2)')
                                    : 'transparent',
                                borderColor: selectedOption === idx
                                    ? (isSubmitted
                                        ? (idx === currentQuestion.correctAnswer ? 'var(--success)' : 'var(--error)')
                                        : 'var(--accent-primary)')
                                    : 'rgba(255,255,255,0.1)',
                                color: 'white',
                                textAlign: 'left',
                                cursor: isSubmitted ? 'default' : 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative'
                            }}
                        >
                            {option}
                            {isSubmitted && idx === currentQuestion.correctAnswer && (
                                <span style={{ position: 'absolute', right: '1rem', color: 'var(--success)' }}>✓</span>
                            )}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button
                        onClick={onClose}
                        style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer' }}
                    >
                        {language === 'ru' ? 'Отмена' : 'Cancel'}
                    </button>
                    {!isSubmitted && (
                        <button
                            onClick={handleSubmit}
                            className="btn-primary"
                            disabled={selectedOption === null}
                            style={{ opacity: selectedOption === null ? 0.5 : 1 }}
                        >
                            {language === 'ru' ? 'Ответить' : 'Submit Answer'}
                        </button>
                    )}
                    {isSubmitted && (
                        <div style={{ color: isCorrect ? 'var(--success)' : 'var(--error)', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                            {isCorrect
                                ? (language === 'ru' ? 'Верно!' : 'Correct!')
                                : (language === 'ru' ? 'Неверно' : 'Incorrect')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
