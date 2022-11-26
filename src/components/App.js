import React from 'react';
import { useQuery } from "@apollo/client";
import queries from "../api/queries";
import QueryStateHandler from './QueryStateHandler';

const desiredYear = 2019;
function transformPosts(queryData) {
    let posts = null;

    if (queryData && queryData.allPosts) {
        posts = queryData.allPosts
            .map(post => {
                let createdAt = null;
                const parsedCreatedAt = Number.parseFloat(post.createdAt);

                if (!Number.isNaN(parsedCreatedAt)) {
                    const dateCreated = new Date(parsedCreatedAt);
                    createdAt = {
                        year: dateCreated.getFullYear(),
                        month: dateCreated.getMonth(),
                    };
                }

                return {
                    ...post,
                    createdAt,
                };

            })
            .filter(({ createdAt }) =>
                createdAt !== null && createdAt.year === desiredYear
            );
    }

    return posts;
}

function App() {
    const { loading, error, data } = useQuery(queries.allPosts);

    const posts = React.useMemo(
        () => transformPosts(data),
        [data]
    );

    return (
        <QueryStateHandler
            loading={loading}
            error={error}
            loadingComponent={<p>Loading your data ...</p>}
            errorComponent={<p>There has been an error fetching the data.</p>}
        >
            <h1>Posts-Charts</h1>
            {posts?.map(({ id, createdAt: { year, month } }) => <p key={id}>{`Created at: ${month}.${year}`}</p>)}
        </QueryStateHandler>
    );
}

export default App;
