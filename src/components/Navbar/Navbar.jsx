import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useLocation } from 'react-router-dom'
function Navbar() {
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false);
  const {pathname} = useLocation();
  
  const openNav = () =>{
    setOpen(!open)
  }
  const isActive = () =>{
    window.scrollY > 0 ? setActive(true): setActive(false)
  }

  useEffect(() =>{
    window.addEventListener("scroll", isActive);

    return () =>{
      window.removeEventListener('scroll', isActive);
    }
  })

  const currentUser = {
    id: 1,
    username: "Anas Khan",
    isSeller: true,
  }

  return (
    <div className={active || pathname !=='/' ? 'navbar active': 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link to= '/' className='link'>
          <span className='text'>fiverr</span>
          <span className='dot'>.</span>
          </Link>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>Sign In</span>
         {!currentUser?.isSeller && <span>Become a Seller</span>}
         {!currentUser && <button>Join</button> }
         {
          currentUser && (
            <div className="user" onClick={openNav}>
              <img src="https://media.istockphoto.com/id/1281804798/photo/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-sunglasses-is-isolated-on.jpg?s=612x612&w=0&k=20&c=oMoz9rUr-rDhMGNmEepCkr7F1g3AXs9416hvVnT_4CI=" alt="" />
              <span>{currentUser?.username}</span>
             { open && <div className="options">
                {currentUser?.isSeller && (
                  <>
                  <Link className='link' to='/mygigs'>Gigs</Link>
                  <Link className='link' to='/add'>Add New Gig</Link>
                  </>
                )}
                <Link className='link' to='/orders'>Orders</Link>
                <Link className='link' to='/messages'>Messages</Link>
                <Link className='link'>Logout</Link>
              </div>}
            </div>
          )
         }
        </div>
      </div>
     {active || pathname !=='/' &&
      <>
     <hr/>
      <div className="menu">
      <Link className='link menuLink' to='/'>Graphic & Design</Link>
      <Link className='link' to='/'>Video & Animation</Link>
      <Link className='link' to='/'>Writing & Translation</Link>
      <Link className='link' to='/'>AI Service</Link>
      <Link className='link' to='/'>Digital Marketing</Link>
      <Link className='link' to='/'>Music & Audio</Link>
      <Link className='link' to='/'>Programming & Tech</Link>
      <Link className='link' to='/'>Business</Link>
      <Link className='link' to='/'>Lifestyle</Link>
      
      </div>
      </> 
      }
    </div>
  )
}

export default Navbar