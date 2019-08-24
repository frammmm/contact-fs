import path from "path";
import mime from "mime";
import multer from "multer";

import User from "../../models/User.model";

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, next) => {
        next(null,
            `${req && req.user ? (req.user as User).email : ''}_${path.parse(file.originalname).name}.${mime.getExtension(
                file.mimetype
            )}`
        );
    }
});

export default multer({ storage }).single("file");
