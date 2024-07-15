import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import SignIn from './components/SignIn';
import HomePage from './pages/HomePage';
import Vehicle from './pages/Vehicle';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/vehicle/:id" element={<Vehicle />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
