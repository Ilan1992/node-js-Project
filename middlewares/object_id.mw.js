import handleError from "../utils/handleError.js";
import { objectIdValidation } from "../validation/validationAdapter.js";

const objectIdParamsValidationMiddleware = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    await objectIdValidation(id);
    next();
  } catch (err) {
    handleError(res, 400, err.message);
  }
};

export default objectIdParamsValidationMiddleware;
