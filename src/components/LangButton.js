import React, { useContext } from 'react'
import { DataContext } from './Data/DataContext';

export default function LangButton() {
    const { lang, toggleLang } = useContext(DataContext);

  return (
    <button className='absolute top-2 md:top-3 right-2 md:right-3 text-white font-bold text-lg md:text-2xl hover:underline' onClick={toggleLang}>{lang}</button>
  )
}
