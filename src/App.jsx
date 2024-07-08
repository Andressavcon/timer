import { useState } from 'react';
import Timer from './components/Timer/Timer';
import { TitleTimer } from './components/Title/TitleTimer';
import Warnings from './components/Warnings/Warnings';
import './css/global.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  return (
    <main>
      <h4>Timer</h4>
      <TitleTimer isRunning={isRunning} />
      <Timer isRunning={isRunning} setIsRunning={setIsRunning} />
      <Warnings />
    </main>
  );
}

export default App;
