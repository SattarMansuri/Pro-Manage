import axios from 'axios'
const token = localStorage.getItem('token')
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
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, taskPayload)
    return response
  } catch (error) {
    console.log(error)
  }
}
export const getTaskAnalytics = async () =>{
  try {
    const url = `${backendUrl}/api/task/analytics`
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
axios.defaults.headers.common["Authorization"] = token
const response = await axios.put(url, newZone)
return response
} catch (error) {
  console.log(error)
}
}
export const gettaskByZone = async (zoneName)=>{
  try {
    const url = `${backendUrl}/api/task/zone/${zoneName}`
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.get(url, zoneName)
    return response
  } catch (error) {
    console.log(error)
  }
}