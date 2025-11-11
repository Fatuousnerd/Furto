import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { DarkMode, LightMode } from '@mui/icons-material';

const ThemeToggle = () => {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className='border-none bg-transparent text-[--MainText] shadow-none! cursor-pointer hover:text-[--HText] '>
      {theme === 'light' ? <DarkMode /> : <LightMode />}
    </button>
  );
};

export default ThemeToggle;
