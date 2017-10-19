const express = require('express');
const router = express.Router()
const Test = use('app/controllers/Test')
const Auth = use('app/middleware/authenticate')

// router.use(Auth.required)

router.get('/s/create', Auth.required, Test.create)
router.get('/create', Test.create)

module.exports = router
