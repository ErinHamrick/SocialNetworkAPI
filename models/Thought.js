const { Schema, Types } = require("mongoose");

// Define the Reaction subdocument schema
const reactionSchema = new Schema({
	reactionId: {
		type: Types.ObjectId,
		default: () => new Types.ObjectId(),
	},
	reactionBody: {
		type: String,
		required: true,
		maxlength: 280,
	},
	username: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		get: (timestamp) => dateFormat(timestamp),
	},
});

// Define a function to format the timestamp
function dateFormat(timestamp) {
	return new Date(timestamp).toLocaleString();
}

// Define the Thought model with the Reaction subdocument schema
const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => dateFormat(timestamp),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema], // Array of Reaction subdocuments
	},
	{
		toJSON: {
			getters: true,
		},
	}
);

// Create a virtual called reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

module.exports = model("Thought", thoughtSchema);
