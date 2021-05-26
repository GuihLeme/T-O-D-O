import React, { createContext, useContext, useState } from 'react';

interface ThemeContextData {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}


export const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
  }

  return(
    <ThemeContext.Provider value={{
      isDarkTheme,
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
