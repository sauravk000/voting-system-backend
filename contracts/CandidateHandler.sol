// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.8.9;

contract CandidateHandler {
  uint private randNonce = 0;

  struct Candidate {
    uint64 votes;
    string name;
    string description;
    mapping(address => uint) voteMapping;
    bool flag;
  }
  struct Team {
    Candidate[] candidates;
    mapping(uint => Candidate) candidateMapping;
    mapping(address => bool) addressMap;
    string name;
    uint[] cidArr;
    uint token;
    address creator;
    bool flag;
  }

  //Generates random number
  function randMod() private returns (uint) {
    // increase nonce
    randNonce++;
    return
      uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce)));
  }

  Team[] private teams;
  uint[] private cids;

  mapping(uint => Team) private idToTeamMap;

  function getTeam(uint cid) private view returns (Team storage) {
    Team storage t = idToTeamMap[cid];
    return t;
  }

  // Add a candidate
  function addCandidate(
    uint cid,
    string memory name,
    string memory description
  ) public returns (uint) {
    Team storage t = getTeam(cid);
    //If team exists
    if (t.flag) {
      uint cidc = randMod();
      Candidate storage c = t.candidateMapping[cidc];
      c.name = name;
      c.description = description;
      c.flag = true;
      // t.candidates.push(c);
      t.cidArr.push(cidc);
      t.addressMap[msg.sender] = true;
      return cidc;
    }
    return 0;
  }

  event TeamID(uint256 cidc);

  //New Team
  function createTeam(string memory name) public returns (uint256) {
    uint cidc = randMod();
    uint toek = randMod();
    Team storage t = idToTeamMap[cidc];
    t.name = name;
    t.flag = true;
    t.token = toek;
    t.creator = msg.sender;
    t.cidArr.push(cidc);
    emit TeamID(cidc);
    return cidc;
  }

  function getTeamToken(uint cidc) public view returns (uint) {
    Team storage t = getTeam(cidc);
    if (t.creator == msg.sender) return t.token;
    return 0;
  }

  event VoteDone(bool voteDone);

  function vote(uint tCid, uint cid) external {
    Team storage t = getTeam(tCid);
    if (t.flag) {
      Candidate storage c = t.candidateMapping[cid];
      if (
        c.flag && c.voteMapping[msg.sender] == 0 && t.addressMap[msg.sender]
      ) {
        c.voteMapping[msg.sender] = 1;
        c.votes++;
        emit VoteDone(true);
      }
    }
    emit VoteDone(false);
  }

  // function getAllCandidates(
  //   uint tCid
  // ) public view returns (Candidate[] memory) {
  //   return getTeam(tCid).candidates;
  // }
}
