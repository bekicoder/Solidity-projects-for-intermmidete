object "Counter" {
    code {
        datacopy(0, dataoffset("runtime"), datasize("runtime"))
        return(0, datasize("runtime"))
    }

    object "runtime" {

        code {

            let selector := shr(224, calldataload(0))

            switch selector

            case 0xd09de08a {   
                let value := sload(0)
                sstore(0, add(value, 1))
            }

            case 0x6d4ce63c {   
                let value := sload(0)
                mstore(0, value)
                return(0, 32)
            }

        }

    }
}
