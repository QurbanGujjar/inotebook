
import './App.css';

import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message,type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
<NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert} />
<div className="container">
 <Routes>

   <Route exact path='/' element={<div><Home showAlert={showAlert}/></div>} />
   <Route exact path='/about' element={<div><About/></div>} />
   <Route exact path='/login' element={<div><Login  showAlert={showAlert}/></div>} />
   <Route exact path='/signup' element={<div><Signup  showAlert={showAlert}/></div>} />



 </Routes>
 </div>
 </Router>
 </NoteState>
  );
}

export default App;
