import React from 'react'
import './Gig.scss'
import star from '../../assets/img/star.png'
import greencheck from '../../assets/img/greencheck.png'
import recycle from '../../assets/img/recycle.png'
import clock from '../../assets/img/clock.png'
import dislike from '../../assets/img/dislike.png'
import like from '../../assets/img/like.png'
import { Slider } from 'infinite-react-carousel/lib'
import {useQuery} from '@tanstack/react-query';
import axios from '../../utils/baseurl.js'
import { Link, useParams } from 'react-router-dom'
import noavatar from '../../assets/img/noavatar.jpeg';
import Reviews from '../../components/Reviews/Reviews'

function Gig() {
  const {id} = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      axios.get(`/gigs/single/${id}`).then(
        (res) => {return res.data}
      )
      
  })
  const userId = data?.userId;
  const { isLoading: isLoadingUser, error: errorUser, data: dataUser } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      axios.get(`/users/${userId}`).then(
        (res) => {return res.data}
      ),
      enabled: !!userId,
      
  })


  return (
    <div className="gig">
      {isLoading? "Loading...": error? "Something Went Wrong!" :
        <div className="container">
        <div className="left">
          <span className="breadcrumbs">{"Fiverr > Graphics & Design >"}</span>
          <h1>{data?.title}</h1>
         { isLoadingUser ? "Loading...": errorUser ? "Something went wrong!" :
          <div className="user">
            <span>{dataUser.username}</span>
            {!isNaN(data.totalStars/ data.starNumber) && (
            <div className="stars">
              {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>(
               <img src={star} alt=""  key={i}/>
              ))}
              <span>{Math.round(data.totalStars / data.starNumber)}</span>
            </div>
            )}
          </div>}
          <Slider slidesToShow={1} arrowsScroll={1} className="slider">
          {data.images.map((img, index) =>{
              return (
                <img
                key={index}
              className="pp"
              src={img}
              alt=""
            />

              )
            })}
            
          </Slider>
          <h2>About This Gig</h2>
          <p>
          {data.desc}
          </p>
          { isLoadingUser ? "Loading...": errorUser ? "Something went wrong!" :(
          <div className="seller">
            <h2>About The Seller</h2>
           <div className="user">
              <img
                src={dataUser.img || noavatar}
                alt=""
              />
              <div className="info">
                <span>Anna Bell</span>
                {!isNaN(data.totalStars/ data.starNumber) && (
            <div className="stars">
              {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) =>(
               <img src={star} alt=""  key={i}/>
              ))}
              <span>{Math.round(data.totalStars / data.starNumber)}</span>
            </div>
            )}
                <button>Contact Me</button>
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc">{dataUser.country || '-'}</span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc">Aug 2022</span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Languages</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
              {dataUser.desc}
              </p>
            </div>

          </div>
          )}
          
          <Reviews gigId={id}/>
       
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.title}</h3>
            <h2>${data.price}</h2>
          </div>
          <p>
           {data.shortDesc}
          </p>
          <div className="details">
            <div className="item">
              <img src={clock} alt="" />
              <span>{data.deliveryTime} Days Delivery</span>
            </div>
            <div className="item">
              <img src={recycle}alt="" />
              <span>{data.revisionNumber} Revisions</span>
            </div>
          </div>
          <div className="features">
          {data.features.map((feature, index) =>{
                return (
                  <div className="item" key={index}>
                  <img src={greencheck} alt="" />
                  <span>{feature}</span>
                </div>
                )
              })}
          </div>
          <Link to={`/pay/${id}`}>
          <button>Continue</button>
          </Link>
        </div>
      </div>
}
    </div>
  )
}

export default Gig