// src/react-app-env.d.ts

/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_URL: string;
      REACT_APP_API_ENDPOINT: string;
      REACT_APP_NAME: string;  // Add this line if missing
    }
  }
  