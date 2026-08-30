import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.server';

export function render(url, initialData) {
  const helmetContext = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App initialData={initialData} />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return { appHtml, helmet };
}
