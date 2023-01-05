'use strict';
// Creating Web3 Instance
import Web3 from 'web3';

import {
  storageAbi as abi,
  storageAddr as contractAddr,
  coinbaseAddr,
  node_ip_port as node,
} from '../storageDetails102.js';

/*
  This is an example for terminal input, user is free to change input method base on their own requirements.
*/
let args = process.argv.slice(3);

// Assigning arguments values to variables
const Subject_ID = +args[0];
const Hadm_ID = +args[1];
const AdmitTime = new Date([args[2], args[3]].join(' ')).getTime();
const DischargeTime = new Date([args[4], args[5]].join(' ')).getTime();
const DeathTime = new Date([args[6], args[7]].join(' ')).getTime() || 0;
const Admission_type = args[8];
const Admission_location = args[9];
const Discharge_location = args[10];
const insurance = args[11];

// Printing variables
console.log('\nSubjectID: ', Subject_ID);
console.log('Hadm_ID: ', Hadm_ID);
console.log('AdmitTime: ', AdmitTime);
console.log('DischargeTime: ', DischargeTime);
console.log('DeathTime: ', DeathTime);
console.log('Admission Type: ', Admission_type);
console.log('Admission Location: ', Admission_location);
console.log('Discharge Location: ', Discharge_location);
console.log('Insurance: ', insurance, '\n');

// Creating instance connection to the chain
const init = async () => {
  // Creating connection to the node
  const web3 = new Web3(node);

  // Creating connection to the contract
  const contractAccess = new web3.eth.Contract(abi, contractAddr);

  // Ascii Hex Conversion
  function changeAscii2Hex(string) {
    return web3.utils.padRight(web3.utils.asciiToHex(string), 64);
  }

  const Admission_Type = changeAscii2Hex(Admission_type);
  const Admission_Location = changeAscii2Hex(Admission_location);
  const Discharge_Location = changeAscii2Hex(Discharge_location);
  const Insurance = changeAscii2Hex(insurance);

  // Writing Record to the chain
  await contractAccess.methods
    .addPatient(Subject_ID, [
      Hadm_ID,
      AdmitTime,
      DischargeTime,
      DeathTime,
      Admission_Type,
      Admission_Location,
      Discharge_Location,
      Insurance,
    ])
    .send({ from: coinbaseAddr });
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
