import { ApolloClient, InMemoryCache } from '@apollo/client';

const queryClient = new ApolloClient({
    uri: process.env.REACT_APP_API_PATH,
    cache: new InMemoryCache(),
});

export default queryClient;