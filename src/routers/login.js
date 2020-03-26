import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
    res.render('pages/index');
});

router.get('/register', (req, res) => {
    res.render('pages/register');
});

export default router;
