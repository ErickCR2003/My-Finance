
import api from "./axios";

export const getAllAccounts = () => {
    return api.get("accounts/");
}

export const getAccountById = (id) => {
    return api.get(`accounts/${id}/`);
}

export const createAccount = (accountData) => {
    return api.post("accounts/", accountData);
}   

export const deleteAccount = (id) => {
    return api.delete(`accounts/${id}/`);
}  

export const updateAccount = (id, accountData) => {
    return api.put(`accounts/${id}/`, accountData);
}  
