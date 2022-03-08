import './App.css';
import CommentList from './components/CommentList';
import GlobalContext from './GlobalContext';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <GlobalContext>
          <CommentList />
        </GlobalContext>
      </div>
    </div>
  );
}

export default App;
