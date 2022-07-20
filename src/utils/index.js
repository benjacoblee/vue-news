import { CATEGORY, SEARCH } from "@/constants";

export const generateURL = ({ val, page, type }) => {
    switch (type) {
        case SEARCH: {
            return `/api/search?q=${val}&page=${page}`;
        }
        case CATEGORY: {
            return `/api/search?category=${val}&page=${page}`;
        }
        default:
            return `/api/search?page=${page}`;
    }
};

export const queryOptions = ({ searchTerm, searchCategory }) => {
    if (searchTerm) return { val: searchTerm, type: SEARCH };
    else if (searchCategory) return { val: searchCategory, type: CATEGORY };
    return false;
};

export const truncateDesc = (str) => {
    return str.length > 250 ? str.substr(0, 250) + "..." : str;
};
