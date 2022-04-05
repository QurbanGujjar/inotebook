
import './App.css';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './context/notes/NoteState';

function App() {
  return (
<NoteState>
    <Router>
    <Navbar/>
<div className="container">
 <Routes>

   <Route exact path='/' element={<div><Home/></div>} />
   <Route exact path='/about' element={<div><About/></div>} />
   <Route exact path='/business' element={<div><Home/></div>} />
   <Route exact path='/entertainment' element={<div><Home/></div>} />
   <Route exact path='/health' element={<div><Home/></div>} />
   <Route exact path='/science' element={<div><Home/></div>} />
   <Route exact path='/sports' element={<div><Home/></div>} />

 </Routes>
 </div>
 </Router>
 </NoteState>
  );
}

export default App;
