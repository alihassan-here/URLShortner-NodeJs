const shortid = require('shortid');
const URL = require('../models/url');
const validUrl = require('valid-url');


const newUrl = async (req, res) => {
    const { url_input } = req.body;
    const urlCode = shortid.generate();
    if (!validUrl.isWebUri(url_input)) {
        res.status(401).json({ error: 'invalid URL' })
    } else {
        try {
            let find = await URL.findOne({ original_url: url_input });
            if (find) {
                res.json({
                    original_url: find.original_url,
                    short_url: find.short_url
                });
            } else {
                find = new URL({
                    original_url: url_input,
                    short_url: urlCode
                });
                await find.save();
                res.json({
                    original_url: find.original_url,
                    short_url: find.short_url
                })
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server Error!')
        }
    }
}
const getUrl = async (req, res) => {
    try {

        const urlParams = await URL.findOne({
            short_url: req.params.short_url
        });
        if (urlParams) {
            return res.redirect(urlParams.original_url);
        } else {
            return res.status(404).json('NO URL FOUND!');
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error!');
    }
}


module.exports = {
    newUrl,
    getUrl,
}