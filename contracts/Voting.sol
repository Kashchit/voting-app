// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract Voting {
    struct Candidate {
        string name;
        uint voteCount;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;
    address public owner;

    event Voted(address indexed voter, uint candidateIndex);

    constructor(string[] memory _candidateNames) {
        owner = msg.sender;
        console.log("Contract deployed by:", owner);

        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({ name: _candidateNames[i], voteCount: 0 }));
            console.log("Candidate added:", _candidateNames[i]);
        }
    }

    function vote(uint candidateIndex) external {
        console.log("Voter address:", msg.sender);
        console.log("Voting for candidate index:", candidateIndex);

        require(!hasVoted[msg.sender], "You have already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");

        candidates[candidateIndex].voteCount++;
        hasVoted[msg.sender] = true;

        console.log("Vote registered for:", candidates[candidateIndex].name);
        console.log("Total votes for", candidates[candidateIndex].name, ":", candidates[candidateIndex].voteCount);

        emit Voted(msg.sender, candidateIndex);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        console.log("Fetching candidate list");
        return candidates;
    }
}
