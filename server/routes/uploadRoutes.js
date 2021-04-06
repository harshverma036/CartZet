import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// Setting Up Storage
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Checking Images Only File Type
const checkFileTypes = (file, cb) => {
  const fileTypes = /jpg|png|jpeg/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimeType);

  if (extname && mimeType) {
    return cb(null, true);
  } else {
    return cb("Images only");
  }
};

// Init Upload
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

// Upload single image at once
router.route("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
