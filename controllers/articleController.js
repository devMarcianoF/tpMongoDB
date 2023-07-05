const Article = require("../models/articleModel");

const create = async (req, res) => {
    const { title, content } = req.body;
    try {
        const article = new Article({ title, content });
        const savedArticle = await article.save();
        res.status(201).json(savedArticle);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la sauvegarde" });
    }
};

const showArticle = async (req, res) => {
    const id = req.params.id;
    try {
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ error: "Article non trouvé" });
        }
        res.status(200).render("show", { article });
    } catch (error) {
        res.json({ message: "Article non trouvé" });
    }
};

const showAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).render("articles", { articles });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const comments = async (req, res) => {
    try {
        const { id } = req.params;
        const { author, content } = req.body;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ error: "Article non trouvé" });
        }
        const comment = { author, content };
        article.comments.push(comment);
        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'ajout" });
    }
};

const applaud = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findById(id);
        if (!article) {
            return res.status(404).json({ error: "Article non trouvé" });
        }
        article.applauseCount++;
        const updatedArticle = await article.save();
        res.json(updatedArticle);
    } catch (error) {
        res
            .status(500)
            .json({ error: "Erreur lors de l'ajout d'applaudissements" });
    }
};

const deleteArticles = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(201).json({ message: "Article supprimé" });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updateArticle = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            { title: req.body.title, content: req.body.content },
            { new: true }
        );
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(201).json({ message: "Article mis à jour" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

module.exports = {
    create,
    comments,
    applaud,
    showArticle,
    showAllArticles,
    deleteArticles,
    updateArticle
};
