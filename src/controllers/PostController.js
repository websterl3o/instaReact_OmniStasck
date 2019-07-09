const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
    async index(req, res) {
        const posts = await Post.find().sort("-createdAt");
        return res.json(posts);
    },
    async store(req, res) {
        const {
            autor,
            place,
            description,
            hasjtags
        } = req.body;
        const {
            filename: image
        } = req.file;

        const [name] = image.split(".");
        await sharp(req.file.path)
            .resize(500)
            .jpeg({
                quality: 70
            })
            .toFile(path.resolve(req.file.destination, "resized", name + ".jpeg"));

        fs.unlinkSync(req.file.path);

        const post = await Post.create({
            autor,
            place,
            description,
            hasjtags,
            image
        });

        return res.json(post);
    },
    async update(req, res) {}
};