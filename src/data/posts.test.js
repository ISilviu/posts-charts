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

        test('query data is properly transformed', () => {
            const queryData = {
                allPosts: [
                    {
                        createdAt: '1552447290285',
                    },
                    {
                        createdAt: '1551158578751',
                    },
                    {
                        createdAt: '1567711305251',
                    },
                ],
            };

            const posts = transformPosts(queryData);
            expect(posts).toStrictEqual([
                {
                    createdAt: {
                        year: 2019,
                        month: 2,
                    },
                },
                {
                    createdAt: {
                        year: 2019,
                        month: 1,
                    },
                },
                {
                    createdAt: {
                        year: 2019,
                        month: 8,
                    },
                },
            ]);
        });

        test('posts from other years than 2019 are filtered out', () => {
            const queryData = {
                allPosts: [
                    {
                        createdAt: '1637921828',
                    },
                    {
                        createdAt: '1637921828',
                    },
                    {
                        createdAt: '1567711305251',
                    },
                ],
            };

            const posts = transformPosts(queryData);
            expect(posts).toStrictEqual([
                {
                    createdAt: {
                        year: 2019,
                        month: 8,
                    },
                },
            ]);
        });

        test("posts with malformed createdAt are filtered out", () => {
            const queryData = {
                allPosts: [
                    {
                        createdAt: 'foo',
                    },
                    {
                        createdAt: '123foo',
                    },
                    {
                        createdAt: '1567711305251',
                    },
                ],
            };

            const posts = transformPosts(queryData);
            expect(posts).toStrictEqual([
                {
                    createdAt: {
                        year: 2019,
                        month: 8,
                    },
                },
            ]);
        });
    });

    describe('extractHistogramData', () => {
        test.each([null, undefined])('posts is null or undefined', posts => {
            const histogramData = extractHistogramData(posts);
            expect(histogramData).toBeNull();
        });
    });
}); 