import React from 'react';
import styles from '../styles/Home.module.css';

const Header = () => {
  return (
    <div>
      <h1 className={styles.title}>
        Welcome to <a href='https://nextjs.org'>AVI!</a>
      </h1>
    </div>
  );
};

export default Header;
