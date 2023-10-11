import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import SettingsProvider from './contexts/SettingsContext';
import StorageProvider from './contexts/StorageContext';
import { RecoilRoot } from 'recoil';
import { loadStripe } from '@stripe/stripe-js';
import { _get } from './helpers/api';
import Settings from './helpers/settings';
import { Elements } from '@stripe/react-stripe-js';





(async () => {
  const { serverBaseUrl } = Settings()

  const { data } = await _get(`${serverBaseUrl}/stripe/config`)

  console.log("🚀 ~ file: index.tsx:23 ~ data:", data)

  const stripePromise = loadStripe(data.stripePublishableKey!);
  // Make sure to call `loadStripe` outside of a component’s render to avoid
  // recreating the `Stripe` object on every render.


  const container = document.getElementById('root');
  const root = createRoot(container!);
  root.render(
    <React.StrictMode>
      <Elements stripe={stripePromise}>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </Elements>
    </React.StrictMode>
  );

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA
  serviceWorkerRegistration.unregister();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();

})()

