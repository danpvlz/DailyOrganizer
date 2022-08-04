import React, { useEffect } from 'react'
import TaskButton from './TaskButton'
import { DataContext } from '../Data/DataContext'
import { ThemeContext } from '../Theme/ThemeContext'
import moment from 'moment'

export default function Tasks({ transparent }) {
  const { tasks, clearTasks, langconfig } = React.useContext(DataContext);

  return (
    <div className='mt-5'>
      <TaskButton />
      <div className={`${transparent ? '-translate-y-10' : 'translate-y-0'} transition-all duration-1000 ease-out`}>
        {
          tasks.length > 0 ?
            <div className='flex content-center items-center gap-3'>
              <div className='w-max ml-2 mb-5'>
                <p className='text-gray-900 dark:text-gray-50 font-bold text-left text-3xl'>{langconfig.pending.title}</p>
                <div className='w-full h-1 bg-blue-600'></div>
              </div>

              <button onClick={clearTasks} className='mb-4 text-gray-400 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            : ""
        }
        <div className='flex flex-wrap justify-start gap-5 pr-3 relative '>
          {
            tasks.map((t) =>
              <TaskCard task={t} key={t.id} />
            )
          }
        </div>
      </div>
    </div>
  )
}

const TaskCard = ({ task }) => {
  const { theme } = React.useContext(ThemeContext);
  const { tasks, handleSetTasks, langconfig } = React.useContext(DataContext)
  const { id, description, date, empty, finished, expired, readStatus, inHours, finishedDate } = task

  const handleChangeInHours = (e) => {
    e.preventDefault()
    let momentWithAdded = moment().add(e.target.value, 'hours').format('YYYY-MM-DD[T]HH:mm')

    let taskFound = { ...task },
      newListTask = [...tasks.filter(t => t.id !== id)]

    taskFound.date = momentWithAdded
    taskFound.expired = moment(taskFound.date).diff(moment()) <= 0
    taskFound.empty = !(taskFound.date && taskFound.description)

    handleSetTasks(newListTask, taskFound)
  }

  const handleChangeDate = (e) => {
    e.preventDefault()
    let taskFound = { ...task },
      newListTask = [...tasks.filter(t => t.id !== id)]

    taskFound.date = e.target.value
    taskFound.expired = moment(taskFound.date).diff(moment()) <= 0
    taskFound.empty = !(taskFound.date && taskFound.description)

    handleSetTasks(newListTask, taskFound)
  }

  const handleChangeDescription = (e) => {
    e.preventDefault()
    let taskFound = { ...task },
      newListTask = [...tasks.filter(t => t.id !== id)]

    taskFound.description = e.target.value
    taskFound.empty = !(taskFound.date && taskFound.description)

    handleSetTasks(newListTask, taskFound)
  }

  const handleDeleteTask = (e) => {
    e.preventDefault()
    let newListTask = [...tasks.filter(t => t.id !== id)]
    handleSetTasks(newListTask)
  }

  const handleUpdateReadStatus = (e) => {
    e.preventDefault()
    let taskFound = { ...task },
      newListTask = [...tasks.filter(t => t.id !== id)]

    taskFound.readStatus = true

    handleSetTasks(newListTask, taskFound)
  }

  const handleFinishTask = (e) => {
    e.preventDefault()
    let taskFound = { ...task },
      newListTask = [...tasks.filter(t => t.id !== id)]

    taskFound.finished = true
    taskFound.finishedDate = moment().format(`DD/MM/YYYY hh:mma`)

    let diffd = moment().diff(moment(date, 'YYYY-MM-DD[T]HH:mm'), 'minutes'), diffFormat = 'min'
    if (diffd > 60) {
      diffFormat = 'h'
      diffd = moment().diff(moment(date, 'YYYY-MM-DD[T]HH:mm'), 'hours')
    }
    taskFound.finishedDate += `[${diffd}${diffFormat}]`

    handleSetTasks(newListTask, taskFound)
  }

  let timeOutFunc = null

  const checkStateExpired = () => {
    timeOutFunc = setTimeout(() => {
      let res = updateExpired()
      if (res) return
      checkStateExpired()
    }, 1000);
  }

  const updateExpired = () => {
    if (date == "") return false

    let timeLeftAlert = moment(date).diff(moment()) <= 0

    if (!timeLeftAlert) return false

    let taskFound = { ...task },
      newListTask = [...tasks.filter(t => t.id !== id)]

    taskFound.expired = timeLeftAlert

    handleSetTasks(newListTask, taskFound)
    return true
  }

  useEffect(() => {
    if (task.expired) {
      clearTimeout(timeOutFunc)
      return
    }
    if (!task.empty) {
      checkStateExpired()
    }
    return () => clearTimeout(timeOutFunc)
  }, [tasks])


  return (
    <div className={`text-gray-900 dark:text-gray-50 w-80 rounded-2xl py-6 px-5 relative flex flex-col gap-3 shadow-sm dark:shadow-xl bg-white dark:bg-[#1c2438]
    ${expired && !finished && !empty ? 'border-2 border-red-400' : (finished && !empty ? 'border-2 border-teal-600' : '')}
    `
    }>
      <button onClick={handleDeleteTask} className='text-gray-400 dark:text-white absolute top-1 right-1 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full p-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      </button>
      <div className='flex gap-2'>
        <p className='flex items-center gap-1 text-sm dark:bg-slate-800 bg-gray-300 w-max py-1 px-2 rounded-xl'>
          <input className='bg-transparent pl-1 text-xs outline-none' style={{ colorScheme: theme }}
            value={date}
            placeholder="Ingresa fecha"
            type="datetime-local"
            onChange={handleChangeDate}
          />
        </p>
        {langconfig.common.or}
        <p className='flex items-center text-sm dark:bg-slate-800 bg-gray-300 py-1 px-2 rounded-xl w-10 opacity-20 hover:opacity-100 transition-all duration-200'>
          <input className='bg-transparent pl-1 text-sm w-10 outline-none' style={{ colorScheme: theme }}
            value={inHours}
            type="text"
            onChange={handleChangeInHours}
          />
          h
        </p>
      </div>
      <textarea
        onChange={handleChangeDescription}
        value={description}
        placeholder={langconfig.common.enterDescription}
        className='outline-none text-left bg-transparent resize-none h-full' rows={4}>
      </textarea>
      <div className='flex justify-start gap-2'>
        {
          finished && finishedDate &&
          <span>Fin: {finishedDate}</span>
        }
        {
          !empty && !finished &&
          <button onClick={handleFinishTask} className='text-sm text-right bg-teal-600 text-white w-max px-2 py-1 rounded-xl flex items-center gap-1'>
            {langconfig.common.finish}
          </button>
        }
        {
          !finished && expired && !readStatus && !empty &&
          <button onClick={handleUpdateReadStatus} className='text-sm text-right bg-red-400 text-red-900 font-bold w-max px-2 py-1 rounded-xl flex items-center gap-1'>
            {langconfig.common.keep}
          </button>
        }
      </div>
    </div>
  )
}