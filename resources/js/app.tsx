import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from './Theme/theme';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        const root = createRoot(el);
        return root.render(
            <ThemeProvider theme={lightTheme}>
                <App {...props} />
            </ThemeProvider>
        );
    },
});

InertiaProgress.init({ color: '#4B5563' });
