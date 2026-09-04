import api from "./axios";

export const getAllTransactions = () => {
    return api.get("transactions/");
};

export const getTransactionById = (id) => {
    return api.get(`transactions/${id}/`);
};

export const createTransaction = (transactionData) => {
    return api.post("transactions/", transactionData);
};

export const updateTransaction = (id, transactionData) => {
    return api.put(`transactions/${id}/`, transactionData);
};

export const deleteTransaction = (id) => {
    return api.delete(`transactions/${id}/`);
};

export const getRecentTransactions = (accountId = null) => {
    const url =
        accountId === null
            ? "transactions/?limit=5"
            : `transactions/?account=${accountId}&limit=5`;

    return api.get(url);
};
