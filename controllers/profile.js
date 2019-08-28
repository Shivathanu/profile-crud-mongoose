var express = require('express');
var router = express.Router();
var Profile = require('../models/profile');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().getTime() + file.originalname);
    }
});

var upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});

/**
 * Express router to connect "/api/profile/create"
 *
 * @param {Object} request
 * @param {Object} response
 */
router.post('/create', upload.single('productImage'), function (request, response) {
    var profile = new Profile(
        {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            emailId: request.body.emailId
        }
    );
    if(request.file) {
        profile.productImage = request.file.path;
    }
    profile.save(function (error) {
        if (error) {
            response.send(error);
        }
        response.send('Profile Created successfully')
    })
});

/**
 * Express router to connect "/api/profile/list"
 *
 * @param {Object} request
 * @param {Object} response
 */
router.get('/list', function(request, response) {    
    Profile.find({}, function (error, profile) {
        response.send(profile);
    });
});

/**
 * Express router to connect "/api/profile/:id"
 *
 * @param {Object} request
 * @param {Object} response
 */
router.get('/:id', function (request, response) {
    Profile.findById(request.params.id, function (error, profile) {
        if (error) response.send(error);
        response.send(profile);
    })
});

/**
 * Express router to connect "/api/profile/:id/update"
 *
 * @param {Object} request
 * @param {Object} response
 */
router.put('/:id/update', function(request, response) {
    Profile.findByIdAndUpdate(request.params.id, {$set: request.body}, function (error, profile) {
        if (error) response.send(error);
        response.send('Profile updated.');
    });
});

/**
 * Express router to connect "/api/profile/:id/delete"
 *
 * @param {Object} request
 * @param {Object} response
 */
router.delete('/:id/delete', function(request, response) {
    Profile.findByIdAndRemove(request.params.id, function (error) {
        if (error) response.send(error);
        response.send('Deleted successfully!');
    })
});

module.exports = router;
