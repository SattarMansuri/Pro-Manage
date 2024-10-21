import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const getTaskById = async (id) =>{
  try {
    const url = `${backendUrl}/api/task/taskId/${id}`
    const response = await axios.get(url, id)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const createTasks = async ({title, priority, checkList, assignTo, date})=>{
try {
  const url = `${backendUrl}/api/task/create`
  const reqPayload = {title, priority, checkList, assignTo, date}
  const token = localStorage.getItem('token')
  axios.defaults.headers.common["Authorization"] = token
  const response = await axios.post(url, reqPayload)
  return response
} catch (error) {
  return error.response.data
}
}

export const deleteTask = async (id)=>{
  try {
    const url = `${backendUrl}/api/task/delete/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.delete(url)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const taskById = async (id, taskPayload)=>{
  try {
    const url = `${backendUrl}/api/task/edit/${id}`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, taskPayload)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const getAllTasks = async ()=>{
  try {
    const url = `${backendUrl}/api/task/alltask`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const getTaskAnalytics = async () =>{
  try {
    const url = `${backendUrl}/api/task/analytics`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = axios.get(url)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const moveTaskInZone = async (id, newZone) =>{
try {
const url = `${backendUrl}/api/task/zone/${id}`
const token = localStorage.getItem('token')
axios.defaults.headers.common["Authorization"] = token
const response = await axios.put(url, newZone)
return response
} catch (error) {
  console.log(error)
}
}