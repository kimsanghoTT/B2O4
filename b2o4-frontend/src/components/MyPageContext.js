import React, { createContext } from "react";

const MyPageContext = createContext({
  loginMember: null,
  setLoginMember: () => {},
  basketList: [],
  setBasketList: () => {},
  reviewList: [],
  setReviewList: () => {},
});

export default MyPageContext;
