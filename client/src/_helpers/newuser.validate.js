//https://stackoverflow.com/questions/64469861/react-hook-form-handling-server-side-errors-in-handlesubmit
import axiosInstance from '../config/axios.config'

export const validateExistingUser = async (v) => {

    let res = (await axiosInstance.get(`api/user/${v}`)).data;

    return res.length === 0;
}