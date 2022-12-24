'use strict';
const fs = require('fs');
const csv = fs.readFileSync('try_ADMISSIONS.csv');
const array = csv.toString().split('\r\n').join().split(',');

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
// console.log(allPatients[3]);

// -------------------------------------------------------------------------------------------------

const Web3 = require('web3');
const xlsx = require('xlsx');

// let wb = xlsx.readFile('write_timestamp.xlsx');
// let ws = wb.Sheets['Sheet1'];

const abiAdmStrCtrl = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_AdmStrgAddr',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'uint16',
        name: '_subjectID',
        type: 'uint16',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HadmID',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'AdmitTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DischTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DeathTime',
            type: 'int256',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Type',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Discharge_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Insurance',
            type: 'bytes32',
          },
        ],
        internalType: 'struct IStrgAccess.PatientRecords',
        name: 'addPnt',
        type: 'tuple',
      },
    ],
    name: 'addNewPatient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_subjectID',
        type: 'uint256',
      },
    ],
    name: 'getAllRecords',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HadmID',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'AdmitTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DischTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DeathTime',
            type: 'int256',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Type',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Discharge_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Insurance',
            type: 'bytes32',
          },
        ],
        internalType: 'struct IStrgAccess.PatientRecords[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_subjectID',
        type: 'uint256',
      },
    ],
    name: 'getLatestOneRec',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'HadmID',
            type: 'uint256',
          },
          {
            internalType: 'int256',
            name: 'AdmitTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DischTime',
            type: 'int256',
          },
          {
            internalType: 'int256',
            name: 'DeathTime',
            type: 'int256',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Type',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Admission_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Discharge_Location',
            type: 'bytes32',
          },
          {
            internalType: 'bytes32',
            name: 'Insurance',
            type: 'bytes32',
          },
        ],
        internalType: 'struct IStrgAccess.PatientRecords',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const contractAddrAdmStrCtrl = '0x7C9e574d83EEe86C764d222F2A02A93250706439';

const coinbaseAddr = '0x28ef6f1EB6DF3F90A8C9Fe3b7E48C1905105E8E9';

const init = async () => {
  // const beginTimeStamp = new Date().getTime();
  // console.log(`Beginning TimeStamp: ${beginTimeStamp}\n`);

  const web3 = new Web3('http://192.168.191.109:8565');

  const contractAccess = new web3.eth.Contract(
    abiAdmStrCtrl,
    contractAddrAdmStrCtrl
  );

  // Ascii Hex Conversion
  function changeAscii2Hex(string) {
    return web3.utils.padRight(web3.utils.asciiToHex(string), 64);
  }

  console.log('\n');
  console.log(`<============= WRITING INTO ACER-CHAIN =============>\n`);
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
    await contractAccess.methods
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

    await sleep(200);

    // let endTimeStamp = new Date().getTime();
    // console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
    // let timeDifference = endTimeStamp - beginTimeStamp;
    // console.log(`Time Differences: ${timeDifference}\n`);

    // let newRow = [[Subject_ID, beginTimeStamp, endTimeStamp, timeDifference]];

    // xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
    // xlsx.writeFile(wb, './write_timestamp.xlsx');
  }
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
