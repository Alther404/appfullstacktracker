import { useState, useRef, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { generateAIResponse } from '../services/ai';
import { useGamification } from '../hooks/useGamification';
import { useTasks } from '../hooks/useTasks';
import { useNotes } from '../hooks/useNotes';

export function AIChatModal({ onClose }) {
    const { t, apiKey, setApiKey } = useSettings();
    const { stats, getLevelTitle } = useGamification();
    const { tasks } = useTasks();
    const { notes } = useNotes();

    const [messages, setMessages] = useState([
        { role: 'model', content: t('aiWelcome') || "Hello! I'm your AI Assistant. How can I help you with your journey today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const appContext = {
                stats,
                levelTitle: getLevelTitle(stats.level),
                tasks,
                notes
            };

            const responseText = await generateAIResponse(apiKey, [...messages, userMessage], appContext);

            setMessages(prev => [...prev, { role: 'model', content: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', content: "Error: " + error.message }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!apiKey) {
        return (
            <div className="glass-panel" style={{
                position: 'fixed', bottom: '80px', right: '20px', width: '350px', height: '200px',
                zIndex: 1000, display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3>AI Setup</h3>
                    <button onClick={onClose}>×</button>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Please enter your Google Gemini API Key to enable the AI Assistant.
                </p>
                <input
                    type="password"
                    placeholder="Paste API Key here..."
                    onChange={(e) => setApiKey(e.target.value)}
                    style={{
                        padding: '0.5rem', borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white'
                    }}
                />
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Get one for free at <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: 'var(--accent-primary)' }}>Google AI Studio</a>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-panel" style={{
            position: 'fixed', bottom: '80px', right: '20px', width: '380px', height: '500px',
            zIndex: 1000, display: 'flex', flexDirection: 'column', overflow: 'hidden',
            animation: 'slideUp 0.3s ease'
        }}>
            {/* Header */}
            <div style={{
                padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'rgba(255,255,255,0.05)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>🤖</span>
                    <h3 style={{ margin: 0, fontSize: '1rem' }}>AI Assistant</h3>
                </div>
                <button onClick={onClose} style={{ fontSize: '1.2rem', opacity: 0.7 }}>×</button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                        maxWidth: '85%',
                        padding: '0.8rem 1rem',
                        borderRadius: '1rem',
                        background: msg.role === 'user' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)',
                        color: 'white',
                        fontSize: '0.9rem',
                        lineHeight: '1.4'
                    }}>
                        {msg.content}
                    </div>
                ))}
                {isLoading && (
                    <div style={{ alignSelf: 'flex-start', padding: '0.5rem 1rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        Thinking...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask for help..."
                        style={{
                            flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-md)',
                            border: 'none', background: 'rgba(0,0,0,0.2)', color: 'white'
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            padding: '0 1rem', borderRadius: 'var(--radius-md)',
                            background: 'var(--accent-primary)', color: 'white', fontWeight: 'bold',
                            opacity: isLoading ? 0.5 : 1
                        }}
                    >
                        ➤
                    </button>
                </div>
            </form>
        </div>
    );
}
