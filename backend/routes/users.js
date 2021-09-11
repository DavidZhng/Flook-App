const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;

  const newUser = new User({username, password, phoneNumber});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addPref/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
        
        user.prefs.push(req.body.id)

        user.save()
            .then(() => res.json('Preference Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/addRequest/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
        
        user.requests.push(req.body.id)

        user.save()
            .then(() => res.json('Request Added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/incogOn/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
        
        user.incognito = true

        user.save()
            .then(() => res.json('Incognito Turned On!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/incogOff/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
        
        user.incognito = false

        user.save()
            .then(() => res.json('Incognito Turned Off!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/updateLoc/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {

        user.location.longitude = req.body.longitude;
        user.location.latitude = req.body.latitude;

        user.save()
            .then(() => res.json('Location Updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;