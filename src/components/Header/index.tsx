import React from 'react';
import dynamic from "next/dynamic";

import styles from './styles.module.scss';


const Header: React.FC = () => {
  const ThemeToggle = dynamic(() => import("../ThemeToggle"), {
    ssr: false,
  });


  return (
    <header className={styles.header}>
      <h1>T O D O</h1>
      <ThemeToggle />
    </header>
  );
}

export default Header;
