const express = require("express");
const router = express.Router();
const multer = require("multer");
const ImageKit = require("imagekit");
require("dotenv").config();

const upload = multer();

// ----------------------------------------------------------------------------------------

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_URL,
  publicKey: process.env.IMAGE_KIT_PK,
  privateKey: process.env.IMAGE_KIT_SK,
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

const cpUpload = upload.fields([
  { name: "image1" },
  { name: "image2" },
  { name: "image3" },
]);

router.post("/upload", upload.single("image"), (req, res, next) => {
  const files = req.files;
  const images = req.body;

  console.log("🚀 ~ file: imagekitApp.js:42 ~ router.post ~ files:", files);
  console.log("🚀 ~ file: imagekitApp.js:40 ~ router.post ~ images:", images);

  let imageStrings = {};

  // images.forEach((image) => {
  //   imagekit.upload(
  //     {
  //       file: image.file, //required
  //       fileName: image.fileName, //required
  //       extensions: [
  //         {
  //           name: "encostay-auto-tagging",
  //           maxTags: 5,
  //           minConfidence: 95,
  //         },
  //       ],
  //     },
  //     function (error, result) {
  //       if (error) console.log(error);
  //       else console.log(result);
  //     }
  //   );
  // });

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const filePath = req.file.path;
  console.log("File uploaded successfully:", filePath);

  // You can perform further processing here, such as saving the file path to a database

  // res.json({ success: true, filePath });

  return res.json({ data: "Upload successful", filePath });
});

module.exports = router;
