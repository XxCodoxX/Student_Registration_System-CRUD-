import * as Actions from "./action";

const initialState = {
  USER_DATA: null,
};

const mainReducer = (state = initialState, action) => {
  switch (action?.type) {
    case Actions.ADD_USER_DATA: {
      return {
        ...state,
        USER_DATA: action?.payload,
      };
    }
    case Actions.RESET_MAIN_STORE: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
