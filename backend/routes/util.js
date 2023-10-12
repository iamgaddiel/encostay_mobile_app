const express = require('express')
const bodyParser = require("body-parser");

const router = express.Router()
router.use(bodyParser.json())


router.post('/logger', (req, res) => {
    const {errorMessage, file, lineNumber, user } = req.body
    const timestamp = new Date()
    console.log(`🚀 ~ App Error  ~ user: ${user} ~ timestamp: ${timestamp}, errorMessage: ${errorMessage}, file: ${file}, lineNumber: ${lineNumber} `)
})



module.exports = router