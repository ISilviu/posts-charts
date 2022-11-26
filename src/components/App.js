import React from 'react';
import { useQuery } from "@apollo/client";
import queries from "../api/queries";
import QueryStateHandler from './QueryStateHandler';
import Histogram from './charts/Histogram';
import { extractHistogramData, transformPosts } from '../data/posts';

function App() {
    const postsCount = 5;
    const { loading, error, data } = useQuery(queries.allPosts, {
        variables: {
            count: postsCount,
        },
    });

    const histogramData = React.useMemo(
        () => {
            const posts = transformPosts(data);
            return extractHistogramData(posts);
        },
        [data]
    );

    const histogramAccessors = React.useMemo(
        () => ({
            xAccessor: item => item[0],
            yAccessor: item => item[1],
        }),
        []
    );

    return (
        <QueryStateHandler
            loading={loading}
            error={error}
            loadingComponent={<p>Loading your data ...</p>}
            errorComponent={<p>There has been an error fetching the data.</p>}
        >
            <h1>Posts-Charts</h1>
            <Histogram
                data={histogramData}
                accessors={histogramAccessors}
                yAxisLabel="Number of posts"
                xAxisLabel="Month"
            />
        </QueryStateHandler>
    );
}

export default App;
