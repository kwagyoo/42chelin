import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { persistStore } from 'redux-persist'; // 추가
import { PersistGate } from 'redux-persist/integration/react'; // 추가
import store from './module/store';
import ScrollToTop from './common/ScrollRestoration';

Sentry.init({
  dsn: 'https://3fc703a2984645aa91f00d13ae243bed@o1039410.ingest.sentry.io/6008337',
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    {/* https://github.com/remix-run/history/issues/822 */}
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
