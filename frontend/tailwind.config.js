/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213d",
        steel: "#2f3e46",
        signal: "#e76f51",
        mint: "#2a9d8f",
        amber: "#f4a261",
        paper: "#f8fafc",
        void: "#05070d"
      },
      boxShadow: {
        panel: "0 18px 50px rgba(0, 0, 0, 0.08)",
        soft: "0 24px 70px rgba(15, 23, 42, 0.08)",
        paper: "0 28px 80px rgba(15, 23, 42, 0.16)"
      }
    }
  },
  plugins: []
};
