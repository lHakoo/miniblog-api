const { Router } = require('express');
const ctrl = require('../controllers/commentsController');

const router = Router();

router.get('/post/:postId', ctrl.getByPost);
router.post('/',            ctrl.create);
router.delete('/:id',       ctrl.remove);

module.exports = router;