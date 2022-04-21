import React, { useState, useEffect } from 'react';
import { getAllArticles, getArticleByTopic, getArticleById } from '../utils/api';
import { Link, useParams } from 'react-router-dom';
import '../styles/App.css';
import Tilt from 'react-parallax-tilt';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function Articles() {
  const { topic } = useParams();
  const { article_id } = useParams();
  const [articles, setArticles] = useState([]);
  const [isArticle, setIsArticle] = useState(false);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setIsArticle(false);
    const makeAsync = async () => {
      let articles = undefined;
      if (topic === undefined) {
        articles = await getAllArticles();
      } else {
        articles = await getArticleByTopic(topic);
      }
      setArticles(articles);
      if (article_id !== undefined) {
        setIsArticle(true);
        const article = await getArticleById(article_id);
        setArticle(article);
      }
      setLoading(false);
    };
    makeAsync();
  }, [topic, article_id]);

  if (isArticle)
    return (
      <>
        <h1 className='Header'>
          {article.title}{' '}
          <span className='ArticleAuthor'>
            — @{article.author} #{article.topic}
          </span>
        </h1>
        <h2 className='ArticleBody'>{article.body}</h2>
        <p>
          <FontAwesomeIcon icon={faThumbsUp} /> Leave a like!
          <br />
          <FontAwesomeIcon icon={faMessage} /> Leave a comment!
        </p>
      </>
    );

  if (loading) {
    return <ReactLoading className='LoadingSymbol' type='spinningBubbles' color='#ffffff' />;
  }

  return (
    <div className='Articles'>
      {articles.map((article) => (
        <Tilt key={article.article_id}>
          <Link className='ArticleLink' to={`/articles/${article.article_id}`}>
            <div className='Article'>
              <h3 className='ArticleTitle'>
                {article.title} <span className='ArticleAuthor'>— {article.author}</span>
              </h3>
              <p>
                <FontAwesomeIcon icon={faMessage} /> {article.comment_count}
                {' — '}
                <FontAwesomeIcon icon={faThumbsUp} /> {article.votes}
              </p>
            </div>
          </Link>
        </Tilt>
      ))}
    </div>
  );
}
