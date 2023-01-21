// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EwordToken {
    string public name;
    address public owner;

    uint256 public totalSupply;

    using Counters for Counters.Counter;
    // Counters.Counter private _postIds;
    Counters.Counter private _ewordIds;





    constructor(string memory _name) {
        console.log("Deploying Blog with name:", _name);
        name = _name;
        owner = msg.sender;
        totalSupply = 1000000;
    }

    // function updateName(string memory _name) public {
    //     name = _name;
    // }

    // function transferOwnership(address newOwner) public onlyOwner {
    //     owner = newOwner;
    // }

    /* fetches an individual post by the content hash */
    // function fetchPost(string memory hash) public view returns(Post memory){
    //   return hashToPost[hash];
    // }


    /* creates a new post */
    // function createPost(string memory title, string memory hash) public onlyOwner {
    //     _postIds.increment();
    //     uint postId = _postIds.current();
    //     Post storage post = idToPost[postId];
    //     post.id = postId;
    //     post.title = title;
    //     post.published = true;
    //     post.content = hash;
    //     hashToPost[hash] = post;
    //     emit PostCreated(postId, title, hash);
    // }

    // function createEWord(string memory engword, string memory plword, string memory hash) public onlyOwner {
    //     _ewordIds.increment();
    //     uint ewordId = _ewordIds.current();
    //     EWord storage eword = idToEWord[ewordId];
    //     eword.id = ewordId;
    //     eword.engword = engword;
    //     eword.plword = plword;
    //     eword.published = true;
    //     eword.content = hash;
    //     hashToEWord[hash] = eword;
    //     // emit EWordCreated(ewordId, engword, plword, hash);
    //     emit EWordCreated(ewordId, engword, plword, hash);
    // }





    /* this modifier means only the contract owner can */
    /* invoke the function */
    modifier onlyOwner() {
      require(msg.sender == owner);
    _;
  }
}