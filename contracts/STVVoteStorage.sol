// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./STVVoteEvents.sol";

contract STVVoteStorage is VoteCountingEvents {
    struct Candidate {
        string name;
        uint voteCount;
    }

    mapping(address => bool) public voters;
    Candidate[] public candidates;

    constructor(string[] memory candidateNames) {
        for (uint i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({
                name: candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function recordVote(uint[] memory preferences) public {
        require(!voters[msg.sender], "You have already voted.");
        require(preferences.length > 0, "Preferences cannot be empty.");
        voters[msg.sender] = true;

        for (uint i = 0; i < preferences.length; i++) {
            require(preferences[i] < candidates.length, "Invalid candidate index.");
            candidates[preferences[i]].voteCount++;
            emit VoteCast(msg.sender, preferences);
        }
    }

    function getCandidates() public view returns (string[] memory) {
        string[] memory candidateNames = new string[](candidates.length);
        for (uint i = 0; i < candidates.length; i++) {
            candidateNames[i] = candidates[i].name;
        }
        return candidateNames;
    }
}