import { ZodError } from "zod";
import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return next(
                    new ApiError(
                        400,
                        error.errors[0].message
                    )
                );
            }

            return next(error);
        }
    };
};

export default validate;