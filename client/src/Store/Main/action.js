import { logout } from "../../Service/auth.service";
import axiosInstance from "../../Service/customAxios.service";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const RESET_MAIN_STORE = "MAIN_COMPONENT - RESET_MAIN_STORE";
export const ADD_USER_DATA = "MAIN_COMPONENT - ADD_USER_DATA";

export const getLogUserData = () => async (dispatch)=> {
  try {

    const { data } = await axiosInstance.get(
      BASE_URL + '/auth/logUser'
    );

    dispatch({
      type: ADD_USER_DATA,
      payload: data.data,
    });
    
  } catch (error) {
    console.log(error);
    logout();
    window.location = '/';
    
  }
}

export function resetMainStor() {
    return {
      type: RESET_MAIN_STORE,
    };
  }
