import { useState, useRef, useEffect } from 'react' // new
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
//import { create } from 'ipfs-http-client'

/* import contract address and contract owner address */
import {
  contractAddress
} from '../config'

// import Blog from '../artifacts/contracts/Blog.sol/Blog.json'
import Eword from '../artifacts/contracts/Eword.sol/Eword.json'


import { create as ipfsHttpClient } from 'ipfs-http-client';
import { LogDescription } from 'ethers/lib/utils'

// const projectId = process.env.PUBLIC_IPFS_PROJECT_ID;
// const projectSecret = process.env.PUBLIC_API_KEY_SECRET;

// const projectId = "2FjjZioryml4Mm4sy2xb4W3RjG6";
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


export default function EWordss() {

    const [engword, setEngword] = useState('');
    const [plword, setPlword] = useState('');

    const router = useRouter()

    const eword = {
        engword: setEngword,
        plword: setPlword
    };

    async function submitEWord() {

        console.log("engword", engword);
        console.log("plword", plword);

        const hash = await saveEWordToIpfs()
        console.log("hash", hash)

        await saveEWord(hash)
        router.push(`/`)

    }

    async function saveEWordToIpfs() {
        /* save post metadata to ipfs */
        try {
          console.log("ipfs", eword.engword)
          console.log("ipfs", eword.plword)
          const added = await client.add(JSON.stringify(eword))
          console.log("addedd", added.path)
          console.log("addedd", added.path)
          return added.path
        } catch (err) {
          console.log('error: ', err)
        }
      }

      async function saveEWord(hash) {
        /* anchor post to smart contract */
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          const signer = provider.getSigner()
          const contract = new ethers.Contract(contractAddress, Eword.abi, signer)
          console.log('contract: ', contract)
        //   console.log("saveEWord-engword", eword.engword)
        //   console.log("saveEWord-plword", eword.plword)
          try {
    
           // const hash = "lkajsdflkjalsdkjflaksdf";
    
            console.log("hash", hash.path);
    
            //  const val = await contract.createEWord(eword.engword, eword.plword, hash)
            const val = await contract.createEWord(hash)

             // const val = await contract.createEWord(hash)
            //const val = await contract.createEWord(hash)
            /* optional - wait for transaction to be confirmed before rerouting */
            /* await provider.waitForTransaction(val.hash) */
            console.log('val: ', val)
          } catch (err) {
            console.log('Error: ', err)
          }
        }    
      }
    

    return (
        <dev>
            <input type="text" onChange={ (e) => setEngword(e.target.value)} />
            <input type="text" onChange={ (e) => setPlword(e.target.value)} />
            <button onClick={submitEWord}>Submit</button>

        </dev>
    );
}

// export default EWordss