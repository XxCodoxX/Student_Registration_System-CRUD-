export const RESET_MAIN_STORE = "MAIN_COMPONENT - RESET_MAIN_STORE";
export const ADD_USER_DATA = "MAIN_COMPONENT - ADD_USER_DATA";
export const ADD_TOKEN = "MAIN_COMPONENT - ADD_TOKEN";

export function addUserData(data) {
  return {
    type: ADD_USER_DATA,
    payload: data,
  };
}

export function addToken(data) {
  return {
    type: ADD_TOKEN,
    payload: data,
  };
}

export function resetMainStor() {
    return {
      type: RESET_MAIN_STORE,
    };
  }
