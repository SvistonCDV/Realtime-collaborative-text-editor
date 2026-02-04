import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import { generateUser } from './utils/randomUser';

const currentUser = generateUser();

function App() {
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowWelcome(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app">
            <header className="header">
                <div className="header-left">
                    <h1 className="logo">
                        <span className="logo-text">J&S</span>
                    </h1>
                    <span className="tagline">Realtime collaborative text editor</span>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <span
                            className="user-color-dot"
                            style={{ backgroundColor: currentUser.color }}
                        />
                        <span className="user-name-display">{currentUser.name}</span>
                    </div>
                </div>
            </header>

            {showWelcome && (
                <div className="welcome-toast">
                    <span> Welcome, </span>
                    <strong style={{ color: currentUser.color }}>{currentUser.name}</strong>
                    <span>! Start writing with others :)</span>
                </div>
            )}

            <main className="main">
                <Editor currentUser={currentUser} />
            </main>
        </div>
    );
}

export default App;
