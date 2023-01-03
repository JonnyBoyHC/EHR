'use strict';
import fs from 'fs';


import xlsx from 'xlsx';
// Opening log file
let wb = xlsx.readFile('./rw_timestampOf2Networks.xlsx');
let ws = wb.Sheets['Sheet1'];

let args = process.argv.slice(2);
let startNo = args[0];
let stopNo = args[1];

let allPatients = [];
let eachPatient = [];

// Creating Web3 Instance
import Web3 from 'web3';
// Importing Contract Details
import {
  admStrCtrlAbi as abi102,
  admStrCtrl as contractAddr102,
  coinbaseAddr as coinbaseAddr102,
  node_ip_port as node102,
} from './storageDetails102.js';

import {
  admStrCtrlAbi as abi103,
  admStrCtrl as contractAddr103,
  coinbaseAddr as coinbaseAddr103,
  node_ip_port as node103,
} from '../103/storageDetails103.js';


const init = async () => {

  // Sleep Function
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const beginEachTimeStamp = new Date().getTime();
  console.log(`Beginning TimeStamp: ${beginEachTimeStamp}\n`);

  const web102 = new Web3(node102);
  const web103 = new Web3(node103);

  const contractAccess102 = new web102.eth.Contract(abi102, contractAddr102);
  const contractAccess103 = new web103.eth.Contract(abi103, contractAddr103);

  let counter102 = 0;
  let resultTotal102 = {};
  let resultTemp102 = [];

  let counter103 = 0;
  let resultTotal103 = {};
  let resultTemp103 = [];



  for (let i = parseInt(startNo); i < parseInt(stopNo) + 1; i++) {
    resultTemp102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    counter102 += resultTemp102.length;
    resultTotal102[i] = resultTemp102;
  }

  for (let i = parseInt(startNo); i < parseInt(stopNo) + 1; i++) {
    resultTemp103 = await contractAccess103.methods.getAllRecords(i).call({ from: coinbaseAddr103 });
    counter103 += resultTemp103.length;
    resultTotal103[i] = resultTemp103;
  }


  let counter = 0;
  console.log('<<==========================<<   102   >>==========================>>');
  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log(`Patient ID: ${i}`);
    // console.log(resultTotal102[i].forEach(patient => console.log(patient)));
    ++counter;
  }

  console.log('Total Patients: ', counter);
  console.log('Total Records: ', counter102, '\n');


  console.log('\n');
  console.log('<<==========================<<   103   >>==========================>>');
  console.log('\n');

  counter = 0;
  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log(`Patient ID: ${i}`);
    // console.log(resultTotal103[i].forEach(patient => console.log(patient)));
    ++counter;
  }

  console.log('Total Patients: ', counter);
  console.log('Total Records: ', counter103, '\n');

  // Writing Records into Chain103
  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log('\nWriting... Patient ID:', i, '\n');

    // Writing Records
    for (let j = 0; j < resultTotal103[i].length; j++) {
      console.log(resultTotal103[i][j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +resultTotal103[i][j].HadmID,
          +resultTotal103[i][j].AdmitTime,
          +resultTotal103[i][j].DischTime,
          +resultTotal103[i][j].DeathTime,
          resultTotal103[i][j].Admission_Type,
          resultTotal103[i][j].Admission_Location,
          resultTotal103[i][j].Discharge_Location,
          resultTotal103[i][j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(20);
    }
  }
  console.log('\nTotal Records of 102: ', counter102, '\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
