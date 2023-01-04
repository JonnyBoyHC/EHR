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

// Sleep Function
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// Count total patients data to retrieve
let counter = 0;
for (let i = +startNo; i < +stopNo + 1; i++) {
  ++counter;
}
console.log('Total Patients: ', counter);

const init = async () => {

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

  console.log('<<==========================<<   102   >>==========================>>');
  console.log('Total Records: ', counter102, '\n');

  console.log('<<==========================<<   103   >>==========================>>');
  console.log('Total Records: ', counter103, '\n');

  // Comparing
  let results = {};
  let tempCount = 1;
  let finalResults = {};
  // Each patient
  for (let i = +startNo; i < +stopNo + 1; i++) {
    // Each record
    let forDeletion1 = [];

    for (let j = 0; j < resultTotal103[i].length; j++) {
      for (let k = 0; k < resultTotal102[i].length; k++) {
        if (JSON.stringify(resultTotal103[i][j]) === JSON.stringify(resultTotal102[i][k])) {
          forDeletion1.push(resultTotal103[i][j]);
        }
      }
    }
    results[i] = resultTotal103[i].filter((item) => !forDeletion1.includes(item));
  }

  console.log('<<==================<<   Final Items to Add...   >>==================>>');
  console.log(results);


  console.log('<<=======================<<   Writing...   >>=======================>>');
  // Writing Records into Chain102
  for (let i = +startNo; i < +stopNo + 1; i++) {
    if (results[i].length === 0) {
      console.log(`Nothing to write for Patient ID ${i}...!!!`);
    } else {
      console.log('Writing... Patient ID:', i);
    }

    // Writing Records
    for (let j = 0; j < results[i].length; j++) {
      console.log(results[i][j].HadmID);
      contractAccess102.methods
        .addNewPatient(i, [
          +results[i][j].HadmID,
          +results[i][j].AdmitTime,
          +results[i][j].DischTime,
          +results[i][j].DeathTime,
          results[i][j].Admission_Type,
          results[i][j].Admission_Location,
          results[i][j].Discharge_Location,
          results[i][j].Insurance,
        ])
        .send({ from: coinbaseAddr102 });
      await sleep(50);
    }
  }

  // let endTimeStamp = new Date().getTime();
  // console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
  // let timeDifference = endTimeStamp - beginTimeStamp;
  // console.log(`Time Differences: ${timeDifference}\n`);
  // console.log(`Number of Records: ${finalResults.length}\n`);

  // // Writing to log file
  // let newRow = [
  //   [
  //     args[0],
  //     beginTimeStamp,
  //     readTime_C,
  //     ReadTime_B,
  //     ReadTime_A,
  //     comparisonTime,
  //     endTimeStamp,
  //     timeDifference,
  //     finalResults.length,
  //   ],
  // ];

  // xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
  // xlsx.writeFile(wb, './rw_timestampOf3Networks-Ubun.xlsx');

  // console.log('Done!!!\n');

};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
