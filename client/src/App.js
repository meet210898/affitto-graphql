import Admin from "./admin";
import User from "./user";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";

const middlewareUpdate = createUploadLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Apollo-Require-Preflight": "true",
      authorization: localStorage.getItem("adminToken") || "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(middlewareUpdate),
  cache: new InMemoryCache(),
});

const userAuthLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "Apollo-Require-Preflight": "true",
      // authorization: localStorage.getItem("adminToken") || "",
    },
  };
});

const userClient = new ApolloClient({
  link: userAuthLink.concat(middlewareUpdate),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Admin />
      </ApolloProvider>
      <ApolloProvider client={userClient}>
        <User />
      </ApolloProvider>
    </div>
  );
}

export default App;
