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
                    createdAt,
                };
            })
            .filter(({ createdAt }) =>
                createdAt !== null && createdAt.year === desiredYear
            );
    }

    return posts;
}

function extractHistogramData(posts) {
    let histogramData = null;

    if (posts) {
        histogramData = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
        };

        posts.forEach(({ createdAt: { month } }) => {
            if (month in histogramData) {
                histogramData[month] += 1;
            }
        });

        histogramData = Object.entries(histogramData).map(entry => {
            const [currentMonth, postsCount] = entry;

            const month = new Date(desiredYear, currentMonth).toLocaleString('default', { month: 'long' });
            return [month, postsCount];
        });
    }

    return histogramData;
}

export { transformPosts, extractHistogramData };