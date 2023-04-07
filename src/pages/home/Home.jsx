import React from 'react'
import './Home.scss';
import Featured from '../../components/Featured/Featured';
import TrustedBy from '../../components/TrustedBy/TrustedBy';
import Slide from '../../components/Slide/Slide';
import CatCard from '../../components/CatCard/CatCard';
import {cards, projects} from '../../data';
import video from '../../assets/img/video.mp4'
import checkbox from '../../assets/img/check.png'
import ProjectCard from '../../components/ProjectCard/ProjectCard';
function home() {
  return (
    <div className='home'>
      <Featured/>
      <TrustedBy/>
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className="title">
           <img src={checkbox} alt="" />
           The best for every budget
          </div>
          <p>
          Find high-quality services at every price point. No hourly rates, just project-based pricing.
          </p>
          <div className="title">
           <img src={checkbox} alt="" />
           The best for every budget
          </div>
          <p>
          Find high-quality services at every price point. No hourly rates, just project-based pricing.
          </p>
          <div className="title">
           <img src={checkbox} alt="" />
           The best for every budget
          </div>
          <p>
          Find high-quality services at every price point. No hourly rates, just project-based pricing.
          </p>
          <div className="title">
           <img src={checkbox} alt="" />
           The best for every budget
          </div>
          <p>
          Find high-quality services at every price point. No hourly rates, just project-based pricing.
          </p>
          </div>
          <div className="item">
            <video src={video} controls></video>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
          <h1>fiverr business.</h1>
          <h1>A business solution designed for teams</h1>
          <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>
          <div className="title">
           <img src={checkbox} alt="" />
           Connect to freelancers with proven business experience
          </div>
          <div className="title">
           <img src={checkbox} alt="" />
           Connect to freelancers with proven business experience
          </div>
          <div className="title">
           <img src={checkbox} alt="" />
           Connect to freelancers with proven business experience
          </div>
          <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png" alt="" />
          </div>
        </div>
      </div>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((item) => (
          <ProjectCard key={item.id} item={item} />
        ))}
      </Slide>
    </div>
  )
}

export default home