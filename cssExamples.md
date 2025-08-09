.dark {
  /* BASE LAYOUT COLORS */
  --vp-c-bg: #121212;                  /* Main background color (page body) */
  --vp-c-bg-soft: #1e1e1e;             /* Slightly darker background for cards/sections */
  --vp-c-bg-muted: #252525;            /* Muted background for subtle elements (like code blocks) */
  --vp-c-fg: #ffffff;                  /* Foreground color (used for text/icons on dark backgrounds) */
  --vp-c-text: #e0e0e0;                /* Primary text color (main content) */
  --vp-c-text-1: #f5f5f5;              /* Highest emphasis text (headings, important labels) */
  --vp-c-text-2: #b0b0b0;              /* Secondary text (captions, metadata) */
  --vp-c-text-3: #808080;              /* Tertiary text (very subtle elements, disabled states) */
  
  /* BRAND COLORS (customize these for your theme identity) */
  --vp-c-brand: #7f5af0;               /* Primary brand color (active links, buttons, highlights) */
  --vp-c-brand-light: #a98bf5;         /* Lighter brand variant (hover states) */
  --vp-c-brand-lighter: #c2abfa;       /* Even lighter brand variant (subtle highlights) */
  --vp-c-brand-dark: #5a38d9;          /* Darker brand variant (active states, pressed buttons) */
  
  /* STATE COLORS (for alerts, badges, status indicators) */
  --vp-c-green: #26a773;               /* Success state color */
  --vp-c-green-light: #43d09c;         /* Light success state (hover variants) */
  --vp-c-blue: #3182f6;                /* Info state color */
  --vp-c-blue-light: #63a8f9;          /* Light info state */
  --vp-c-red: #e55151;                 /* Error state color */
  --vp-c-red-light: #f07d7d;           /* Light error state */
  --vp-c-yellow: #f59f39;              /* Warning state color */
  --vp-c-yellow-light: #f9b77d;        /* Light warning state */
  
  /* CODE HIGHLIGHTING (syntax-specific colors) */
  --vp-c-code-bg: #1e293b;             /* Code block background */
  --vp-c-code-token-punctuation: #cdd6f4; /* Syntax punctuation (brackets, commas) */
  --vp-c-code-token-property: #cba6f7;   /* Object properties */
  --vp-c-code-token-selector: #f5c2e7;   /* CSS selectors */
  --vp-c-code-token-operator: #a6adc8;   /* Operators (=, +, etc.) */
  --vp-c-code-token-function: #f5c2e7;   /* Function names */
  --vp-c-code-token-string: #a6e3a1;     /* String literals */
  --vp-c-code-token-boolean: #fab387;    /* Boolean values (true/false) */
  --vp-c-code-token-number: #fab387;     /* Numeric values */
  --vp-c-code-token-constant: #cba6f7;   /* Constants (like Math.PI) */
  --vp-c-code-token-keyword: #cba6f7;    /* Language keywords (const, let, if) */
  --vp-c-code-token-namespace: #f5c2e7;  /* Namespace identifiers */
  --vp-c-code-token-class-name: #f5c2e7; /* Class names */
  --vp-c-code-token-regex: #a6e3a1;      /* Regular expressions */
  --vp-c-code-token-symbol: #f5c2e7;     /* Symbol identifiers */
  --vp-c-code-token-inserted: #43d09c;   /* Git diff insertions (+ lines) */
  --vp-c-code-token-deleted: #e55151;    /* Git diff deletions (- lines) */
  
  /* UI ELEMENTS */
  --vp-c-divider: #333333;              /* Main divider lines (between sections) */
  --vp-c-divider-light: #2a2a2a;        /* Subtle divider lines (less prominent) */
  --vp-c-button-hover: #333333;         /* Button background on hover */
  --vp-c-button-active: #404040;        /* Button background when pressed */
  --vp-c-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.25); /* Small shadows (cards, dropdowns) */
  --vp-c-shadow-2: 0 4px 8px rgba(0, 0, 0, 0.3);  /* Larger shadows (modals, prominent elements) */
  
  /* SIDEBAR SPECIFIC */
  --vp-sidebar-bg: #181818;             /* Sidebar background */
  --vp-sidebar-bg-soft: #1e1e1e;        /* Sidebar section backgrounds */
  --vp-sidebar-border: #333333;         /* Sidebar border color */
  --vp-sidebar-link-text: #b0b0b0;      /* Inactive sidebar link text */
  --vp-sidebar-link-text-active: #ffffff; /* Active/current sidebar link text */
  --vp-sidebar-link-hover: #2a2a2a;     /* Sidebar link background on hover */
  
  /* NAVIGATION SPECIFIC */
  --vp-nav-bg: #121212;                 /* Top navigation bar background */
  --vp-nav-border: #333333;             /* Navigation bar bottom border */
  --vp-nav-height: 64px;                /* Navigation bar height */
  --vp-nav-link-text: #b0b0b0;          /* Navigation link text */
  --vp-nav-link-hover: #2a2a2a;         /* Navigation link background on hover */
  --vp-nav-screen-bg: #181818;          /* Mobile navigation screen background */
  
  /* HOME PAGE SPECIFIC */
  --vp-home-hero-name-color: #ffffff;   /* Hero section main title color */
  --vp-home-hero-image-filter: none;    /* Filter applied to hero image */
  
  /* SCROLLBAR */
  --vp-scroll-thumb: #404040;           /* Scrollbar thumb (the draggable part) */
  --vp-scroll-track: #181818;           /* Scrollbar track (background behind thumb) */
}