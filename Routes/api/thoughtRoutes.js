const express = require("express");
const router = express.Router();
const {
	getAllThoughts,
	getThoughtById,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	removeReaction,
} = require("../../controllers/thoughtController");

// API routes for thoughts
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).delete(deleteThought).put(updateThought);
router.route('/:thoughtId/reactions').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;
