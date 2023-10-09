const express = require('express')
const { fetchBlogData } = require('../middleware/curlRequest')
const { blogStats, blogSearch } = require('../controller/blogController')
const router = express.Router()


router.get('/blog-stats',fetchBlogData,blogStats)
router.get('/blog-search',fetchBlogData,blogSearch)


module.exports = router