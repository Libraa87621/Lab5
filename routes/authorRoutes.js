const express = require('express');
const router = express.Router();
const Author = require('../Models/Author'); // Import model Author

// GET /authors - Lấy danh sách tác giả
router.get('/all', async (req, res) => {
    try {
        const authors = await Author.find(); // Lấy tất cả tác giả
        res.json(authors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /authors/:id - Lấy thông tin chi tiết của tác giả theo ID
router.get('/:id', async (req, res) => {
    try {
        const author = await Author.findById(req.params.id); // Lấy tác giả theo ID
        if (!author) return res.status(404).json({ message: 'Author not found' });
        res.json(author);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /authors - Thêm tác giả mới
router.post('/post', async (req, res) => {
    try {
        const newAuthor = new Author(req.body); 
        const savedAuthor = await newAuthor.save();
        res.json(savedAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /authors/:id - Cập nhật thông tin tác giả
router.put('/:id', async (req, res) => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAuthor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /authors/:id - Xóa tác giả
router.delete('/:id', async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.json({ message: 'Author deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
