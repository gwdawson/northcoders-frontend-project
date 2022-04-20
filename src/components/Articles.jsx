import React, { useState, useEffect } from 'react';
import { getAllArticles, getArticleByTopic } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import '../styles/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';

export default function Articles() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const makeAsync = async () => {
      let articles = undefined;
      if (topic === undefined) {
        articles = await getAllArticles();
      } else {
        articles = await getArticleByTopic(topic);
      }
      setArticles(articles);
    };
    makeAsync();
  }, [topic]);

  return (
    <div className='Articles'>
      {articles.map((article) => (
        <div className='Article' key={article.article_id}>
          <Link className='ArticleLink' to={`/articles/${article.article_id}`} key={article.article_id}>
            <h3 className='ArticleTitle'>
              {article.title} <span className='ArticleAuthor'>— {article.author}</span>
            </h3>
            <p>
              <FontAwesomeIcon icon={faMessage} /> {article.comment_count}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}
