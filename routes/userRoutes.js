const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // Import model User

// GET /user - Lấy danh sách người dùng
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /user/:id - Lấy thông tin chi tiết của người dùng theo ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /user - Thêm người dùng mới
router.post('/post', async (req, res) => {
    try {
        const newUser = new User(req.body); // Tạo người dùng mới từ dữ liệu nhận được
        const savedUser = await newUser.save();
        res.json(savedUser);  // Trả về người dùng vừa được lưu
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /user/:id - Cập nhật thông tin người dùng
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /user/:id - Xóa người dùng theo ID
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
