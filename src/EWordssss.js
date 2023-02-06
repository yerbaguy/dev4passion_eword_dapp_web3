import React, { useState } from 'react'
import {ethers} from "ethers"

import Eword from './artifacts/contracts/Eword.sol/Eword.json'

import { Container, Form } from 'semantic-ui-react'

const ewordAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

function EWordssss() {

    const [engWord, setEngWord] = useState('')
    const [plWord, setPlWord] = useState('')

    async function requestAccount() {
        await window.ethereum.request({ method: "eth_requestAccounts" })
      }

    async function fetchEWords() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(ewordAddress, Eword.abi, provider)
            try {
            //   const data = await contract.greet()
            const data = await contract.fetchEWords()
             // setGreetingValue(data)
              console.log('data: ', data)
            } catch (err) {
              console.log('Error: ', err)
            }
          }
    }



    //  const submitEWord = () => {
        // async function submitEWord() {
//    submitEWord = async ()  => {
    const handleSubmit = async (e) => {

        e.preventDefault();

        console.log(engWord)
        console.log(plWord)


        const eword = {
            engword: engWord,
            plword: plWord
        };



        if (!typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)
            // const transaction = await contract.createEWord(eword.engword, eword.plword, "lkajsdlfkjasd")
            const transaction = await contract.createEWord(eword.engword, eword.plword)
        
            console.log("transaction", transaction);

            fetchEWords();
        }





        // try {

        //     if (!typeof window.ethereum !== 'undefined') {
        //         await requestAccount()
        //         const provider = new ethers.providers.Web3Provider(window.ethereum)
        //         const signer = provider.getSigner()
        //         const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)
        //         const transaction = await contract.createEWord(eword.engword, eword.plword, "lkajsdlfkjasd")
            
        //         console.log("transaction", transaction);
        //     }
    
            
        // } catch (error) {
            
        // }


        // try {
            
        //     const { ethereum } = window

        //     if ( ethereum ) {
        //         const provider = new ethers.providers.Web3Provider(ethereum)
        //         const signer = provider.getSigner()
        //         const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)

        //         const eword = await contract.createEWord(eword.engWord, eword.plWord)

        //         console.log("eword", eword);
    


        //     } else {

        //     }

        // } catch (error) {
            
        // }


        const { ethereum } = window;
    }
   

    return (

        <dev>
            <form onSubmit={handleSubmit}>

                             {/* <input onChange = { (e) => handle(e)} id="engword" value = {eword.engword} placeholder='engword' type="text"/>
                <input onChange = { (e) => handle(e)} id="plword" value = {eword.plword} placeholder='plword' type="text" /> */}
                 <input onChange = { (e) => setEngWord(e.target.value)} id="engword" value = {engWord} placeholder='engword' type="text"/>
                <input onChange = { (e) => setPlWord(e.target.value)} id="plword" value = {plWord} placeholder='plword' type="text" />

                {/* <button onClick={submitEWord()}>Submit</button> */}
                {/* <button onClick={submitEWord}>Submit</button> */}
                <button>Submit</button>



            </form>
        </dev>
    );
}

export default EWordssss;