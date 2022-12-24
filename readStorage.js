'use strict';
// Creating Web3 Instance
import Web3 from 'web3';
// Importing Contract Details
import {
  storageAbi as abi,
  storageAddr as contractAddr,
  coinbaseAddr,
  node_ip_port as node,
} from './StorageDetails/storageDetails102.js';

let args = process.argv.slice(2);

// Creating instance connection to the chain
export const init = async () => {
  // Creating connection to the node
  const web3 = new Web3(node);

  // Creating connection to the contract
  const contractAccess = new web3.eth.Contract(abi, contractAddr);

  // Requesting to Read from chain
  const result = await contractAccess.methods
    .getAllRecords(args[0])
    .call({ from: coinbaseAddr });

  // Variable Conversion
  let tempCvrt;

  function hexToAsciiConversion(hexi) {
    const tempPad = web3.utils.padRight(hexi, 64);
    tempCvrt = web3.utils.hexToAscii(tempPad);
    return tempCvrt;
  }

  // Printing results
  for (let i = 0; i < result.length; i++) {
    let returnRequest = `
    HadmID: ${+result[i].HadmID}
    AdmitTime: ${new Date(+result[i].AdmitTime).toUTCString()}
    DischargeTime: ${new Date(+result[i].DischTime).toUTCString()}
    DeathTime: ${
      +result[i].DeathTime === 0
        ? 0
        : new Date(+result[i].DeathTime).toUTCString()
    }
    Admission Type: ${hexToAsciiConversion(result[i].Admission_Type)}
    Admission Location: ${hexToAsciiConversion(result[i].Admission_Location)}
    Discharge Location: ${hexToAsciiConversion(result[i].Discharge_Location)}
    Insurance: ${hexToAsciiConversion(result[i].Insurance)}\n`;
    console.log(returnRequest);
  }
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
