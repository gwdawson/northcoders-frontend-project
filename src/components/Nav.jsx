import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

export default function Nav() {
  return (
    <div className='Nav'>
      <Link className='NavChild' to='/'>
        All
      </Link>
      <Link className='NavChild' to='/topics/coding'>
        Coding
      </Link>
      <Link className='NavChild' to='/topics/football'>
        Football
      </Link>
      <Link className='NavChild' to='/topics/cooking'>
        Cooking
      </Link>
    </div>
  );
}
