import { useContext, useState } from 'react'
import { DataContext } from './Data/DataContext';

export default function FullScreenToggle() {
  const { langconfig } = useContext(DataContext);
    const [fullScreen, setfullScreen] = useState(false)
    const handleFullScreen = () => {
      setfullScreen(true)
      var element = document.querySelector("body");
      // make the element go to full-screen mode
      element.requestFullscreen()
        .then(function () {
          // element has entered fullscreen mode successfully
        })
        .catch(function (error) {
          // element could not enter fullscreen mode
        });
    }
    const handleExitFullScreen = () => {
      setfullScreen(false)
      document.exitFullscreen()
        .then(function () {
          // element has exited fullscreen mode
        })
        .catch(function (error) {
          // element could not exit fullscreen mode
          // error message
          console.log(error.message);
        });
    }
  
    return (
      <>
        {
          fullScreen ?
            <button onClick={handleExitFullScreen} className='w-max text-gray-900 dark:text-gray-50 border-[2px] border-gray-500 flex items-center text-sm gap-1 px-2 md:px-3 py-1 rounded-full'>
              <svg viewBox="0 0 24 24" className='w-6 h-6' focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 4a1 1 0 0 0-2 0v2.5a.5.5 0 0 1-.5.5H4a1 1 0 0 0 0 2h2.5A2.5 2.5 0 0 0 9 6.5V4zM9 20a1 1 0 1 1-2 0v-2.5a.5.5 0 0 0-.5-.5H4a1 1 0 1 1 0-2h2.5A2.5 2.5 0 0 1 9 17.5V20zM16 3a1 1 0 0 0-1 1v2.5A2.5 2.5 0 0 0 17.5 9H20a1 1 0 1 0 0-2h-2.5a.5.5 0 0 1-.5-.5V4a1 1 0 0 0-1-1zM15 20a1 1 0 1 0 2 0v-2.5c0-.28.22-.5.5-.5H20a1 1 0 1 0 0-2h-2.5a2.5 2.5 0 0 0-2.5 2.5V20z"></path></svg>
              {langconfig.fullScreen.exitFullScreen}
            </button>
            :
            <button onClick={handleFullScreen} className='w-max text-gray-900 dark:text-gray-50 border-[2px] border-gray-500 flex items-center text-sm gap-1 px-2 md:px-3 py-1 rounded-full'>
              <svg viewBox="0 0 24 24" className='w-6 h-6' focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 6a1 1 0 0 1 1-1h2a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v2a1 1 0 0 0 2 0V6zM5 18a1 1 0 0 0 1 1h2a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3v-2a1 1 0 1 1 2 0v2zM18 5a1 1 0 0 1 1 1v2a1 1 0 1 0 2 0V6a3 3 0 0 0-3-3h-2a1 1 0 1 0 0 2h2zM19 18a1 1 0 0 1-1 1h-2a1 1 0 1 0 0 2h2a3 3 0 0 0 3-3v-2a1 1 0 1 0-2 0v2z"></path></svg>
              {langconfig.fullScreen.enterFullScreen}
            </button>
        }
      </>
    )
  }