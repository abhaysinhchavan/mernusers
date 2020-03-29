

User = require('./Model');

exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }

        res.json({
            status: "success",
            message: "Users details retrieved successfully.",
            data: users
        });
    });
};

// Add new user.
exports.new = function (req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.roletype = req.body.roletype;
    user.userstatus = req.body.userstatus;
    user.mobilenum = req.body.mobilenum;

    user.save(function (err) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) 
            {
                res.status(442).send('User Email id already exist.');
                return;
              }
              return res.status(422).send(err);
        }
        res.json({
            message: 'New User details added.',
            data: user
        });
    });
};


// Search user's details 
exports.findUser = function (req, res) {
    var params = req.params || {};
    var query = {
        email: params.email
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }

    User.findOne(query, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            message: 'User details loading..',
            data: user
        });
    });
};

// Update User details. 
exports.update = function (req, res) {
    var params = req.params || {};
    var query = {
        email: params.email
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    User.findOne({ email: req.params.email }, function (err, user) {
        if (err)
            res.send(err);
        user.name = req.body.name ? req.body.name : user.name;
        user.userstatus = req.body.userstatus;
        user.mobilenum = req.body.mobilenum ? req.body.mobilenum : user.mobilenum;
        user.roletype = req.body.roletype;
        user.updated_time = new Date();

        // Save User details 
        user.save(function (err, user) {
            if (err)
                res.json(err);
            res.json({
                message: 'User details updated',
                data: user
            });
        });
    });
};


// Delete User 
exports.delete = function (req, res) {
    var params = req.params || {};
    var query = {
        email: params.email
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }

    User.remove({
        email: req.params.email
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'User deleted'
        });
    });
};


