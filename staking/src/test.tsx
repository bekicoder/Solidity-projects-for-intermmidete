import {ethers} from "ethers"
import {useState,useEffect} from "react"
export default function Test() {
    const CONTRACT_ADDRESS = "0x0165878A594ca255338adfa4d48449f69242Eb8F"
    const ABI = [
        "function inremment()",
        "function getCount() view returns(uint256)"
    ]
    const [account,setAccount] = useState<string>("")
    const [provider,setProvider] = useState<ethers.windowProvider | null>(null)
    const [signer,setSigner] = useState<ethers.JsonRpcSigner | null>(null)
    const [contract,setContract] = useState<ethers.Contract>(null)

    const connectWallet = async()=>{
        if(!window.ethereum){
            return alert("Install metamask")
        }
        const _provider = new ethers.BrowserProvider(window.ethereum)
        await _provider.send("eth_requestAccounts",[])
        const _signer = await _provider.getSigner()
        const _contract = new ethers.Contract(CONTRACT_ADDRESS,ABI,_signer)

        setProvider(_provider)
        setSigner(_signer)
        setContract(_contract)
        setAccount(await _signer.getAddress())
    }

    const increment = async()=>{

    }
  return (
    <div>
    <div>
    <p>{account}</p>
    <button onClick={connectWallet}>Connect</button>
    </div>
    </div>
  )
}

