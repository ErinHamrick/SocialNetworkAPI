const { User } = require("../models");

module.exports = {
	async getAllUsers(req, res){
		try {
			const users = await User.find();
			res.json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async getUserById(req, res) {
		try {
			const { userId } = req.params;
			const user = await User.findById(userId)
				.populate("thoughts")
				.populate("friends");

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	async createUser(req, res) {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	async updateUser(req, res) {
		try {
			const { userId } = req.params;
			const user = await User.findByIdAndUpdate(userId, req.body, {
				new: true,
			});

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			res.json(user);
		} catch (err) {
			res.status(400).json(err);
		}
	},

	async deleteUser(req, res) {
		try {
			const { userId } = req.params;
			const user = await User.findByIdAndDelete(userId);

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// BONUS: Remove associated thoughts
			await Thought.deleteMany({ username: user.username });

			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	// Method to add a friend to a user's friend list
	async addFriend(req, res) {
		try {
			const { userId, friendId } = req.params;

			// Use the userId to find the user who wants to add a friend
			const user = await User.findOne({ _id: userId });

			if (!user) {
				return res.status(404).json({ message: "User not found." });
			}

			// Check if the friendId is already in the user's friend list
			if (user.friends.includes(friendId)) {
				return res
					.status(400)
					.json({ message: "Friend is already in the list." });
			}

			// Add the friendId to the user's friend list
			user.friends.push(friendId);

			// Save the updated user document
			await user.save();

			res.status(200).json({ message: "Friend added successfully." });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Server error." });
		}
	},

	// Method to remove a friend from a user's friend list
	async removeFriend(req, res){
		try {
			const { userId, friendId } = req.params;

			// Use the userId to find the user who wants to remove a friend
			const user = await User.findOne({ _id: userId });

			if (!user) {
				return res.status(404).json({ message: "User not found." });
			}

			// Check if the friendId is in the user's friend list
			if (!user.friends.includes(friendId)) {
				return res
					.status(400)
					.json({ message: "Friend not found in the list." });
			}

			// Remove the friendId from the user's friend list
			user.friends = user.friends.filter(
				(friend) => friend.toString() !== friendId
			);

			// Save the updated user document
			await user.save();

			res.status(200).json({ message: "Friend removed successfully." });
		} catch (err) {
			console.error(err);
			res.status(500).json({ message: "Server error." });
		}
	},
};
