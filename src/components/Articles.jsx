import React, { useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function Articles() {
  const [articles, setArticles] = React.useState([]);

  const backend = axios.create({
    baseURL: 'https://northcoders-news-api-v2.herokuapp.com/api',
  });

  useEffect(() => {
    const makeRequest = async () => {
      const { data } = await backend.get('/articles');
      setArticles(data.articles);
    };
    makeRequest();
  }, []);

  console.log(articles);

  return (
    <div className='Articles'>
      {articles.map((article) => (
        <div className='Article' key={article.article_id}>
          <h3 className='ArticleTitle'>
            {article.title} <span className='ArticleAuthor'>— {article.author}</span>
          </h3>
          <p>
            <FontAwesomeIcon icon={faMessage} /> {article.comment_count}
          </p>
        </div>
      ))}
    </div>
  );
}
