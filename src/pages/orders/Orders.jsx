import React from 'react'
import './Orders.scss';
import message from '../../assets/img/message.png';
import {useQuery} from '@tanstack/react-query';
import axios from '../../utils/baseurl.js'
import { useNavigation } from 'react-router-dom';
const Orders = () => {

  const navigate = useNavigation();

  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      axios.get(`/orders`).then(
        (res) => {return res.data}
      )
      
  })
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await axios.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (error) {
      if (error.response === 404) {
        const res = await axios.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      {isLoading ?( "Loading..."): error ? ("error") : 
      (
       <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
         
            <th>Contact</th>
          </tr>
         { data.map((order) =>(
         <tr key={order._id}>
            <td>
              <img
                className="image"
                src={order.img}
                alt=""
              />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
           
            <td>
              <img className="message" src={message} alt=""   onClick={() => handleContact(order)}/>
            </td>
          </tr>
           )) 
          }
        </table>
      </div>
      )
}
    </div>
  );
};

export default Orders;