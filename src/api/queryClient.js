import { ApolloClient, InMemoryCache } from '@apollo/client';
import environment from '../system/environment';

const queryClient = new ApolloClient({
    uri: environment.API_PATH,
    cache: new InMemoryCache(),
});

export default queryClient;