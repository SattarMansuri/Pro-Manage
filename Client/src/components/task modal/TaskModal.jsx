import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './TaskModal.module.css'
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from 'react-hot-toast';
import { createTasks, getAllTasks, taskById } from '../../apis/task';
import Store from '../../Store';

const TaskModal = ({isOpen, setIsOpen}) => {
  const [ChecklistArr, setChecklistArr] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const {setTask, setBacklogData, setDoneTask, setProgress, mails, updateId, setUpdateId, update, setUpdate} = useContext(Store)
  const [formData, setFormData] = useState({
    title: "",
    priority: "", 
    checkList: [], 
    assignTo: "",  
    date: ""
  })
  const {title, priority, date, checkList, assignTo} = update
  const taskModalRef = useRef()
  const high = useRef()
  const low = useRef()
  const medium = useRef()

  const handleTaskCreate = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value }); 
    if(event.target.value === "HIGH PRIORITY"){
      high.current.style.backgroundColor = "#EEECEC"
      medium.current.style.backgroundColor = "#FFFFFF"
      low.current.style.backgroundColor = "#FFFFFF"
    }
    if(event.target.value === "MODERATE PRIORITY"){
      medium.current.style.backgroundColor = "#EEECEC"
      low.current.style.backgroundColor = "#FFFFFF"
      high.current.style.backgroundColor = "#FFFFFF"
    }
    if(event.target.value === "LOW PRIORITY"){
      low.current.style.backgroundColor = "#EEECEC"
      high.current.style.backgroundColor = "#FFFFFF"
      medium.current.style.backgroundColor = "#FFFFFF"
    }
  }
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
  const createallTask = async ()=>{
    if(updateId){
      const response = await taskById(updateId, formData)
      if(response.status === 200){
       setIsOpen(false)
       setUpdateId()
       setUpdate({})
       setTimeout(()=>{
         toast.success('Task Updated successfully')
         }, 800)
      }
    }  if(!updateId){
      if(!formData.title){
        toast.error("title required")
      }
      if(!formData.priority){
        toast.error("Please select priority")
      }
      if(formData.checkList.length == 0){
        toast.error("Please add atleast 1 task")
      } 
     const response = await createTasks(formData)
     if(response.data.success === false){
      toast.error(response.message)
      } 
      if(response.data.success === true){
        setIsOpen(false)
        formData.title = "" 
        formData.assignTo = ""
        formData.priority = ""
        formData.date = ""
        formData.checkList = []
        setStartDate("")
        setChecklistArr([])
        setTimeout(()=>{
          toast.success("Task created Successfully")
        }, 800)
      }
      }
      getTasks()
    }
    const cancelTaskCreation = () =>{
      setIsOpen(false)
      setFormData({})
      setUpdateId('')
      setUpdate({})
    }
    const dateChange = (dt)=>{
      setStartDate(dt)
      formData.date = dt
    }
    const checklistAdd = () =>{
      const arr = [...ChecklistArr, []]
      setChecklistArr(arr)
    }
    const removeCategory = (value) => {
      const newCategoryList = ChecklistArr.filter(
          (category) => category !== value
      );
      setChecklistArr(newCategoryList);
    }
    const handleChange=(e,i)=>{
    const inputdata=[...ChecklistArr]
    inputdata[i]=e.target.value;
    setChecklistArr(inputdata)
    formData.checkList = inputdata
    }
    const closeTaskModal=(e)=>{
      if(isOpen && taskModalRef.current && !taskModalRef.current.contains(e.target)){
        setIsOpen(false)
        setFormData({})
        setUpdate({})
        setUpdateId('')
      }
    }
    useEffect(()=>{
      document.addEventListener('mousedown', closeTaskModal)
    })
    useEffect(()=>{
      if(updateId){
        formData.checkList = checkList
        formData.date = date
        formData.assignTo = assignTo
        formData.priority = priority
        formData.title = title
        setChecklistArr(checkList)
      if(priority === "HIGH PRIORITY"){
        high.current.style.backgroundColor = "#EEECEC"
        medium.current.style.backgroundColor = "#FFFFFF"
        low.current.style.backgroundColor = "#FFFFFF"
      }
      if(priority === "MODERATE PRIORITY"){
        medium.current.style.backgroundColor = "#EEECEC"
        low.current.style.backgroundColor = "#FFFFFF"
        high.current.style.backgroundColor = "#FFFFFF"
      }
      if(priority === "LOW PRIORITY"){
        low.current.style.backgroundColor = "#EEECEC"
        high.current.style.backgroundColor = "#FFFFFF"
        medium.current.style.backgroundColor = "#FFFFFF"
      }
    }
    },[])
  return (
    <div className={styles.taskmodal}>
      <Toaster/>
    { isOpen ? <div ref={taskModalRef} className={styles.addtodo}>
    <h2>Title <span style={{color: "#FF0000", fontSize: "1vw"}}><sup>&#10033;</sup></span></h2>
    <input type='text'  name='title' defaultValue={'' || title} onChange={handleTaskCreate} className={styles.title} placeholder='Enter Task Title' /><br />
    <div className={styles.priority}>
    <span style={{fontSize: '1.1vw'}}>Select Priority <span style={{color: "#FF0000", fontSize: "1vw"}}><sup>&#10033;</sup></span></span>
    <span className={styles.dot} style={{color: "#FF2473"}} >&#11044;</span> 
    <input ref={high} onClick={handleTaskCreate} name='priority' value='HIGH PRIORITY' readOnly className={styles.priorityOption}/>
    <span className={styles.dot} style={{color: "#18B0FF"}} >&#11044;</span> 
    <input ref={medium} onClick={handleTaskCreate} name='priority' value='MODERATE PRIORITY' readOnly className={styles.moderate}/>
    <span className={styles.dot} style={{color: "#63C05B"}} >&#11044;</span> 
    <input ref={low} name='priority' onClick={handleTaskCreate} readOnly className={styles.priorityOption} value='LOW PRIORITY' /> 
    </div>
    {mails.length ? <div className={styles.assign}>Assign to <select defaultValue={ assignTo ||'Add a assignee'} name="assignTo" onChange={handleTaskCreate} >
    <option style={{color: "#9B959F"}} disabled>Add a assignee</option>
    {mails.map((element)=>{
      return(
    <option key={element?._id}>{element?.email}</option>)})}
    </select></div> : <></>}
    <h2>Checklist (0/{ChecklistArr?.length}) <span style={{color: "#FF0000", fontSize: "1vw"}}><sup>&#10033;</sup></span></h2>
    <div className={styles.checklistdiv}>
    {ChecklistArr?.map((elem, i)=>(
    <div key={i} className={styles.checklistcomp}>
    <input type="checkbox" className={styles.checkbox}/>
    <input type='text'  value={elem} name='checkList' onChange={(e)=>handleChange(e,i)} className={styles.checklistinput}/>
    <MdDelete onClick={()=>removeCategory(elem)} className={styles.delete}/><br />
    </div>))}
    </div>
    <span className={styles.addNew} onClick={checklistAdd}>+ Add New</span>
    <div className={styles.buttons}>   
    <DatePicker className={styles.date} dateFormat='dd/MM/YYYY' onChange={(e)=>dateChange(e)} selected={ date || startDate} placeholderText="Select Due Date"></DatePicker>
    <button className={styles.cancel} onClick={cancelTaskCreation}>Cancel</button>
   <button onClick={createallTask} className={styles.save}>{updateId ? 'Update' : 'Save'}</button>
    </div>
    </div> : null }
    </div>
  )
}

export default TaskModal