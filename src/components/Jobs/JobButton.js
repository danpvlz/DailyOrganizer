import moment from 'moment';
import React from 'react'
import { DataContext } from '../Data/DataContext';

export default function JobButton() {
    const { jobs, handleSetJobs, langconfig } = React.useContext(DataContext);

    const handleAddJob = () => {
        let lastId = Math.max(...jobs.map(t => t.id)),
            nextId = (isFinite(lastId) ? lastId : 0) + 1,
            newJob = {
                id: nextId,
                description: "",
                finalDuration: '0min',
                sections:[
                    {
                        id:1,
                        initDate: moment().format('YYYY-MM-DD[T]HH:mm'),
                        endDate: null,
                        finalDuration: null
                    }
                ]
            }
        handleSetJobs(newJob)
    }

    return (
        <button
            onClick={handleAddJob}
            className='
            bg-slate-900 
            dark:bg-slate-600 
            hover:bg-slate-800
            text-gray-50 
            dark:text-gray-50 
            flex rounded-full gap-2 items-center shadow-xl p-3 fixed z-50 bottom-20 right-5  transition-all duration-300 ease-in-out'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className='font-light'>
               {langconfig.tasks.new}
            </span>
        </button>
    )
}