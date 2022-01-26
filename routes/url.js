const router = require('express').Router();

const { newUrl, getUrl } = require('../controllers/url');


router.route('/shorturl/new').post(newUrl);
router.route('/shorturl/:short_url').get(getUrl);


module.exports = router;