import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/"); 
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname); 
        cb(null, `${file.fieldname}-${Date.now()}${extname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetypes = /image\/jpeg|image\/png|image\/webp/;

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Image only!"), false);
    }
};

const upload = multer({ storage, fileFilter });
const uploadSinglePhoto = upload.single("image");


router.post("/", (req, res) => {
    uploadSinglePhoto(req, res, (err) => {
        if (err) {
            res.status(500).send({ message: err.message });
        } else if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/${req.file.path}`
            });
        } else {
            res.status(400).send({ message: "No file uploaded." });
        }
    });
});


export default router;