import pkg from "hardhat"
const {ethers} = pkg;

const main = async()=>{
    const Test =await ethers.getContractFactory("test")
    const test = await Test.deploy()
    await test.waitForDeployment()
    console.log("Test contract deployed at",await test.getAddress())
}

main()
