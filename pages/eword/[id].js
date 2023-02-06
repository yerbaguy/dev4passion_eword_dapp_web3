import ReactMarkdown from 'react-markdown'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { css } from '@emotion/css'
import { ethers } from 'ethers'
import { AccountContext } from '../../context'

/* import contract and owner addresses */
import {
  contractAddress, ownerAddress
} from '../../config'
 import Eword from '../../artifacts/contracts/Eword.sol/Eword.json'

import { create as ipfsHttpClient } from 'ipfs-http-client';

const ipfsURI = 'https://ipfs.io/ipfs/'
//const ipfsURI = 'https://ipfs.io/ipfs/'

const projectId = "2GXCN4RVu5oOwOwAw77zytYHevQ";
const projectSecret = "e1c92e31182812e4b7a923ab54f586df"
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

// const ipfsURI = ipfsHttpClient({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth,
//   },
// });

// const ipfsURI = ipfsHttpClient({
//     host: 'https://infura.io/ipfs',
//     port: 5001,
//     protocol: 'https',
//     headers: {
//       authorization: auth,
//     },
//   });

// export default function Post({ post }) {
export default function EWord({ eword }) {
  const account = useContext(AccountContext)
  const router = useRouter()
  const { id } = router.query


   // const { ewords } = eword;
    const ewords = eword;
 // const { data_random } = props
 
  const min = Math.ceil(1);
  const max = Math.floor(ewords.length);

  // return Math.floor(Math.random() * (max - min) + min);
  const datarandom = Math.floor(Math.random() * (max - min) + min);

  console.log("ewords", ewords);
   console.log("data-random", datarandom);




  if (router.isFallback) {
    return <div>Loading...</div>
  }


  return (
    <div>


<SimpleMDE
        className={mdEditor}
        placeholder="engword"
        value={eword.engword}
        onChange={value => setEWord({ ...eword, engword: value })}
      />
        
      {
        // post && (
            eword && (
          <div className={container}>
            console.log("eword-", eword)
            {
              /* if the owner is the user, render an edit button */
              ownerAddress === account && (
                <div className={editPost}>
                  <Link href={`/edit-post/${id}`}>
                    <a>
                      Edit post
                    </a>
                  </Link>
                </div>
              )
            }
            {
              /* if the post has a cover image, render it */
            //   post.coverImage && (
                eword.coverImage && (
                <img
                //   src={post.coverImage}
                src={eword.coverImage}
                  className={coverImageStyle}
                />
              )
            }
            {/* <h1>{post.title}</h1> */}
            <h1>{eword.engword}</h1>
            <div className={contentContainer}>
              {/* <ReactMarkdown>{post.content}</ReactMarkdown> */}
              <ReactMarkdown>{eword.plword}</ReactMarkdown>
            </div>
          </div>
        )
      }
    </div>
  )
}

export async function getStaticPaths() {
  /* here we fetch the posts from the network */
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }

//   const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
//   const data = await contract.fetchPosts()
const contract = new ethers.Contract(contractAddress, Eword.abi, provider)
const data = await contract.fetchEWords()


  /* then we map over the posts and create a params object passing */
  /* the id property to getStaticProps which will run for ever post */
  /* in the array and generate a new page */
  const paths = data.map(d => ({ params: { id: d[2] } }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {

    console.log("params", params)
  /* using the id property passed in through the params object */
  /* we can us it to fetch the data from IPFS and pass the */
  /* post data into the page as props */
//   QmUwh7wvPrDZ1qdoXWMFDCm3efqvyTy39QEHERhYhppFft
  const { id } = params
    // const ipfsUrl = `${ipfsURI}/${id}`
  //  const ipfsUrl = `${ipfsURI}/${id}`
  const ipfsUrll = `${ipfsURI}/${id}`
  console.log("ipfsUrll", ipfsUrll);
  //const ipfsUrl = `${ipfsURI}/${2}`
 // const ipfsUrl = `${ipfsURI}/${"QmUwh7wvPrDZ1qdoXWMFDCm3efqvyTy39QEHERhYhppFft"}`
const ipfsUrl = `${ipfsURI}/${id}`
   console.log("ipfsUrl", ipfsUrl)
   // const ipfsUrl = `${'https://ipfs.io/ipfs/QmeqQcgqMBySkE3PXZJTs7x7RZiFPSYVH45e9LYt2kGBzM'}/${id}`


//   https://ipfs.io/ipfs/QmeqQcgqMBySkE3PXZJTs7x7RZiFPSYVH45e9LYt2kGBzM
   const response = await fetch(ipfsUrl)
  //const response = await fetch('https://ipfs.io/ipfs/QmeqQcgqMBySkE3PXZJTs7x7RZiFPSYVH45e9LYt2kGBzM')
  const data = await response.json()
  console.log("data-id", data)
  if(data.coverImage) {
    // let coverImage = `${ipfsURI}/${data.coverImage}`
    let coverImage = `${data.coverImage}`
    data.coverImage = coverImage
  }

  return {
    props: {
    //   post: data
      eword: data
    },
  }
}

const editPost = css`
  margin: 20px 0px;
`

const coverImageStyle = css`
  width: 900px;
`

const container = css`
  width: 900px;
  margin: 0 auto;
`

const contentContainer = css`
  margin-top: 60px;
  padding: 0px 40px;
  border-left: 1px solid #e7e7e7;
  border-right: 1px solid #e7e7e7;
  & img {
    max-width: 900px;
  }
`