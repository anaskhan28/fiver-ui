import React from 'react'
import './GigCard.scss';
import star from '../../assets/img/star.png'
import heart from '../../assets/img/heart.png'
import { Link } from "react-router-dom";
import {useQuery} from '@tanstack/react-query';
import axios from '../../utils/baseurl.js'
import noavatar from '../../assets/img/noavatar.jpeg';

const GigCard = ({ item }) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ['gigId'],
    queryFn: () =>
      axios.get(`/users/${item.userId}`).then(
        (res) => {return res.data}
      )
      
  })
  console.log(data)

  return (
    <Link to={`/gig/${item._id}`}className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
        { isLoading? "Loading...": error? "Something went wrong" :
         <div className="user">
            <img src={data.img || noavatar} alt="" />
            <span>{data.username}</span>
          </div>}
          <p>{item.desc}</p>
          <div className="star">
            <img src={star} alt="" />
            <span>{!isNaN(item.totalStars/ item.starNumber) &&
             Math.round(item.totalStars / item.starNumber)}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src={heart} alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;