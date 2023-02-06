import {ethers} from "ethers"
import React, { useState } from "react"
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"


import logo from './logo.svg';
import './App.css';

// 0xc95ea9a9b63434915d52d204906a16f36fd905c3

// const greeterAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
const greeterAddress = "0x387707403c8d9bd5f66ae3a5682c47076c8c1d0b"



function App() {
  const [greeting, setGreetingValue] = useState("")

  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider)
      try {
        const data = await contract.greet()
        setGreetingValue(data)
        console.log('data: ', data)
      } catch (err) {
        console.log('Error: ', err)
      }
    }
  }

  async function setGreeting(value) {
    if (!value) return;
    if (!typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
      const transaction = await contract.setGreeting(value)
      await transaction.wait()
      fetchGreeting()
    }
  }

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" })
  }


  async function handleSubmit(event) {
    event.preventDefault()
    await setGreeting(event.target.greetingInput.value)
    setGreetingValue(event.target.greetingInput.value)
    event.target.greetingInput.value = ""
  }



  return (
    <div className="App">




<div className="w-full max-w-lg container">
      <div className="shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
        <div className="text-gray-600 font-bold text-lg mb-2">
            React Ethereum Dapp
        </div>
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
          <div className="text-gray-600 font-bold text-md mb-2">
            Fetch Greeting Message From Smart Contract
          </div>
          <div className="flex ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchGreeting}>Fetch Greeting</button>
          </div>
        </div>
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400">
          <div className="text-gray-600 font-bold text-md mb-2">
            Set Greeting Message On Smart Contract
          </div>
          <form 
            className="flex items-center justify-between"
            onSubmit={event=>handleSubmit(event)}
            >
            <input 
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
              name="greetingInput"
            />
            <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Set Greeting</button>
          </form>
        </div>
        <div className="w-full border-4 p-2 mb-4 rounded border-gray-400 bg-gray-100">
          <div className="text-gray-600 font-bold text-md mb-2">
            Greeting Message 
          </div>
          <p>
            {greeting}
          </p>
        </div>
      </div>
    </div>






    </div>
  );
}

export default App;
