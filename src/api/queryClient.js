import { ApolloClient, InMemoryCache } from '@apollo/client';

const queryClient = new ApolloClient({
    uri: 'https://fakerql.goosfraba.ro/graphql/',
    cache: new InMemoryCache(),
});

export default queryClient;