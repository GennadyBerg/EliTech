import React, {useContext, useState} from 'react';
import './orders.css';
import { DbContext } from '../../Contexts';

const Orders = ({cartItems, setCartItems}) => {
    const [quantities, setQuantities] = useState({});
    const [firstName, setFirstName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [isMessageInputFocused, setMessageInputFocused] = useState(false);
    const db = useContext(DbContext);
    return (
        

    );
}