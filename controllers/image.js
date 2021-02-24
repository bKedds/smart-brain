const Clarifai = require("Clarifai");

const app = new Clarifai.App({
	apiKey: "ad91512ce8e84a75b74d7601352e6ecf",
});

const handleApiCall = (req, res) => {
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json("unable to work with api"));
};
const handleImage = (db) => (req, res) => {
	const { id } = req.body;
	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then((entries) => {
			res.json(entries[0]);
		})
		.catch((err) => res.status(400).json("unable to get entries"));
};

module.exports = {
	handleImage,
	handleApiCall,
};
