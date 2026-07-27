import { ApolloClient, HttpLink, InMemoryCache, ApolloLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://spaceaiapp.com/backend/graphql",
});

// Attach Aibizmod JWT token when available.
// Priority: aibizmod_token (OTP user login) → NEXT_PUBLIC_ADMIN_GRAPHQL_TOKEN (admin panel)
const authLink = new ApolloLink((operation, forward) => {
  if (typeof window !== "undefined") {
    const userToken = localStorage.getItem("aibizmod_token");
    const isAdminSession = localStorage.getItem("admin_session") === "true";
    const adminToken = process.env.NEXT_PUBLIC_ADMIN_GRAPHQL_TOKEN || "";

    const token = userToken || (isAdminSession && adminToken ? adminToken : null);
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "network-only" },
    query: { fetchPolicy: "network-only" },
  },
});
