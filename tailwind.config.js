/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui"), require("tailwindcss-animate")],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--b1": "96.23% 0.0121 296.35",
          "--p": "48.23% 0.2694 285.02",
          "--fallback-pc": "#ffffff",
          "--fallback-er": "#DE3D3D",
          "--fallback-b1": "#f3f4f6",
          "--gray": "#5B5471",
          "--primary": "#5e17eb",
          ".input-bordered": {
            "border-color": "#CECCD5",
          },
          ".input-md": {
            "height": "2.5rem",
          },
          ".input-sm": {
            "height": "2rem",
          },
          ".btn": {
            "font-weight": "500",
            "animation": "none"
          },
          ".btn-md": {
            "height": "2.5rem",
            "min-height": "2.5rem",
          },
          ".btn-square": {
            "height": "2.5rem",
            "width": "2.5rem",
            "min-height": "2.5rem",
          },
          "h3": {
            "font-size": "1.25rem",
            "font-weight": "bold"
          },
          ".file-input-md": {
            "height": "2.5rem"
          }
        },
      },
    ],
  },
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
    },
  },
};
