var mongoose = require("mongoose");

var RecentTasksSchema = new mongoose.Schema({
  userId: {
    type: String,
    index: true
  },
  status: {
    type: String,
    index: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    index: true
  }
}, {
  collection: 'recenttasks'
});

var RecentTasks = mongoose.model('RecentTasks', RecentTasksSchema);

module.exports = {
  RecentTasks: RecentTasks
};
