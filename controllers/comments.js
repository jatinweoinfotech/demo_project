const comment = require('../models').Comment;

const ResponseFormat = require('../core').ResponseFormat;
module.exports = {
    create(req, res) {
        return new Promise(async (resolutionFunc, rejectionFunc) => {
            try {
                if (req.body.title && req.params.userId) {
                    const comments = await comment.create({
                        title: req.body.title,
                        userId: req.params.userId
                    })
                    resolutionFunc(comments)
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
            comment.findAll({}).then((comments) => {
                resolutionFunc(comments)
            }, (error) => {
                rejectionFunc(error)
            });
        })
    },
    update(req, res) {
        return new Promise((resolutionFunc, rejectionFunc) => {
            if (req.params.commentID) {
                comment.findByPk(req.params.commentID).then((cmmt) => {
                    if (!cmmt) {
                        rejectionFunc("User not found")
                    } else {
                        cmmt.update({
                            title: req.body.title || cmmt.title,
                            userId: req.body.userId || cmmt.userId
                        }).then((cmmt) => {
                            resolutionFunc("user Update successfully")
                        }, (error) => {
                            rejectionFunc(error)
                        });
                    }
                }, (error) => {
                    rejectionFunc(error)
                });
            } else {
                rejectionFunc("required parameter missing")
            }

        })
    },
    destroy(req, res) {
        return new Promise((resolutionFunc, rejectionFunc) => {
            if (req.params.commentID) {
                comment
                    .findByPk(req.params.commentID)
                    .then(cmt => {
                        if (!cmt) {
                            rejectionFunc("comment not found")
                        }
                        else {
                            cmt
                                .destroy()
                                .then(() => resolutionFunc("comment deleted successfully")
                                )
                                .catch(error => res.status(500).json(
                                    ResponseFormat.error(
                                        error,
                                        "someting went wrong when delete the user",
                                        500,
                                        "error"
                                    )
                                ));
                        }
                    });
            } else {
                rejectionFunc("required parameter missing")
            }

        })

    }
}