import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextData {
  theme: string;
  toggleTheme: () => void;
  setTheme: (theme: string) => void;
}



export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState('dark');


  useEffect(() => {
    if(typeof window !== 'undefined') {
      localStorage.setItem('@TODO:Theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    theme === 'light'
    ? setTheme('dark')
    : setTheme('light')
  }

  return(
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  return context
}
