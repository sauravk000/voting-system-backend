import hre from "hardhat";
import fs from 'fs';
import util from 'util'; 

const writeFile = util.promisify(fs.writeFile);

async function verify(contractAddress) {
  await hre.run("verify:verify", {address: contractAddress, contract: "contracts/CandidateHandler.sol:CandidateHandler"});
}

async function main() {
  try{
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log(hre.ethers.utils.formatEther(balance));

  const CandidateHandler = await hre.ethers.getContractFactory("CandidateHandler");
  const candidateHandler = await CandidateHandler.deploy();
  await candidateHandler.deployed();
  await candidateHandler.deployTransaction.wait(5);

  await writeFile('contract.txt', candidateHandler.address);
  await verify(candidateHandler.address);
  console.log("The contract has been verified");
  }catch(err) {
    console.log(err);
  }
}

main()
  .then(() => process.exit(0))