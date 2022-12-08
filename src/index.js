import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import {authService} from 'fbase';
import 'css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div className='bg-slate text-white h-screen'>
        <App />
    </div>
)
