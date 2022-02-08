const user = require('../models').User;
const comment = require('../models').Comment;
const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return new Promise(async (resolutionFunc, rejectionFunc) => {
            try {
                if (req.body.firstName && req.body.lastName && req.body.email) {
                    const users = await user.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email
                    })
                    resolutionFunc(users)
                } else {
                    rejectionFunc("required parameter missing")
                }
            } catch (error) {
                rejectionFunc(error)
            }
        })
    },
    list(req, res) {
        return new Promise(async (resolutionFunc, rejectionFunc) => {
            try {
                const user_list = user.sequelize.query("Select * from Users ")
                resolutionFunc(user_list)

            } catch (error) {
                rejectionFunc(error)
            }
        })
    },
    listWithComment(req, res) {
        return new Promise(async (resolutionFunc, rejectionFunc) => {
            try {
                const list = user.scope(['User'])
                    .findAll({
                        include: [{
                            model: comment,
                            as: 'comments'
                        }],
                        order: [
                            ['createdAt', 'DESC'],
                            [{ model: comment, as: 'comments' }, 'createdAt', 'ASC'],
                        ],
                    })
                resolutionFunc(list)
            } catch (error) {
                rejectionFunc(error)
            }
        })
    },
    getUserDetails(req, res) {
        return new Promise(async (resolutionFunc, rejectionFunc) => {
            try {
                const users = await user
                    .findByPk(req.params.userId, {
                        include: [{
                            model: comment,
                            as: 'comments'
                        }],
                    })
                if (!users) {
                    return rejectionFunc("No user found")
                } else { resolutionFunc(users) }
            } catch (error) {
                rejectionFunc(error)
            }
        })
    },
    update(req, res) {
        return new Promise((resolutionFunc, rejectionFunc) => {
            if (req.params.userId) {
                user.findByPk(req.params.userId).then((usr) => {
                    if (!usr) {
                        rejectionFunc("User not found")
                    } else {
                        usr.update({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email
                        }).then((cmmt) => {
                            resolutionFunc("user Update successfully")
                        }, (error) => {
                            rejectionFunc(error)
                        });
                    }
                }, (error) => {
                    rejectionFunc(error)
                });
            } else { rejectionFunc("required parameter missing") }

        });
    },
    destroy(req, res) {
        return new Promise(async (resolutionFunc, rejectionFunc) => {
            try {
                if (req.params.userId) {
                    const usr = await user.findByPk(req.params.userId)
                    if (!usr) {
                        rejectionFunc("user not found")
                    } else {
                        const deleteuser = usr.destroy()
                        resolutionFunc("user deleted successfully")
                    }
                } else { rejectionFunc("required parameter missing") }


            } catch (error) {
                rejectionFunc(error)
            }
        })
    }
}
