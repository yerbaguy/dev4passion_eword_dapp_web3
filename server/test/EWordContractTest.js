const{expect} = require("chai");
const{ethers} = require("hardhat");

describe("EWord Contract", function() {
    let EWordContract;
    let ewordContract;
    let owner;

    const NUM_TOTAL_EWORDS = 5;

    let totalEWords;

    beforeEach(async function() {
        EWordContract = await ethers.getContractFactory("EWordContract");
        [owner] = await ethers.getSigners();
        ewordContract = await EWordContract.deploy();

        totalEWords = [];

        for (let i = 0; i < NUM_TOTAL_EWORDS; i++) {

            let eword = {
                'engword': 'kind',
                'plword': 'uprzejmy'
               // 'plword': + i
            };

            await ewordContract.addEWord(eword.engword, eword.plword);
            totalEWords.push(eword);
        }

        // await ewordContract.addEWord(eword.engword, eword.plword);
        // totalEWords.push(eword);
    




        describe("Add EWord", function() {
            it("Should emit AddWord event", async function() {
                let eword = {
                    'engword': 'kind',
                    'plword': 'uprzejmy'
                };
    
                // await expect(await ewordContract.addEWord(eword.engword, eword.plword)
                // ).to.emit(ewordContract.EWordContract, 'addEWord').withArgs(owner.address, NUM_TOTAL_EWORDS)
                await expect(await ewordContract.addEWord(eword.engword, eword.plword)
                ).to.emit(ewordContract.EWordContract, 'AddWord').withArgs(owner.address, NUM_TOTAL_EWORDS);
    
            });
        });

        describe("Get AllWorods", function() {
            it("Should return the correct number of total words", async function() {
                const ewords = await ewordContract.getEWords();
                expect(ewords.length).to.equal(NUM_TOTAL_EWORDS);
            });
        });







    });







    // describe("Add EWord", function() {
    //     it("Should emit AddWord event", async function() {
    //         let eword = {
    //             'engword': 'kind',
    //             'plword': 'uprzejmy'
    //         };

    //         // await expect(await ewordContract.addEWord(eword.engword, eword.plword)
    //         // ).to.emit(ewordContract.EWordContract, 'addEWord').withArgs(owner.address, NUM_TOTAL_EWORDS)
    //         await expect(await ewordContract.addEWord(eword.engword, eword.plword)
    //         ).to.emit(ewordContract.EWordContract, 'AddWord').withArgs(owner.address, NUM_TOTAL_EWORDS);

    //     });
    // });
})