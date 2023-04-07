import React, { useState } from 'react'
import './Gigs.scss';
import down from '../../assets/img/down.png';
import {gigs} from '../../data';
import GigCard from '../../components/GigCard/GigCard'
function Gigs() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");

  const reSort = (type) =>{
     setSort(type);
     setOpen(false)
  }

  return (
    <div className='gigs'>
      <div className="container">
      <span className="breadcrumbs">Liverr > Graphics & Design ></span>
      <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input type='text' placeholder='min'/>
            <input type="text" placeholder='max' />
            <button>Apply</button>
          </div>
          <div className="right">
            <span className='sortBy'>SortBy</span>
            <span className='sortType'>{sort === "sales" ? "Best Selling": "Newest"}</span>
            <img src={down} alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>

        <div className="cards">
          {
            gigs.map((gig) => (
              <GigCard key={gig.id} item={gig}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Gigs