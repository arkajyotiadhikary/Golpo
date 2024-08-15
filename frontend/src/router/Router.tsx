import React from "react"; import { createBrowserRouter} from
'react-router-dom';


// Pages 
import Home from "../pages/Home.jsx"; 
import Story from "../pages/Story.jsx";

export const router = createBrowserRouter([ 
  { 
    path: "/", 
    element: <Home/>, 
  }, 
  {
    path: "/story", 
    element: <Story/>, 
  }
]);


