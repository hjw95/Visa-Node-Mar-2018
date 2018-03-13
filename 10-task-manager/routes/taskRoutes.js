var express = require('express');
var router = express.Router();

var taskList = [
	{
		id : 1,
		name : 'Learn JavaScript',
		desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem necessitatibus illo fugit blanditiis vitae, voluptate possimus aut placeat doloremque quam quia quibusdam ipsa harum error facere. Dolore itaque praesentium eius.',
		isCompleted : false
	},
	{
		id : 2,
		name : 'Explore Singapore',
		desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem necessitatibus illo fugit blanditiis vitae, voluptate possimus aut placeat doloremque quam quia quibusdam ipsa harum error facere. Dolore itaque praesentium eius.',
		isCompleted : false
	}
];

/* GET users listing. */
router.get('/', function(req, res, next) {
	var viewModel = { tasks : taskList };
  	res.render('tasks/index', viewModel);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var newId = taskList.reduce(function(prevResult, task){
		return task.id > prevResult ? task.id : prevResult
	}, 0) + 1;
	var newTask = {
		id : newId,
		name: req.body.txtTaskName,
		desc : req.body.txtTaskDesc,
		isCompleted : false
	};
	taskList.push(newTask);
	res.redirect('/tasks');
});

router.get('/details/:id', function(req, res, next){
	var taskId = parseInt(req.params.id);
	var result = taskList.find(function(task){
		return task.id === taskId;
	});
	if (result){
		var viewData = { task : result };
		res.render('tasks/details', viewData);
	} else {
		res.redirect('/tasks');	
	}
})

module.exports = router;
