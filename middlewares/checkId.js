import { isValidObjectId } from "mongoose";

function checkId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        res.status(404);
        throw new Error(`Invalid object ID: ${req.params.id}`);
    } else {
        next();
    }
}

export default checkId;