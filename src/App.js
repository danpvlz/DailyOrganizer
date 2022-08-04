import React, { useEffect, useState } from 'react'
import Toggle from './components/Theme/ThemeToggle';
import Timer from './components/Timer'
import Tasks from './components/Tasks/index'
import Jobs from './components/Jobs/index'
import { DataContext } from './components/Data/DataContext'
import FullScreenToggle from './components/FullScreenToggle';
import PlayAudio from './components/PlayAudio';
import LangButton from './components/LangButton';

export default function App() {
  const [transparentToggle, setTransparentToggle] = useState(false)
  const [backgrounConfig, setbackgrounConfig] = useState('bg-gray-gray-100 dark:bg-slate-900 duration-300')
  const { tasks } = React.useContext(DataContext)
  const [playAlarm, setplayAlarm] = useState(false)

  const handelChangeColor = () => {
    let ini = 'bg-gray-300 dark:bg-slate-900 duration-1000',
      change = 'bg-white dark:bg-[#1f2b48] duration-1000'

    return backgrounConfig === ini ? change : ini
  }

  const changeColorAlert = () => {
    setTimeout(() => {
      setbackgrounConfig(handelChangeColor())
    }, 700);
  }

  useEffect(() => {
    let creatAlert = tasks.some(t => !t.empty && t.expired && !t.readStatus && !t.finished)
    if (creatAlert) {
      setplayAlarm(true)
      changeColorAlert()
    } else {
      setplayAlarm(false)
      setbackgrounConfig('bg-gray-100 dark:bg-slate-900 duration-300')
    }
  }, [tasks, backgrounConfig])

  const toggleTransparent = (status) => {
      setTransparentToggle(status)
  } 

  return (
    <main className={`${backgrounConfig} relative font-lato min-h-screen transition-all ease-in-out flex justify-center pb-5`} onMouseEnter={() => toggleTransparent(false)} onMouseLeave={() => toggleTransparent(true)}>
    <LangButton />
    <PlayAudio playing={playAlarm}
      setPlaying={setplayAlarm} />
      <div className='text-center flex flex-col gap-3 w-full'>
        <Timer center={transparentToggle} />
        <div className={`mb-10 mx-auto flex flex-wrap gap-3 items-center ${transparentToggle ? 'opacity-0' : 'opacity-100 translate-y-0'} transition-all ease-in-out duration-500`}>
          <Toggle />
          <FullScreenToggle />
        </div>
        <div className={`grid grid-cols-1 md:grid-cols-6 px-10`}>
          <div className={`col-span-2 ${transparentToggle ? 'opacity-0' : 'opacity-100'} transition-all ease-in-out duration-500`}>
            <Jobs transparent={transparentToggle} />
          </div>
          <div className={`col-span-4 w-full ${transparentToggle ? 'opacity-0' : 'opacity-100'} transition-all ease-in-out duration-500`}>
            <Tasks transparent={transparentToggle} />
          </div>
        </div>
      </div>
    </main>
  )
}