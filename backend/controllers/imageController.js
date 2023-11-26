const multer = require("multer");
const sharp = require("sharp");
const ImageMetadata = require("../models/ImageMetadataModel");

const IMG_DIRECTORY_PATH = "public/img";

const multerStorage = multer.memoryStorage(); // Use memory storage for resizing during upload

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
  try {
    if (!req.file) {
      throw new Error("No file provided");
    }

    const { buffer, mimetype } = req.file;

    if (!(mimetype.startsWith("image/jpeg") || mimetype.startsWith("image/png"))) {
      throw new Error("Invalid file type. Only JPEG and PNG files are allowed.");
    }

    const extension = mimetype.split("/")[1];

    const processedName = req.body.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[åäö]/g, match => {
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
      })
      .substring(0, 10);

    const timestamp = new Date().toISOString().replace(/[-:T]/g, '').substring(0, 14);
    const finalFileName = `${processedName}_${timestamp}.${extension}`;

    // Resize image using sharp during upload
    const resizedBuffer = await sharp(buffer)
      .resize({ width: 400, height: 400 }) // Adjust dimensions as needed
      .toBuffer();

    // Save the resized image to the destination
    const imagePath = `${IMG_DIRECTORY_PATH}/${finalFileName}`;
    await sharp(resizedBuffer).toFile(imagePath);

    // Save metadata to the database
    const doc = await ImageMetadata.create({
      name: req.body.name,
      path: `/img/${finalFileName}`,
    });

    return res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};