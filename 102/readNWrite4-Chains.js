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

  const contractAccess102 = new web102.eth.Contract(abi102, contractAddr102);
  const contractAccess103 = new web103.eth.Contract(abi103, contractAddr103);
  const contractAccess104 = new web104.eth.Contract(abi104, contractAddr104);
  const contractAccess105 = new web105.eth.Contract(abi105, contractAddr105);

  let counter102 = 0;
  let resultTotal102 = {};
  let resultTemp102 = [];

  let counter103 = 0;
  let resultTotal103 = {};
  let resultTemp103 = [];

  let counter104 = 0;
  let resultTotal104 = {};
  let resultTemp104 = [];

  let counter105 = 0;
  let resultTotal105 = {};
  let resultTemp105 = [];

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

    console.log('<<==========================<<   105   >>==========================>>');
    const startReadingTime105 = new Date().getTime();
    console.log(`Start Reading 105 TimeStamp: ${startReadingTime105}\n`);


    resultTemp105 = await contractAccess105.methods.getAllRecords(i).call({ from: coinbaseAddr105 });
    counter105 += resultTemp105.length;
    resultTotal105[i] = resultTemp105;

    console.log('Total Records: ', counter105, '\n');

    console.log('<<==================<<   Final Items to Add...   >>==================>>');
    // '<<==========================<<   Comparing   >>==========================>>
    // Comparing
    const startComparingTime = new Date().getTime();
    console.log(`Start Comparing TimeStamp: ${startComparingTime}\n`);
    let results103102 = [];
    let results104102 = [];
    let results105102 = [];
    let results103104 = [];
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
    results103102 = resultTotal103[i].filter((item) => !forDeletion1.includes(item));

    console.log('results103102: ');
    console.log(results103102);

    // Comparing 104 to 102
    let forDeletion2 = [];
    for (let j = 0; j < resultTotal104[i].length; j++) {
      for (let k = 0; k < resultTotal102[i].length; k++) {
        if (JSON.stringify(resultTotal104[i][j]) === JSON.stringify(resultTotal102[i][k])) {
          forDeletion2.push(resultTotal104[i][j]);
        }
      }
    }
    results104102 = resultTotal104[i].filter((item) => !forDeletion2.includes(item));

    console.log('results104102: ');
    console.log(results104102);

    // Comparing 105 to 102
    let forDeletion3 = [];
    for (let j = 0; j < resultTotal105[i].length; j++) {
      for (let k = 0; k < resultTotal102[i].length; k++) {
        if (JSON.stringify(resultTotal105[i][j]) === JSON.stringify(resultTotal102[i][k])) {
          forDeletion3.push(resultTotal105[i][j]);
        }
      }
    }
    results105102 = resultTotal105[i].filter((item) => !forDeletion3.includes(item));

    console.log('results105102: ');
    console.log(results105102);

    // Comparing results of 103 and 104
    let forDeletion4 = [];
    if (results103102.length !== 0) {
      for (var x = 0; x < results103102.length; x++) {
        for (var y = 0; y < results104102.length; y++) {
          if (JSON.stringify(results103102[x]) === JSON.stringify(results104102[y])) {
            forDeletion4.push(results103102[x]);
          }
        }
      }

      results103104 = results103102.filter((item) => !forDeletion4.includes(item));

      if (results103104.length === 0) {
        results103104 = results103102;
      }
    } else if (results104102.length !== 0) {
      for (var x = 0; x < results104102.length; x++) {
        for (var y = 0; y < results103102.length; y++) {
          if (JSON.stringify(results104102[x]) === JSON.stringify(results103102[y])) {
            forDeletion4.push(results104102[x]);
          }
        }
      }

      results103104 = results104102.filter((item) => !forDeletion4.includes(item));

      if (results103104.length === 0) {
        results103104 = results104102;
      }
    }

    console.log('results103104: ');
    console.log(results103104);

    // Comparing results of 105 to 103 & 104
    let forDeletion5 = [];
    if (results103104.length !== 0) {
      for (var x = 0; x < results103104.length; x++) {
        for (var y = 0; y < results105102.length; y++) {
          if (JSON.stringify(results103104[x]) === JSON.stringify(results105102[y])) {
            forDeletion5.push(results103104[x]);
          }
        }
      }

      finalResults = results103104.filter((item) => !forDeletion5.includes(item));

      if (finalResults.length === 0) {
        finalResults = results103104;
      }
    } else if (results105102.length !== 0) {
      for (var x = 0; x < results105102.length; x++) {
        for (var y = 0; y < results103104.length; y++) {
          if (JSON.stringify(results105102[x]) === JSON.stringify(results103104[y])) {
            forDeletion3.push(results105102[x]);
          }
        }
      }

      finalResults = results105102.filter((item) => !forDeletion5.includes(item));

      if (finalResults.length === 0) {
        finalResults = results105102;
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
      // contractAccess102.methods
      //   .addNewPatient(i, [
      //     +finalResults[j].HadmID,
      //     +finalResults[j].AdmitTime,
      //     +finalResults[j].DischTime,
      //     +finalResults[j].DeathTime,
      //     finalResults[j].Admission_Type,
      //     finalResults[j].Admission_Location,
      //     finalResults[j].Discharge_Location,
      //     finalResults[j].Insurance,
      //   ])
      //   .send({ from: coinbaseAddr102 });
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
        startReadingTime105,
        startComparingTime,
        startWritingTime,
        endTimeStamp,
        timeDifference,
        finalResults.length,
      ],
    ];

    xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
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
