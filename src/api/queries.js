import { gql } from "@apollo/client"

const allPostsQuery = gql`
    query {
        allPosts(count: 200) {
            id
            createdAt
        }
    }
`;

const queries = {
    allPosts: allPostsQuery,
};

export default queries;
