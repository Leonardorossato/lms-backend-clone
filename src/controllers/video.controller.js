const slugify = require("slugify");
const Video = require("../models/video.model");
const validObjectId = require("../middleware/validate.middleware");

class VideoController {
  static create = async (req, res) => {
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      const video = await Video.create(req.body);
      await video.save();
      return res.status(201).json(video);
    } catch (error) {
      return res.status(400).json({ message: "Error creating video" });
    }
  };

  static findAll = async (req, res) => {
    try {
      const video = await Video.find();
      return res.status(200).json(video);
    } catch (error) {
      return res.status(500).json({ message: "Error to find all videos" });
    }
  };

  static findOne = async (req, res) => {
    try {
      const { id } = req.params;
      const video = await Video.findById(id);
      return res.status(200).json(video);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error to find video with this id" });
    }
  };

  static update = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title.toLowerCase());
      }
      await Video.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ message: "Video updated successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error updating video" });
    }
  };

  static delete = async (req, res) => {
    const { id } = req.params;
    validObjectId(id);
    try {
      await Video.findByIdAndDelete(id);
      return res.status(200).json({ message: "Video deleted successfully." });
    } catch (error) {
      return res.status(400).json({ message: "Error deleting this video" });
    }
  };
}

module.exports = VideoController;
