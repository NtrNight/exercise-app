const router = require('express').Router();
let Exercises = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercises.find()
             .then(ex => res.json(ex))
             .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercises({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
               .then(() => res.json('Exercise added!'))
               .catch(err => res.status(400).json('Error: '+err));
    
})

router.route('/:id').get((req, res) => {
    Exercises.findById(req.params.id)
    .then(e => res.json(e))
    .catch(err => res.status(400).json('Error: ' +err));
})

router.route('/:id').delete((req, res) => {
    Exercises.findByIdAndDelete(req.params.id)
    .then(()=> res.json('Exercise Deleted Successfully'))
    .catch(err => res.status(400).json(err));
})

router.route('/update/:id').put((req, res) =>{
    Exercises.findByIdAndUpdate(req.params.id)
    .then(ex => {
        ex.username = req.body.username;
        ex.description = req.body.description;
        ex.duration = Number(req.body.duration);
        ex.date = Date.parse(req.body.date);

        ex.save()
        .then(() => res.json('Exercise Update Successfully'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;