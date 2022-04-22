import React, { useState, useEffect } from 'react';
import { getAllArticles, getArticleByTopic, getArticleById, increaseVotesByOne } from '../utils/api';
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
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('DESC');

  useEffect(() => {
    setLoading(true);
    setIsArticle(false);
    const makeAsync = async () => {
      let articles = undefined;
      if (topic === undefined) {
        articles = await getAllArticles(sortBy, sortOrder);
      } else {
        articles = await getArticleByTopic(topic, sortBy, sortOrder);
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
  }, [topic, article_id, sortBy, sortOrder]);

  function incLikes() {
    setArticle({ ...article, votes: article.votes + 1 });
    increaseVotesByOne(article_id);
  }

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
        <h3>
          Likes: {article.votes}, Comments: {article.comment_count}
        </h3>
        <br />
        <p>
          <button className='ArticleButton' onClick={() => incLikes()}>
            <FontAwesomeIcon icon={faThumbsUp} /> Leave a like!
          </button>
          <button className='ArticleButton' onClick={() => console.log('todo: add comment')}>
            <FontAwesomeIcon icon={faMessage} /> Leave a comment!
          </button>
        </p>
      </>
    );

  if (loading) {
    return <ReactLoading className='LoadingSymbol' type='spinningBubbles' color='#ffffff' />;
  }

  return (
    <>
      <select className='form-select' onChange={(e) => setSortBy(e.target.value)}>
        <option value='created_at' selected={sortBy === 'created_at'}>
          Date
        </option>
        <option value='comment_count' selected={sortBy === 'comment_count'}>
          Comment Count
        </option>
        <option value='votes' selected={sortBy === 'votes'}>
          Votes
        </option>
      </select>
      <select className='form-select' onChange={(e) => setSortOrder(e.target.value)}>
        <option value='DESC' selected={sortOrder === 'DESC'}>
          Descending
        </option>
        <option value='ASC' selected={sortOrder === 'ASC'}>
          Ascending
        </option>
      </select>
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
    </>
  );
}
