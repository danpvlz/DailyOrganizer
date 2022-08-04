import React, { useEffect } from 'react';
import langconfig from './locale/config.json'

const getInitialTasks = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedTasks = window.localStorage.getItem('tasks');
        if (typeof storedTasks === 'string') {
            return JSON.parse(storedTasks);
        }
    }

    return []
};

const getInitialJobs = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
        const storedJobs = window.localStorage.getItem('jobs');
        if (typeof storedJobs === 'string') {
            return JSON.parse(storedJobs);
        }
    }

    return []
};

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
    const [lang, setlang] = React.useState("EN")
    const [tasks, setTaks] = React.useState(getInitialTasks)
    const [jobs, setJobs] = React.useState(getInitialJobs)

    const handleSetTasks = (list = [], newTask = null) => {
        if (newTask) {
            list = list.concat(newTask)
        } else {
            list = list
        }
        setTaks(list.sort((a, b) => { return b.id - a.id }))
    }

    const handleSetJobs = (newJob = null, idExclude = null) => {
        let jobslist = [...jobs]
        if (idExclude) {
            jobslist = jobslist.filter(j => j.id !== idExclude)
        }
        if (newJob) {
            jobslist = jobslist.concat(newJob)
        }
        setJobs(jobslist.sort((a, b) => { return b.id - a.id }))
    }

    const clearJobs = () => {
        setJobs([])
    }

    const clearTasks = () => {
        setTaks([])
    }

    useEffect(() => {
        let jobsString = JSON.stringify(jobs)
        window.localStorage.setItem('jobs', jobsString)
    }, [jobs])

    useEffect(() => {
        let tasksString = JSON.stringify(tasks)
        window.localStorage.setItem('tasks', tasksString)
    }, [tasks])

    const toggleLang = () => {
        setlang(lang==="EN" ? 'ES' : 'EN')
    }

    return (
        <DataContext.Provider value={{
            langconfig:{...langconfig[lang]},
            //LANGUAGUE
            lang, toggleLang,
            //TASKS
            tasks, handleSetTasks, clearTasks,
            //JOBS
            jobs, handleSetJobs, clearJobs
        }}>
            {children}
        </DataContext.Provider>
    );
};