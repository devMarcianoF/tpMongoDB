const express = require("express");
const router = express.Router();
const Article = require("../models/articleModel");
const {
    create,
    comments,
    applaud,
    showArticle,
    showAllArticles,
    deleteArticles,
    updateArticle,
} = require("../controllers/articleController");

router.get("/articles", showAllArticles);
router.get("/articles/create", (req, res) => {
    res.render("create");
});
router.get("/articles/:id", showArticle);
router.get("/articles/:id/comments", async (req, res) => {
    try {
        const id = req.params.id;
        const article = await Article.findById({ _id: id });
        res.render("comments", { article });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post("/articles", create);
router.post("/articles/:id/comments", comments);
router.post("/articles/:id/applaud", applaud);
router.post("/articles/:id/delete", deleteArticles);
router.post("/articles/:id/update", updateArticle);

module.exports = router;
