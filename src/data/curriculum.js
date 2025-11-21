// Full Stack Developer Curriculum & Projects
// Supports dual-language (EN/RU) and multiple quiz questions.

export const curriculum = [
    // --- 1. INTERNET ---
    {
        category: { en: '1. Internet', ru: '1. Интернет' },
        tasks: [
            {
                title: { en: 'How the Internet Works', ru: 'Как работает Интернет' },
                difficulty: 'easy',
                learningGoals: { en: 'Understand IP, DNS, and how computers connect.', ru: 'Поймите IP, DNS и как соединяются компьютеры.' },
                resources: [
                    { url: 'https://roadmap.sh/guides/how-internet-works', title: 'Roadmap.sh Guide', type: 'article' },
                    { url: 'https://www.youtube.com/watch?v=7_LPdttKXPc', title: 'How the Internet Works', type: 'video' }
                ],
                quizzes: [
                    { question: { en: 'What is an IP address?', ru: 'Что такое IP-адрес?' }, options: { en: ['Internet Provider', 'Internal Protocol', 'Unique Device Address', 'Web Browser'], ru: ['Провайдер', 'Внутренний протокол', 'Уникальный адрес устройства', 'Браузер'] }, correctAnswer: 2 },
                    { question: { en: 'What does DNS do?', ru: 'Что делает DNS?' }, options: { en: ['Stores websites', 'Translates names to IPs', 'Encrypts data', 'Connects cables'], ru: ['Хранит сайты', 'Переводит имена в IP', 'Шифрует данные', 'Соединяет кабели'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'HTTP/HTTPS', ru: 'HTTP/HTTPS' },
                difficulty: 'easy',
                learningGoals: { en: 'Request/Response cycle, Status Codes, Security.', ru: 'Цикл запрос/ответ, коды состояния, безопасность.' },
                resources: [{ url: 'https://roadmap.sh/guides/http-https', title: 'HTTP Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'Which port is for HTTPS?', ru: 'Порт для HTTPS?' }, options: { en: ['80', '21', '443', '8080'], ru: ['80', '21', '443', '8080'] }, correctAnswer: 2 },
                    { question: { en: 'What is a 404 error?', ru: 'Что такое ошибка 404?' }, options: { en: ['Server Error', 'Not Found', 'Unauthorized', 'Success'], ru: ['Ошибка сервера', 'Не найдено', 'Не авторизован', 'Успех'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Domain Names', ru: 'Доменные Имена' },
                difficulty: 'easy',
                learningGoals: { en: 'TLDs, Subdomains, Registrars.', ru: 'TLD, поддомены, регистраторы.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Web_mechanics/What_is_a_domain_name', title: 'MDN Domains', type: 'article' }],
                quizzes: [
                    { question: { en: 'Example of a TLD?', ru: 'Пример TLD?' }, options: { en: ['google', '.com', 'https://', 'www'], ru: ['google', '.com', 'https://', 'www'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Hosting', ru: 'Хостинг' },
                difficulty: 'easy',
                learningGoals: { en: 'Shared vs VPS vs Cloud.', ru: 'Shared vs VPS vs Cloud.' },
                resources: [{ url: 'https://www.codecademy.com/article/what-is-web-hosting', title: 'What is Hosting', type: 'article' }],
                quizzes: [
                    { question: { en: 'What is a VPS?', ru: 'Что такое VPS?' }, options: { en: ['Very Personal Server', 'Virtual Private Server', 'Visual Page System', 'Video Player Service'], ru: ['Очень личный сервер', 'Виртуальный частный сервер', 'Визуальная система', 'Видео сервис'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Browsers', ru: 'Браузеры' },
                difficulty: 'easy',
                learningGoals: { en: 'Rendering Engine, DevTools.', ru: 'Движок рендеринга, DevTools.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Glossary/Browser', title: 'MDN Browser', type: 'article' }],
                quizzes: [
                    { question: { en: 'Key tool for developers?', ru: 'Главный инструмент разработчика?' }, options: { en: ['Word', 'DevTools', 'Paint', 'Calculator'], ru: ['Word', 'DevTools', 'Paint', 'Калькулятор'] }, correctAnswer: 1 }
                ]
            }
        ]
    },
    // --- 2. HTML ---
    {
        category: { en: '2. HTML', ru: '2. HTML' },
        tasks: [
            {
                title: { en: 'Basics', ru: 'Основы' },
                difficulty: 'easy',
                learningGoals: { en: 'Structure, Tags, Attributes.', ru: 'Структура, теги, атрибуты.' },
                resources: [{ url: 'https://www.w3schools.com/html/html_intro.asp', title: 'HTML Intro', type: 'article' }],
                quizzes: [
                    { question: { en: 'Correct HTML5 doctype?', ru: 'Правильный doctype HTML5?' }, options: { en: ['<!DOCTYPE html>', '<html5>', '<doctype html>', '<!html>'], ru: ['<!DOCTYPE html>', '<html5>', '<doctype html>', '<!html>'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Semantic HTML', ru: 'Семантический HTML' },
                difficulty: 'easy',
                learningGoals: { en: 'header, footer, main, article, section.', ru: 'header, footer, main, article, section.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics', title: 'MDN Semantics', type: 'article' }],
                quizzes: [
                    { question: { en: 'Tag for navigation?', ru: 'Тег для навигации?' }, options: { en: ['<div class="nav">', '<nav>', '<navigation>', '<menu>'], ru: ['<div class="nav">', '<nav>', '<navigation>', '<menu>'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Forms', ru: 'Формы' },
                difficulty: 'medium',
                learningGoals: { en: 'Inputs, Labels, Validation.', ru: 'Inputs, Labels, Валидация.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms', title: 'MDN Forms', type: 'article' }],
                quizzes: [
                    { question: { en: 'Input type for email?', ru: 'Тип input для email?' }, options: { en: ['text', 'email', 'mail', 'address'], ru: ['text', 'email', 'mail', 'address'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'SEO Basics', ru: 'Основы SEO' },
                difficulty: 'medium',
                learningGoals: { en: 'Meta tags, Open Graph.', ru: 'Meta tags, Open Graph.' },
                resources: [{ url: 'https://web.dev/learn/seo/', title: 'SEO Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'Tag for page description?', ru: 'Тег описания страницы?' }, options: { en: ['<meta name="description">', '<description>', '<title>', '<info>'], ru: ['<meta name="description">', '<description>', '<title>', '<info>'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Accessibility', ru: 'Доступность (a11y)' },
                difficulty: 'medium',
                learningGoals: { en: 'ARIA, Alt text, Keyboard nav.', ru: 'ARIA, Alt текст, навигация клавиатурой.' },
                resources: [{ url: 'https://web.dev/learn/accessibility/', title: 'A11y Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'Required for images?', ru: 'Обязательно для изображений?' }, options: { en: ['title', 'alt', 'caption', 'desc'], ru: ['title', 'alt', 'caption', 'desc'] }, correctAnswer: 1 }
                ]
            }
        ]
    },
    // --- 3. CSS ---
    {
        category: { en: '3. CSS', ru: '3. CSS' },
        tasks: [
            {
                title: { en: 'Selectors', ru: 'Селекторы' },
                difficulty: 'easy',
                learningGoals: { en: 'Class, ID, Attribute, Pseudo-classes.', ru: 'Class, ID, Attribute, Pseudo-classes.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors', title: 'MDN Selectors', type: 'article' }],
                quizzes: [
                    { question: { en: 'Select by ID?', ru: 'Селектор по ID?' }, options: { en: ['.', '#', '*', '&'], ru: ['.', '#', '*', '&'] }, correctAnswer: 1 }

                ]
            },
            {
                title: { en: 'Box Model', ru: 'Блочная Модель' },
                difficulty: 'easy',
                learningGoals: { en: 'Margin, Border, Padding, Content.', ru: 'Margin, Border, Padding, Content.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model', title: 'Box Model', type: 'article' }],
                quizzes: [
                    { question: { en: 'Space outside border?', ru: 'Отступ снаружи рамки?' }, options: { en: ['padding', 'margin', 'gap', 'outline'], ru: ['padding', 'margin', 'gap', 'outline'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Flexbox', ru: 'Flexbox' },
                difficulty: 'medium',
                learningGoals: { en: 'Layouts, Alignment, Direction.', ru: 'Макеты, выравнивание, направление.' },
                resources: [{ url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', title: 'Flexbox Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'Center vertically?', ru: 'Центрировать вертикально?' }, options: { en: ['justify-content', 'align-items', 'text-align', 'vertical-align'], ru: ['justify-content', 'align-items', 'text-align', 'vertical-align'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Grid', ru: 'Grid' },
                difficulty: 'hard',
                learningGoals: { en: '2D Layouts, Areas, Tracks.', ru: '2D макеты, области, треки.' },
                resources: [{ url: 'https://css-tricks.com/snippets/css/complete-guide-grid/', title: 'Grid Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'Create 3 equal columns?', ru: '3 равные колонки?' }, options: { en: ['grid-template-columns: 1fr 1fr 1fr', 'grid-cols: 3', 'display: 3-col', 'flex: 3'], ru: ['grid-template-columns: 1fr 1fr 1fr', 'grid-cols: 3', 'display: 3-col', 'flex: 3'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Responsive Design', ru: 'Адаптивный Дизайн' },
                difficulty: 'medium',
                learningGoals: { en: 'Media Queries, Mobile First.', ru: 'Media Queries, Mobile First.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design', title: 'Responsive Design', type: 'article' }],
                quizzes: [
                    { question: { en: 'Media query syntax?', ru: 'Синтаксис media query?' }, options: { en: ['@media (max-width: 768px)', '#media screen', '<media>', 'import media'], ru: ['@media (max-width: 768px)', '#media screen', '<media>', 'import media'] }, correctAnswer: 0 }
                ]
            }
        ]
    },
    // --- 4. JAVASCRIPT ---
    {
        category: { en: '4. JavaScript', ru: '4. JavaScript' },
        tasks: [
            {
                title: { en: 'Variables & Types', ru: 'Переменные и Типы' },
                difficulty: 'easy',
                learningGoals: { en: 'let, const, primitives.', ru: 'let, const, примитивы.' },
                resources: [{ url: 'https://javascript.info/types', title: 'JS Types', type: 'article' }],
                quizzes: [
                    { question: { en: 'Reassignable variable?', ru: 'Переназначаемая переменная?' }, options: { en: ['const', 'let', 'final', 'static'], ru: ['const', 'let', 'final', 'static'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Functions', ru: 'Функции' },
                difficulty: 'easy',
                learningGoals: { en: 'Arrow functions, Scope, Closures.', ru: 'Стрелочные функции, область видимости, замыкания.' },
                resources: [{ url: 'https://javascript.info/function-basics', title: 'Functions', type: 'article' }],
                quizzes: [
                    { question: { en: 'Arrow function syntax?', ru: 'Синтаксис стрелочной функции?' }, options: { en: ['() => {}', 'func -> {}', '=> ()', 'function: {}'], ru: ['() => {}', 'func -> {}', '=> ()', 'function: {}'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'DOM Manipulation', ru: 'Манипуляции с DOM' },
                difficulty: 'medium',
                learningGoals: { en: 'querySelector, Event Listeners.', ru: 'querySelector, слушатели событий.' },
                resources: [{ url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents', title: 'DOM API', type: 'article' }],
                quizzes: [
                    { question: { en: 'Select element by class?', ru: 'Выбрать элемент по классу?' }, options: { en: ['getElementById', 'querySelector(".class")', 'selectClass', 'find(".class")'], ru: ['getElementById', 'querySelector(".class")', 'selectClass', 'find(".class")'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Async JS', ru: 'Асинхронность' },
                difficulty: 'hard',
                learningGoals: { en: 'Promises, Async/Await, Fetch.', ru: 'Промисы, Async/Await, Fetch.' },
                resources: [{ url: 'https://javascript.info/async', title: 'Async JS', type: 'article' }],
                quizzes: [
                    { question: { en: 'Await works inside?', ru: 'Await работает внутри?' }, options: { en: ['Any function', 'Async function', 'Loops only', 'Global scope'], ru: ['Любой функции', 'Async функции', 'Только циклов', 'Глобальной области'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'ES6+ Features', ru: 'Фишки ES6+' },
                difficulty: 'medium',
                learningGoals: { en: 'Destructuring, Spread, Modules.', ru: 'Деструктуризация, Spread, Модули.' },
                resources: [{ url: 'https://javascript.info/es6', title: 'ES6 Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'Spread operator?', ru: 'Spread оператор?' }, options: { en: ['...', '+++', '///', '***'], ru: ['...', '+++', '///', '***'] }, correctAnswer: 0 }
                ]
            }
        ]
    },
    // --- 5. VERSION CONTROL ---
    {
        category: { en: '5. Version Control', ru: '5. Контроль Версий' },
        tasks: [
            {
                title: { en: 'Git Basics', ru: 'Основы Git' },
                difficulty: 'easy',
                learningGoals: { en: 'init, add, commit, push.', ru: 'init, add, commit, push.' },
                resources: [{ url: 'https://git-scm.com/book/en/v2', title: 'Pro Git Book', type: 'article' }],
                quizzes: [
                    { question: { en: 'Stage files?', ru: 'Индексировать файлы?' }, options: { en: ['git add', 'git stage', 'git commit', 'git push'], ru: ['git add', 'git stage', 'git commit', 'git push'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Branching', ru: 'Ветвление' },
                difficulty: 'medium',
                learningGoals: { en: 'checkout, merge, rebase.', ru: 'checkout, merge, rebase.' },
                resources: [{ url: 'https://learngitbranching.js.org/', title: 'Learn Git Branching', type: 'tool' }],
                quizzes: [
                    { question: { en: 'Create new branch?', ru: 'Создать новую ветку?' }, options: { en: ['git branch -n', 'git checkout -b', 'git new', 'git create'], ru: ['git branch -n', 'git checkout -b', 'git new', 'git create'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'GitHub/GitLab', ru: 'GitHub/GitLab' },
                difficulty: 'easy',
                learningGoals: { en: 'Pull Requests, Issues, Actions.', ru: 'Pull Requests, Issues, Actions.' },
                resources: [{ url: 'https://docs.github.com/en', title: 'GitHub Docs', type: 'article' }],
                quizzes: [
                    { question: { en: 'Propose changes?', ru: 'Предложить изменения?' }, options: { en: ['Push Request', 'Pull Request', 'Merge Request', 'Change Request'], ru: ['Push Request', 'Pull Request', 'Merge Request', 'Change Request'] }, correctAnswer: 1 }
                ]
            }
        ]
    },
    // --- 6. REACT ---
    {
        category: { en: '6. React', ru: '6. React' },
        tasks: [
            {
                title: { en: 'Components', ru: 'Компоненты' },
                difficulty: 'medium',
                learningGoals: { en: 'JSX, Props, State.', ru: 'JSX, Props, State.' },
                resources: [{ url: 'https://react.dev/learn', title: 'React Docs', type: 'article' }],
                quizzes: [
                    { question: { en: 'Return multiple elements?', ru: 'Вернуть несколько элементов?' }, options: { en: ['<div>', 'Fragment (<>)', '<span>', 'array'], ru: ['<div>', 'Fragment (<>)', '<span>', 'array'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Hooks', ru: 'Хуки' },
                difficulty: 'hard',
                learningGoals: { en: 'useState, useEffect, useRef.', ru: 'useState, useEffect, useRef.' },
                resources: [{ url: 'https://react.dev/reference/react', title: 'Hooks API', type: 'article' }],
                quizzes: [
                    { question: { en: 'Hook for side effects?', ru: 'Хук для эффектов?' }, options: { en: ['useEffect', 'useState', 'useMemo', 'useCallback'], ru: ['useEffect', 'useState', 'useMemo', 'useCallback'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'State Management', ru: 'Управление Состоянием' },
                difficulty: 'hard',
                learningGoals: { en: 'Context API, Redux/Zustand.', ru: 'Context API, Redux/Zustand.' },
                resources: [{ url: 'https://redux.js.org/introduction/getting-started', title: 'Redux Docs', type: 'article' }],
                quizzes: [
                    { question: { en: 'Avoid prop drilling?', ru: 'Избежать prop drilling?' }, options: { en: ['Context', 'Props', 'State', 'Refs'], ru: ['Context', 'Props', 'State', 'Refs'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Router', ru: 'Роутинг' },
                difficulty: 'medium',
                learningGoals: { en: 'React Router, Navigation.', ru: 'React Router, Навигация.' },
                resources: [{ url: 'https://reactrouter.com/en/main', title: 'React Router', type: 'article' }],
                quizzes: [
                    { question: { en: 'Component for links?', ru: 'Компонент для ссылок?' }, options: { en: ['<a>', '<Link>', '<href>', '<go>'], ru: ['<a>', '<Link>', '<href>', '<go>'] }, correctAnswer: 1 }
                ]
            }
        ]
    },
    // --- 7. BACKEND ---
    {
        category: { en: '7. Backend Basics', ru: '7. Основы Бэкенда' },
        tasks: [
            {
                title: { en: 'Node.js', ru: 'Node.js' },
                difficulty: 'medium',
                learningGoals: { en: 'Runtime, Event Loop, Modules.', ru: 'Runtime, Event Loop, Модули.' },
                resources: [{ url: 'https://nodejs.org/en/docs/', title: 'Node Docs', type: 'article' }],
                quizzes: [
                    { question: { en: 'Node is single-threaded?', ru: 'Node однопоточный?' }, options: { en: ['Yes', 'No', 'Sometimes', 'Only on Windows'], ru: ['Да', 'Нет', 'Иногда', 'Только на Windows'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Express.js', ru: 'Express.js' },
                difficulty: 'medium',
                learningGoals: { en: 'Routing, Middleware, REST API.', ru: 'Роутинг, Middleware, REST API.' },
                resources: [{ url: 'https://expressjs.com/', title: 'Express Docs', type: 'article' }],
                quizzes: [
                    { question: { en: 'Middleware function args?', ru: 'Аргументы middleware?' }, options: { en: ['req, res, next', 'req, res', 'context', 'event'], ru: ['req, res, next', 'req, res', 'context', 'event'] }, correctAnswer: 0 }
                ]
            },
            {
                title: { en: 'Databases', ru: 'Базы Данных' },
                difficulty: 'hard',
                learningGoals: { en: 'SQL vs NoSQL, MongoDB, PostgreSQL.', ru: 'SQL vs NoSQL, MongoDB, PostgreSQL.' },
                resources: [{ url: 'https://www.mongodb.com/basics', title: 'DB Basics', type: 'article' }],
                quizzes: [
                    { question: { en: 'Relational DB example?', ru: 'Пример реляционной БД?' }, options: { en: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'], ru: ['MongoDB', 'PostgreSQL', 'Redis', 'Firebase'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'APIs', ru: 'API' },
                difficulty: 'medium',
                learningGoals: { en: 'REST, GraphQL, JSON.', ru: 'REST, GraphQL, JSON.' },
                resources: [{ url: 'https://restfulapi.net/', title: 'REST API Guide', type: 'article' }],
                quizzes: [
                    { question: { en: 'HTTP method to create?', ru: 'HTTP метод для создания?' }, options: { en: ['GET', 'POST', 'PUT', 'DELETE'], ru: ['GET', 'POST', 'PUT', 'DELETE'] }, correctAnswer: 1 }
                ]
            }
        ]
    }
];

export const englishCurriculum = [
    {
        category: { en: '🇬🇧 English for IT', ru: '🇬🇧 Английский для IT' },
        type: 'english',
        tasks: [
            {
                title: { en: 'Basic Terminology', ru: 'Базовая Терминология' },
                difficulty: 'easy',
                learningGoals: { en: 'Bug, Feature, Deploy, Repo.', ru: 'Bug, Feature, Deploy, Repo.' },
                resources: [{ url: 'https://www.youtube.com/watch?v=J_0dMa46yS0', title: 'English for IT', type: 'video' }],
                quizzes: [
                    { question: { en: 'What is a "Bug"?', ru: 'Что такое "Bug"?' }, options: { en: ['Insect', 'Error', 'Feature', 'Virus'], ru: ['Насекомое', 'Ошибка', 'Функция', 'Вирус'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Git Verbs', ru: 'Глаголы Git' },
                difficulty: 'easy',
                learningGoals: { en: 'Commit, Push, Pull, Merge, Clone.', ru: 'Commit, Push, Pull, Merge, Clone.' },
                resources: [{ url: 'https://git-scm.com/docs', title: 'Git Docs', type: 'article' }],
                quizzes: [
                    { question: { en: 'To download a repo?', ru: 'Скачать репозиторий?' }, options: { en: ['git push', 'git clone', 'git commit', 'git add'], ru: ['git push', 'git clone', 'git commit', 'git add'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Communication', ru: 'Коммуникация' },
                difficulty: 'medium',
                learningGoals: { en: 'Daily standups, code reviews, emails.', ru: 'Дейли, код-ревью, письма.' },
                resources: [{ url: 'https://www.youtube.com/watch?v=QJ28eO_n6yE', title: 'Standup Meetings', type: 'video' }],
                quizzes: [
                    { question: { en: 'What is a "Blocker"?', ru: 'Что такое "Blocker"?' }, options: { en: ['A toy', 'Something stopping progress', 'A security feature', 'A database'], ru: ['Игрушка', 'То, что мешает прогрессу', 'Функция безопасности', 'База данных'] }, correctAnswer: 1 }
                ]
            },
            {
                title: { en: 'Job Interview', ru: 'Собеседование' },
                difficulty: 'hard',
                learningGoals: { en: 'Tell me about yourself, strengths, weaknesses.', ru: 'Расскажите о себе, сильные/слабые стороны.' },
                resources: [{ url: 'https://www.youtube.com/watch?v=tEaM7Z258do', title: 'Interview Prep', type: 'video' }],
                quizzes: [
                    { question: { en: 'Best answer for weakness?', ru: 'Лучший ответ про слабость?' }, options: { en: ['I have none', 'I work too hard', 'Real weakness + how you improve', 'I hate people'], ru: ['У меня их нет', 'Я слишком много работаю', 'Реальная слабость + как исправляете', 'Я ненавижу людей'] }, correctAnswer: 2 }
                ]
            }
        ]
    }
];

export const projects = [
    // --- CAPSTONE PROJECTS ---
    {
        id: 'p1',
        title: { en: 'Personal Portfolio', ru: 'Личное Портфолио' },
        description: { en: 'Build a responsive portfolio site.', ru: 'Создайте адаптивный сайт-портфолио.' },
        difficulty: 'easy',
        requirements: { en: ['HTML5/CSS3', 'Responsive', 'Contact Form'], ru: ['HTML5/CSS3', 'Адаптивность', 'Форма контактов'] },
        xp: 500
    },
    {
        id: 'p2',
        title: { en: 'Weather Dashboard', ru: 'Погодная Панель' },
        description: { en: 'Fetch weather data from an API.', ru: 'Получайте данные о погоде из API.' },
        difficulty: 'medium',
        requirements: { en: ['Fetch API', 'Async/Await', 'DOM Manipulation'], ru: ['Fetch API', 'Async/Await', 'Манипуляции с DOM'] },
        xp: 1000
    },
    {
        id: 'p3',
        title: { en: 'Task Manager', ru: 'Менеджер Задач' },
        description: { en: 'CRUD app with local storage.', ru: 'CRUD приложение с локальным хранилищем.' },
        difficulty: 'hard',
        requirements: { en: ['React', 'State Management', 'LocalStorage'], ru: ['React', 'Управление состоянием', 'LocalStorage'] },
        xp: 1500
    },

    // --- MINI PROJECTS (PRACTICE) ---
    {
        id: 'm1',
        title: { en: 'Color Flipper', ru: 'Переключатель Цветов' },
        description: { en: 'Simple button to change background color.', ru: 'Простая кнопка для смены цвета фона.' },
        difficulty: 'beginner',
        requirements: { en: ['DOM events', 'Math.random()', 'Arrays'], ru: ['События DOM', 'Math.random()', 'Массивы'] },
        xp: 100
    },
    {
        id: 'm2',
        title: { en: 'Counter', ru: 'Счетчик' },
        description: { en: 'Increase, decrease, and reset a number.', ru: 'Увеличение, уменьшение и сброс числа.' },
        difficulty: 'beginner',
        requirements: { en: ['Variables', 'Event Listeners', 'Conditionals'], ru: ['Переменные', 'Слушатели событий', 'Условия'] },
        xp: 100
    },
    {
        id: 'm3',
        title: { en: 'Review Carousel', ru: 'Карусель Отзывов' },
        description: { en: 'Cycle through reviews with next/prev buttons.', ru: 'Переключение отзывов кнопками вперед/назад.' },
        difficulty: 'beginner',
        requirements: { en: ['Arrays of objects', 'Index tracking', 'DOM updates'], ru: ['Массивы объектов', 'Отслеживание индекса', 'Обновление DOM'] },
        xp: 150
    },
    {
        id: 'm4',
        title: { en: 'Navbar Toggle', ru: 'Адаптивное Меню' },
        description: { en: 'Responsive navbar with hamburger menu.', ru: 'Адаптивная навигация с гамбургер-меню.' },
        difficulty: 'beginner',
        requirements: { en: ['CSS Media Queries', 'Class toggling', 'Transitions'], ru: ['CSS Media Queries', 'Переключение классов', 'Переходы'] },
        xp: 150
    },
    {
        id: 'm5',
        title: { en: 'Sidebar', ru: 'Боковая Панель' },
        description: { en: 'Slide-in sidebar with close button.', ru: 'Выезжающая панель с кнопкой закрытия.' },
        difficulty: 'beginner',
        requirements: { en: ['CSS Transforms', 'Z-index', 'Event handling'], ru: ['CSS Transforms', 'Z-index', 'Обработка событий'] },
        xp: 150
    },
    {
        id: 'm6',
        title: { en: 'Modal Window', ru: 'Модальное Окно' },
        description: { en: 'Pop-up window with overlay.', ru: 'Всплывающее окно с затемнением фона.' },
        difficulty: 'beginner',
        requirements: { en: ['Position fixed', 'Opacity', 'Click outside to close'], ru: ['Position fixed', 'Opacity', 'Клик вне окна для закрытия'] },
        xp: 200
    },
    {
        id: 'm7',
        title: { en: 'FAQ Accordion', ru: 'FAQ Аккордеон' },
        description: { en: 'Expand/collapse questions.', ru: 'Раскрытие/скрытие вопросов.' },
        difficulty: 'beginner',
        requirements: { en: ['DOM traversal', 'Class manipulation', 'Max-height animation'], ru: ['Обход DOM', 'Манипуляция классами', 'Анимация max-height'] },
        xp: 200
    },
    {
        id: 'm8',
        title: { en: 'Restaurant Menu', ru: 'Меню Ресторана' },
        description: { en: 'Filter menu items by category.', ru: 'Фильтрация блюд по категориям.' },
        difficulty: 'beginner',
        requirements: { en: ['Array.filter()', 'Array.map()', 'Dynamic HTML generation'], ru: ['Array.filter()', 'Array.map()', 'Генерация HTML'] },
        xp: 250
    },
    {
        id: 'm9',
        title: { en: 'Video Background', ru: 'Видео Фон' },
        description: { en: 'Website with video background and overlay.', ru: 'Сайт с видео-фоном и наложением.' },
        difficulty: 'beginner',
        requirements: { en: ['HTML5 Video', 'CSS Positioning', 'Object-fit'], ru: ['HTML5 Video', 'CSS Positioning', 'Object-fit'] },
        xp: 150
    },
    {
        id: 'm10',
        title: { en: 'Scroll Project', ru: 'Скролл Проект' },
        description: { en: 'Sticky navbar and smooth scroll links.', ru: 'Липкое меню и плавная прокрутка.' },
        difficulty: 'beginner',
        requirements: { en: ['window.scrollY', 'offsetTop', 'scrollIntoView'], ru: ['window.scrollY', 'offsetTop', 'scrollIntoView'] },
        xp: 250
    }
];
