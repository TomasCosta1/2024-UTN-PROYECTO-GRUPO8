import React from "react";
import AboutUs from "../components/AboutUs.js";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext, UserProvider } from '../context/UserContext';
import { useContext } from "react";

const AboutUsPage = () => {
    const { verify } = useContext(UserContext);
    verify();
    
    return (
        <>
        <Header/>
        <div>
        <AboutUs/>
        </div>
        <Footer/> 
        </>
    );
};

export default AboutUsPage;