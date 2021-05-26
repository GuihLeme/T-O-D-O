import React from 'react';

import styles from './styles.module.scss';

import { useTheme } from '../../hooks/theme';

const Header: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <h1>T O D O</h1>
      <button onClick={toggleTheme}>
        {isDarkTheme
          ? <img src="/icon-sun.svg" alt="sun" />
          : <img src="/icon-moon.svg" alt="moon" />
        }

      </button>
    </header>
  );
}

export default Header;
