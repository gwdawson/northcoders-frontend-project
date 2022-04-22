import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Articles from './components/Articles';
import './styles/App.css';
import { useEffect, useState } from 'react';
import { getAllUsers } from './utils/api';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const notify = () => toast('You must be logged in to view this page');
// <button onClick={notify}>Test!!!</button>
// <ToastContainer />

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const makeAsync = async () => {
      const users = await getAllUsers();
      setUsers(users);
    };
    makeAsync();
  }, []);

  return (
    <div className='App'>
      <Nav />
      {users.includes(user) && <h3 className='User'>Logged in as: {user.username}</h3>}
      {!users.includes(user) && (
        <button className='UserLoginButton' onClick={() => setUser(users[Math.floor(Math.random() * users.length)])}>
          LOGIN
        </button>
      )}
      <Header />
      <Routes>
        <Route path='/' element={<Articles />}></Route>
        <Route path='/topics/:topic' element={<Articles />}></Route>
        <Route path='/articles/:article_id' element={<Articles />}></Route>
      </Routes>
    </div>
  );
}

export default App;
