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
const projectId = "2GFVSTCPQ1hbP2SOpZ9o8D0XNrB";
// const projectSecret = "73218477da4f55465286ea74021256f8"
const projectSecret = "e0c71491d47f9c4ce088eb050c3cc66a"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});








// https://polygon-mainnet.infura.io/v3/c1c004cd41d443d7ae1b0112f121aa48
// c1c004cd41d443d7ae1b0112f121aa48

/* define the ipfs endpoint */
// const client = create('https://ipfs.infura.io:5001/api/v0')
// const client = create('https://polygon-mainnet.infura.io/v3/c1c004cd41d443d7ae1b0112f121aa48')
// const client = create('https://polygon-mainnet.infura.io/c1c004cd41d443d7ae1b0112f121aa48')
//  const client = create('https://polygon-mainnet.infura.io/api/v3/c1c004cd41d443d7ae1b0112f121aa48')

// const client = create('https://ipfs.infura.io/api/v3/c1c004cd41d443d7ae1b0112f121aa48')


//////const client = create('https://ipfs.infura.io/api/v0/c1c004cd41d443d7ae1b0112f121aa48')


/* configure the markdown editor to be client-side import */
const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false }
)

// const initialState = { title: '', content: '' }
const initialState = { engword: '', plword: '' }

function AddWord() {
  /* configure initial state to be used in the component */
//   const [post, setPost] = useState(initialState)
  const [eword, setEWord] = useState(initialState)
  const [image, setImage] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const fileRef = useRef(null)
//   const { title, content } = post
  const { engword, plword } = eword
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      /* delay rendering buttons until dynamic import is complete */
      setLoaded(true)
    }, 500)
  }, [])

//   function onChange(e) {
//     setPost(() => ({ ...post, [e.target.name]: e.target.value }))
//   }
function onChange(e) {
    setEWord(() => ({ ...eword, [e.target.engword]: e.target.plword }))
  }

//   async function createNewPost() {   
//     /* saves post to ipfs then anchors to smart contract */
//     if (!title || !content) return
//     const hash = await savePostToIpfs()
//     await savePost(hash)
//     router.push(`/`)
//   }
   async function createNewEWord() {   
    /* saves post to ipfs then anchors to smart contract */
    if (!engword || !plword) return

   console.log("eword", eword)

    const hash = await saveEWordToIpfs()
    await saveEWord(hash)
    router.push(`/`)
  }

//   async function savePostToIpfs() {
//     /* save post metadata to ipfs */
//     try {
//       const added = await client.add(JSON.stringify(post))
//       return added.path
//     } catch (err) {
//       console.log('error: ', err)
//     }
//   }
   async function saveEWordToIpfs() {
    /* save post metadata to ipfs */
    try {
      const added = await client.add(JSON.stringify(eword))
      return added.path
    } catch (err) {
      console.log('error: ', err)
    }
  }


//   async function savePost(hash) {
//     /* anchor post to smart contract */
//     if (typeof window.ethereum !== 'undefined') {
//       const provider = new ethers.providers.Web3Provider(window.ethereum)
//       const signer = provider.getSigner()
//       const contract = new ethers.Contract(contractAddress, Blog.abi, signer)
//       console.log('contract: ', contract)
//       try {
//         const val = await contract.createPost(post.title, hash)
//         /* optional - wait for transaction to be confirmed before rerouting */
//         /* await provider.waitForTransaction(val.hash) */
//         console.log('val: ', val)
//       } catch (err) {
//         console.log('Error: ', err)
//       }
//     }    
//   }

  async function saveEWord(hash) {
    /* anchor post to smart contract */
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, Eword.abi, signer)
      console.log('contract: ', contract)
      try {
        const val = await contract.createEWord(eword.engword, eword.plword, hash)
        /* optional - wait for transaction to be confirmed before rerouting */
        /* await provider.waitForTransaction(val.hash) */
        console.log('val: ', val)
      } catch (err) {
        console.log('Error: ', err)
      }
    }    
  }


  function triggerOnChange() {
    /* trigger handleFileChange handler of hidden file input */
    fileRef.current.click()
  }

  async function handleFileChange (e) {
    /* upload cover image to ipfs and save hash to state */
   
   
    const uploadedFile = e.target.files[0]
    if (!uploadedFile) return
    // const added = await client.add(uploadedFile)
    const added = await uploadToIPFS(uploadedFile)

    // setPost(state => ({ ...state, coverImage: added.path }))
    setEWord(state => ({ ...state, coverImage: added }))
    setImage(uploadedFile) 
   
   
   
   // setImage(added)
  }


  const uploadToIPFS = async (file) => {
    const subdomain = 'https://dev4passion-eword.infura-ipfs.io';
    try {
     const added = await client.add({ content: file });
     const URL = `${subdomain}/ipfs/${added.path}`;
     return URL;
   } catch (error) {
     console.log('Error uploading file to IPFS.');
   }
 };

  return (
    <div className={container}>
      {
        image && (
          <img className={coverImageStyle} src={URL.createObjectURL(image)} />
        )
      }
      {/* <input
        onChange={onChange}
        name='title'
        placeholder='Give it a title ...'
        value={post.title}
        className={titleStyle}
      />
      <SimpleMDE
        className={mdEditor}
        placeholder="What's on your mind?"
        value={post.content}
        onChange={value => setPost({ ...post, content: value })}
      /> */}


       {/* <input
        onChange={onChange}
        name='engword'
        placeholder='engword'
        value={eword.engword}
        className={titleStyle}
      /> */}

       <SimpleMDE
        className={mdEditor}
        placeholder="engword"
        value={eword.engword}
        onChange={value => setEWord({ ...eword, engword: value })}
      />



      <SimpleMDE
        className={mdEditor}
        placeholder="plword?"
        value={eword.plword}
        onChange={value => setEWord({ ...eword, plword: value })}
      />
      {
        loaded && (
        //   <>
        //     <button
        //       className={button}
        //       type='button'
        //       onClick={createNewPost}
        //     >Publish</button>
        //     <button
        //       onClick={triggerOnChange}
        //       className={button}
        //     >Add cover image</button>
        //   </>
        <>
        <button
          className={button}
          type='button'
          onClick={createNewEWord}
        >Publish</button>
        <button
          onClick={triggerOnChange}
          className={button}
        >Add cover image</button>
      </>

        )
      }
      <input
        id='selectImage'
        className={hiddenInput} 
        type='file'
        onChange={handleFileChange}
        ref={fileRef}
      />
    </div>
  )
}

const hiddenInput = css`
  display: none;
`

const coverImageStyle = css`
  max-width: 800px;
`

const mdEditor = css`
  margin-top: 40px;
`

const titleStyle = css`
  margin-top: 40px;
  border: none;
  outline: none;
  background-color: inherit;
  font-size: 44px;
  font-weight: 600;
  &::placeholder {
    color: #999999;
  }
`

const container = css`
  width: 800px;
  margin: 0 auto;
`

const button = css`
  background-color: #fafafa;
  outline: none;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-right: 10px;
  font-size: 18px;
  padding: 16px 70px;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

// export default CreatePost
export default AddWord