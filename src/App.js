import './App.css';
import Game from './components/Game';
import Start from './components/Start';
import Tictactoe from './components/Tictactoe';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from 'react-router-dom';

function App() {
  return (
    <>
   
   <Router>
    <Routes>
    <Route exact path='/' element={<Start/>}></Route>
    <Route exact path='/game' element={<Game/>}></Route>
    <Route exact path='/tictactoe' element={<Tictactoe/>}></Route>
     </Routes>
     </Router>
    </>
  );
}

export default App;
