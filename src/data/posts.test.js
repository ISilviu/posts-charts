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

        test('histogram data is successfully extracted', () => {
            const histogramData = extractHistogramData([
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
                {
                    createdAt: {
                        year: 2019,
                        month: 8,
                    },
                },
            ]);

            expect(histogramData).toStrictEqual([
                ["January", 0],
                ["February", 1],
                ["March", 1],
                ["April", 0],
                ["May", 0],
                ["June", 0],
                ["July", 0],
                ["August", 0],
                ["September", 2],
                ["October", 0],
                ["November", 0],
                ["December", 0],
            ]);
        });

        test('out of range months are not added', () => {
            const histogramData = extractHistogramData([
                {
                    createdAt: {
                        year: 2019,
                        month: 15,
                    },
                },
                {
                    createdAt: {
                        year: 2019,
                        month: 16,
                    },
                },
                {
                    createdAt: {
                        year: 2019,
                        month: 12,
                    },
                },
                {
                    createdAt: {
                        year: 2019,
                        month: -1,
                    },
                },
            ]);

            expect(histogramData).toStrictEqual([
                ["January", 0],
                ["February", 0],
                ["March", 0],
                ["April", 0],
                ["May", 0],
                ["June", 0],
                ["July", 0],
                ["August", 0],
                ["September", 0],
                ["October", 0],
                ["November", 0],
                ["December", 0],
            ]);
        });
    });
}); 