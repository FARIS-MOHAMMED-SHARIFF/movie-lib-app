const mongoose = require("mongoose");
const Joi = require("joi");

// const ObjectId = mongoose.Schema.Types.ObjectId;

const playListSchema = new mongoose.Schema({
	name: { type: String, required: true },
	user: { type: String, ref: "user", required: true },
    isprivate : { type : Boolean, required: true},
    movies:  [{ movie_id: Number , title: String, poster_paths: String}]
});

const validate = (playList) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		user: Joi.string().required(),
        isprivate: Joi.boolean().required(),
        // movies : Joi.array().items(Joi.number()),
	});
	return schema.validate(playList);
};

const PlayList = mongoose.model("playList", playListSchema);

module.exports = { PlayList, validate };
