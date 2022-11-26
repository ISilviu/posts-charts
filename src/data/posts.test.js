import { extractHistogramData, transformPosts } from "./posts";

describe('posts functions', () => {

    describe('transformPosts', () => {
        test.each([
            null,
            undefined,

            { allPosts: null },
            {},
            { foo: 1 },
        ])('queryData is null or undefined, or its structure does not match', queryData => {
            const posts = transformPosts(queryData);
            expect(posts).toBeNull();
        });
    });

    describe('extractHistogramData', () => {
        test.each([null, undefined])('posts is null or undefined', posts => {
            const histogramData = extractHistogramData(posts);
            expect(histogramData).toBeNull();
        });
    });
}); 