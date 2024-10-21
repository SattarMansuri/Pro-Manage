import React, { useEffect, useState } from 'react'
import { getAllTasks } from './apis/task'
import Store from './Store'
import { getAllMails } from './apis/auth'

const MyProvider = ({children}) => {
  const [task, setTask] = useState([])
  const [updateId, setUpdateId] = useState()
  const [update, setUpdate] = useState({})
  const [backlogData, setBacklogData] = useState([])
  const [progress, setProgress] = useState([])
  const [doneTask, setDoneTask] = useState([])
  const [mails, setMails] = useState([])
  const token = localStorage.getItem('token')
  const getTasks = async ()=>{
    if(token){
      const response = await getAllTasks()
    const doneZoneTasks = response?.data?.filter((elem)=>{
      return elem.zone === 'Done'
    })
    const backlogZoneTasks = response?.data?.filter((elem)=>{
      return elem.zone === 'Backlog'
    })
    const todoZonetask = response?.data?.filter((elem)=>{
      return elem.zone === 'Todo'
    })
    const progressZoneTask = response?.data?.filter((elem)=>{
      return elem.zone === 'Progress'
    })
    setDoneTask(doneZoneTasks)
    setBacklogData(backlogZoneTasks)
    setTask(todoZonetask)
    setProgress(progressZoneTask)
    }
  }
  const getMailAll = async () =>{
  if(token){
    const response = await getAllMails()
    setMails(response.data)
  }
  }
  useEffect(()=>{
    getTasks()
    getMailAll()
  },[])
  return(
    <Store.Provider value={{
      setBacklogData,
      setDoneTask,
      setProgress,
      setTask,
      setMails,
      setUpdateId,
      setUpdate,
      task,
      backlogData,
      progress,
      doneTask,
      mails,
      updateId,
      update
    }}>
{children}
    </Store.Provider>
  )
}

export default MyProvider