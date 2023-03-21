import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import { setContext } from "apollo-link-context";

const middlewareUpdate = createUploadLink({ uri: "http://localhost:4000/graphql" });
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'Apollo-Require-Preflight': 'true',
      authorization: localStorage.getItem('adminToken') || ""
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(middlewareUpdate),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
