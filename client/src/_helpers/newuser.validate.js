import axios from "axios";

export const validateExistingUser = async (v) => {

    let res = (await axios.get(`api/user/${v}`)).data;

    return res.length === 0;
}