import React, { useState } from 'react'
import {ethers} from "ethers"

import Eword from './artifacts/contracts/Eword.sol/Eword.json'


const ewordAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function EWordss() {

    const [eword, setEWord] = useState({
        engword: "",
        plword: ""
    })


    function submit(e) {

        e.preventDefault();
        console.log("engword", eword.engword);
        console.log("plword", eword.plword);
    }

    // function handle(e) {

    //     const newData = { ... eword}
    //     newData[e.target.id] = e.target.value

    //     setEWord(newData)
    //     console.log("eword", eword.engword)
    //     console.log("eword", eword.plword)
    //     eword.engword = "";
    //     eword.plword = "";
    // }

    async function handle(e) {

        const newData = { ... eword}
        newData[e.target.id] = e.target.value

        setEWord(newData)
        console.log("eword", eword.engword)
        console.log("eword", eword.plword)
        eword.engword = "";
        eword.plword = "";
    }

    // async function setEWordd(value) {
        async function setEWordd() {
       // if (!value) return;
        if (!eword) return;
        if (!typeof window.ethereum !== 'undefined') {
          await requestAccount()
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
        //   const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer)
          const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)
         // const transaction = await contract.setGreeting(value)
          const transaction = await contract.setEWord(eword)
          await transaction.wait()
         // fetchGreeting()
        }
      }

      async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
      }


    return (
        <div>
            <form onSubmit={ (e) => submit(e)}>
                <input onChange = { (e) => handle(e)} id="engword" value = {eword.engword} placeholder='engword' type="text"/>
                <input onChange = { (e) => handle(e)} id="plword" value = {eword.plword} placeholder='plword' type="text" />
                <button>Submit</button>
            </form>
        </div>
    );
}

export default EWordss;