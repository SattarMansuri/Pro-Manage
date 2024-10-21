import React, { useEffect, useState, useContext } from 'react'
import styles from './Board.module.css'
import Home from '../../components/home/Home'
import { GoPeople } from "react-icons/go";
import { VscCollapseAll } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa";
import { getAllTasks } from '../../apis/task';
import Sections from '../sections/Sections';
import Store from '../../Store';
import TaskModal from '../task modal/TaskModal';
import AddPeopleModal from '../add people modal/AddPeopleModal';

const Board = () => {
  const date = new Date()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const name = localStorage.getItem('user')
  const [emailOpen, setEmailOpen] = useState(false)
  const [backlogCollapse, setBacklogCollapse] = useState(false)
  const [todoCollapse, setTodoCollapse] = useState(false)
  const [progressCollapse, setProgressCollapse] = useState(false)
  const [doneCollapse, setDoneCollapse] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const {task, backlogData, progress, doneTask, setBacklogData, setDoneTask, setProgress, setTask} = useContext(Store)
  
  const getTasks = async ()=>{
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
  useEffect(()=>{
  setTimeout(()=>{
    getTasks()
  }, 1000)
  },[])
return (
    <div className={styles.board}>
    <div className={styles.leftSection}>
    {isOpen ?  <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} /> : null}
    {emailOpen ? <AddPeopleModal emailOpen={emailOpen} setEmailOpen={setEmailOpen} /> : null}
    <Home />
    </div>
    <div className={styles.rightSection}>  
    <div className={styles.greeting}>
    <h2>Welcome! {name}</h2><div className={styles.time}><span>{date.getDate()} { months[date.getMonth()]},  {date.getFullYear()}</span> </div>
    <h1>Board &nbsp;<span onClick={()=>setEmailOpen(true)} className={styles.addpeople}><sub><GoPeople style={{fontSize: "1.2vw"}}/></sub> Add People</span></h1>
    </div>

    <div className={styles.sections}>
    {!backlogCollapse ? <div className={styles.zones}>
    <h3>Backlog  <span><VscCollapseAll onClick={()=>setBacklogCollapse(true)} className={styles.collapse} /></span></h3>
    {backlogData ? <div> {backlogData?.map((element)=>(
     <Sections key={element._id} title={element.title} time={element.date} checkList={element.checkList} priority={element.priority} assignTo={element.assignTo} id={element._id} zone1={"Todo"} zone2={"Progress"} zone3={"Done"} setIsOpen={setIsOpen} />
    ))} </div>: <></>}
    </div> : <div className={styles.zonesCollapse}>
    <h3>Backlog  <VscCollapseAll onClick={()=>setBacklogCollapse(false)} className={styles.collapse} /></h3>
    </div>} 

    {!todoCollapse ? <div className={styles.zones}>
    <h3>To Do  <span><FaPlus onClick={()=>setIsOpen(true)} className={styles.add} /> &nbsp; <VscCollapseAll onClick={()=>setTodoCollapse(true)} className={styles.collapse} /></span></h3>
    {task ? <div> {task?.map((element)=>(
    <Sections key={element._id} title={element.title} time={element.date} checkList={element.checkList} priority={element.priority} assignTo={element.assignTo} id={element._id} zone1={"Backlog"} zone2={"Progress"} zone3={"Done"} setIsOpen={setIsOpen} />
    ))} </div>: <></>}
    </div> : <div className={styles.zonesCollapse}>
    <h3>To Do  <VscCollapseAll onClick={()=>setTodoCollapse(false)} className={styles.collapse} /></h3>
    </div>} 
    
    {!progressCollapse ? <div className={styles.zones}>
    <h3>In Progress <span><VscCollapseAll onClick={()=>setProgressCollapse(true)} className={styles.collapse} /></span></h3>
    {progress ? progress.map((element)=>(
    <Sections key={element._id} title={element.title} time={element.date} checkList={element.checkList} priority={element.priority} assignTo={element.assignTo} id={element._id} zone1={"Backlog"} zone2={"Todo"} zone3={"Done"} setIsOpen={setIsOpen} />
    )) : null}
    </div> : <div className={styles.zonesCollapse}>
    <h3>In Progress  <VscCollapseAll onClick={()=>setProgressCollapse(false)} className={styles.collapse} /></h3>
    </div>} 
   
    {!doneCollapse ? <div className={styles.zones}>
    <h3>Done  <span><VscCollapseAll onClick={()=>setDoneCollapse(true)} className={styles.collapse} /></span></h3>
    {doneTask ? <div> {doneTask?.map((element)=>(
    <Sections key={element._id} title={element.title} time={element.date} checkList={element.checkList} priority={element.priority} assignTo={element.assignTo} id={element._id} zone1={"Backlog"} zone2={"Todo"} zone3={"Progress"} setIsOpen={setIsOpen} />
    ))} </div>: null}
    </div> : <div className={styles.zonesCollapse}>
    <h3>Done  <VscCollapseAll onClick={()=>setDoneCollapse(false)} className={styles.collapse} /></h3>
    </div>} 
    </div>
    </div>
    </div>
    )
  }

export default Board
