var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true
  },
  lead: {
    type: String,
    index: true
  },
  students: {
    type: Array,
    index: true
  },
  description: {
    type: String,
    index: true
  },
  technologies: {
    type: String,
    index: true
  }
}, {
  collection: 'projects'
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = {
  Project: Project
};
