import axios from 'axios'
const backendUrl = import.meta.env.VITE_BACKEND_URL
export const registerUser = async ({name, email, password, cnfPassword})=>{
try {
  const url = `${backendUrl}/api/auth/register`
  const reqPayload = {name, email, password, cnfPassword}
  const response = await axios.post(url, reqPayload)
  return response.data
} catch (error) {
  return error.response.data
}
}
export const loginUser = async (email, password) =>{
  try {
    const url =`${backendUrl}/api/auth/login`
    const response = await axios.post(url, {email, password})
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const updateUser = async (email, newName, oldPassword, newPassword)=>{
  try {
    const url = `${backendUrl}/api/auth/update`
    const token = localStorage.getItem('token')
    axios.defaults.headers.common["Authorization"] = token
    const response = await axios.put(url, {email, newName, oldPassword, newPassword})
    console.log(response)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const addEmail = async (email)=>{
  try {
     const url = `${backendUrl}/api/auth/mail`
     const token = localStorage.getItem('token')
     axios.defaults.headers.common["Authorization"] = token
     const response = await axios.post(url, email)
     return response.data
  } catch (error) {
    return error.response.data
  }
}
export const getAllMails = async ()=>{
 try {
  const url = `${backendUrl}/api/auth/allmail`
  const token = localStorage.getItem('token')
  axios.defaults.headers.common["Authorization"] = token
  const response = await axios.get(url)
  return response
 } catch (error) {
  console.log(error)
 }
}