

let router = require('express').Router();

// Default response 

router.get('/', function (req, res) {
    res.json({
        status: 'API is Working',
        message: 'New Test Message with nodemon.'
    });
});

var usersController = require('./Controller')

// Routing

router.route('/users/update/:email').patch(usersController.update);
router.route('/users/search/:email').get(usersController.findUser);
router.route('/users/delete/:email').delete(usersController.delete);

router.route('/users').get(usersController.index);
router.route('/users/add').post(usersController.new);


// Export API routes
module.exports = router;



