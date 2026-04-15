import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Aavya logo-aligned primary pair (navy + sky)
        navy: {
          50: "#F3F5FA",
          100: "#E4E8F2",
          200: "#C3CBDD",
          300: "#9AA6C2",
          400: "#6773A0",
          500: "#3E4B7A",
          600: "#2A345A",
          700: "#1F2A4A",
          800: "#1C2947", // logo navy
          900: "#121B33",
          950: "#0B1022",
        },
        sky: {
          50: "#EEF8FD",
          100: "#D6EEF9",
          200: "#ADDEF3",
          300: "#7FCAEB",
          400: "#50B6E5",
          500: "#2EA9E0", // logo sky
          600: "#1F8DC0",
          700: "#1A6F98",
          800: "#165670",
          900: "#0F3A4D",
        },
        paper: {
          50: "#FFFFFF",
          100: "#F7F9FC",
          200: "#EEF2F7",
          300: "#E1E7EF",
          400: "#C9D1DD",
        },
        violet: {
          50: "#F3EEFE",
          100: "#E4D7FC",
          200: "#C8B0F8",
          300: "#AB89F4",
          400: "#8F62F1",
          500: "#7F5AF0", // Electric Violet (primary)
          600: "#6A45D6",
          700: "#5534AB",
          800: "#3F2680",
          900: "#281755",
          950: "#1B0F3A",
        },
        mint: {
          50: "#E8F8F1",
          100: "#C6EDDB",
          200: "#92DDBC",
          300: "#5ECD9D",
          400: "#2CB67D", // Mint (accent)
          500: "#24996A",
          600: "#1C7A54",
          700: "#155B3F",
          800: "#0E3D2A",
          900: "#071E15",
        },
        ink: {
          950: "#07041A",
          900: "#0B0620", // dark bg start
          800: "#12093A",
          700: "#1B0F3A", // dark bg end
          600: "#261B52",
          500: "#3A2C6F",
          400: "#6A5E94",
          300: "#9C93BC",
          200: "#C6C1DB",
          100: "#E4E6EB", // primary text on dark
          50: "#F5F5F8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #0B0620 0%, #1B0F3A 55%, #261B52 100%)",
        "violet-glow":
          "radial-gradient(circle at 30% 20%, rgba(127,90,240,0.35), transparent 60%)",
        "mint-glow":
          "radial-gradient(circle at 80% 80%, rgba(44,182,125,0.22), transparent 55%)",
      },
      boxShadow: {
        float: "0 20px 60px -20px rgba(127, 90, 240, 0.35)",
        card: "0 10px 40px -10px rgba(11, 6, 32, 0.6)",
        ring: "0 0 0 1px rgba(228,230,235,0.08)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "22px",
        "3xl": "32px",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s cubic-bezier(0.2,0.8,0.2,1) both",
        shimmer: "shimmer 8s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
