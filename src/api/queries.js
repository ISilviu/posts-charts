import { gql } from "@apollo/client"

const allPostsQuery = gql`
    query AllPosts($count: Int) {
        allPosts(count: $count) {
            createdAt
        }
    }
`;

const queries = {
    allPosts: allPostsQuery,
};

export default queries;
