const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { listItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemController');

router.get('/', auth, listItems);
router.get('/:id', auth, getItem);
router.post('/', auth, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
