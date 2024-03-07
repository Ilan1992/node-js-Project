import {
  createCardMongo,
  getAllCardsMongo,
  getCardByIdMongo,
  getCardByBizNumberMongo,
  getAllMyCardsMongo,
  updateCardMongo,
  deleteCardMongo,
} from "./mongoDB/cards/cardService.js";
import normalizeCards from "../normalize/card.normalize.js";

const DB = "mongo";

const createCard = async (card) => {
  card = await normalizeCards(card);
  if (DB === "mongo") {
    return createCardMongo(card);
  }
};

const getCardByBizNumber = (bizNumber) => {
  if (DB === "mongo") {
    return getCardByBizNumberMongo(bizNumber);
  }
};

const getAllCards = () => {
  if (DB === "mongo") {
    return getAllCardsMongo();
  }
};

const getCardById = (id) => {
  if (DB === "mongo") {
    return getCardByIdMongo(id);
  }
};

const getAllMyCards = (user_id) => {
  if (DB === "mongo") {
    return getAllMyCardsMongo(user_id);
  }
};

const updateCard = (id, card) => {
  if (DB === "mongo") {
    return updateCardMongo(id, card);
  }
};

const deleteCard = (id) => {
  if (DB === "mongo") {
    return deleteCardMongo(id);
  }
};

export {
  createCard,
  getCardByBizNumber,
  getAllCards,
  getCardById,
  getAllMyCards,
  updateCard,
  deleteCard,
};