import React, { useEffect } from 'react';
import { makeRequest } from '../utils/api';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function Articles() {
  const [articles, setArticles] = React.useState([]);

  useEffect(() => {
    makeRequest(setArticles);
  }, []);

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
