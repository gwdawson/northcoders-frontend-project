import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://northcoders-news-api-v2.herokuapp.com/api',
});

export const getAllArticles = async () => {
  const { data } = await backend.get('/articles');
  return data.articles;
};

export const getArticleByTopic = async (topic) => {
  const { data } = await backend.get(`/articles?topic=${topic}`);
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

export const increaseVotesByOne = async (article_id) => {
  const { data } = await backend.patch(`/articles/${article_id}`, {
    inc_votes: 1,
  });
  return data.article;
};

export const getAllUsers = async () => {
  const { data } = await backend.get('/users');
  return data.users;
};
