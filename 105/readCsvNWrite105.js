'use strict';
import fs from 'fs';
const csv = fs.readFileSync('./adm105_9001-11000.csv');
const array = csv.toString().split('\r\n').join().split(',');

import xlsx from 'xlsx';
// const xlsx = require('xlsx');
// Opening log file
let wb = xlsx.readFile('./readCsvNWrite105.xlsx');
let ws = wb.Sheets['Sheet1'];

const headers = array.splice(0, 10);

let allPatients = [];
let eachPatient = [];

for (let i = 0; array.length; i++) {
  for (let i = 0; i <= 9; i++) {
    eachPatient.push(array[i]);
  }
  allPatients.push(eachPatient);
  array.splice(0, 10);
  eachPatient = [];
}

// console.log(allPatients.length);
// console.log(allPatients[2]);

// Creating Web3 Instance
import Web3 from 'web3';
// Importing Contract Details
import {
  admStrCtrlAbi as abi,
  admStrCtrl as contractAddr,
  coinbaseAddr,
  node_ip_port as node,
} from './storageDetails105.js';

const init = async () => {
  const beginTimeStamp = new Date().getTime();
  console.log(`Beginning TimeStamp: ${beginTimeStamp}\n`);

  const web3 = new Web3(node);

  const contractAccess = new web3.eth.Contract(abi, contractAddr);

  // Ascii Hex Conversion
  function changeAscii2Hex(string) {
    return web3.utils.padRight(web3.utils.asciiToHex(string), 64);
  }

  console.log('\n');
  console.log(`<============= WRITING INTO CHAIN-105 =============>\n`);
  // Sleep Function
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  // Writing Records into Local chain
  for (let i = 0; i < allPatients.length; i++) {
    // for (let i = 0; i < 100; i++) {
    const _subjectID = +allPatients[i][1];
    const _hadmID = +allPatients[i][2];
    const _admitTime = allPatients[i][3];
    const _dischargeTime = allPatients[i][4];
    const _deathTime =
      allPatients[i][5] === 'null null' ? 0 : allPatients[i][5];
    const _admissionType = allPatients[i][6];
    const _admissionLocation = allPatients[i][7];
    const _dischargeLocation = allPatients[i][8];
    const _insurance = allPatients[i][9];

    console.log('WRITING...');
    console.log('SubjectID:', _subjectID);
    console.log('HadmID:', _hadmID);
    console.log('AdmitTime:', _admitTime);
    console.log('DischargeTime:', _dischargeTime);
    console.log('DeathTime:', _deathTime);
    console.log('Admission_type:', _admissionType);
    console.log('Admission_location:', _admissionLocation);
    console.log('Discharge_location:', _dischargeLocation);
    console.log('Insurance:', _insurance);
    console.log('\n');

    // Writing Records
    const beginEachTimeStamp = new Date().getTime();
    console.log(`Beginning Each TimeStamp: ${beginEachTimeStamp}\n`);
    contractAccess.methods
      .addNewPatient(_subjectID, [
        _hadmID,
        new Date(_admitTime).getTime(),
        new Date(_dischargeTime).getTime(),
        new Date(_deathTime).getTime(),
        changeAscii2Hex(_admissionType),
        changeAscii2Hex(_admissionLocation),
        changeAscii2Hex(_dischargeLocation),
        changeAscii2Hex(_insurance),
      ])
      .send({ from: coinbaseAddr });

    await sleep(50);

    let endEachTimeStamp = new Date().getTime();
    console.log(`\nEnding Each TimeStamp: ${endEachTimeStamp}\n`);
    let timeDifference = endEachTimeStamp - beginEachTimeStamp;
    console.log(`Time Differences: ${timeDifference}\n`);

    // Writing to log file
    let newRow = [
      [_subjectID, beginEachTimeStamp, endEachTimeStamp, timeDifference],
    ];

    xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
    xlsx.writeFile(wb, './readCsvNWrite105.xlsx');
  }
  let endTimeStamp = new Date().getTime();
  console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
