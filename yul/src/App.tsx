import React, { useState } from "react";
import { ethers } from "ethers";

// Replace with your deployed contract address
const COUNTER_ADDRESS = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

// Function selectors
const INCREMENT_SELECTOR = "0xd09de08a"; // increment()
const GET_SELECTOR = "0x6d4ce63c";       // get()

export default function App() {
  const [counter, setCounter] = useState<number | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  // Connect wallet
  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const prov = new ethers.BrowserProvider((window as any).ethereum);
      await prov.send("eth_requestAccounts", []);
      const s = await prov.getSigner();
      setProvider(prov);
      setSigner(s);
      console.log("Wallet connected:", await s.getAddress());
    } else {
      alert("MetaMask not found");
    }
  };

  // Call increment()
  const increment = async () => {
    if (!signer) return;
    const tx = await signer.sendTransaction({
      to: COUNTER_ADDRESS,
      data: INCREMENT_SELECTOR,
    });
    await tx.wait();
    alert("Counter incremented!");
  };

  // Call get()
  const getCounter = async () => {
    if (!provider) return;
    const result = await provider.call({
      to: COUNTER_ADDRESS,
      data: GET_SELECTOR,
    });

    // Decode returned 32-byte value
    const value = ethers.toBigInt(result);
    setCounter(Number(value));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Yul Counter</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      <button onClick={increment} disabled={!signer}>
        Increment
      </button>
      <button onClick={getCounter} disabled={!provider}>
        Get Counter
      </button>
      <p>Current counter: {counter !== null ? counter : "N/A"}</p>
    </div>
  );
}
