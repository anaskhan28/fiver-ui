import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noavatar from '../../assets/img/noavatar.jpeg';
import axios from '../../utils/baseurl.js';
function Navbar() {
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false);
  const {pathname} = useLocation();

  const navigate = useNavigate();


  
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

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
 
  const handleLogout = async() =>{
    try{
      const res = await axios.post("/auth/logout");
      localStorage.setItem('currentUser', null);
      navigate("/")

      console.log(res.data)

    }catch(error){
      console.log(error)
    }
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
          
         {!currentUser?.isSeller && <span>Become a Seller</span>}

         {
          currentUser ? (
            <div className="user" onClick={openNav}>
              <img src={currentUser.img || noavatar } alt="" />
              <span>{currentUser?.username}</span>
             { open && 
             (<div className="options">
                {currentUser?.isSeller && (
                  <>
                  <Link className='link' to='/mygigs'>Gigs</Link>
                  <Link className='link' to='/add'>Add New Gig</Link>
                  </>
                )}
             <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
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