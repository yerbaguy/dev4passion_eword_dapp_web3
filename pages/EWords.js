import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Eword from '../artifacts/contracts/Eword.sol/Eword.json'
import { Provider } from 'web3modal';

import { create as ipfsHttpClient } from 'ipfs-http-client';
import { useRouter } from 'next/router'


const projectId = "2IEKw6zV40jV9uUu4jLyANRhDLT";
// const projectSecret = "73218477da4f55465286ea74021256f8"
const projectSecret = "607ac5be066d7e7bc5f230926329668d"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

// const EWord: NextPage = () => {

// }

const ewordAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export default function EWords() {

    const [engword, setEngword] = useState('');
    const [plword, setPlword] = useState('');
    // const [hAsh, setHash] = useState('');
    const [hAsh, setHash] = React.useState('');

    const router = useRouter()


    useEffect(() => {

    }, [hAsh])

    // async function saveEWordToIpfs() {
    //     /* save post metadata to ipfs */
    //     try {
    //       console.log("ipfs", eword.engword)
    //       console.log("ipfs", eword.plword)
    //       const added = await client.add(JSON.stringify(eword))
    //       console.log("addedd", added.path)
    //       console.log("addedd", added.path)
    //       return added.path
    //     } catch (err) {
    //       console.log('error: ', err)
    //     }
    //   }






    const submitEWord = async() => {

        console.log("engword", engword);
        console.log("plword", plword);

        setHash("lkajdsflk");



        const eword = {
            engw: engword,
            plw: plword
        };

        const hash = {
            hash: hAsh
        };


        try {
            const ipfsURI = 'https://ipfs.io/ipfs/'
            console.log("ipfs", eword.engword)
            console.log("ipfs", eword.plword)
            const added = await client.add(JSON.stringify(eword))
            console.log("added-", added);
            setHash(added);
            //setHash("lkajsdlfk")
            console.log("hAsh-", hAsh);
            console.log("addedd", added)
            console.log("addeddddd", added.path)
            console.log("added", added.path);
            const addedddd = added.path;

            // const ipfsUrl = `${ipfsURI}/${"QmSsZQ92zPHfKodYEWDXDbMa62iKBLnmDo7mXCTeJA3W2Q"}`
            const ipfsUrl = `${ipfsURI}/${addedddd}`
            const response = await fetch(ipfsUrl)
            const data1 = await response.json()


  // const data1 = await contract.fetchEWord("2")
   console.log("data1", data1);

   if (added) {
    // try {

        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            // const contract = new ethers.Contract(contractAddress, Eword.abi, signer)
            const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)
            console.log('contract: ', contract)
            // console.log("saveEWord-engword", eword.engword)
            // console.log("saveEWord-plword", eword.plword)
            try {
      
             // const hash = "lkajsdflkjalsdkjflaksdf";

             // const hash = added;
             
             //const hash = hAsh;
             
             // hash = "lkajsdlkjlasdfadfasdfasdf";
      
               ////console.log("hash", hash.path);
      
            //    const val = await contract.createEWord(eword.engword, eword.plword, hash)
             const val = await contract.createEWord(hash)
             // const val = await contract.createEWord(hAsh)
            router.push(`/`)
               // const val = await contract.createEWord(hash)
              //const val = await contract.createEWord(hash)
              /* optional - wait for transaction to be confirmed before rerouting */
              /* await provider.waitForTransaction(val.hash) */
              console.log('val: ', val)
            } catch (err) {
              console.log('Error: ', err)
            }
          }   
        
    // } catch (error) {
        
    // }
   }






            // const addedd = added.path;
            // console.log("addedd", addedd.json());
           // return added.path
          } catch (err) {
            console.log('error: ', err)
          }


         // console.log("data", data1);




        // try {

        //     const { ethereum } = window

        //     if (ethereum) {
        //         const provider = new ethers.providers.Web3Provider(ethereum)
        //         const signer = provider.getSigner()

        //         const contract = new ethers.Contract(ewordAddress, Eword.abi, signer)

        //         const eword =  contract.createEWord(engword, plword, "kjasdlfklkasdflka")
            
        //         console.log("eword", eword);
        //     }
            
        // } catch (error) {
            
        // }

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