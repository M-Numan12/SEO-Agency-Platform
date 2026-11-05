const router=require('express').Router(),c=require('../controllers/publicController');router.get('/services',c.services);router.get('/blogs',c.blogs);module.exports=router;
