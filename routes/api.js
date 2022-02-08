const express = require('express');
const userController = require('../controllers').users
const commentController = require('../controllers').comments
const router = express.Router();
const ResponseFormat = require('../core').ResponseFormat;
router.post('/users', function (req, res) {
    userController.create(req).then((user) => {
        res.status(201).json(ResponseFormat.build(
            user,
            "User Create Successfully",
            201,
            "success"
        ))
    }, (error) => {
        res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Users",
            "error"
        ))
    }
    );
});
router.get('/users', function (req, res) {
    userController.list(req).then((users) => {
        res.status(200).json(ResponseFormat.build(
            users,
            "User Information Reterive successfully",
            200,
            "success"
        ))
    }, (error) => {
        res.status(400).json(ResponseFormat.error(
            error,
            "Something went wrong when create Users",
            "error"
        ))
    }
    );
})

router.post('/comments/:userId/comment', function (req, res) {
    commentController.create(req).then((comment) => {
        res.status(201).json(
            ResponseFormat.build(
                comment,
                "Comment Save Successfully",
                201,
                "success"
            )
        )
    }, (error) => {
        res.status(400).json(
            ResponseFormat.error(
                error,
                "Somethis went wrong when save the data",
                400,
                "error"
            )
        )
    }
    );
});
router.get('/users/comments', function (req, res) {
    userController.listWithComment(req).then((users) => {
        res.status(200).json(
            ResponseFormat.build(
                users,
                "all user information are reterive successfully",
                200,
                "success"
            )
        )
    }, (error) => {
        res.status(500).json(
            ResponseFormat.error(
                error,
                "somthing went wrong when reterieve the data",
                500,
                "error"
            )
        )
    });
});
router.get('/users/:userId', function (req, res) {
    userController.getUserDetails(req).then((users) => {
        res.status(200).json(
            ResponseFormat.build(
                users,
                "User information reterieve successfully",
                200,
                "success"
            )
        )
    }, (error) => {
        res.status(500).json(
            ResponseFormat.error(
                error,
                "Something went wrong when reterive the user details",
                500,
                "error"
            )
        )
    });
});
router.put('/users/:userId', function (req, res) {
    userController.update(req).then((usr) => {
        res.status(200).json(
            ResponseFormat.build(
                usr,
                "user Update successfully",
                200,
                "success"
            )
        )
    }, (error) => {
        res.status(500).json(
            ResponseFormat.error(
                error,
                "Something went wrong when reterive the user details",
                500,
                "error"
            )
        )
    });
})
router.delete('/users/:userId', function (req, res) {
    userController.destroy(req).then((usr) => {
        res.status(200).json(
            ResponseFormat.build(
                usr,
                "user deleted successfully",
                200,
                "success"
            )
        )
    }, (error) => {
        res.status(500).json(
            ResponseFormat.error(
                error,
                "Something went wrong when reterive the user details",
                500,
                "error"
            )
        )
    });
});
router.get('/comments', function (req, res) {
    commentController.list(req).then((comments) => {
        res.status(200).json(ResponseFormat.build(
            comments,
            "comments Information Reterive successfully",
            200,
            "success"
        ))
    }, (error) => {
        res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong when Reterieve Information",
            400,
            "error"
        ))
    });
});
router.put('/comments/:commentID', function (req, res) {
    commentController.update(req).then((cmmt) => {
        res.status(200).json(
            ResponseFormat.build(
                cmmt,
                "comment Updated successfully",
                200,
                "success"
            )
        )
    }, (error) => {
        res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong while updating comment",
            400,
            "error"
        ))
    });
})
router.delete('/comments/:commentID', function (req, res) {
    commentController.destroy(req).then((cmmt) => {
        res.status(200).json(
            ResponseFormat.build(
                {},
                "comment deleted successfully",
                200,
                "success"
            )
        )
    }, (error) => {
        res.status(400).send(ResponseFormat.build(
            error,
            "Somthing went wrong while deleting comment",
            400,
            "error"
        ))
    });
});
// function success_response(res, status,data) {
//     res.status(status).json(data);
//   }
// router.delete('/users/:userId', userController.destroy);
// router.get('/comments', commentController.list);
// router.put('/comments/:commentID', commentController.update);
// router.delete('/comments/:commentID', commentController.destroy);

module.exports = router;
