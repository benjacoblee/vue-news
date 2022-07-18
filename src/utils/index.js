export const generateURL = ({ val, page }) => {
    return val
        ? `/api/search?q=${val}&page=${page}`
        : `/api/search?page=${page}`;
};
