// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.4;

contract SimpleDonate {
    address owner;

    struct DonateDetail {
        address addr;
        uint256 count;
        uint256 totalAmount;
    }

    mapping(address => DonateDetail) donatedAddress;

    address[] addresses;
    uint256 totalDonate;

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        DonateDetail storage donateDetail = donatedAddress[msg.sender];
        uint256 donateCount =  donateDetail.count;
        if (donateCount == 0) {
            addresses.push(msg.sender);
        }
        donateDetail.addr = msg.sender;
        donateDetail.count += 1;
        donateDetail.totalAmount += msg.value;

        totalDonate += msg.value;
    }

    function getTotalDonate() public view returns(uint256) {
        return totalDonate;
    }
    
    function getAddressDonated(address addr) public view returns(DonateDetail memory) {
        return donatedAddress[addr];
    }

    function geAllAddressDonated() public view returns(DonateDetail[] memory) {
        uint len = addresses.length;
        DonateDetail[] memory ret = new DonateDetail[](len);
        for (uint i = 0; i < len; i++) {
            ret[i] = donatedAddress[addresses[i]];
        }

        return ret;
    }

    function ownerClaim(uint256 amount) public returns(bool){
        require(owner == msg.sender, 'Only owner can claim.');
        payable(owner).transfer(amount);
        return true;
    }
}