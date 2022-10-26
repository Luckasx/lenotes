import axios from "axios";

export const validateExistingUser = async (v) => {

    await axios.get(`api/user/${v}`)

    return false;
}