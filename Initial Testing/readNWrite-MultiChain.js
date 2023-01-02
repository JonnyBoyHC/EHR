'use strict';
const Web3 = require('web3');
const crypto = require('crypto');
const xlsx = require('xlsx');
const userPW = '1234';

// Opening log file
let wb = xlsx.readFile('rw_timestampOf3Networks-Ubun.xlsx');
let ws = wb.Sheets['Sheet1'];

// Contract Abis
const abiAdmStrCtrl_A = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
  {
    inputs: [
      {
        internalType: 'address',
        name: '_AccesssControlAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_AdmStrgAddr',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
];
const abiAdmStrCtrl_B = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_AccesssControlAddr',
        type: 'address',
      },
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
    inputs: [],
    name: 'AccesssControlAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AdmStrgAddr',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const abiAdmStrCtrl_C = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_AccesssControlAddr',
        type: 'address',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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
        internalType: 'string',
        name: '_message',
        type: 'string',
      },
      {
        internalType: 'bytes',
        name: '_sig',
        type: 'bytes',
      },
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

// Contracts Addresses
const contractAddress_A = '0x627aE1518fD8766Dab89244BAA6B39c8b491C85a';
const contractAddress_B = '0xc9458334e4169146e122C409e7A7B2BDb6F47b23';
const contractAddress_C = '0xE11366248C89f656b8890549Ed065561bAE0595F';

// Coinbase Addresses
const coinbaseAddress_A = '808cc794c04a37b6969ca18c83fe508a14550c1b';
const coinbaseAddress_B = '0x0075914688854cEab195fe36287382e33bf33550';
const coinbaseAddress_C = '0x4AEf5726B7e3C312F113b9E8089e7A5B9e0b456C';

// Setting up Arguments
let args = process.argv.slice(2);

