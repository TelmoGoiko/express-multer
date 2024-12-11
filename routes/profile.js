var express = require('express');
var router = express.Router();
const multer = require('multer')
const path = require('path')

// Multer storage konfigurazioa
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `avatar-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
  });

// Multer upload konfigurazioa
const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024 // 2MB-ko muga
    },
  });

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    // req.body will hold the text fields, if there were any
    res.send(`Zure izena:${req.body.name}. Fitxategia: ${req.file.filename}`);
})


module.exports = router;
