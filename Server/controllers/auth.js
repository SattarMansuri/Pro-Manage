const Candidate = require('../modals/Candidate')
const Mail = require('../modals/UserMail')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userRegistration = async (req, res)=>{
  try {
    const {name, email, password, cnfPassword} = req.body
    if(!name || !email || !password || !cnfPassword){
    return  res.status(400).json({message: "All details are required", success: false})
    }
    if(email.length <= 10){
      return res.status(400).json({message: "Please enter a valid mail id", success: false})
    }
    if(password !== cnfPassword){
    return res.status(400).json({message: "Password does not matches", success: false})
    }
    isExisting = await Candidate.findOne({email: email})
    if(isExisting){
     return res.status(400).json({message: "User already exists", success: false})
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const hasdCnf = await bcrypt.hash(cnfPassword, 10)
    const newCandidate = new Candidate({
      name,
      email,
      password: hashPwd,
      cnfPassword: hasdCnf
    })
    await newCandidate.save()
    const token = jwt.sign(
      {userId: newCandidate._id},
      process.env.SECRET_KEY,
      { expiresIn: "60h" }
    )
    res.status(200).json({
      message: "User registered and logged in successfully",
      success: true,
      token: token,
      name: newCandidate.name,
      email: newCandidate.email
    })
  } catch (error) {
    console.log(error)
  }
}

const userLogin = async (req, res)=>{
  try {
    const {email, password} = req.body
    if(!email || !password){
      res.status(400).json({message: "Invalid Credentials", success: false})
    }
    const user = await Candidate.findOne({email: email})
    if(!user){
      res.status(400).json({message: "User does not exists", success: false})
    }
    const matchedPwd = await bcrypt.compare(password, user.password)
    if(!matchedPwd){
      res.status(400).json({message: "You have entered a wrong password", success: false})
    }
    const token = jwt.sign(
      {userId: user._id},
      process.env.SECRET_KEY,
      { expiresIn: "60h" }
    )
    res.status(200).json({
      message: "User loggedin successfully",
      success: true,
      token: token,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    console.log(error)
  }
}

const UpdatePassword = async (req, res)=>{
  try {
    const email = req.body.email
    const user = await Candidate.findOne({email})
    const {newName, oldPassword, newPassword} = req.body
    const comparePassword = await bcrypt.compare(oldPassword, user.password)
    if(!comparePassword){
     return res.status(400).json({message: "Your old password is incorrect", success: false})
    }
    if(oldPassword === newPassword){
     return res.status(400).json({message: "Your old password and new password are same", success: false})
    }
      const hashPwd = await bcrypt.hash(newPassword, 10)
       user.password = hashPwd
       user.name = newName
       const response = await user.save()
       res.status(200).json({message: "Details Updated Successfully", success: true})
  }catch(error){
    console.log(error)
  }
}

const addMail = async (req, res)=>{
  try {
    const {email} =  req.body
    const newMail = new Mail({email, userRef: req.body.userId})
    const response = await newMail.save()
    res.status(200).json({message: "Mail saved successfully", success: true, email: response})
  } catch (error) {
    console.log(error)
  }
}

const getAllMails =  async(req, res)=>{
  try {
    const userId = req.body.userId
    const allMail = await Mail.find({userRef: userId})
    res.status(200).json(allMail)
  } catch (error) {
    console.log(error)
  }
  }

  module.exports = {userRegistration, userLogin, UpdatePassword, addMail, getAllMails}