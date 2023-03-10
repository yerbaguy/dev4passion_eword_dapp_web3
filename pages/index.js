import { css } from '@emotion/css'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import Link from 'next/link'
import { AccountContext } from '../context'
import { create } from 'ipfs-http-client'

/* import contract address and contract owner address */
import {
  contractAddress, ownerAddress
} from '../config'

/* import Application Binary Interface (ABI) */
// import Blog from '../artifacts/contracts/Blog.sol/Blog.json'
import Eword from '../artifacts/contracts/Eword.sol/Eword.json'


const ipfsURI = 'https://ipfs.io/ipfs/'
const client = create('https://ipfs.infura.io:5001/api/v0')




const initialState = { engword: ''}

 export default function Home(props) {


  // const SimpleMDE = dynamic(
  //   () => import('react-simplemde-editor'),
  //   { ssr: false }
  // )

 // export default function Home(props, propss) {

  // const [dataRandom, setDataRandom] = useState("")
  /* posts are fetched server side and passed in as props */
  /* see getServerSideProps */
  // const { posts } = props

  const [ewordid, setEWordId] = useState(0)

  const [eWord, setEWord] = useState(initialState)

  const { engword, plword } = eWord
  const { ewords } = props
  const { data_random } = props


 
  const min = Math.ceil(1);
  const max = Math.floor(ewords.length);

  // return Math.floor(Math.random() * (max - min) + min);
  const datarandom = Math.floor(Math.random() * (max - min) + min);




  //  const datarandom = getRandomInt();
   //setDataRandom(data_random);


   console.log("ewords", ewords);
   console.log("ewords", ewords[0]);
   //console.log("ewords", ewords[0].engword);
   //console.log("ewords", ewords[1][1]);
   console.log("data-random", datarandom);
   //console.log("ewords-engword", ewords[1].engword);
  //  console.log("ewords-plword", ewords[1]); ok
  // console.log("ewords-plword", ewords[2]);



  // console.log("ewords-plword", ewords[0][2]);
  // console.log("ewords-plword", ewords[0][3]);  probably shows error because there is nothing in block

  // console.log("datarandom", ewords[datarandom][2]);
  // const eword = ewords[datarandom][2]; nothing in the block





  //console.log("ewords-plword", ewords[4]);
  //  setEWordId(datarandom);
  //  console.log("ewordid", ewordid);
   
    // setEWordId(data_random);
    // console.log("data_random", ewordid);


 
  //  const data_random = getRandomInt();
  //  //setDataRandom(data_random);
      
  //  console.log("data-random", data_random);
  



  const account = useContext(AccountContext)

  const router = useRouter()
  // async function navigate() {
  //   router.push('/create-post')
  // }
  async function navigate() {
    router.push('/add-word')
  }

 // fetchEWord("1")

 // console.log(`${ewords[2]}`)



 async function fetchEWord() {

 // let ewordid = 2
  let id = 2

  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }

  // const contract = new ethers.Contract(contractAddress, Eword.abi, provider)
  //   // const val = await contract.fetchEWord(ewordid)
  //   const val = await contract.fetchEWord(id)
  //  // const ewordId = val[0].toNumber()


    const ipfsUrl = `${ipfsURI}/${id}`

    // const ipfsUrl = `${ipfsURI}/${ewordId}`
     const response = await fetch(ipfsUrl)
     const data = await response.json()

     console.log("data", data)

 }

//  useEffect(() => {
//   fetchPost()
// }, [id])

  // useEffect(() => {
  //  // fetchPost()
  // }, [])

  {ewords}

  return (

    <div>

{/* <SimpleMDE
        className={mdEditor}
        placeholder="engword"
        value={eword.engword}
        onChange={value => setEWord({ ...eword, engword: value })}
      /> */}
     





      <p> 
        {/* { eword } shows random word */} 
        
        {/* <input
        onChange={onChange}
        name='title'
        placeholder='Give it a title ...'
        value={post.title}
        className={titleStyle}
      /> */}
        
        
        </p>
      
      {/* <p> { ewords["+datarandom+"][2] }</p> */}
      console.log({ewords.engword})
         <div className={postList}>
        {
          /* map over the posts array and render a button with the post title */
          // posts.map((post, index) => (
          //   <Link href={`/post/${post[2]}`} key={index}>
          //     <a>
          //       <div className={linkStyle}>
          //         <p className={postTitle}>{post[1]}</p>
          //         <div className={arrowContainer}>
          //         <img
          //             src='/right-arrow.svg'
          //             alt='Right arrow'
          //             className={smallArrow}
          //           />
          //         </div>
          //       </div>
          //     </a>
          //   </Link>
          // ))


          ewords.map((eword, index) => (          
           
            //  <Link href={`/eword/${eword[2]}`} key={index}>
            <Link href={`/eword/${eword[3]}`} key={index}>
              {/* {eword[{datarandom}]} */}
           {/* </Link> <Link href={`/eword/${eword[0][2]}`} key={index}> */}
              <a>
                {ewords.length}
              {/* {data_random} */}
                { data_random }
            
                <div className={linkStyle}>
                  {/* <p className={postTitle}>{eword[datarandom][3]}</p> */}
                  <p className={postTitle}>{eword[1]}</p>
                  <div className={arrowContainer}>
                  <img
                      src='/right-arrow.svg'
                      alt='Right arrow'
                      className={smallArrow}
                    />
                  </div>
                </div>
              </a>
            </Link>
          ))
        }
      </div>
      <div className={container}>
        {
          // (account === ownerAddress) && posts && !posts.length && (
            (account === ownerAddress) && ewords && !ewords.length && (
            /* if the signed in user is the account owner, render a button */
            /* to create the first post */
            <button className={buttonStyle} onClick={navigate}>
              Create your first post
              <img
                src='/right-arrow.svg'
                alt='Right arrow'
                className={arrow}
              />
            </button>
          )
        }
      </div>
    </div>
  )
}

