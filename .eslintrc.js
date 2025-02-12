import next from "@next/eslint-plugin-next";

export default [
  next(), // Configuración recomendada por Next.js
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];