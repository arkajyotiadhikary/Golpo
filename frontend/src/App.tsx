import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-100">
    	<Header/>
	    <Footer/>
    </div>
  )
}

export default App
