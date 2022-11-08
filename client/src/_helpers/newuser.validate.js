import axios from "axios";

export const validateExistingUser = async (v) => {

    let res = (await axios.get(`api/user/${v}`)).data;

    console.log("new user?", res.length === 0);

    return res.length === 0;
}