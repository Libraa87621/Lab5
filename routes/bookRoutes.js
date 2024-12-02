const express = require('express');
const router = express.Router();
const Book = require('../Models/Book'); // Import model Book

// GET /books - Lấy danh sách sách
router.get('/all', async (req, res) => {
    try {
        const { genre } = req.query; // Query parameter
        const books = await Book.find(genre ? { genre } : {}); // Lọc theo genre nếu có
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /books - Thêm sách mới
router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body); // Dữ liệu từ body
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /books/:id - Cập nhật sách
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /books/:id - Xóa sách
router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
