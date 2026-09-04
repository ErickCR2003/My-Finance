import api from "./axios";

export const getDashboardSummary = (accountId = null) => {
    const url = accountId === null ? "dashboard/" : `dashboard/?account=${accountId}`;

    return api.get(url);
};
