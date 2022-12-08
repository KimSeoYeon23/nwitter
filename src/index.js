import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import 'css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='bg-black text-white h-screen'>
        <App />
    </div>
)
