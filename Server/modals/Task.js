const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ['HIGH PRIORITY', 'MODERATE PRIORITY', 'LOW PRIORITY'],
      required: true,
    },
    checkList: {
      type: Array,
      required: true,
    },
    assignTo: {
      type: String,
    },
    date: {
      type: String,
    },
    zone: {
      type: String,
      required: true,
      enum: ['Backlog', 'Todo', 'Progress', 'Done'],
      default: 'Todo',
    },
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate',
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
