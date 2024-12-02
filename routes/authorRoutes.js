const express = require('express');
const router = express.Router();
const Author = require('../Models/Author'); 


router.get('/all', async (req, res) => {
    try {
        const authors = await Author.find(); 
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ message: 'Tac gia khong ton tai' });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/post', async (req, res) => {
    try {
        const newAuthor = new Author(req.body); 
        const savedAuthor = await newAuthor.save();
        res.json(savedAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tác Giả đã được xóa thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
