/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        "purple": "var(--purple)",
        "purple-hover": "var(--purple-hover)",
        "red":"var(--red)",
        "red-hover":"var(--red-hover)",
        "dark-blue":"var(--dark-blue)",
        "blue":"var(--blue)",
        "light-blue":"var(--light-blue)",
        "light-grey":"var(--light-grey)",
        "grey":"var(--grey)",
        "black":"var(--black)",
        "black2":"var(--black2)",
        "light-bg":"var(--light-bg)"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
