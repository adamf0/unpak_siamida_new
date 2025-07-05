import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import {VersionProvider} from './Context/VersionContext'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        console.log(name)
        return pages[`./Pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
        <VersionProvider>
            <App {...props} />
        </VersionProvider>);
    },
});