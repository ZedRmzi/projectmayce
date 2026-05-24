import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './pages/About';
import Art from './pages/Art';
import More from './pages/More';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
      <div id='loading'>
        <h1 id='loadingtitle' className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold font-PassionsConflict lg:text-[5rem]'>
          Project <span>Mayce</span>
        </h1>
      </div>
      <AuthProvider>
        <div className='flex flex-col min-h-screen'>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/projectmayce' element={<Art />} />
              <Route path='/about' element={<About />} />
              <Route path='/more' element={<More />} />
            </Routes>
            <Footer className='b-0 absolute' />
          </Router>
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
