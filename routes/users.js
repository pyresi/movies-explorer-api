const router = require('express').Router();

const {
  patchUserInfo,
  getUserInfo
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', patchUserInfo);


module.exports = router;
