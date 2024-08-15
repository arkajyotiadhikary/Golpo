import "./App.css";

import {router} from './router/Router.tsx';
import {RouterProvider} from 'react-router-dom';

function App() {
        return <RouterProvider router={router} />;
      }

export default App;
