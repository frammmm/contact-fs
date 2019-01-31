import path from "path";
import mime from "mime";
import multer from "multer";

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, next) => {
        next(null,
            `${req.user.email}_${path.parse(file.originalname).name}.${mime.getExtension(
                file.mimetype
            )}`
        );
    }
});

export default multer({ storage }).single("file");