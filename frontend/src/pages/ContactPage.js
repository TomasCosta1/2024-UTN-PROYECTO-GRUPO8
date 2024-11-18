import React from "react";
import Contact from "../components/Contact.js";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext, UserProvider } from '../context/UserContext';
import { useContext } from "react";

const ConctactPage = () => {
    const { verify } = useContext(UserContext);
    verify();
    
    return (
        <>
        <Header/>
        <div>
        <Contact/>
        </div>
        <Footer/> 
        </>
    );
};

export default ConctactPage;