"use strict";
function getPublishedArticle(response) {
    return response.data.filter((d) => {
        return d.status === "published";
    });
}
function toArticleSummary(article) {
    return {
        id: article.id,
        title: article.title,
        authorName: article.author.name,
        views: article.stats.views,
    };
}
function normalizeArticles(response) {
    let result = [];
    for (const article of response.data) {
        result.push(toArticleSummary(article));
    }
    return result;
}
const apiResponse = {
    data: [
        {
            id: 'a1',
            title: 'Learning JavaScript',
            status: 'published',
            author: { name: 'Ava Stone' },
            stats: { views: 1200 },
        },
        {
            id: 'a2',
            title: 'Draft Notes',
            status: 'draft',
            author: { name: 'Noah Kim' },
            stats: { views: 50 },
        },
        {
            id: 'a3',
            title: 'Async Basics',
            status: 'published',
            author: { name: 'Mina Patel' },
            stats: { views: 900 },
        },
    ],
    meta: {
        total: 3,
    },
};
console.log(normalizeArticles(apiResponse));
console.log(getPublishedArticle(apiResponse).length);
console.log(toArticleSummary(apiResponse.data[0]));
