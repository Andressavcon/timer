import { useState, useEffect } from 'react';
import styles from './warnings.module.css';

const Warnings = () => {
  const [valueInput, setValueInput] = useState('');
  const [warning, setWarning] = useState('');

  useEffect(() => {
    const storedWarning = localStorage.getItem('warning');
    if (storedWarning) {
      setWarning(storedWarning);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('warning', warning);
  }, [warning]);

  function handleAddItem() {
    if (valueInput.trim() !== '') {
      setWarning(valueInput.trim());
      setValueInput('');
    }
  }

  function handleDeleteItem() {
    setWarning('');
  }

  function handleChangeValue(event) {
    setValueInput(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleAddItem();
    }
  }

  return (
    <section className={styles.warnings}>
      <div className={styles.title}>
        <div className={styles.titleContent}>
          <i className="fa-solid fa-triangle-exclamation"></i>
          <h5>Warnings</h5>
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
      </div>

      {!warning && (
        <div className={styles.addItem}>
          <input
            type="text"
            placeholder="Nota importante"
            value={valueInput}
            onChange={handleChangeValue}
            onKeyDown={handleKeyDown}
            className={styles.input}
          />
          <button onClick={handleAddItem}>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </div>
      )}

      {warning && (
        <div className={styles.warningContainer}>
          <p>{warning}</p>
          <button onClick={handleDeleteItem}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
      )}
    </section>
  );
};

export default Warnings;
