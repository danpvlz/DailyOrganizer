import React from 'react'
import { DataContext } from '../Data/DataContext';

export default function TaskButton() {
  const { tasks,handleSetTasks, langconfig } = React.useContext(DataContext);

  const handleAddTask = () => {
    let lastId = Math.max(...tasks.map(t => t.id)),
      nextId = (isFinite(lastId) ? lastId : 0) + 1,
      newTask = {
        id: nextId,
        description: "",
        date: "",
        finishedDate: "",
        empty: true,
        expired: false,
        finished: false,
        readStatus: false
      }
      handleSetTasks(tasks,newTask)
  }

  return (
    <button
      onClick={handleAddTask}
      className='
    bg-slate-900 
    dark:bg-slate-600 
    hover:bg-slate-800
    text-gray-50 
    dark:text-gray-50 
    flex rounded-full gap-2 items-center shadow-xl p-3 fixed z-50 bottom-5 right-5  transition-all duration-300 ease-in-out'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className='font-light'>
        {langconfig.pending.new}
      </span>
    </button>
  )
}