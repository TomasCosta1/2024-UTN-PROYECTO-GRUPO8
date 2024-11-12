import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/EndDay.css';

const EndDayPage = () => {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [total, setTotal] = useState(0);


const handleSubmit = async (e) => {
        e.preventDefault();
        
        const startFormatted = start + "00.000Z";
        const endFormatted = end + "00.000Z";
        console.log(startFormatted, endFormatted);
        const result = await axios.get('http://localhost:3000/endDay', {
            params: { startFormatted, endFormatted }
        });
        const data = result.data;
        let newTotal = 0
        Object.values(data).forEach(order => {
            // if(order.status === 'approved'){
                newTotal += Number(order.totalPrice);
            // }
            
          });
          setTotal(newTotal);
        
    }

    return (
        <>
        <Header />
        <div className='containerEnd'>
            <h1 className='titleEnd'>Cierre de caja</h1>
            <form onSubmit={handleSubmit} className='formEnd'>
                <label className='labelEnd'>Fecha y hora de inicio:</label>
                <input type='datetime-local' id='start' className='inputEnd' name='start' onChange={(e) => setStart(e.target.value)} required/>

                <label className='labelEnd'>Fecha y hora de fin:</label>
                <input type='datetime-local' id='end' className='inputEnd' name='end' onChange={(e) => setEnd(e.target.value)} required/>

                <button type='submit' className='buttonEnd'>Consultar</button>
            </form>
            <p className='titleEnd'>Total: ${total}</p>
        </div>
        <Footer />
        </>
    )
}

export default EndDayPage;