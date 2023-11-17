import * as Actions from "./action";

const initialState = {
  USER_DATA: null,
  TOKEN:null
};

const mainReducer = (state = initialState, action) => {
  switch (action?.type) {
    case Actions.ADD_USER_DATA: {
      return {
        ...state,
        USER_DATA: action?.payload,
      };
    }
    case Actions.ADD_TOKEN: {
      return {
        ...state,
        TOKEN: action?.payload,
      };
    }
    case Actions.RESET_MAIN_STORE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default mainReducer;
