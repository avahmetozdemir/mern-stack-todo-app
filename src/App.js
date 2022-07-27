import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route path='/' element={<Welcome/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
