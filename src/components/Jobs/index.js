import React, { useEffect } from 'react'
import JobButton from './JobButton'
import { DataContext } from '../Data/DataContext'
import moment from 'moment'

export default function Jobs({ transparent }) {
  const { jobs, clearJobs, langconfig } = React.useContext(DataContext);

  return (
    <div className='mt-5 pl-3'>
      <JobButton />
      <div className={`${transparent ? '-translate-y-10' : 'translate-y-0'} transition-all duration-1000 ease-out`}>
        {
          jobs.length > 0 ?
          <div className='flex content-center items-center gap-3'>
            <div className='w-max ml-2 mb-5'>
              <p className='text-gray-900 dark:text-gray-50 font-bold text-left text-3xl'>{langconfig.tasks.title}</p>
              <div className='w-full h-1 bg-blue-600'></div>
            </div>

            <button onClick={clearJobs}  className='mb-4 text-gray-400 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full p-1'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
            : ""
        }
        <div className='flex flex-wrap justify-start gap-3 relative'>
          {
            jobs.map((j) =>
              <JobCard job={j} key={j.id} />
            )
          }
        </div>
      </div>
    </div>
  )
}

const JobCard = ({ job }) => {
  const { id, description, finalDuration, sections } = job
  const { handleSetJobs, langconfig } = React.useContext(DataContext)

  const handleDeleteJob = (e) => {
    e.preventDefault()
    handleSetJobs(null, id)
  }

  const handleChangeDescription = (e) => {
    e.preventDefault()
    let jobFound = { ...job }

    jobFound.description = e.target.value

    handleSetJobs(jobFound, id)
  }

  const handlePause = (e) => {
    e.preventDefault()

    let lastSection = { ...sections[0] },
      duration = moment().diff(moment(lastSection.initDate, 'YYYY-MM-DD[T]HH:mm'), 'minutes'),
      type = 'min'
    if (duration > 60) {
      duration = moment().diff(moment(lastSection.initDate, 'YYYY-MM-DD[T]HH:mm'), 'hours')
      type = 'h'
    }
    lastSection.endDate = moment().format('YYYY-MM-DD[T]HH:mm')
    lastSection.finalDuration = `${duration}${type}`


    let newSections = [...sections.filter(s => s.id !== lastSection.id)].concat(lastSection)
    newSections.sort((a, b) => { return b.id - a.id })

    let sumDurations = newSections.map(ss => moment(ss.endDate, 'YYYY-MM-DD[T]HH:mm').diff(moment(ss.initDate, 'YYYY-MM-DD[T]HH:mm'), 'minutes')).reduce((a, b) => { return a + b }, 0),
      finalTypeDuration = 'min'
    if (sumDurations > 60) {
      sumDurations = Math.round(sumDurations / 60)
      finalTypeDuration = 'h'
    }

    let jobFound = { ...job }
    jobFound.sections = newSections
    jobFound.finalDuration = `${sumDurations}${finalTypeDuration}`
    handleSetJobs(jobFound, id)
  }

  const handlePlay = (e) => {
    e.preventDefault()


    let lastId = Math.max(...sections.map(s => s.id)),
      nextId = (isFinite(lastId) ? lastId : 0) + 1

    let newSections = [...sections].concat(
      {
        id: nextId,
        initDate: moment().format('YYYY-MM-DD[T]HH:mm'),
        endDate: null,
        finalDuration: null
      })
    newSections.sort((a, b) => { return b.id - a.id })

    let jobFound = { ...job }
    jobFound.sections = newSections
    handleSetJobs(jobFound, id)
  }

  return (<div className={`text-gray-900 dark:text-gray-50 w-64 rounded-2xl py-6 px-5 relative flex flex-col gap-3 shadow-sm dark:shadow-xl bg-white dark:bg-[#1c2438]`}>
    <button onClick={handleDeleteJob} className='text-gray-400 dark:text-white absolute top-1 right-1 hover:bg-slate-200 dark:hover:bg-slate-500 rounded-full p-1'>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </button>
    <textarea
      onChange={handleChangeDescription}
      value={description}
      placeholder={langconfig.common.enterDescription}
      className='outline-none bg-transparent resize-none text-center' rows={2}>
    </textarea>
    <div>
      {
        sections.some(s => s.endDate === null) ?
          <button onClick={handlePause} className='text-gray-900 dark:text-gray-50  transition-all ease-in-out duration-300'>
            <svg className="w-10 h-10" viewBox="0 0 16 16" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"></path></svg>
          </button> :
          <button onClick={handlePlay} className='text-gray-900 dark:text-gray-50  transition-all ease-in-out duration-300'>
            <svg className="w-10 h-10" viewBox="0 0 16 16" focusable="false" role="img" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path></svg>
          </button>
      }
    </div>
    <p className='font-bold text-xl dark:bg-slate-800 bg-gray-200 w-max mx-auto px-2 py-1 rounded-xl'><small>Total</small>: {finalDuration}</p>
    <div className='flex justify-center flex-col mx-auto gap-y-3'>
      {
        sections.map((s, si) =>
          <div key={si} className="flex justify-start">
            <span>{moment(s.initDate, 'YYYY-MM-DD[T]HH:mm').format('DD/MM/YY HH:mm')}</span>
            <span className='mx-1'>-</span>
            <span className={`${s.endDate ? '' : 'text-gray-500 italic font-bold'}`}>{s.endDate ? moment(s.endDate, 'YYYY-MM-DD[T]HH:mm').format('DD/MM/YY HH:mm') : langconfig.common.now}</span>
            {
              s.finalDuration ?
                <span className='mx-1 dark:bg-slate-800 bg-gray-200 px-2 py-1 rounded-xl text-sm h-max'>({s.finalDuration})</span> : ''
            }
          </div>
        )
      }
    </div>
  </div>)
}