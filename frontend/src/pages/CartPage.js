import React, { useContext } from "react";
import Cart from "../components/Cart";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserContext } from "../context/UserContext";

const CartPage = () => {
    const { verify } = useContext(UserContext);
    verify();
    return(
        <div>
            <Header />
            <Cart />
            <Footer />
        </div>
    )
};

export default CartPage;