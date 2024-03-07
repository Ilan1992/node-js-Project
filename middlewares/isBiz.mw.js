import { getCardById } from "../model/cardsAdapter.js";
import handleError from "../utils/handleError.js";

const isBizMiddleware = async (req, res, next) => {
  if (!req.userData) {
    throw new Error("Card not found");
  }
  const cardObject = await getCardById(req.params.id);
  if (
    (cardObject && req.userData._id !== cardObject?.user_id.toString()) ||
    !req.userData.isBusiness
  ) {
    return handleError(res, 401, "You are not allowed");
  }
  next();
};
export default isBizMiddleware;
