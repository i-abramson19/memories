import React from 'react';
import { ToastContainer } from 'react-toastify'
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {

    return (
        <>
            <Router>
                <Container maxwidth='xl'>
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/posts' element={<Home />} />
                        <Route path='/posts/search' element={<Home />} />
                        <Route path='/posts/:id' element={<PostDetails />} />
                        <Route path='/auth' element={<Auth />} />
                    </Routes>
                    <Footer />
                </Container>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;