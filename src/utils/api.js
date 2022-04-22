import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://northcoders-news-api-v2.herokuapp.com/api',
});

export const getAllArticles = async (sortBy, sortOrder) => {
  const { data } = await backend.get(`/articles?sort_by=${sortBy}&order=${sortOrder}`);
  return data.articles;
};

export const getArticleByTopic = async (topic, sortBy, sortOrder) => {
  const { data } = await backend.get(`/articles?topic=${topic}&sort_by=${sortBy}&order=${sortOrder}`);
  return data.articles;
};

export const getAllTopics = async () => {
  const { data } = await backend.get('/topics');
  return data.topics;
};

export const getArticleById = async (article_id) => {
  const { data } = await backend.get(`/articles/${article_id}`);
  return data.article;
};

export const getCommentsByArticleId = async (article_id) => {
  const { data } = await backend.get(`/articles/${article_id}/comments`);
  return data.comments;
};
export const increaseVotesByOne = async (article_id) => {
  const { data } = await backend.patch(`/articles/${article_id}`, {
    inc_votes: 1,
  });
  return data.article;
};
