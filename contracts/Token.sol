// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, ERC20Burnable, Pausable, Ownable {

    ERC721 private pumpkin;
    address public pumpkinAddress = 0x432d8155b6d0697c7c3ad8c1f857db57dd35f7c3;


    constructor() ERC20("MyToken", "MTK") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    function burnNFT(uint256 tokenId1, uint256 tokenId2) public {
        require(paused() == false, "Contract is paused");
        require(pumpkin.isApprovedForAll(_msgSender(), address(this)) == true, "Must approve contract.");
        require(_msgSender() == pumpkin.ownerOf(tokenId1), "Need to own Party Pumpkin 1.");
        // require(_msgSender() == pumpkin.ownerOf(tokenId2), "Need to own Party Pumpkin 2.");
        pumpkin.safeTransferFrom(_msgSender(), address(this), tokenId1, "0x00");
        // pumpkin.safeTransferFrom(_msgSender(), address(this), tokenId2, "0x00");
        _mint(_msgSender(), 500);
        // _tokenIdTracker.increment();
    }

    
}