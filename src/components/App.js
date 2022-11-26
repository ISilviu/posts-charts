import React from 'react';
import { useQuery } from "@apollo/client";
import queries from "../api/queries";
import QueryStateHandler from './QueryStateHandler';

function App() {
    const { loading, error } = useQuery(queries.allPosts);

    return (
        <QueryStateHandler
            loading={loading}
            error={error}
            loadingComponent={<p>Loading your data ...</p>}
            errorComponent={<p>There has been an error fetching the data.</p>}
        >
            <h1>Posts-Charts</h1>
        </QueryStateHandler>
    );
}

export default App;
