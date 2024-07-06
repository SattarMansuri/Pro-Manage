const Task = require('../modals/Task')

const createTask = async (req, res)=>{
  try {
    const {title, priority, checkList, date, zone} = req.body
    if(!title || !priority || !checkList.length){
    return res.status(400).json({message: "Details with star marks are required", success: false})
    }
    const newTask = new Task({title, priority, checkList, date, zone})
    await newTask.save()
    return res.status(200).json({message: "Task Created Successfully", success: true})
  } catch (error) {
    console.log(error)
  }
}

const getTaskById = async (req, res)=>{
  try {
    const id = req.params.id
    const response = await Task.findById(id)
    res.status(200).json(response)
  } catch (error) {
   console.log(error)
  }
}

const updateTask =  async (req, res)=>{
  try {
   const id = req.params.id
   const data = req.body
   const response = await Task.findByIdAndUpdate(id, data, {
     runValidators: true,
     new: true
   })
   res.status(200).json(response)
  } catch (error) {
   console.log(error)
  }
 }

 const moveTaskInZone = async (req, res) => {
  try {
    const id = req.params.id
    const { zone } = req.body
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.zone= zone;
    await task.save();
    res.json({
      message: "Task moved successfully",
      task
    });
  } catch (error) {
    console.log(error);
  }
}

const deleteTask = async (req, res)=>{
  try {
    const id = req.params.id
    const data = req.body
    const response = await Task.findByIdAndDelete(id, data)
    res.status(200).json({message: "delete successfully"})
  } catch (error) {
    console.log(error)
  }
}

const getTaskByZone = async (req, res)=>{
  try {
    const zoneName = req.params.zoneName
    const task = await Task.find({zone: zoneName})
    res.status(200).json(task)
  } catch (error) {
    console.log(error)
  }
}

const getAllAnalytics = async (req, res) => {
  try {
    const backlog = await Task.find({
      zone: "Backlog",
    }).count();
    const todo = await Task.find({
      zone: "Todo",
    }).count();
    const inProgress = await Task.find({
      zone: "Progress",
    }).count();
    const done = await Task.find({
      zone: "Done",
    }).count();
    const high = await Task.find({
      priority: "HIGH PRIORITY"
    }).count()
    const low = await Task.find({
      priority: "LOW PRIORITY"
    }).count()
    const meduim = await Task.find({
      priority: "MODERATE PRIORITY"
    }).count()
    const nullDateTask = await Task.find({
      date: ""
    }).count()
    const totalDateTask = await Task.find({
      date: {$exists: true}
    }).count()
    res.status(200).json({
      backlogTask: backlog,
      todoTask: todo,
      inProgress: inProgress,
      doneTask: done,
      highPriority: high,
      lowPriority: low,
      moderatePriority: meduim,
      dueDateTaskNull: nullDateTask,
      dueDatetaskTotal: totalDateTask
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {createTask, getTaskById, updateTask, moveTaskInZone, deleteTask, getTaskByZone, getAllAnalytics}