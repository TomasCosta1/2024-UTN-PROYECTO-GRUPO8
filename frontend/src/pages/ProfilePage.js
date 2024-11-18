import React from 'react';
import ProfilePanel from '../components/ProfilePanel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
    const { verify, user } = useContext(UserContext);
    verify();
    if(!user){Navigate('/login')}
    
    return (
        <div>
            <Header />
            <div className='profilePage'>
            <ProfilePanel />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;