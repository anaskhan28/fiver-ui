import { useState } from 'react'
import './App.scss'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/home/Home';
import Gigs from './pages/gigs/Gigs';
import Gig from './pages/gig/Gig';
import Add from './pages/add/Add';
import Orders from './pages/orders/Orders';
import Messages from './pages/messages/Messages';
import Message from './pages/message/Message';
import MyGigs from './pages/myGigs/MyGigs';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Login from './pages/login/Login';
import Register from './pages/register/Register'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import Pay from './pages/Pay/Pay';
import Success from './pages/success/Success';



function App() {

  const queryClient = new QueryClient();

  const Layout = () =>{
    return (
      <div className="App">
      <QueryClientProvider client={queryClient}>
      <Navbar/>
      <Outlet/>
      <Footer/>
      </QueryClientProvider>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children:[
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/gigs',
          element: <Gigs/>
        },
        {
          path: '/gig/:id',
          element: <Gig/>
        },
        {
          path: '/orders',
          element: <Orders/>
        },
        {
          path: '/mygigs',
          element: <MyGigs/>
        },
        {
          path: '/add',
          element: <Add/>
        },
        {
          path: '/messages',
          element: <Messages/>
        },
        {
          path: '/message/:id',
          element: <Message/>
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/pay/:id',
          element: <Pay/>
        },
        {
          path: '/success',
          element: <Success/>
        },
      ]
    }
  ])
  return <RouterProvider router={router}/>
}

export default App
