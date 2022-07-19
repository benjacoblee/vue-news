module.exports = {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screens: {
                xs: { max: "639px" }
                // => @media (min-width: 576px) { ... }
            }
        }
    },
    plugins: []
};
