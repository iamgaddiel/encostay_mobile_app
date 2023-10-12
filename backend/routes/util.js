const express = require('express')
const router = express.Router()





router.post('/logger', (req, res) => {
    const {timestamp, errorMessage, file, lineNumber } = req
    console.log(`🚀 ~ App Error ~ file: util.js:10 ~ router.post ~ timestamp: ${timestamp}, errorMessage: ${errorMessage}, file: ${file}, lineNumber: ${lineNumber} }:`)
})



module.exports = router