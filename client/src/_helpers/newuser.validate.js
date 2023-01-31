//https://stackoverflow.com/questions/64469861/react-hook-form-handling-server-side-errors-in-handlesubmit
import axios from "axios";

export const validateExistingUser = async (v) => {

    let res = (await axios.get(`api/user/${v}`)).data;

    return res.length === 0;
}