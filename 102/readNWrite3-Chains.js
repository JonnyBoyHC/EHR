'use strict';
import fs from 'fs';
import xlsx from 'xlsx';
// Opening log file
let wb = xlsx.readFile('./readNWrite3-Chains.xlsx');
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

  const contractAccess102 = new web102.eth.Contract(abi102, contractAddr102);
  const contractAccess103 = new web103.eth.Contract(abi103, contractAddr103);
  const contractAccess104 = new web104.eth.Contract(abi104, contractAddr104);

  let counter102 = 0;
  let resultTotal102 = {};
  let resultTemp102 = [];

  let counter103 = 0;
  let resultTotal103 = {};
  let resultTemp103 = [];

  let counter104 = 0;
  let resultTotal104 = {};
  let resultTemp104 = [];

  for (let i = +startNo; i < +stopNo + 1; i++) {
    console.log('####################################################################################');
    console.log('####################################################################################');
    console.log('Retrieving Patient ID: ', i);
    console.log('<<==========================<<   102   >>==========================>>');
    const startReadingTime102 = new Date().getTime();
    console.log(`Start Reading 102 TimeStamp: ${startReadingTime102}\n`);

    resultTemp102 = await contractAccess102.methods.getAllRecords(i).call({ from: coinbaseAddr102 });
    counter102 += resultTemp102.length;
    resultTotal102[i] = resultTemp102;

    console.log('Total Records: ', counter102, '\n');

    console.log('<<==========================<<   103   >>==========================>>');
    const startReadingTime103 = new Date().getTime();
    console.log(`Start Reading 103 TimeStamp: ${startReadingTime103}\n`);


    resultTemp103 = await contractAccess103.methods.getAllRecords(i).call({ from: coinbaseAddr103 });
    counter103 += resultTemp103.length;
    resultTotal103[i] = resultTemp103;

    console.log('Total Records: ', counter103, '\n');

    console.log('<<==========================<<   104   >>==========================>>');
    const startReadingTime104 = new Date().getTime();
    console.log(`Start Reading 104 TimeStamp: ${startReadingTime104}\n`);


    resultTemp104 = await contractAccess104.methods.getAllRecords(i).call({ from: coinbaseAddr104 });
    counter104 += resultTemp104.length;
    resultTotal104[i] = resultTemp104;

    console.log('Total Records: ', counter104, '\n');

    console.log('<<==================<<   Final Items to Add...   >>==================>>');
    // '<<==========================<<   Comparing   >>==========================>>
    // Comparing
    const startComparingTime = new Date().getTime();
    console.log(`Start Comparing TimeStamp: ${startComparingTime}\n`);
    let results1 = [];
    let results2 = [];
    let finalResults = [];

    // Comparing 103 to 102
    let forDeletion1 = [];
    for (let j = 0; j < resultTotal103[i].length; j++) {
      for (let k = 0; k < resultTotal102[i].length; k++) {
        if (JSON.stringify(resultTotal103[i][j]) === JSON.stringify(resultTotal102[i][k])) {
          forDeletion1.push(resultTotal103[i][j]);
        }
      }
    }
    results1 = resultTotal103[i].filter((item) => !forDeletion1.includes(item));

    console.log('results1: ');
    console.log(results1);

    // Comparing 104 to 102
    let forDeletion2 = [];
    for (let j = 0; j < resultTotal104[i].length; j++) {
      for (let k = 0; k < resultTotal102[i].length; k++) {
        if (JSON.stringify(resultTotal104[i][j]) === JSON.stringify(resultTotal102[i][k])) {
          forDeletion2.push(resultTotal104[i][j]);
        }
      }
    }
    results2 = resultTotal103[i].filter((item) => !forDeletion1.includes(item));

    console.log('results2: ');
    console.log(results2);

    // Comparing results of 103 and 104
    let forDeletion3 = [];
    if (results1.length !== 0) {
      for (var x = 0; x < results1.length; x++) {
        for (var y = 0; y < results2.length; y++) {
          if (JSON.stringify(results1[x]) === JSON.stringify(results2[y])) {
            forDeletion3.push(results1[x]);
          }
        }
      }

      finalResults = results1.filter((item) => !forDeletion3.includes(item));

      if (finalResults.length === 0) {
        finalResults = results1;
      }
    } else if (results2.length !== 0) {
      for (var x = 0; x < results2.length; x++) {
        for (var y = 0; y < results1.length; y++) {
          if (JSON.stringify(results2[x]) === JSON.stringify(results1[y])) {
            forDeletion3.push(results2[x]);
          }
        }
      }

      finalResults = results2.filter((item) => !forDeletion3.includes(item));

      if (finalResults.length === 0) {
        finalResults = results2;
      }
    }

    console.log('finalResults: ');
    console.log(finalResults);


    console.log('<<=======================<<   Writing...   >>=======================>>');
    // Writing Records into Chain102

    const startWritingTime = new Date().getTime();
    console.log(`Start Writing TimeStamp: ${startWritingTime}\n`);

    if (finalResults.length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < finalResults.length; j++) {
      console.log(finalResults[j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +finalResults[j].HadmID,
          +finalResults[j].AdmitTime,
          +finalResults[j].DischTime,
          +finalResults[j].DeathTime,
          finalResults[j].Admission_Type,
          finalResults[j].Admission_Location,
          finalResults[j].Discharge_Location,
          finalResults[j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }

    let endTimeStamp = new Date().getTime();
    console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
    let timeDifference = endTimeStamp - startReadingTime102;
    console.log(`Time Differences: ${timeDifference}\n`);
    console.log(`Total Number of Records to write: ${finalResults.length}\n`);

    // Writing to log file
    let newRow = [
      [
        i,
        startReadingTime102,
        startReadingTime103,
        startReadingTime104,
        startComparingTime,
        startWritingTime,
        endTimeStamp,
        timeDifference,
        finalResults.length,
      ],
    ];

    xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
  }

  xlsx.writeFile(wb, './readNWrite3-Chains.xlsx');

  console.log('Done!!!\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
