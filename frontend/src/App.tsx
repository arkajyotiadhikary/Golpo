import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";

import homeImg from "../public/home.jpeg";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="flex flex-col items-center gap-y-20">
          <h1 className="font-bold text-5xl">Golpo</h1>
          <div className="flex flex-shrink justify-center items-center">
            <img src={homeImg} height="500" width="500"/>
            <p className="font-medium font-lg w-1/3 p-4">
              Experience a unique blend of technology and narrative. Make choices that shape your story, all crafted by our advanced AI.
            </p>
          </div>
          <form className="w-full max-w-xs">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Enter your name to start your story.</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Enter your name" required=""/>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow:outline">Begin</button>
            </div>
          </form>
        </div>  
      </div>
    	{/*<Header/>*/}
	    <Footer/>
    </div>
  )
}

export default App
