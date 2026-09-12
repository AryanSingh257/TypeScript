type Article = {
  id: string,
  title: string,
  status: string,
  author: {
    name: string,
  },
  stats: {
    views: number,
  },
}

type APIResponse = {
  data: Article[],
  meta: {
    total: number,
  }
};

type APISummary = {
  id: string,
  title: string,
  authorName: string,
  views: number,
}

function getPublishedArticle(response:APIResponse):Article[]{
  return response.data.filter((d)=>{
    return d.status === "published";
  });
}

function toArticleSummary(article:Article):APISummary{
  return {
    id: article.id,
    title: article.title,
    authorName: article.author.name,
    views: article.stats.views,
  };
}

function normalizeArticles(response:APIResponse):APISummary[]{
  let result:Array<APISummary> = [];
  for(const article of response.data){
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
