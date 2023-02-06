import { Buffer } from "buffer";
import { create } from 'ipfs-http-client';
//const { create } = require("ipfs-http-client");

//import { fs } from 'fs';
// const projectId = "c1c004cd41d443d7ae1b0112f121aa48";
const projectId = "6bf0017525854fb6b94c4854b5d90ef0";

// c1c004cd41d443d7ae1b0112f121aa48

// const projectSecret = "6bf0017525854fb6b94c4854b5d90ef0";
const projectSecret = "c1c004cd41d443d7ae1b0112f121aa48";
const auth =
'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

//const fs = require("fs")
async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            // apiPath: "https://rinkeby.infura.io/v3/c1c004cd41d443d7ae1b0112f121aa48",
            apiPath: "/v3/c1c004cd41d443d7ae1b0112f121aa48",

            headers: {
                authorization: auth,
              },
        }
    );
    return ipfs;
}


async function saveText() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(`welcome ${new Date()}`);
    console.log(result);
}
 saveText();


///
// async function saveFile() {

//     let ipfs = await ipfsClient();

//     let data = fs.readFileSync("./package.json")
//     let options = {
//         warpWithDirectory: false,
//         progress: (prog) => console.log(`Saved :${prog}`)
//     }
//     let result = await ipfs.add(data, options);
//     console.log(result)
// }
// saveFile()

/////
// async function getData(hash) {
//     let ipfs = await ipfsClient();

//     let asyncitr = ipfs.cat(hash)

//     for await (const itr of asyncitr) {

//         let data = Buffer.from(itr).toString()
//         console.log(data)
//     }
// }

// getData("QmQbA7BrBNkh1bbSgtUYdUJYsHRfvRN6k5vocxHgjadUjr")
