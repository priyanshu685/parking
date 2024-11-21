import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { Register } from './components/Register';

// import './App.css';

function App() {
    return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
    );
}

export default App;