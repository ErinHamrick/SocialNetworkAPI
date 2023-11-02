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

// router.get("/api/thoughts", thoughtController.getAllThoughts);
// router.get("/api/thoughts/:thoughtId", thoughtController.getThoughtById);
// router.post("/api/thoughts", thoughtController.createThought);
// router.put("/api/thoughts/:thoughtId", thoughtController.updateThought);
// router.delete("/api/thoughts/:thoughtId", thoughtController.deleteThought);
// router.post(
// 	"/api/thoughts/:thoughtId/reactions",
// 	thoughtController.createReaction
// );
// router.delete(
// 	"/api/thoughts/:thoughtId/reactions/:reactionId",
// 	thoughtController.removeReaction
// );

module.exports = router;
