const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}", flowbite.content()],
  theme: {
    fontFamily: {
      poppins: "Poppins",
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
