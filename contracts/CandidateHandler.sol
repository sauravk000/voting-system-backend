// SPDX-License-Identifier: MIT
pragma experimental ABIEncoderV2;
pragma solidity ^0.8.9;

contract CandidateHandler {
  uint private randNonce = 0;

  struct Candidate {
    uint64 votes;
    string name;
    mapping(address => uint) voteMapping;
    bool flag;
    address add;
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
    require(t.flag);
    return t;
  }

  event CandidateToken(uint256);

  // Add a candidate
  function addCandidate(uint cid, string calldata name) public returns (uint) {
    Team storage t = getTeam(cid);
    //If team exists
    if (t.flag) {
      uint cidc = randMod();
      Candidate storage c = t.candidateMapping[cidc];
      c.name = name;
      c.flag = true;
      c.add = msg.sender;
      t.cidArr.push(cidc);
      emit CandidateToken(cidc);
      return cidc;
    }
    return 0;
  }

  event TeamID(uint256 cidc);

  //New Team
  function createTeam(string calldata name) public {
    require(bytes(name).length != 0);
    uint cidc = randMod();
    uint toek = randMod();
    Team storage t = idToTeamMap[cidc];
    t.name = name;
    t.flag = true;
    t.token = toek;
    t.creator = msg.sender;
    t.cidArr.push(cidc);
    emit TeamID(cidc);
  }

  event Token(uint token);

  function getTeamToken(uint cidc) public {
    Team storage t = getTeam(cidc);
    uint c = t.token;
    require(t.creator == msg.sender);
    emit Token(c);
  }

  function addVoter(uint tCid, address add) public {
    Team storage t = getTeam(tCid);
    require(t.flag && t.creator == msg.sender);
    t.addressMap[add] = true;
  }

  function removeVoter(uint tCid, address add) public {
    Team storage t = getTeam(tCid);
    require(t.flag && t.creator == msg.sender && t.addressMap[add]);
    t.addressMap[add] = false;
  }

  function vote(uint tCid, uint cid) external {
    Team storage t = getTeam(tCid);
    require(t.flag);
    Candidate storage c = t.candidateMapping[cid];
    require(
      c.flag && c.voteMapping[msg.sender] == 0 && t.addressMap[msg.sender]
    );

    c.voteMapping[msg.sender] = 1;
    c.votes++;
  }

  event CandidateEvent(string name, uint votes, address add);

  function getCandidate(uint tCid, uint cid) external {
    Team storage t = getTeam(tCid);
    require(t.flag);
    Candidate storage c = t.candidateMapping[cid];
    require(c.flag);
    emit CandidateEvent(c.name, c.votes, c.add);
  }

  function getCandidateName(
    uint tCid,
    uint cid
  ) external view returns (string memory) {
    Team storage t = getTeam(tCid);
    require(t.flag);
    Candidate storage c = t.candidateMapping[cid];
    require(c.flag);
    return c.name;
  }

  function getCandidateVotes(
    uint tCid,
    uint cid
  ) external view returns (uint256) {
    Team storage t = getTeam(tCid);
    require(t.flag);
    Candidate storage c = t.candidateMapping[cid];
    require(c.flag);
    return c.votes;
  }
}
