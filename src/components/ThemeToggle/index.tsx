import React, { useEffect, useState } from 'react';

import { useTheme } from '../../hooks/theme';

const ThemeToggle: React.FC = () => {
  const [userTheme, setUserTheme] = useState(document.body.dataset.theme);

  useEffect(() => {
    document.body.dataset.theme = userTheme;
    window.localStorage.setItem("@TODO:Theme", userTheme);
  }, [userTheme]);

  const { setTheme } = useTheme();

  setTheme(userTheme)

  return (
    <button
      onClick={userTheme === 'dark'
        ? () => setUserTheme('light')
        : () => setUserTheme('dark')
      }>
      {userTheme === 'dark'
        ? <img src="/icon-sun.svg" alt="sun" />
        : <img src="/icon-moon.svg" alt="moon" />
      }
    </button>
  );
}

export default ThemeToggle;
