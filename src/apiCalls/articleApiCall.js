import { DOMAIN } from '@/utils/constants';


// Get articles based on pageNumber/*
export async function getArticles(pageNumber) {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}//
// Get articles count
export async function getArticlesCount() {
  const response = await fetch(`${DOMAIN}/api/articles/count`, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }

  const { count } = await response.json();
  return count;
}

// Get articles based on searchText
export async function getArticlesBasedOnSearch(searchText) {
  const response = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  return response.json();
}

// Get single article by id
export async function getSingleArticle(articleId) {
  const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {
    //cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error("Failed to fetch article");
  }

  return response.json();
}
