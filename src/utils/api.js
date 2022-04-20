import axios from 'axios';

const backend = axios.create({
  baseURL: 'https://northcoders-news-api-v2.herokuapp.com/api',
});

export const getAllArticles = async (setArticles) => {
  const { data } = await backend.get('/articles');
  setArticles(data.articles);
};
