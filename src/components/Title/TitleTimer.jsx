import { useState } from 'react';
import styles from './title.module.css';

export const TitleTimer = ({ isRunning }) => {
  const [title, setTitle] = useState('');
  const [inputVisible, setInputVisible] = useState(true);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleSetTitle() {
    setTitle(inputValue);
    setInputVisible(false);
    setInputValue('');
  }

  function handleEditTitle() {
    setInputVisible(true);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleSetTitle();
    }
  }

  return (
    <section>
      {inputVisible ? (
        <>
          <input
            type="text"
            placeholder="Digite o título"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSetTitle}>
            <i className="fa-solid fa-circle-check"></i>
          </button>
        </>
      ) : (
        <h2 className={styles.title} onClick={handleEditTitle}>
          {title}
        </h2>
      )}
    </section>
  );
};
