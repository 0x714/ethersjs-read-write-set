import { Box, Button, Link } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConnectWallet from "../components/ConnectWallet";
import Mint from "../components/Mint";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css";
const { ethers, Contract } = require("ethers");

let abi = [
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "string", name: "_symbol", type: "string" },
      { internalType: "string", name: "_initBaseURI", type: "string" },
      { internalType: "uint256", name: "_startMintDate", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "from", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseExtension",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getApproved",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "isApprovedForAll",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_to", type: "address" },
      { internalType: "uint256", name: "_mintAmount", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bool", name: "_state", type: "bool" }],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "removeWhitelistUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "operator", type: "address" },
      { internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "_newBaseExtension", type: "string" },
    ],
    name: "setBaseExtension",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "string", name: "_newBaseURI", type: "string" }],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_newCost", type: "uint256" }],
    name: "setCost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startMintDate", type: "uint256" },
    ],
    name: "setStartMintDate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_newmaxMintAmount", type: "uint256" },
    ],
    name: "setmaxMintAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startMintDate",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
    name: "supportsInterface",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "index", type: "uint256" }],
    name: "tokenByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "from", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "walletOfOwner",
    outputs: [{ internalType: "uint256[]", name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "whitelistUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "whitelisted",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];
let contractAddress = "0x432d8155b6d0697c7c3ad8c1f857db57dd35f7c3";

export default function Home() {
  const [_hasMetamask, setMetamask] = useState(null);
  const [signerAddress, setSignerAddress] = useState(null);
  // const [hasMetamask, setMetamask] = useState(null);
  const [contractObj, setContractObj] = useState(null);
  const [supplyText, setSupplyText] = useState("?");
  const [signerObj, setsignerObj] = useState(null);
  const [providerEth, setProviderEth] = useState(null);
  const [sliderValue, setSliderValue] = useState(5);
  const [connectedStatus, setConnectedStatus] = useState(false);
  const [mintButtonDisabled, setmintButtonDisabled] = useState(true);

  useEffect(() => {
    try {
      setMetamask(window.ethereum.isMetaMask);
    } catch (e) {
      alert("Please install Metamask.");
    }

    // console.log(hasMetamask)
  }, [_hasMetamask]);

  async function _connectWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    setsignerObj(signer);
    setProviderEth(provider);
    setSignerAddress(await signer.getAddress());

    // await initializeWallet(signer);

    const c = new ethers.Contract(contractAddress, abi, signer);
    console.log(c);
    setContractObj(c);
    const supply = await c.totalSupply();
    setSupplyText(Number(supply));
    setConnectedStatus(true);
    setmintButtonDisabled(false);
  }

  async function _handleMint() {
    console.log("Mint")
    // if((await providerEth.getNetwork()).chainId != 137)
    // {
    //   alert("Error: Wrong network. Please switch to the Matic network.")
    //   return;
    // }
    try{
      
      let aPrice = 2 * 0  
    let quantity = sliderValue
    let _price = ethers.utils.parseEther(aPrice.toString());

    const mintWithSigner = contractObj.connect(signerObj);
    const totalPrice = { value: _price.toString() }

    // console.log(mintWithSigner)

    try {
      // console.log(signerAddress)

      // const totalPrice = { value: _price.toString() }
      // console.log(options)
      // console.log(options)
      // console.log(amount)
      let tx = await mintWithSigner.functions.mint(signerAddress, quantity, totalPrice);
      // console.log(tx)
      let receipt = await tx.wait();
      console.log(receipt);
      alert("Success")
      // console.log("Success")
    }
    catch (e) {
      console.log(e)
      // console.log(e.data.message)
      if(e.code==4001)
      {
        alert("MetaMask Tx Signature: User denied transaction signature.")
      }
      if(e.code==-3200)
      {

        let balanceOfSignerReadable = ethers.utils.formatEther( await signerObj.getBalance())
        let totalPriceReadable = aPrice
        if(totalPriceReadable > balanceOfSignerReadable )
        {
          alert("Not enough funds.")
        }      }
      if(e.code==-32603)
      {
        let balanceOfSignerReadable = ethers.utils.formatEther( await signerObj.getBalance())
        let totalPriceReadable = aPrice
        if(totalPriceReadable > balanceOfSignerReadable )
        {
          alert("Not enough funds.")
        }

      }
      // let balanceOfSignerReadable = ethers.utils.formatEther( await signerObj.getBalance())


      // console.log(ethers.utils.formatEther( await signerObj.getBalance()))
      // alert(e)
      // signer.getB
      // console.log("fail")
      // alert(e.data.message)
      // console.log(e)
    }

    }
    catch(e)
    {
      setNetwork(false)

    }

    
  }

  async function setPrice(){
    console.log(mintWithSigner)
    let _price = ethers.utils.parseEther("0");
    console.log(_price)

    const mintWithSigner = contractObj.connect(signerObj);
    const priceEth = { value: _price.toString() }  

     // console.log(amount)
     let tx = await mintWithSigner.functions.setCost(signerAddress, priceEth);
     // console.log(tx)
     let receipt = await tx.wait();
     console.log(receipt);
     alert("Success")

  
  }




  return (
    <div>
      <Navbar />
      <div>Home</div>
      <ConnectWallet
        connectWallet={() => _connectWallet()}
        hasMetamask={_hasMetamask}
      />
      <Mint connectedStatus={connectedStatus} handleMint={() => _handleMint()}/>
      <div>
        <Button onClick={setPrice}>Set Price</Button>

      </div>
      <div>{supplyText}</div>
    </div>
  );
}
