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
