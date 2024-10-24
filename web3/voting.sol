// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    // Structure to hold candidate details
    struct Candidate {
        string id; // Unique ID for each candidate
        string name; // Name of the candidate
        uint voteCount; // Number of votes received by the candidate
    }

    mapping(string => Candidate) public candidates; // Mapping of candidate ID to Candidate struct
    string[] public candidateIds; // Array to store candidate IDs

    // Event to emit when a vote is casted
    event votedEvent(string indexed _candidateId);

    constructor() {
        addCandidate("A", "Alice"); // Add initial candidates during contract deployment
        addCandidate("B", "Bob");
    }

    function addCandidate(string memory _candidateId, string memory _name) private {
        candidates[_candidateId] = Candidate(_candidateId, _name, 0); // Add new candidate to mapping
        candidateIds.push(_candidateId); // Store candidate ID in the array
    }

    function vote(string memory _candidateId) public {
        require(
            keccak256(abi.encodePacked(_candidateId)) == keccak256(abi.encodePacked("A")) || 
            keccak256(abi.encodePacked(_candidateId)) == keccak256(abi.encodePacked("B")),
            "Invalid candidate ID"
        ); // Validate candidate ID

        candidates[_candidateId].voteCount++; // Increment vote count for chosen candidate

        emit votedEvent(_candidateId); // Emit event for voting action
    }

    // Function to get an array of all candidates with their votes
    function result() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateIds.length);
        
        for (uint i = 0; i < candidateIds.length; i++) {
            allCandidates[i] = candidates[candidateIds[i]]; // Populate the array with candidates' data
        }
        
        return allCandidates; // Return the array of candidates
    }
}
