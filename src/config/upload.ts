import cryptyo from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
    upload(folder: string): multer.Options {
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),
                filename: (request, file, callback) => {
                    const fileHash = cryptyo.randomBytes(16).toString("hex");
                    const filename = `${fileHash}-${file.originalname}`;

                    return callback(null, filename);
                },
            }),
        };
    },
};
