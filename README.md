[![Netlify Status](https://api.netlify.com/api/v1/badges/219f65f3-5d07-4820-9b0e-202aacadf9f7/deploy-status)](https://app.netlify.com/sites/regal-lebkuchen-ed23d2/deploys)

# Nwitter
[Nwitter](https://kimseoyeon23.github.io/nwitter)  
Twitter (mini)clone with React and Firebase
***
<br/>
<br/>

## 📌 Skill
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=white"/> <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind CSS&logoColor=white"/> <img alt="Javascript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=white"/> <img alt="Firebase" src="https://img.shields.io/badge/Firebase-FFCA28.svg?style=for-the-badge&logo=Firebase&logoColor=white"/>
<br/>
<br/>

## 📕 Version
1. Firebase version
   ```json
    "firebase": "^9.6.1",
   ```
2. React version
    ```json
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.4.4",
    "react-scripts": "5.0.1",
    ```


<br/>
<br/>

## Firebase config
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();
```
### env setting
```ini
REACT_APP_API_KEY = AIzaSyA9Q93o05NRY67VAA3PS7nQrPBY2QwhVY0
REACT_APP_AUTH_DOMAIN = nwitter-2105b.firebaseapp.com
REACT_APP_PROJECT_ID = nwitter-2105b
REACT_APP_STORAGE_BUCKET = nwitter-2105b.appspot.com
REACT_APP_MESSAGING_SENDER_ID = 589339232074
REACT_APP_APP_ID = 1:589339232074:web:16bdfacc8c3c8c989663b3
```
<br/>
<br/>

## Tailwind CSS
1. Tailwind css version
   ```json
   "tailwindcss": "^3.2.4"
   ```
2. config
    ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        screens: {
        sm: '320px',
        md: '420px',
        lg: '976px',
        xl: '1440px',
        },
        colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'black': '#000',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'slate': '#0f172a',
        'sky': '#0ea5e9',
        'red': {
            'light' : '#f87171',
            DEFAULT: '#ef4444',
        },
        'gray': '#374151',
        },
        fontFamily: {
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        },
        extend: {
        spacing: {
            '128': '32rem',
            '144': '36rem',
        },
        borderRadius: {
            '4xl': '2rem',
            'full': '9999px'
        }
        }
    },
    variants: {},
    plugins: [],
    }

    ```