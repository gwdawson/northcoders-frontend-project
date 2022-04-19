import { Route, Routes } from 'react-router-dom';
import './styles/App.css';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={
            <header className='App-header'>
              <h1>Hello World</h1>
            </header>
          }
        ></Route>
        <Route
          path='/hi'
          element={
            <header className='App-header'>
              <h1>hi?</h1>
            </header>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
