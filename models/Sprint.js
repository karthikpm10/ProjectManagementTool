var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SprintSchema = new Schema({
    sprint_id: {                  //Auto-generated
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    name: String,               //Sprint name
    description: String,        //Sprint goal
    status: {                   //status of tasks - can hold only enums
        type: String, 
        enum: ['Completed', 'In-progress', 'To-do']
    },
    start_date: Date,
    end_date: Date,
    comments: {
        name: String,           //Name of user0
        content: String,
        timestamp: Date
    }
},
    {
        collection: 'sprints'  //collection name
    });

module.exports = mongoose.model('Sprints', SprintSchema);