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

  const beginEachTimeStamp = new Date().getTime();
  console.log(`Beginning TimeStamp: ${beginEachTimeStamp}\n`);

  const web102 = new Web3(node102);
  const web103 = new Web3(node103);

  const contractAccess102 = new web102.eth.Contract(abi102, contractAddr102);
  const contractAccess103 = new web103.eth.Contract(abi103, contractAddr103);

  let counter102 = 0;
  let resultTotal102 = [];
  let resultTemp102 = [];

  let counter103 = 0;
  let resultTotal103 = [];
  let resultTemp103 = [];

  for (let i = parseInt(startNo); i < parseInt(stopNo) + 1; i++) {
    console.log(`Patient ID: ${i}`);
    resultTemp102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    resultTotal102.push(resultTemp102);

  }

  for (let i = parseInt(startNo); i < parseInt(stopNo) + 1; i++) {
    console.log(`Patient ID: ${i}`);
    resultTemp103 = await contractAccess103.methods.getAllRecords(i).call({ from: coinbaseAddr103 });
    resultTotal103.push(resultTemp103);

  }

  resultTotal102.forEach(patient => patient.forEach(record => ++counter102))
  resultTotal102.forEach(patient => patient.forEach(record => console.log(record.HadmID)))
  console.log(counter102);

  resultTotal103.forEach(patient => patient.forEach(record => ++counter103))
  resultTotal103.forEach(patient => patient.forEach(record => console.log(record.HadmID)))
  console.log(counter103);

  // let result103 = await contractAccess103.methods.getAllRecords(args[0]).call({from: coinbaseAddr103});

  // console.log('<<==========================<<   102   >>==========================>>');

  // for (let i = 0; i < result102.length; i++) {
  //   console.log(result102[i]);
  // }

  // console.log('\n');
  // console.log('<<==========================<<   103   >>==========================>>');
  // console.log('\n');

  // for (let i = 0; i < result103.length; i++) {
  //   console.log(result103[i]);
  // }

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
