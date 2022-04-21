import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import Articles from './components/Articles';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <Nav />
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
