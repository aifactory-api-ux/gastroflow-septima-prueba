export const tokens = {
  colors: {
    primary: "#E67E22",
    "primary-light": "#FBE9D7",
    "primary-dark": "#8A4C14",
    background: "#FFFFFF",
    surface: "#F8F9FA",
    "text-primary": "#212529",
    "text-secondary": "#6C757D",
    border: "#DEE2E6",
    error: "#DC3545",
    success: "#28A745"
  },
  typography: {
    "font-family": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    headings: {
      h1: "bold 28px/1.2",
      h2: "bold 22px/1.3",
      h3: "semibold 18px/1.4",
      h4: "semibold 16px/1.4"
    },
    body: "regular 16px/1.5",
    small: "regular 14px/1.5",
    caption: "regular 12px/1.4"
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },
  "border-radius": {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    full: "9999px"
  },
  shadows: {
    card: "0 2px 8px rgba(0,0,0,0.08)",
    elevated: "0 4px 16px rgba(0,0,0,0.12)",
    modal: "0 8px 32px rgba(0,0,0,0.2)"
  },
  "iconography": "Iconos lineales de 24x24px con trazo de 2px, usando la librería Lucide Icons. Color hereda del texto circundante o del color primario para acentos.",
  "image-style": "Imágenes de productos en formato 4:3 o 1:1, con bordes redondeados (8px) y sombra suave. Logo del restaurante centrado en la cabecera, altura máxima 60px.",
  motion: {
    "duration-fast": "150ms",
    "duration-normal": "300ms",
    easing: "ease-in-out"
  }
};