export async function getServerSideProps() {

   
  /* here we check to see the current environment variable */
  /* and render a provider based on the environment we're in */
  let provider
  if (process.env.ENVIRONMENT === 'local') {
    provider = new ethers.providers.JsonRpcProvider()
  } else if (process.env.ENVIRONMENT === 'testnet') {
    provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.matic.today')
  } else {
    provider = new ethers.providers.JsonRpcProvider('https://polygon-rpc.com/')
  }

  // const contract = new ethers.Contract(contractAddress, Blog.abi, provider)
  // const data = await contract.fetchPosts()
  // return {
  //   props: {
  //     posts: JSON.parse(JSON.stringify(data))
  //   }
  // }

////////
  const contract = new ethers.Contract(contractAddress, Eword.abi, provider)
  const data = await contract.fetchEWords()

  console.log("data", data);
  ////////

  // const ipfsURI = 'https://ipfs.io/ipfs/'
  const ipfsURI = 'https://ipfs.io/ipfs/'
  // const ipfsUrl = `${ipfsURI}/${id}`
  //  const ipfsUrl = `${ipfsURI}/${"QmUwh7wvPrDZ1qdoXWMFDCm3efqvyTy39QEHERhYhppFft"}`
  const ipfsUrl = `${ipfsURI}/${"QmSsZQ92zPHfKodYEWDXDbMa62iKBLnmDo7mXCTeJA3W2Q"}`
  //const ipfsUrl = `${ipfsURI}/${"QmYUGA1YuFgWB7VQ48TH34fFsqT5jpB9C7pCuLG3DhkynF"}`
  //const ipfsUrl = `${ipfsURI}/${"QmS1v3SePZMGWBtNBtkfMmVWtjXEHcjoYC5kvwyy5nDJEC"}`
  const response = await fetch(ipfsUrl)
  const data1 = await response.json()


  // const data1 = await contract.fetchEWord("2")
   console.log("data1", data1);


 // const paths = data.map(d => ({ params: { id: d[2] } }))

  //const { id } = params

  //trying
  // const id = 2
  // const ipfsUrl = `${ipfsURI}/${id}`
  // const response = await fetch(ipfsUrl)
  // const dataa = await response.json()
  //trying

   
  
  //
  console.log("data", data.length)
   //

  //  const getRandomNumber = () => {

  //   function getRandomInt(min, max) {
  //     // min = Math.ceil(min);
  //     // max = Math.floor(max);
  //     min = Math.ceil(1);
  //     max = Math.floor(data.length);

  //     return Math.floor(Math.random() * (max - min) + min);

  //   }
  //  };

   function getRandomInt(min, max) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    min = Math.ceil(1);
    max = Math.floor(data.length);

    return Math.floor(Math.random() * (max - min) + min);

  }

   const data_random = getRandomInt();
   //setDataRandom(data_random);

   console.log("data-random", data_random);
   console.log("data", data.length)
   
   //console.log("data-engword", eword )


   

  return {

  
    

    props: {

    
      // posts: JSON.parse(JSON.stringify(data))
      // ewords: JSON.parse(JSON.stringify(data))
      ewords: JSON.parse(JSON.stringify(data)),
      data_random: JSON.parse(JSON.stringify(data_random))
      //paths
      
    }

    
    // propss: {
    //   // posts: JSON.parse(JSON.stringify(data))
    //   // ewords: JSON.parse(JSON.stringify(data))
    //   // data_random: JSON.parse(JSON.stringify(data_random))
    //   data_random: data_random
      
    // }
  }

  
}


const arrowContainer = css`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  padding-right: 20px;
`

const postTitle = css`
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  margin: 0;
  padding: 20px;
`

const linkStyle = css`
  border: 1px solid #ddd;
  margin-top: 20px;
  border-radius: 8px;
  display: flex;
`

const postList = css`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;  
`

const container = css`
  display: flex;
  justify-content: center;
`

const buttonStyle = css`
  margin-top: 100px;
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 44px;
  padding: 20px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, .1);
`

const arrow = css`
  width: 35px;
  margin-left: 30px;
`

const smallArrow = css`
  width: 25px;
`


// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <meta name="description" content="Generated by create next app" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h2>Documentation &rarr;</h2>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h2>Learn &rarr;</h2>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h2>Examples &rarr;</h2>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h2>Deploy &rarr;</h2>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <span className={styles.logo}>
//             <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
//           </span>
//         </a>
//       </footer>
//     </div>
//   )
// }
