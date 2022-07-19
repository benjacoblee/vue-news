export const generateURL = ({ val, page }) => {
    return val
        ? `/api/search?q=${val}&page=${page}`
        : `/api/search?page=${page}`;
};

export const truncateDesc = (str) => {
    return str.length > 250 ? str.substr(0, 250) + "..." : str;
};
