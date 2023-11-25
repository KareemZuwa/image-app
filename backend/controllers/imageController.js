const multer = require("multer");
const ImageMetadata = require("../models/ImageMetadataModel");

const IMG_DIRECTORY_PATH = "public/img";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMG_DIRECTORY_PATH);
  },
  filename: (req, file, cb) => {
    // Check if the file type is either JPEG or PNG
    if (file.mimetype.startsWith('image/jpeg') || file.mimetype.startsWith('image/png')) {
      // Extract the extension
      const extension = file.mimetype.split("/")[1];

      // Process the name according to the specified rules
      const processedName = req.body.name
        .toLowerCase() // Convert to lowercase
        .replace(/\s+/g, '-') // Replace spaces with dashes
        .replace(/[åäö]/g, match => {
          // Replace å, ä, ö with a, a, o respectively
          switch (match) {
            case 'å':
              return 'a';
            case 'ä':
              return 'a';
            case 'ö':
              return 'o';
            default:
              return match;
          }
        }) // Remove å, ä, ö
        .substring(0, 10); // Take the first 10 characters

      // Get the current timestamp in the specified format
      const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);

      // Combine the processed name and timestamp with the extension
      const finalFileName = `${processedName}_${timestamp}.${extension}`;

      cb(null, finalFileName);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
    }
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.getAllImages = async (req, res, next) => {
  const data = await ImageMetadata.find();

  return res.status(200).json({
    status: "success",
    data: data,
  });
};

exports.uploadImage = upload.single("photo");

exports.createImageMetadata = async (req, res, next) => {
  const doc = await ImageMetadata.create({
    name: req.body.name,
    path: `/img/${req.file.filename}`,
  });

  if (!doc) {
    return res.status(400).json({
      status: "fail",
      message: "invalid input",
    });
  }

  return res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
};
