// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address contractAddress;

    // Define a mapping to store the remaining supply for each token ID
    mapping(uint256 => uint256) private _tokenSupply;

    constructor(address marketplaceAddress) ERC721("Penpal Tokens", "PPT") {
        contractAddress = marketplaceAddress;
    }

    // Modify the mintToken function to accept a supply argument
    function mintToken(
        string memory tokenURI,
        uint256 supply
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        // Set the initial supply for the new token
        _tokenSupply[newTokenId] = supply;

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        setApprovalForAll(contractAddress, true);
        return newTokenId;
    }

    // Add a function to get the remaining supply for a given token ID
    function getTokenSupply(uint256 tokenId) public view returns (uint256) {
        return _tokenSupply[tokenId];
    }

    // Modify the transferToken function to check that the remaining supply is greater than zero
    function transferToken(address from, address to, uint256 tokenId) external {
        require(ownerOf(tokenId) == from, "From address must be token owner");

        // Check that the remaining supply is greater than zero
        require(_tokenSupply[tokenId] > 0, "Token supply has been exhausted");

        // Decrement the remaining supply for the token
        _tokenSupply[tokenId]--;

        _transfer(from, to, tokenId);
    }

    function getContractAddress() public view returns (address) {
        return contractAddress;
    }
}
