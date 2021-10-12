const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
	Task: String,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;