const express = require('express');
const router = express.Router();
const Book = require('../Models/Book'); 


router.get('/all', async (req, res) => {
    try {
        const { genre } = req.query; 
        const books = await Book.find(genre ? { genre } : {}); 
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body); 
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: 'Sách đuọc xoá thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
