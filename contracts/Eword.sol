// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Eword {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    // Counters.Counter private _postIds;
    Counters.Counter private _ewordIds;

    // struct Post {
    //   uint id;
    //   string title;
    //   string content;
    //   bool published;
    // }

     struct EWord {
      uint id;
      string engword;
      string plword;
      string content;
      bool published;
    }



    /* mappings can be seen as hash tables */
    /* here we create lookups for posts by id and posts by ipfs hash */
    // mapping(uint => Post) private idToPost;
    // mapping(string => Post) private hashToPost;

    mapping(uint => EWord) private idToEWord;
    mapping(string => EWord) private hashToEWord;

    /* events facilitate communication between smart contractsand their user interfaces  */
    /* i.e. we can create listeners for events in the client and use them in The Graph  */
    // event PostCreated(uint id, string title, string hash);
    // event PostUpdated(uint id, string title, string hash, bool published);
    
      event EWordCreated(uint id, string engword, string plword, string hash);
     //    event EWordCreated(uint id, string hash);

    // event EWordCreated(uint id, string hash);
   // event EWordUpdated(uint id, string engword, string plword, string title, string hash, bool published);


    /* when the blog is deployed, give it a name */
    /* also set the creator as the owner of the contract */
    constructor(string memory _name) {
        console.log("Deploying Blog with name:", _name);
        name = _name;
        owner = msg.sender;
    }

    function updateName(string memory _name) public {
        name = _name;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    /* fetches an individual post by the content hash */
    // function fetchPost(string memory hash) public view returns(Post memory){
    //   return hashToPost[hash];
    // }

    function fetchEWord(string memory hash) public view returns(EWord memory){
      return hashToEWord[hash];
    }

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
    //      //emit EWordCreated(ewordId, engword, plword, hash);
    //       emit EWordCreated(ewordId, engword, plword, hash);
    //      //       emit EWordCreated(ewordId, hash);
    // }

       function createEWord(string memory engword, string memory plword, string memory hash) public onlyOwner {
        _ewordIds.increment();
        uint ewordId = _ewordIds.current();
        EWord storage eword = idToEWord[ewordId];
        eword.id = ewordId;
        eword.engword = engword;
        eword.plword = plword;
        eword.published = true;
        eword.content = hash;
        hashToEWord[hash] = eword;
         //emit EWordCreated(ewordId, engword, plword, hash);
           emit EWordCreated(ewordId, engword, plword, hash);
         // emit EWordCreated(ewordId, hash);


         //       emit EWordCreated(ewordId, hash);
    }


    // /* updates an existing post */
    // function updatePost(uint postId, string memory title, string memory hash, bool published) public onlyOwner {
    //     Post storage post =  idToPost[postId];
    //     post.title = title;
    //     post.published = published;
    //     post.content = hash;
    //     idToPost[postId] = post;
    //     hashToPost[hash] = post;
    //     emit PostUpdated(post.id, title, hash, published);
    // }

    // /* fetches all posts */
    // function fetchPosts() public view returns (Post[] memory) {
    //     uint itemCount = _postIds.current();

    //     Post[] memory posts = new Post[](itemCount);
    //     for (uint i = 0; i < itemCount; i++) {
    //         uint currentId = i + 1;
    //         Post storage currentItem = idToPost[currentId];
    //         posts[i] = currentItem;
    //     }
    //     return posts;
    // }

        /* fetches all posts */
    function fetchEWords() public view returns (EWord[] memory) {
        uint itemCount = _ewordIds.current();

        EWord[] memory ewords = new EWord[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            uint currentId = i + 1;
            EWord storage currentItem = idToEWord[currentId];
            ewords[i] = currentItem;
        }
        return ewords;
    }


    /* this modifier means only the contract owner can */
    /* invoke the function */
    modifier onlyOwner() {
      require(msg.sender == owner);
    _;
  }
}