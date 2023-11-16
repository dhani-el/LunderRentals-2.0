
import Home from './Home/Jsx';
import Auth from './Auth/Jsx';
import Rent from './Rent/Jsx';
import SingleCar from './Single/Jsx';
import Layout from './Layout/Jsx';
import ComingSoon from './ComingSoon/Jsx';
import Cart from './Cart/Jsx';
import SinglePayment from './SinglePayment/Jsx';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);



const route  = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/auth',
          element:<Auth/>
        },
        {
          path:'/rent',
          element:<Rent/>,
        },
        {
          path:'/rent/:brand',
          element:<SingleCar/>
        },
        {
          path:'/cart',
          element:<Cart/>
        },
        {
          path:'/payment/:id',
          element:<SinglePayment/>
        },
        {
          path:'*',
          element:<ComingSoon/>
        }
      ]
    },


]);

function App() {
  const [userLoggedIn, setUserLoggedin] = useState({isloggedin:false,username:`${document.cookie}`.substring(5).toString()})

  return (
    <AuthContext.Provider value={{authState:userLoggedIn,contextFn:setUserLoggedin}}>
      <RouterProvider router={route} />
    </AuthContext.Provider>
  )

}

export default App
