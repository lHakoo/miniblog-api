const { Router } = require('express');
const ctrl = require('../controllers/postsController');

const router = Router();

router.get('/',                  ctrl.getAll);
router.get('/author/:authorId',  ctrl.getByAuthor);
router.get('/:id',               ctrl.getById);
router.post('/',                 ctrl.create);
router.put('/:id',               ctrl.update);
router.delete('/:id',            ctrl.remove);

module.exports = router;