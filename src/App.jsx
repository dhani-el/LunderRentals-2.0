
import Home from './Home/Jsx';
import Auth from './Auth/Jsx';
import Rent from './Rent/Jsx';
import SingleCar from './Single/Jsx';
import Layout from './Layout/Jsx';
import ComingSoon from './ComingSoon/Jsx';

import {createBrowserRouter, RouterProvider} from 'react-router-dom';



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
      path:'*',
      element:<ComingSoon/>
    }
      ]
    },


]);

function App() {

  return (
      <RouterProvider router={route} />
  )

}

export default App
