import React, { useState, useEffect } from 'react';
import {
  getAllArticles,
  getArticleByTopic,
  getArticleById,
  getCommentsByArticleId,
  increaseVotesByOne,
} from '../utils/api';
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
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
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
        const comments = await getCommentsByArticleId(article_id);
        setComments(comments);
      }
      setLoading(false);
    };
    makeAsync();
  }, [topic, article_id]);

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
        <button className='ArticleButton' onClick={() => incLikes()}>
          <FontAwesomeIcon icon={faThumbsUp} /> Leave a like!
        </button>
        <button
          className='ArticleButton'
          onClick={() => {
            setShowComments((prev) => !prev);
          }}
        >
          <FontAwesomeIcon icon={faMessage} /> {showComments ? 'Hide comments!' : 'Show comments!'}
        </button>
        {showComments && (
          <div className='ArticleComments'>
            {comments.map((comment) => {
              return (
                <div className='ArticleComment' key={comment.comment_id}>
                  <h3>{comment.author}</h3>
                  <p>{comment.body}</p>
                  <p>
                    <FontAwesomeIcon icon={faThumbsUp} /> {comment.votes}
                  </p>
                </div>
              );
            })}
          </div>
        )}
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
