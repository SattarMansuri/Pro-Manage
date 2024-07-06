import React, { useEffect, useState, useRef } from 'react'
import styles from './Board.module.css'
import Home from '../../components/home/Home'
import { GoPeople } from "react-icons/go";
import  group from '../../assets/Group.svg'
import Modal from 'react-modal';
import { MdDelete } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Down from '../../assets/Down.svg'
import Up from '../../assets/Up.svg'
import toast, { Toaster } from 'react-hot-toast';
import { createTasks, getTaskById, deleteTask, taskById, moveTaskInZone, gettaskByZone } from '../../apis/task';
import { addEmail, getAllMails } from '../../apis/auth';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Board = () => {
  const date = new Date()
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
  const name = localStorage.getItem('user')
  const [modalIsOpen, setIsOpen] = useState(false)
  const [updateId, setUpdateId] = useState()
  const [emailOpen, setEmailOpen] = useState(false)
  const [ChecklistArr, setChecklistArr] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [down, setDown] = useState(false)
  const [progressDown, setProgressDown] = useState(false)
  const [doneDown, setDoneDown] = useState(false)
  const [task, setTask] = useState([])
  const [filter, setFilter] = useState(false)
  const [backlogData, setBacklogData] = useState([])
  const [progress, setProgress] = useState([])
  const high = useRef()
  const low = useRef()
  const medium = useRef()
  let [doneTask, setDoneTask] = useState([])
  const [formData, setFormData] = useState({
    title:  "",
    priority: "", 
    checkList: [], 
    assignTo: "",  
    date: ""
  })
  const [emailId, setEmailId] = useState({
    email: []
  })
  const [popUp, setPopUp] = useState()
  const [getmails, setGetMails] = useState([])
  const [click, setClick] = useState(false)
  const [backlogDown, setBacklogDown] = useState(false)
  const [clickBacklog, setClickBacklog] = useState(false)
  const [clickProgress, setClickProgress] = useState(false)
  const [clickDone, setClickDone] = useState(false)
  const notify = () => toast.success("Share link copied");
  const createallTask = async ()=>{
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
   console.log(response)
   if(response.success === false){
    toast.error(response.message)
  } 
    if(response.data.success === true){
      setIsOpen(false)
      getZone("Todo")
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
   const cancelTaskCreation = () =>{
    setIsOpen(false)
    formData.title = ""
    formData.assignTo = ""
    formData.priority = ""
    formData.date = ""
    formData.checkList = []
    setStartDate("")
    setChecklistArr([])
  } 
  const getZone = async (zoneName)=>{
    const response = await gettaskByZone(zoneName)
   if(response){
    if(zoneName == "Backlog"){
      setBacklogData(response?.data)
    }
    if(zoneName == "Todo")
      setTask(response?.data)
   }
   if(zoneName == "Progress"){
    setProgress(response?.data)
  }
  if(zoneName == "Done"){
    setDoneTask(response?.data)
  }
   }
  const handleTaskCreate = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData)
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
const getMailAll = async () =>{
  const response = await getAllMails()
  setGetMails(response.data)
}
const handleEamil = (event) => {
  setEmailId({ ...emailId, [event.target.name]: event.target.value });
  console.log(emailId)
};
const emailAdd = async()=>{
  const response = await addEmail(emailId)
  setEmailId(response)
  setPopUp(response.email?.email)
  getMailAll()
}
  const dateChange = (date)=>{
    setStartDate(date)
    formData.date = date
  }
  const checklistAdd = () =>{
    const arr = [...ChecklistArr, []]
    setChecklistArr(arr)
  }
  function emailIsOpen(){
    setEmailOpen(true)
  }
  function openModal() {
    setIsOpen(true);
  }
  const removeCategory = (value) => {
    const newCategoryList = ChecklistArr.filter(
        (category) => category !== value
    );
    setChecklistArr(newCategoryList);
}
const deleteHandle = async (id)=>{
  const response = await deleteTask(id)
  if(response.status = 200){
    getZone("Backlog")
    getZone("Todo")
    getZone("Progress")
    getZone("Done")
    setTimeout(()=>{
    toast.success('Task Deleted successfully')
    }, 800)
  }
}
const upTask = async (id)=>{
 const response = await taskById(updateId, formData)
 if(response.status === 200){
  setIsOpen(false)
  formData.title = ""
  formData.assignTo = ""
  formData.priority = ""
  formData.date = ""
  formData.checkList = []
  setStartDate("")
  setChecklistArr([])
  getZone("Backlog")
  getZone("Todo")
  getZone("Progress")
  getZone("Done")
  setTimeout(()=>{
    toast.success('Task Updated successfully')
    }, 800)
 }
}
const handleChange=(e,i)=>{
  const inputdata=[...ChecklistArr]
  inputdata[i]=e.target.value;
  setChecklistArr(inputdata)
  formData.checkList = inputdata
   }
 const updatetask = async (id) =>{
  setIsOpen(true);
  const response = await getTaskById(id)
 }
 const moveTask = async (id, zone)=>{
 const response = await moveTaskInZone(id, {zone})
 if(response.status === 200){
  toast.success("Status updated")
 }
  getZone("Backlog")
  getZone("Todo")
  getZone("Progress")
  getZone("Done")
 }
function randomLetters(s) {
const firstLetter = s[0]
const secondLetter = s[1]
const words = firstLetter.toUpperCase() + secondLetter.toUpperCase();
return words
  }
useEffect(()=>{
  setTimeout(()=>{
    getMailAll()
    getZone("Backlog")
    getZone("Todo")
    getZone("Progress")
    getZone("Done")
  }, 1000)
},[])
  return (
    <div className={styles.board}>
    <div className={styles.leftSection}>
    <Home />
    </div>
    <div className={styles.rightSection}>
    <Toaster />
    <Modal
        isOpen={modalIsOpen}
        className={styles.addtodo}>
    <h2>Title <span style={{color: "#FF0000", fontSize: "1vw"}}><sup>&#10033;</sup></span></h2>
    <input type='text'  name='title' onChange={handleTaskCreate} className={styles.title} placeholder='Enter Task Title' /><br />
    <div className={styles.priority}>
    <span style={{fontSize: '1.1vw'}}>Select Priority <span style={{color: "#FF0000", fontSize: "1vw"}}><sup>&#10033;</sup></span></span>
    <span className={styles.dot} style={{color: "#FF2473"}} >&#11044;</span> 
    <input ref={high} onClick={handleTaskCreate} name='priority' value='HIGH PRIORITY' readOnly className={styles.high}/>
    <span className={styles.dot} style={{color: "#18B0FF"}} >&#11044;</span> 
    <input ref={medium} onClick={handleTaskCreate} name='priority' value='MODERATE PRIORITY' readOnly className={styles.moderate}/>
    <span className={styles.dot} style={{color: "#63C05B"}} >&#11044;</span> 
    <input ref={low} name='priority' onClick={handleTaskCreate} readOnly className={styles.low} value='LOW PRIORITY' /> 
    </div>
    {getmails.length ? <div className={styles.assign}>Assign to <select name="assignTo" onChange={handleTaskCreate} >
    <option style={{color: "#9B959F"}} selected disabled defaultValue="Add a assignee">Add a assignee</option>
    {getmails.map((element)=>{
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
    </div><br/>
    <h3 style={{marginTop: "-2vh"}} onClick={checklistAdd}>+ Add New</h3>
    <div className={styles.buttons}>   
    <DatePicker className={styles.date} dateFormat='dd/MM/YYYY' onChange={(e)=>dateChange(e)} selected={startDate} placeholderText="Select Due Date"></DatePicker>
    <button className={styles.cancel} onClick={cancelTaskCreation}>Cancel</button>
    {!updateId ? <button onClick={createallTask} className={styles.save}>Save</button> :
    <button className={styles.save} onClick={upTask}>Update</button>}
    </div>
    </Modal>

    <Modal
        isOpen={emailOpen}
        className={styles.addemail}>
    {!popUp ? <div>
    <h2>Add people to the board</h2><br />
    <input type='text' placeholder='Enter the email' name='email' onChange={handleEamil} /><br /><br />
    <button onClick={()=>setEmailOpen(false)} className={styles.cancleemail}>Cancel</button>
    <button onClick={emailAdd} className={styles.addemailbtn}>Add Email</button>
    </div> : <div className={styles.afteremailadd}>
    {popUp} added to board <br />
    <button onClick={()=>{setEmailOpen(false)
    setPopUp(false)
    toast.success('Email added successfully')
    }}>Okay,got it!</button>
    </div> }
    </Modal>

    <h2>Welcome! {name}</h2><div className={styles.time}><span>{date.getDate()} { months[date.getMonth()]},  {date.getFullYear()}</span> </div>
    <h1>Board &nbsp;<span onClick={emailIsOpen} className={styles.addpeople}><sub><GoPeople style={{fontSize: "1.2vw"}}/></sub> Add People</span></h1>
    <div className={styles.sections}>
    <div className={styles.backlog}>
    <h3>Backlog  <img src={group} alt="tasks image" /></h3>
    {backlogData ? <div> {backlogData?.map((element, i)=>(
     <div key={element?._id} className={styles.display}><span className={styles.outputdot} style={{color: `${element?.priority == 'LOW PRIORITY' ? "#63C05B" : element?.priority == 'HIGH PRIORITY' ? "#FF2473" : element?.priority == 'MODERATE PRIORITY' ? "#18B0FF" : null}`}} >&#11044;</span> <span style={{fontSize: "1vw"}}>{element?.priority}</span>
     {element?.assignTo ? <span title={element?.assignTo} className={styles.assignedEmail}>{randomLetters(element?.assignTo)}</span> : null} <span className={styles.dots}>{!clickBacklog ? <b onClick={()=>setClickBacklog(true)} >...</b> : <b onClick={()=>setClickBacklog(false)}>x</b>}</span><br />
     {clickBacklog && <div className={styles.controls}>
     <div onClick={()=>{updatetask(element?._id)
     setUpdateId(element?._id)
     setFormData(element)
     setChecklistArr(element?.checkList)
     setStartDate(element?.date)
     }} className={styles.edit}>Edit</div>
     <CopyToClipboard text={`${window.location.href}/task/${element?._id}`} ><div onClick={notify} className={styles.share}>Share</div></CopyToClipboard>
     <div onClick={()=>deleteHandle(element?._id)} className={styles.deletetask}>Delete</div>
     </div>}
     <h2 style={{marginLeft: "0"}}>{element?.title.length >= 20 ? <span title={element?.title}>{element.title.slice(0,20)}...</span> : <span>{element?.title}</span>}</h2>
     <span style={{marginLeft: "0", marginRight: "0", fontSize: "1.2vw", fontWeight: "500", marginBottom: "1vh"}}>Checklist (0/{element?.checkList?.length})</span><span style={{marginLeft: "12vw"}}>
     {backlogDown ? <img className={styles.down} onClick={()=>setBacklogDown(false)} src={Up} alt="down arrow" /> : 
     <img className={styles.up} onClick={()=>setBacklogDown(true)} src={Down} alt="Up arrow" />}</span>
     <div>{element?.checkList?.map((elem, i)=>(
     backlogDown && <div key={i} className={styles.checklisttask}><input type="checkbox" name=""/>{elem}</div>))}  
    </div><br />
    <div className={styles.details}>
    {element?.date ? <span style={{padding: "2px"}}>{months[element?.date.charAt(6)-1]}{element?.date.charAt(8)+element?.date.charAt(9)}</span> : <></>}
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Todo")}>Todo</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Progress")}>Progress</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Done")}>Done</span>
    </div>
    </div>
    ))} </div>: <></>}
    </div>
      
    <div className={styles.todo}>
    <h3>To Do  <span><span onClick={openModal} style={{fontSize: "1.5vw", cursor: "pointer"}}>+</span> &nbsp; <img src={group} alt="tasks image" /></span></h3>
    {task ? <div> {task?.map((element, i)=>(
    <div key={element?._id} className={styles.display}><span className={styles.outputdot} style={{color: `${element?.priority == 'LOW PRIORITY' ? "#63C05B" : element?.priority == 'HIGH PRIORITY' ? "#FF2473" : element?.priority == 'MODERATE PRIORITY' ? "#18B0FF" : null}`}} >&#11044;</span> <span style={{fontSize: "1vw"}}>{element?.priority}</span>
    {element?.assignTo ? <span title={element?.assignTo} className={styles.assignedEmail}>{randomLetters(element?.assignTo)}</span> : null} <span  className={styles.dots}>{!click ? <b onClick={()=>setClick(true)}>...</b> : <b onClick={()=>setClick(false)}>x</b>}</span><br />
    {click? <div className={styles.controls}>
    <div onClick={()=>{updatetask(element?._id)
     setUpdateId(element?._id)
     setFormData(element)
     setChecklistArr(element?.checkList)
     setStartDate(element?.date)
    }} className={styles.edit}>Edit</div>
    <CopyToClipboard text={`${window.location.href}/task/${element?._id}`} ><div onClick={notify} className={styles.share}>Share</div></CopyToClipboard>
    <div onClick={()=>deleteHandle(element?._id)} className={styles.deletetask}>Delete</div>
    </div> : null}
    <h2 style={{marginLeft: "0"}}>{element?.title.length >= 20 ? <span title={element?.title}>{element.title.slice(0,20)}...</span> : <span>{element?.title}</span>}</h2>
    <span style={{marginLeft: "0", marginRight: "0", fontSize: "1.2vw", fontWeight: "500", marginBottom: "1vh"}}>Checklist (0/{element?.checkList?.length})</span><span style={{marginLeft: "12vw"}}>
    {down ? <img className={styles.down} onClick={()=>setDown(false)} src={Up} alt="down arrow" /> : 
    <img className={styles.up} onClick={()=>setDown(true)} src={Down} alt="Up arrow" />}</span>
    <div>{element?.checkList?.map((elem, i)=>(
    down && <div key={i} className={styles.checklisttask}><input type="checkbox" name=""/>{elem}</div>))}  
    </div><br />
    <div className={styles.details}>
    {element?.date ?  <span style={{padding: "2px", backgroundColor: `${months[element?.date?.charAt(6)-1] > months[date.getMonth()] ? '#CF3636' : null }`}}>{months[element?.date?.charAt(6)-1]} {element?.date?.charAt(8)+element?.date?.charAt(9)}</span> : <></>}
    <span className={styles.spansec}onClick={()=>moveTask(element?._id, "Backlog")}>Backlog</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Progress")}>Progress</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Done")}>Done</span>
    </div>
    </div>
    ))} </div>: <></>}
    </div>
      
    <div className={styles.inprogress}>
    <h3><span>In Progress</span>  <img src={group} alt="tasks image" /></h3>
    {progress ? <div> {progress?.map((element, i)=>(
    <div key={element?._id} className={styles.display}><span className={styles.outputdot} style={{color: `${element?.priority == 'LOW PRIORITY' ? "#63C05B" : element?.priority == 'HIGH PRIORITY' ? "#FF2473" : element?.priority == 'MODERATE PRIORITY' ? "#18B0FF" : null}`}} >&#11044;</span> <span style={{fontSize: "1vw"}}>{element?.priority}</span>
    {element?.assignTo ? <span title={element?.assignTo} className={styles.assignedEmail}>{randomLetters(element?.assignTo)}</span> : null} <span  className={styles.dots}>{!clickProgress ? <b onClick={()=>setClickProgress(true)}>...</b> : <b onClick={()=>setClickProgress(false)}>x</b>}</span><br />
    {clickProgress ? <div className={styles.controls}>
    <div onClick={()=>{updatetask(element?._id)
     setUpdateId(element?._id)
     setFormData(element)
     setChecklistArr(element?.checkList)
     setStartDate(element?.date)}} className={styles.edit}>Edit</div>
    <CopyToClipboard text={`${window.location.href}/task/${element?._id}`} ><div onClick={notify} className={styles.share}>Share</div></CopyToClipboard>
    <div onClick={()=>deleteHandle(element?._id)} className={styles.deletetask}>Delete</div>
    </div> : null}
    <h2 style={{marginLeft: "0"}}>{element?.title.length >= 20 ? <span title={element?.title}>{element.title.slice(0,20)}...</span> : <span>{element?.title}</span>}</h2>
    <span style={{marginLeft: "0", marginRight: "0", fontSize: "1.2vw", fontWeight: "500", marginBottom: "1vh"}}>Checklist (0/{element?.checkList?.length})</span><span style={{marginLeft: "12vw"}}>
    {progressDown ? <img className={styles.down} onClick={()=>setProgressDown(false)} src={Up} alt="down arrow" /> : 
    <img className={styles.up} onClick={()=>setProgressDown(true)} src={Down} alt="Up arrow" />}</span>
    <div>{element?.checkList?.map((elem, i)=>(
    progressDown && <div key={i} className={styles.checklisttask}><input type="checkbox" name=""/>{elem}</div>))}  
    </div><br />
    <div className={styles.details}>
    {element?.date ? <span style={{padding: "2px", backgroundColor: `${months[element?.date.charAt(6)-1] > months[date.getMonth()] ? '#CF3636' : null }`}}>{months[element?.date.charAt(6)-1]} {element?.date.charAt(8)+element?.date.charAt(9)}</span> : <></>}
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Backlog")}>Backlog</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Todo")}>Todo</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Done")}>Done</span>
    </div>
    </div>
    ))} </div>: null}
    </div>
    
    <div className={styles.done}>
    <h3>Done  <img src={group} alt="tasks image" /></h3>
    {doneTask ? <div> {doneTask?.map((element, i)=>(
    <div key={element?._id} className={styles.display}><span className={styles.outputdot} style={{color: `${element?.priority == 'LOW PRIORITY' ? "#63C05B" : element?.priority == 'HIGH PRIORITY' ? "#FF2473" : element?.priority == 'MODERATE PRIORITY' ? "#18B0FF" : null}`}} >&#11044;</span> <span style={{fontSize: "1vw"}}>{element?.priority}</span>
    {element?.assignTo ? <span title={element?.assignTo} className={styles.assignedEmail}>{randomLetters(element?.assignTo)}</span> : null} <span  className={styles.dots}>{!clickDone ? <b onClick={()=>setClickDone(true)}>...</b> : <b onClick={()=>setClickDone(false)}>x</b>}</span><br />
    {clickDone ? <div className={styles.controls}>
    <div className={styles.controlPositons}>
    <div onClick={()=>{updatetask(element?._id)
     setUpdateId(element?._id)
     setFormData(element)
     setChecklistArr(element?.checkList)
     setStartDate(element?.date)}} className={styles.edit}>Edit</div>
    <CopyToClipboard text={`${window.location.href}/task/${element?._id}`} ><div onClick={notify} className={styles.share}>Share</div></CopyToClipboard>
    <div onClick={()=>deleteHandle(element?._id)} className={styles.deletetask}>Delete</div></div>
    </div> : null}
    <h2 style={{marginLeft: "0"}}>{element?.title.length >= 20 ? <span title={element?.title}>{element.title.slice(0,20)}...</span> : <span>{element?.title}</span>}</h2>
    <span style={{marginLeft: "0", marginRight: "0", fontSize: "1.2vw", fontWeight: "500", marginBottom: "1vh"}}>Checklist (0/{element?.checkList?.length})</span><span style={{marginLeft: "12vw"}}>
    {doneDown ? <img className={styles.down} onClick={()=>setDoneDown(false)} src={Up} alt="down arrow" /> : 
    <img className={styles.up} onClick={()=>setDoneDown(true)} src={Down} alt="Up arrow" />}</span>
    <div>{element?.checkList?.map((elem, i)=>(
    doneDown && <div key={i} className={styles.checklisttask}><input type="checkbox" name=""/>{elem}</div>))}  
    </div><br />
    <div className={styles.details}>
    {element?.date ? <span style={{padding: "2px", backgroundColor: "#63C05B", color: "#FFFFFF"}}>{months[element?.date.charAt(6)-1]} {element?.date.charAt(8)+element?.date.charAt(9)}</span> : <></>}
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Todo")}>Todo</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Backlog")}>Backlog</span>
    <span className={styles.spansec} onClick={()=>moveTask(element?._id, "Progress")}>Progress</span>
    </div>
    </div>
    ))} </div>: null}
    </div>
    </div>
    </div>
    </div>
    )
    }

export default Board