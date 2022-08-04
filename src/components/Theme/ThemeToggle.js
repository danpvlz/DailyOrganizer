import React from 'react';
import { ThemeContext } from './ThemeContext';

const Toggle = () => {
    const { theme, setTheme } = React.useContext(ThemeContext);

    return (
        <div className={`w-20 h-10 select-none cursor-pointer`}>
            <label
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                htmlFor="dark-mode-toggle" 
                className={`w-full h-full bg-slate-900 dark:bg-gray-100 rounded-full p-1 flex justify-between cursor-pointer`}>
                <span className="inline dark:hidden transition-all duration-300 ease-in-out text-2xl">🌞</span>
                <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 block float-right dark:float-left"></span>
                <span className="hidden dark:inline transition-all duration-300 ease-in-out text-2xl">🌛</span>
            </label>
        </div>
    );
};

export default Toggle;