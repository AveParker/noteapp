const router = require("express").Router();
const Project = require('../models/Project');

router.get('/something', (req, res, next) => {
	console.log(req.session.user);
	res.json(req.session.user);
});

// get all projects
router.get('/', (req, res, next) => {
	Project.find()
		.then(projects => {
			console.log('hello', req.session.user);
			res.status(200).json(projects);
		})
		.catch(err => next(err));
});


// create a project
router.post('/', (req, res, next) => {
	const { title, description } = req.body;
	const owner = req.session.user._id;
	Project.create({
		title,
		description,
		owner
	})
		.then(project => {
			// we return http status code 201 - created
			res.status(201).json(project);
		})
		.catch(err => {
			next(err);
		})
})

// get a specific project
router.get('/:id', (req, res, next) => {
	console.log(req.session.user);
	Project.findById(req.params.id)
		.then(project => {
			// check if the id is not valid
			// if (!mongoose.Types.ObjectId.isValid(req.params.id))

			if (!project) {
				res.status(404).json(project);
			} else {
				res.status(200).json(project);
			}
		})
		.catch(err => {
			next(err);
		})
});

router.put('/:id', (req, res, next) => {
	const { title, description } = req.body;
	Project.findByIdAndUpdate(req.params.id, { title: title, description: description }, { new: true })
		.then(updatedProject => {
			res.status(200).json(updatedProject);
		})
		.catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
	Project.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'project deleted' });
		})
});

module.exports = router;