// Initial programs
const init = async () => {
  const beginTimeStamp = new Date().getTime();
  console.log(`Beginning TimeStamp: ${beginTimeStamp}\n`);

  // Creating connection to the node
  const web3_A = new Web3('http://192.168.1.200:8544');
  const web3_B = new Web3('http://192.168.1.155:8545');
  const web3_C = new Web3('http://192.168.1.180:8543');

  // Creating connections to the contracts
  const contractAccess_A = new web3_A.eth.Contract(
    abiAdmStrCtrl_A,
    contractAddress_A
  );
  const contractAccess_B = new web3_B.eth.Contract(
    abiAdmStrCtrl_B,
    contractAddress_B
  );
  const contractAccess_C = new web3_C.eth.Contract(
    abiAdmStrCtrl_C,
    contractAddress_C
  );

  // Signing Messages
  const randomStr = crypto.randomBytes(20).toString('hex');
  const hashedStr = web3_C.utils.keccak256(randomStr);

  const signedMsg_C = await web3_C.eth.personal.sign(
    hashedStr,
    coinbaseAddress_C,
    userPW
  );

  console.log(`Signed Message: \n${signedMsg} \n`);

  // Converting HexToAscii
  let tempCvrt;
  function hexToAsciiConversion(hexi) {
    const tempPad = web3_C.utils.padRight(hexi, 64);
    tempCvrt = web3_C.utils.hexToAscii(tempPad);
    return tempCvrt;
  }

  console.log(`<==================== CHAIN-C ====================>\n`);

  // REMOTE: Requesting to Read
  const result_C = await contractAccess_C.methods
    .getAllRecords(randomStr, signedMsg_C, args[0])
    .call({ from: coinbaseAddress_C });

  for (let i = 0; i < result_C.length; i++) {
    console.log(
      'HadmID:',
      +result_C[i].HadmID,
      '\n',
      'AdmitTime:',
      new Date(+result_C[i].AdmitTime).toUTCString(),
      '\n',
      'DischargeTime:',
      new Date(+result_C[i].DischTime).toUTCString(),
      '\n',
      'DeathTime:',
      '0' ? 0 : new Date(+result_C[i].DeathTime).toUTCString(),
      '\n',
      'Admission Type:',
      hexToAsciiConversion(result_C[i].Admission_Type),
      '\n',
      'Admission Location:',
      hexToAsciiConversion(result_C[i].Admission_Location),
      '\n',
      'Discharge Location:',
      hexToAsciiConversion(result_C[i].Discharge_Location),
      '\n',
      'Insurance:',
      hexToAsciiConversion(result_C[i].Insurance),
      '\n'
    );
  }

  const readTime_C = new Date().getTime();
  console.log(`Read Time C: ${readTime_C}\n`);

  console.log(`<=================== CHAIN-B ===================>\n`);

  // LOCAL: Requesting to Read
  const result_B = await contractAccess_B.methods
    .getAllRecords(randomStr, signedMsg_C, args[0])
    .call({ from: coinbaseAddress_C });

  for (let i = 0; i < result_B.length; i++) {
    console.log(
      'HadmID:',
      +result_B[i].HadmID,
      '\n',
      'AdmitTime:',
      new Date(+result_B[i].AdmitTime).toUTCString(),
      '\n',
      'DischargeTime:',
      new Date(+result_B[i].DischTime).toUTCString(),
      '\n',
      'DeathTime:',
      '0' ? 0 : new Date(+result_B[i].DeathTime).toUTCString(),
      '\n',
      'Admission Type:',
      hexToAsciiConversion(result_B[i].Admission_Type),
      '\n',
      'Admission Location:',
      hexToAsciiConversion(result_B[i].Admission_Location),
      '\n',
      'Discharge Location:',
      hexToAsciiConversion(result_B[i].Discharge_Location),
      '\n',
      'Insurance:',
      hexToAsciiConversion(result_B[i].Insurance),
      '\n'
    );
  }

  const ReadTime_B = new Date().getTime();
  console.log(`Read Time B: ${ReadTime_B}\n`);

  console.log(`<==================== CHAIN-A ====================>\n`);

  // REMOTE: Requesting to Read
  const result_A = await contractAccess_A.methods
    .getAllRecords(randomStr, signedMsg_C, args[0])
    .call({ from: coinbaseAddress_C });

  for (let i = 0; i < result_A.length; i++) {
    console.log(
      'HadmID:',
      +result_A[i].HadmID,
      '\n',
      'AdmitTime:',
      new Date(+result_A[i].AdmitTime).toUTCString(),
      '\n',
      'DischargeTime:',
      new Date(+result_A[i].DischTime).toUTCString(),
      '\n',
      'DeathTime:',
      '0' ? 0 : new Date(+result_A[i].DeathTime).toUTCString(),
      '\n',
      'Admission Type:',
      hexToAsciiConversion(result_A[i].Admission_Type),
      '\n',
      'Admission Location:',
      hexToAsciiConversion(result_A[i].Admission_Location),
      '\n',
      'Discharge Location:',
      hexToAsciiConversion(result_A[i].Discharge_Location),
      '\n',
      'Insurance:',
      hexToAsciiConversion(result_A[i].Insurance),
      '\n'
    );
  }

  const ReadTime_A = new Date().getTime();
  console.log(`Read Time A: ${ReadTime_A}\n`);

  console.log(`<=================== DIFFERENCES ===================>\n`);
  // Comparing A to C
  let forDeletion1 = [];
  for (var x = 0; x < result_A.length; x++) {
    for (var y = 0; y < result_C.length; y++) {
      if (JSON.stringify(result_A[x]) === JSON.stringify(result_C[y])) {
        forDeletion1.push(result_A[x]);
      }
    }
  }

  Results1 = result_A.filter((item) => !forDeletion1.includes(item));

  // Comparing B to C
  let forDeletion2 = [];
  for (var x = 0; x < result_B.length; x++) {
    for (var y = 0; y < result_C.length; y++) {
      if (JSON.stringify(result_B[x]) === JSON.stringify(result_C[y])) {
        forDeletion2.push(result_B[x]);
      }
    }
  }

  Results2 = result_B.filter((item) => !forDeletion2.includes(item));

  // Comparing results of A and B
  let forDeletion3 = [];
  let finalResults = [];

  if (Results1.length !== 0) {
    for (var x = 0; x < Results1.length; x++) {
      for (var y = 0; y < Results2.length; y++) {
        if (JSON.stringify(Results1[x]) === JSON.stringify(Results2[y])) {
          forDeletion3.push(Results1[x]);
        }
      }
    }

    finalResults = Results1.filter((item) => !forDeletion3.includes(item));

    if (finalResults.length === 0) {
      finalResults = Results1;
    }
  } else if (Results2.length !== 0) {
    for (var x = 0; x < Results2.length; x++) {
      for (var y = 0; y < Results1.length; y++) {
        if (JSON.stringify(Results2[x]) === JSON.stringify(Results1[y])) {
          forDeletion3.push(Results2[x]);
        }
      }
    }

    finalResults = Results2.filter((item) => !forDeletion3.includes(item));

    if (finalResults.length === 0) {
      finalResults = Results2;
    }
  }

  // Comparing Final Results
  finalResults.length !== 0
    ? finalResults.map((item) => console.log('HadmID:', +item.HadmID, '\n'))
    : console.log('No New Updates!!!\n');

  const comparisonTime = new Date().getTime();
  console.log(`Comparison Time: ${comparisonTime}\n`);

  console.log(`<============= WRITING INTO UBUN-CHAIN =============>\n`);

  // Writing Records into Local chain
  for (let i = 0; i < finalResults.length; i++) {
    console.log('Writing... HadmID:', +finalResults[i].HadmID, '\n');

    // Writing Records
    await contractAccess_C.methods
      .addNewPatient(randomStr, signedMsg3, args[0], [
        +finalResults[i].HadmID,
        +finalResults[i].AdmitTime,
        +finalResults[i].DischTime,
        +finalResults[i].DeathTime,
        finalResults[i].Admission_Type,
        finalResults[i].Admission_Location,
        finalResults[i].Discharge_Location,
        finalResults[i].Insurance,
      ])
      .send({ from: coinbaseAddress_C });
  }

  let endTimeStamp = new Date().getTime();
  console.log(`\nEnding TimeStamp: ${endTimeStamp}\n`);
  let timeDifference = endTimeStamp - beginTimeStamp;
  console.log(`Time Differences: ${timeDifference}\n`);
  console.log(`Number of Records: ${finalResults.length}\n`);

  // Writing to log file
  let newRow = [
    [
      args[0],
      beginTimeStamp,
      readTime_C,
      ReadTime_B,
      ReadTime_A,
      comparisonTime,
      endTimeStamp,
      timeDifference,
      finalResults.length,
    ],
  ];

  xlsx.utils.sheet_add_aoa(ws, newRow, { origin: -1 });
  xlsx.writeFile(wb, './rw_timestampOf3Networks-Ubun.xlsx');

  console.log('Done!!!\n');
};

init()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
