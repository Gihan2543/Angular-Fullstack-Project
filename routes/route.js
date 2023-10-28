const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const SuperAdmin = require('../models/superAdmin');
const Admin = require('../models/admins');
const User = require('../models/users');
const Task = require('../models/tasks');

/**
 * Super Admin Account
 */

// Create Super Admin Account
router.post('/superadmin/activate', (req, res, next) => {
  var password = 'superadmin';

  bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(password, salt, function (hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          let newSuperAdmin = new SuperAdmin({
            username: 'superadmin',
            email: 'superadmin@trackme.com',
            password: hash,
          });

          newSuperAdmin.save((err, user) => {
            if (err) {
              res.json({ msg: 'Failed to activate Super Admin account' });
            } else {
              res.json({ msg: 'Super Admin account activated successfully' });
            }
          });
        }
      });
    }
  });
});

/**
 * Admin Accounts
 */

// Show Admin Details
router.get('/admins/:id', (req, res, next) => {
  Admin.find({ _id: req.params.id }, function (err, admin) {
    res.json(admin);
  });
});

// Show All Admins
router.get('/admins', (req, res, next) => {
  Admin.find(function (err, admins) {
    res.json(admins);
  });
});

// Login Admin
router.post('/admins/login', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  Admin.findOne({ email: email }, function (err, user) {
    if (err) {
      res.json({ error: 'Unknown error occured: ' + err });
    }
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({ error: 'Unknown error occured: ' + err });
        }
        if (result) {
          // Create JW Token
          let jwtSecretKey = process.env.JWT_SECRET_KEY;

          const token = jwt.sign({ email }, jwtSecretKey, {
            expiresIn: '2h',
          });

          user.token = token;
          res.json({
            success: 'Password Matches',
            token: token,
            userID: user._id,
          });
        } else {
          res.json({ fail: 'Passwords do not match' });
        }
      });
    } else {
      res.json({ nouser: 'User Not Exist' });
    }
  });
});

// Create Admin Account
router.post('/admins/signup', (req, res, next) => {
  var password = req.body.password;

  bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(password, salt, function (hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          let newAdmin = new Admin({
            company: req.body.company,
            email: req.body.email,
            password: hash,
          });

          newAdmin.save((err, admin) => {
            if (err) {
              res.json({ msg: 'Failed to create admin' });
            } else {
              res.json({ msg: 'Admin created successfully' });
            }
          });
        }
      });
    }
  });
});

// Delete Admin Account
router.delete('/admins/delete/:id', (req, res, next) => {
  Admin.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

/**
 * User Accounts
 */

// Show Account Details
router.get('/users/:id', (req, res, next) => {
  User.find({ _id: req.params.id }, function (err, user) {
    res.json(user);
  });
});

// Show All Users
router.get('/users', (req, res, next) => {
  User.find(function (err, users) {
    res.json(users);
  });
});

// Login User
router.post('/users/login', (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email }, function (err, user) {
    if (err) {
      res.json({ error: 'Unknown error occured: ' + err });
    }
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({ error: 'Unknown error occured: ' + err });
        }
        if (result) {
          // Create JW Token
          let jwtSecretKey = process.env.JWT_SECRET_KEY;

          const token = jwt.sign({ email }, jwtSecretKey, {
            expiresIn: '2h',
          });

          user.token = token;
          res.json({
            success: 'Password Matches',
            token: token,
            userID: user._id,
          });
        } else {
          res.json({ fail: 'Passwords do not match' });
        }
      });
    } else {
      res.json({ nouser: 'User Not Exist' });
    }
  });
});

// Create User Account
router.post('/users/signup', (req, res, next) => {
  var password = req.body.password;

  bcrypt.genSalt(saltRounds, function (saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(password, salt, function (hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
          });

          newUser.save((err, user) => {
            if (err) {
              res.json({ error: 'Failed to create user' });
            } else {
              res.json({ msg: 'User created successfully' });
            }
          });
        }
      });
    }
  });
});

// Delete User Account
router.delete('/users/delete/:id', (req, res, next) => {
  User.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

/**
 * Tasks
 */

// Show Tasks
router.get('/tasks/:id', (req, res, next) => {
  Task.find(function (err, tasks) {
    if (err) {
      res.json({ error: 'Unknown error occurred: ' + err });
    } else {
      let userTasks = [];
      tasks.forEach((task) => {
        if (task.userID == req.params.id) {
          userTasks.push(task);
        }
      });

      if (userTasks.length > 0) {
        res.json(userTasks);
      } else {
        res.json({ notasks: 'No tasks found' });
      }
    }
  });
});

// Create Task
router.post('/tasks/create', (req, res, next) => {
  let newTask = new Task({
    userID: req.body.userID,
    task_name: req.body.task_name,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    hours: req.body.hours,
    minutes: req.body.minutes,
    date: req.body.date,
  });

  newTask.save((err, task) => {
    if (err) {
      res.json({ msg: 'Failed to create task', error: err });
    } else {
      res.json({ msg: 'Task created successfully' });
    }
  });
});

// Delete Task
router.delete('/tasks/delete/:id', (req, res, next) => {
  Task.remove({ _id: req.params.id }, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
