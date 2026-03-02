import ethers from "ethers"
import {useState,useEffect} from "react"
export default function Test() {
    const [account,setAccount] = useState<string>("")
    const [provider,setProvider] = useState<ethers.windowProvider | null>(null)
    const [signer,setSigner] = useState<ethers.JsonRpcSigner | null>(null)
    const [contract,setContract] = useState<ethers.Contract>(null)
  return (
    <div>

    </div>
  )
}

