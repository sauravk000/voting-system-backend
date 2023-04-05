import fs from 'fs';
import util from 'util';


const readFile = util.promisify(fs.readFile);

export const getContractAddress = async function() {
  try{
  const contractAddress = (await readFile('contract.txt')).toString('utf-8');
  return contractAddress;
  }catch(err) {
    console.log(err);
  }
};
export const getabi = async function () {
  try {
    const info = await readFile('artifacts/contracts/CandidateHandler.sol/CandidateHandler.json', 'utf-8');
    const infoOb = JSON.parse(info);
    return infoOb.abi;
  } catch (err) {
    console.log(err);
  }
}