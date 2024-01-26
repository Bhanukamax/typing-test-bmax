import { IoCog } from 'react-icons/io5';
import './App.css';
import TypingTest from './componets/TypingTest';

function App() {
    return (
        <div className="App">
            <div className="main">
                <div className="header-line">
                    <h1>Typing Test</h1>
                    <button className="border-0 flex bg-none color-sub hover:color-main pointer">
                        <IoCog size="20" />
                    </button>
                </div>
                <TypingTest />
            </div>
        </div>
    );
}

export default App;
