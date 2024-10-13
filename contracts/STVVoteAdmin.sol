// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVote.sol";

contract STVVoteAdmin is STVVote {
    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor(string[] memory candidateNames) STVVote(candidateNames) {
        admin = msg.sender;
    }

    function addCandidate(string memory name) public onlyAdmin {
        candidates.push(Candidate({
            name: name,
            voteCount: 0
        }));
    }

    function removeCandidate(uint index) public onlyAdmin {
        require(index < candidates.length, "Invalid candidate index");
        candidates[index] = candidates[candidates.length - 1];
        candidates.pop();
    }
}