const { Web3 } = require("web3");

// Load contract ABI
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "_candidateId",
        type: "string",
      },
    ],
    name: "votedEvent",
    type: "event",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "candidateIds",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "", type: "string" }],
    name: "candidates",
    outputs: [
      { internalType: "string", name: "id", type: "string" },
      { internalType: "string", name: "name", type: "string" },
      { internalType: "uint256", name: "voteCount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidates",
    outputs: [
      {
        components: [
          { internalType: "string", name: "id", type: "string" },
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "voteCount", type: "uint256" },
        ],
        internalType: "struct Voting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_candidateId", type: "string" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Configure Web3 to connect to Infura
const web3 = new Web3(process.env.INFURA_URL);

// Create a Contract instance
const contract = new web3.eth.Contract(abi, process.env.DEMO_CONTRACT);

// Create signing account from private key
const signer = web3.eth.accounts.privateKeyToAccount(
  "0x" + process.env.SIGNER_PRIVATE_KEY
);
web3.eth.accounts.wallet.add(signer);

const vote = async (id) => {
  // Prepare transaction data (replace 'echo' with your function name)
  const method_abi = contract.methods.vote(id).encodeABI();

  const tx = {
    from: signer.address,
    to: contract.options.address,
    data: method_abi,
    value: "0",
    gasPrice: "100000000000", // Set appropriate gas price
  };

  // Estimate gas and sign transaction
  const gas_estimate = await web3.eth.estimateGas(tx);
  tx.gas = gas_estimate;

  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    signer.privateKey
  );

  // Send transaction to the network
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`Transaction successful with hash: ${receipt.transactionHash}`);

  return receipt.transactionHash;
};

const result = async () => {
try {
  const method_abi = contract.methods.getCandidates().encodeABI();
  
  const tx = {
    from: signer.address,
    to: contract.options.address,
    data: method_abi,
    value: "0",
    gasPrice: "100000000000", // Set appropriate gas price
  };

  // If you're calling a view function, use call instead of sendSignedTransaction:
  const candidatesData = await web3.eth.call(tx);
  const decodedCandidates = web3.eth.abi.decodeParameter(
    "tuple(string id, string name, uint voteCount)[]",
    candidatesData
  );

  // Log or process the decoded candidates data
  console.log(decodedCandidates);

  return decodedCandidates;
} catch (error) {
  console.error(error);
}
};

module.exports = { vote, result };
