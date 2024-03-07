import {
  createCard,
  getAllCards,
  getCardById,
  getAllMyCards,
  updateCard,
  deleteCard,
} from "../model/cardsAdapter.js";
import handleError from "../utils/handleError.js";
import debug from "debug";
let log = debug("app:cardsController");

const getAllCardsController = async (req, res) => {
  try {
    let cards = await getAllCards();
    return res.json(cards);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const getCardByIdController = async (req, res) => {
  try {
    let card = await getCardById(req.params.id);
    return res.json(card);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const getMyCardsController = async (req, res) => {
  const userId = req.userData._id;
  try {
    let myCards = await getAllMyCards(userId);
    return res.json(myCards);
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const createCardController = async (req, res) => {
  try {
    const userId = req.userData._id;
    req.body.user_id = userId;
    let newCard = await createCard(req.body);
    return res.json(newCard)
  } catch (error) {
    log(error);
    handleError(res, 400, error.massage);
  }
};

const updateCardController = async (req, res) => {
  try {
    const updatedCard = await updateCard(req.params.id, req.body);
    return res.json(updatedCard);
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
};

const bizNumberController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let bizNum = req.body.bizNumber;
    let bizNumFromDb = req.userData.bizNumber;
    if (bizNum !== bizNumFromDb) {
      let card = await updateCard(req.params.id, {
        $set: { bizNumber: bizNum },
      });
      return res.json(card);
    }
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
};

const likeCardController = async (req, res) => {
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let cardId = req.params.id;
    let likeCard = await getCardById(cardId);
    let likeArray = likeCard.likes;
    let neededIndex = likeArray.filter((id) => id !== cardId);
    likeArray.includes(cardId)
      ? likeArray.splice(neededIndex, 1)
      : likeArray.push(cardId);
    let updateLike = await updateCard(cardId, likeCard);
    return res.json(updateLike);
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
};

const deleteCardController = async (req , res) =>{
  try {
    const cardFromDb = await getCardById(req.params.id);
    if (!cardFromDb) {
      throw new Error("Card not found");
    }
    let cardToDelete = await deleteCard(req.params.id);
    return res.json(cardToDelete);
  } catch (error) {
    log(error);
    handleError(res, 400, err.message);
  }
}

export {
  getAllCardsController,
  getCardByIdController,
  getMyCardsController,
  createCardController,
  updateCardController,
  bizNumberController,
  likeCardController,
  deleteCardController,
};