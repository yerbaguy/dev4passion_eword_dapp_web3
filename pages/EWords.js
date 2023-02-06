import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Eword from '../artifacts/contracts/Eword.sol/Eword.json'
import { Provider } from 'web3modal';

// const EWord: NextPage = () => {

// }

const ewordAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

export default function EWords() {

    const [engword, setEngword] = useState('');
    const [plword, setPlword] = useState('');


    const submitEWord = async() => {

        console.log("engword", engword);
        console.log("plword", plword);


        const eword = {
            engw: engword,
            plw: plword
        };

        try {

            const { ethereum } = window

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const signer = provider.getSigner()

                const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)

                const eword =  contract.createEWord(engword, plword, "kjasdlfklkasdflka")
            
                console.log("eword", eword);
            }
            
        } catch (error) {
            
        }

    }



    return (

        <div>
            {/* <input type='text' onChange={ (e) => setEngword(e.target.value)} /> */}
            <input type="text" onChange={ (e) => setEngword(e.target.value)} />
            <input type="text" onChange={ (e) => setPlword(e.target.value)} />
            <button onClick={submitEWord}>Submit</button>

        </div>
    );

}

//export default EWords;