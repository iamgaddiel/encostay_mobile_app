const express = require("express");
const router = express.Router();
const multer = require("multer");
const ImageKit = require("imagekit");
require("dotenv").config();

const upload = multer({ dest: "images/" });

// ----------------------------------------------------------------------------------------

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_URL,
  publicKey: process.env.IMAGE_KIT_PK,
  privateKey: process.env.IMAGE_KIT_SK,
});

// allow cross-origin requests
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// [Route Handleres] ----------------------------------------------------------------------------------------
// imagekit authentication endpoint
router.get("/auth", function (req, res) {
  /**
   * Result Structure
     * {
    token: "5dd0e211-8d67-452e-9acd-954c0bd53a1f",
    expire: 1601047259,
    signature: "dcb8e72e2b6e98186ec56c62c9e62886f40eaa96"
    }
     */
  var result = imagekit.getAuthenticationParameters();
  res.send(result);
});

router.post("/create_metadata", function (req, res) {
  imagekit.createCustomMetadataField(
    {
      name: req.body.name,
      label: req.body.name,
      schema: {
        type: "Text",
      },
    },
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(400).send({'message': error})
      } else {
        console.log(result);
        return res.status(201).send({ message: result }, 201);
      }
    }
  );

  if (!req.body.name) {
    return res.status(400).send({ message: "missing value `name`" });
  }
  // return res.send({'message': 'Metadata created successfully'})
});


// Update Metadata
router.post("/create_metadata", function (req, res) {
  imagekit.createCustomMetadataField(
    {
      name: req.body.name,
      label: req.body.name,
      schema: {
        type: "Text",
      },
    },
    function (error, result) {
      if (error) {
        console.log(error);
        return res.status(400).send({'message': error})
      } else {
        console.log(result);
        return res.status(201).send({ message: result }, 201);
      }
    }
  );

  if (!req.body.name) {
    return res.status(400).send({ message: "missing value `name`" });
  }
  // return res.send({'message': 'Metadata created successfully'})
});
module.exports = router;
