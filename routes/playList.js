const router = require("express").Router();
const { PlayList, validate } = require("../models/playList");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const Joi = require("joi");
const { default: mongoose } = require("mongoose");

// create playlist
router.post("/", auth, async (req, res) => {
  // console.log(req.user._id);
  const { error } = validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playList = await PlayList({ ...req.body, user: user._id }).save();

  res.status(201).send({ data: playList });
});

router.get("/userplaylist", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlists = await PlayList.find({ user: req.user._id });
  res.status(200).send({ data: playlists });
  console.log(playlists);
});
// edit playlist by id
router.put("/edit/:id", [validateObjectId, auth], async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    isprivate: Joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const playlist = await PlayList.findById(req.params.id);
  if (!playlist) return res.status(404).send({ message: "Playlist not found" });

  const user = await User.findById(req.user._id);
  if (!user._id.equals(playlist.user))
    return res.status(403).send({ message: "User don't have access to edit!" });

  playlist.name = req.body.name;
  playlist.isprivate = req.body.isprivate;
  await playlist.save();

  res.status(200).send({ message: "Updated successfully" });
});

// add movie to playlist
router.put("/add-movie", auth, async (req, res) => {
  const schema = Joi.object({
    playlistId: Joi.string().required(),
    movies: Joi.required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  console.log(req);
  const user = await User.findById(req.user._id);
  const playlist = await PlayList.findById(req.body.playlistId);
  if (!user._id.equals(playlist.user))
    return res.status(403).send({ message: "User don't have access to add!" });

  // console.log(req.body.movies.movie_id)
  const indexNumber = playlist.movies.findIndex(a => a.movie_id === req.body.movies.movie_id);
  console.log(indexNumber)
  if(indexNumber === -1)
  {
    playlist.movies.push(req.body.movies);
  }
  await playlist.save();
  res.status(200).send({ data: playlist, message: "Added to playlist" });
});

// remove movie from playlist - Done
router.put("/remove-movie", auth, async (req, res) => {
  console.log(req);
  const schema = Joi.object({
    playlistId: Joi.string().required(),
    movieId: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const user = await User.findById(req.user._id);
  const playlist = await PlayList.findById(req.body.playlistId);
  console.log(playlist);
  if (!user._id.equals(playlist.user))
    return res
      .status(403)
      .send({ message: "User don't have access to Remove!" });

  const index = playlist.movies.findIndex(object => {
    return object.movie_id === req.body.movieId
  })
  console.log(index);
  playlist.movies.splice(index, 1);
  await playlist.save();
  console.log(playlist)
  res.status(200).send({ data: playlist, message: "Removed from playlist" });
});

// get playlist by id
router.get("/:id", auth, async (req, res) => {
  const playlist = await PlayList.findById(req.params.id);
  if (!playlist) return res.status(404).send("not found");
  // const movies = await playList.find({ playlist.movies });
  res.status(200).send({ data: playlist.movies });
});

// user playlists

// get all playlists
router.get("/", auth, async (req, res) => {
  // const playlists = await PlayList.find();
  const playlists = await PlayList.find({
    $or: [{ user: req.user._id }, { isprivate: "false" }],
  });
  res.status(200).send(playlists);
});

// delete playlist by id
router.delete("/:id", [validateObjectId, auth], async (req, res) => {
  const user = await User.findById(req.user._id);
  const playlist = await PlayList.findById(req.params.id);
  console.log(user._id)
  console.log(playlist);
  if (! user._id.equals(playlist.user))
    return res.status(403).send({ message: "User don't have access to delete!" });

  // const index = user.playlists.indexOf(req.params.id);
  // user.playlists.splice(index, 1);
  // await user.save();
  await playlist.remove();
  res.status(200).send({ message: "Removed from library" });
});

module.exports = router;
