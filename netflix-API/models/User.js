const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true},
		likedMovies: Array,
	},
	{ timestamps: true }
)
module.exports = User