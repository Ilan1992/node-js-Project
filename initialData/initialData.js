import { createCard } from "../model/cardsAdapter.js";
import { createUser, getUserByEmail } from "../model/usersAdapter.js";
import generateUniqueNumber from "../utils/generateUniqueNumber.js";
import debug from "debug";
const log = debug("app:initialData");

const initialUsers = async () => {
  let users = [
    {
      name: {
        first: "albert",
        last: "mc",
      },
      phone: "0500000000",
      email: "albert@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "miami",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: false,
      isAdmin: false,
    },
    {
      name: {
        first: "jon",
        last: "lennon",
      },
      phone: "0500000000",
      email: "johnn@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "asd",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: true,
      isAdmin: true,
    },
    {
      name: {
        first: "json",
        last: "staten",
      },
      phone: "0500000000",
      email: "jamees@gmail.com",
      password: "$2a$10$Tq3AH1Z0uEHo7MKbqMaUPOufejlQ8j8/Qs1Pne9YeKcyqOQVX28NK",
      image: {
        alt: "http://www.google.com",
      },
      address: {
        country: "israel",
        city: "asd",
        street: "asd",
        houseNumber: 10,
        zip: 12345,
      },
      isBusiness: true,
      isAdmin: false,
    },
  ];
  try {
    let bizId = "";
    let checkEmail = await getUserByEmail(users[0].email);
    if (checkEmail && checkEmail.email === users[0].email) return;
    for (let user of users) {
      let userFromDb = await createUser(user);
      if (!user.isAdmin && user.isBusiness) {
        bizId = userFromDb._id;
      }
    }
    return bizId;
  } catch (err) {
    log(err);
    return "";
  }
};

const initialCards = async (bizId) => {
  let cards = [
    {
      title: "car seller",
      subtitle: "sub card 1",
      description: "fun card",
      phone: "0500000000",
      email: "card1@gmail.com",
      address: {
        country: "USA",
        city: "New York",
        street: "street 1",
        houseNumber: 10,
      },
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
    },
    {
      title: "both seller",
      subtitle: "sub card 2",
      description: "description card 2",
      phone: "0500000000",
      email: "card2@gmail.com",
      address: {
        country: "USA",
        city: "New York",
        street: "street 1",
        houseNumber: 10,
      },
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
    },
    {
      title: "a wonderful new card",
      subtitle: "a test value for this card",
      description: "a test  test value for new",
      phone: "012-3211234",
      email: "qwe@gmail.com",
      web: "www.bing.com",
      image: {
        url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
        alt: "image of something",
      },
      address: {
        state: "IL",
        country: "Israel",
        city: "Arad",
        street: "Shoham",
        houseNumber: 5,
        zip: 8920435,
      },
      bizNumber: await generateUniqueNumber(),
      user_id: bizId,
    },
  ];
  try {
    for (let card of cards) {
      await createCard(card);
    }
  } catch (err) {
    log(err);
  }
};

export { initialUsers, initialCards };
