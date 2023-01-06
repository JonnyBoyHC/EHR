'use strict';
import fs from 'fs';
import xlsx from 'xlsx';
// Opening log file
let wb = xlsx.readFile('./readNWrite4-Chains.xlsx');
let ws = wb.Sheets['Sheet1'];

let args = process.argv.slice(2);
let startNo = args[0];
let stopNo = args[1];

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

import {
  admStrCtrlAbi as abi104,
  admStrCtrl as contractAddr104,
  coinbaseAddr as coinbaseAddr104,
  node_ip_port as node104,
} from '../104/storageDetails104.js';

import {
  admStrCtrlAbi as abi105,
  admStrCtrl as contractAddr105,
  coinbaseAddr as coinbaseAddr105,
  node_ip_port as node105,
} from '../105/storageDetails105.js';

import {
  admStrCtrlAbi as abi106,
  admStrCtrl as contractAddr106,
  coinbaseAddr as coinbaseAddr106,
  node_ip_port as node106,
} from '../106/storageDetails106.js';

// Sleep Function
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

console.log('Total Patients: ', +stopNo + 1 - +startNo);

const init = async () => {

  const beginTimeStamp = new Date().getTime();
  console.log(`Beginning TimeStamp: ${beginTimeStamp}\n`);

  const web102 = new Web3(node102);
  const web103 = new Web3(node103);
  const web104 = new Web3(node104);
  const web105 = new Web3(node105);
  const web106 = new Web3(node106);

  const contractAccess102 = new web102.eth.Contract(abi102, contractAddr102);
  const contractAccess103 = new web103.eth.Contract(abi103, contractAddr103);
  const contractAccess104 = new web104.eth.Contract(abi104, contractAddr104);
  const contractAccess105 = new web105.eth.Contract(abi105, contractAddr105);
  const contractAccess106 = new web106.eth.Contract(abi106, contractAddr106);

  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log('####################################################################################');
    console.log('####################################################################################');
    console.log('Retrieving Patient ID: ', i);
    // console.log('<<==========================<<   102   >>==========================>>');
    // const startReadingTime102 = new Date().getTime();
    // console.log(`Start Reading 102 TimeStamp: ${startReadingTime102}\n`);


    console.log('<<==========================<<   103   >>==========================>>');
    const startReadingTime103 = new Date().getTime();
    console.log(`Start Reading 103 TimeStamp: ${startReadingTime103}\n`);

    let counter102 = 0;
    let resultTotal102 = [];

    resultTotal102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    counter102 += resultTotal102.length;
    console.log('Total Records on 102: ', counter102);

    let counter103 = 0;
    let resultTotal103 = [];

    resultTotal103 = await contractAccess103.methods.getAllRecords(i).call({ from: coinbaseAddr103 });
    counter103 += resultTotal103.length;
    console.log('Total Records on 103: ', counter103, '\n');

    console.log('<<=====================<<   Comparing...   >>=====================>>');

    // Comparing 103 to 102
    const startComparingTime103 = new Date().getTime();
    console.log(`Start Comparing TimeStamp: ${startComparingTime103}\n`);
    let results = [];
    let forDeletion1 = [];
    for (let j = 0; j < resultTotal103.length; j++) {
      for (let k = 0; k < resultTotal102.length; k++) {
        if (JSON.stringify(resultTotal103[j]) === JSON.stringify(resultTotal102[k])) {
          forDeletion1.push(resultTotal103[j]);
        }
      }
    }
    results = resultTotal103.filter((item) => !forDeletion1.includes(item));

    console.log('results: ');
    console.log(results);

    console.log('<<=======================<<   Writing...   >>=======================>>');
    // Writing Records into Chain102

    let startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (results.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < results.length; j++) {
      console.log(results[j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +results[j].HadmID,
          +results[j].AdmitTime,
          +results[j].DischTime,
          +results[j].DeathTime,
          results[j].Admission_Type,
          results[j].Admission_Location,
          results[j].Discharge_Location,
          results[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }

    console.log('<<==========================<<   104   >>==========================>>');
    const startReadingTime104 = new Date().getTime();
    console.log(`Start Reading 104 TimeStamp: ${startReadingTime104}\n`);

    resultTotal102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    counter102 += resultTotal102.length;
    console.log('Total Records: ', counter102, '\n');

    let counter104 = 0;
    let resultTotal104 = [];

    resultTotal104 = await contractAccess104.methods.getAllRecords(i).call({ from: coinbaseAddr104 });
    counter104 += resultTotal104.length;
    console.log('Total Records: ', counter104, '\n');

    console.log('<<=====================<<   Comparing...   >>=====================>>');

    // Comparing 104 to 102
    const startComparingTime104 = new Date().getTime();
    console.log(`Start Comparing TimeStamp: ${startComparingTime104}\n`);
    results = [];
    forDeletion1 = [];
    for (let j = 0; j < resultTotal104.length; j++) {
      for (let k = 0; k < resultTotal102.length; k++) {
        if (JSON.stringify(resultTotal104[j]) === JSON.stringify(resultTotal102[k])) {
          forDeletion1.push(resultTotal104[j]);
        }
      }
    }
    results = resultTotal104.filter((item) => !forDeletion1.includes(item));

    console.log('results: ');
    console.log(results);

    console.log('<<=======================<<   Writing...   >>=======================>>');
    // Writing Records into Chain102

    startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (results.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < results.length; j++) {
      console.log(results[j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +results[j].HadmID,
          +results[j].AdmitTime,
          +results[j].DischTime,
          +results[j].DeathTime,
          results[j].Admission_Type,
          results[j].Admission_Location,
          results[j].Discharge_Location,
          results[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }

    console.log('<<==========================<<   105   >>==========================>>');
    const startReadingTime105 = new Date().getTime();
    console.log(`Start Reading 104 TimeStamp: ${startReadingTime105}\n`);

    resultTotal102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    counter102 += resultTotal102.length;
    console.log('Total Records: ', counter102, '\n');

    let counter105 = 0;
    let resultTotal105 = [];

    resultTotal105 = await contractAccess105.methods.getAllRecords(i).call({ from: coinbaseAddr105 });
    counter105 += resultTotal105.length;
    console.log('Total Records: ', counter105, '\n');

    console.log('<<=====================<<   Comparing...   >>=====================>>');

    // Comparing 104 to 102
    const startComparingTime105 = new Date().getTime();
    console.log(`Start Comparing TimeStamp: ${startComparingTime105}\n`);
    results = [];
    forDeletion1 = [];
    for (let j = 0; j < resultTotal105.length; j++) {
      for (let k = 0; k < resultTotal102.length; k++) {
        if (JSON.stringify(resultTotal105[j]) === JSON.stringify(resultTotal102[k])) {
          forDeletion1.push(resultTotal105[j]);
        }
      }
    }
    results = resultTotal105.filter((item) => !forDeletion1.includes(item));

    console.log('results: ');
    console.log(results);

    console.log('<<=======================<<   Writing...   >>=======================>>');
    // Writing Records into Chain102

    startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (results.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < results.length; j++) {
      console.log(results[j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +results[j].HadmID,
          +results[j].AdmitTime,
          +results[j].DischTime,
          +results[j].DeathTime,
          results[j].Admission_Type,
          results[j].Admission_Location,
          results[j].Discharge_Location,
          results[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }

    console.log('<<==========================<<   106   >>==========================>>');
    const startReadingTime106 = new Date().getTime();
    console.log(`Start Reading 106 TimeStamp: ${startReadingTime106}\n`);

    resultTotal102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    counter102 += resultTotal102.length;
    console.log('Total Records: ', counter102, '\n');

    let counter106 = 0;
    let resultTotal106 = [];

    resultTotal106 = await contractAccess106.methods.getAllRecords(i).call({ from: coinbaseAddr106 });
    counter106 += resultTotal106.length;
    console.log('Total Records: ', counter106, '\n');

    console.log('<<=====================<<   Comparing...   >>=====================>>');

    // Comparing 104 to 102
    const startComparingTime106 = new Date().getTime();
    console.log(`Start Comparing TimeStamp: ${startComparingTime106}\n`);
    results = [];
    forDeletion1 = [];
    for (let j = 0; j < resultTotal106.length; j++) {
      for (let k = 0; k < resultTotal102.length; k++) {
        if (JSON.stringify(resultTotal106[j]) === JSON.stringify(resultTotal102[k])) {
          forDeletion1.push(resultTotal106[j]);
        }
      }
    }
    results = resultTotal106.filter((item) => !forDeletion1.includes(item));

    console.log('results: ');
    console.log(results);

    console.log('<<=======================<<   Writing...   >>=======================>>');
    // Writing Records into Chain102

    startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (results.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < results.length; j++) {
      console.log(results[j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +results[j].HadmID,
          +results[j].AdmitTime,
          +results[j].DischTime,
          +results[j].DeathTime,
          results[j].Admission_Type,
          results[j].Admission_Location,
          results[j].Discharge_Location,
          results[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }


    let endTimeStamp = new Date().getTime();
    console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
    let timeDifference = endTimeStamp - startReadingTime103;
    console.log(`Time Differences: ${timeDifference}\n`);
    // console.log(`Total Number of Records to write: ${finalResults.length}\n`);

    // Writing to log file
    // let newRow = [
    //   [
    //     i,
    //     startReadingTime102,
    //     startReadingTime103,
    //     startReadingTime104,
    //     startReadingTime105,
    //     startComparingTime,
    //     startWritingTime,
    //     endTimeStamp,
    //     timeDifference,
    //     finalResults.length,
    //   ],
    // ];

    // xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
  }

  // xlsx.writeFile(wb, './readNWrite4-Chains.xlsx');

  console.log('Done!!!\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });