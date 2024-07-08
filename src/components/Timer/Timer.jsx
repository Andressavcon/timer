import { useState, useEffect, useRef } from 'react';
import styles from './timer.module.css';

const Timer = ({ isRunning, setIsRunning }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setShowModal(true);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  function handleStart() {
    if (!isRunning && validateTimeInput()) {
      const totalSecondsCount = hours * 3600 + minutes * 60 + seconds;
      setTimeLeft(totalSecondsCount);
      setIsRunning(true);
      setShowModal(false);
    } else {
      alert('Por favor, insira um tempo válido.');
    }
  }

  function handlePause() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function handleReset() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setShowModal(false);
  }

  function formatTime() {
    const hrs = Math.floor(timeLeft / 3600);
    const mins = Math.floor((timeLeft % 3600) / 60);
    const secs = timeLeft % 60;

    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(
      2,
      '0'
    )}:${String(secs).padStart(2, '0')}`;
  }

  function validateTimeInput() {
    return hours !== 0 || minutes !== 0 || seconds !== 0;
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handleChangeHours(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      setHours(0);
    } else if (parsedValue < 0) {
      setHours(0);
    } else if (parsedValue > 23) {
      setHours(23);
    } else {
      setHours(parsedValue);
    }
  }

  function handleChangeMinutes(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      setMinutes(0);
    } else if (parsedValue < 0) {
      setMinutes(0);
    } else if (parsedValue > 59) {
      setMinutes(59);
    } else {
      setMinutes(parsedValue);
    }
  }

  function handleChangeSeconds(value) {
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
      setSeconds(0);
    } else if (parsedValue < 0) {
      setSeconds(0);
    } else if (parsedValue > 59) {
      setSeconds(59);
    } else {
      setSeconds(parsedValue);
    }
  }

  return (
    <section className={styles.timer}>
      {!isRunning ? (
        <div className={styles.inputs}>
          <input
            type="number"
            min={0}
            max={23}
            placeholder="00"
            value={hours}
            onChange={(e) => handleChangeHours(e.target.value)}
          />
          <span className={styles.timeSeparator}>:</span>
          <input
            type="number"
            min={0}
            max={59}
            placeholder="00"
            value={minutes}
            onChange={(e) => handleChangeMinutes(e.target.value)}
          />
          <span className={styles.timeSeparator}>:</span>
          <input
            type="number"
            min={0}
            max={59}
            placeholder="00"
            value={seconds}
            onChange={(e) => handleChangeSeconds(e.target.value)}
          />
        </div>
      ) : (
        <div className={styles.numbers}>{formatTime()} </div>
      )}

      <div className={styles.buttons}>
        {!isRunning && (
          <button onClick={handleStart}>
            <i className="fa-solid fa-circle-play"></i>
          </button>
        )}
        {isRunning && (
          <>
            <button onClick={handlePause}>
              <i className="fa-solid fa-circle-pause"></i>
            </button>
            <button onClick={handleReset}>
              <i className="fa-solid fa-circle-stop"></i>
            </button>
          </>
        )}
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>O tempo acabou!</h2>
            <button className={styles.closeButton} onClick={handleModalClose}>
              <i className="fa-solid fa-circle-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Timer;
