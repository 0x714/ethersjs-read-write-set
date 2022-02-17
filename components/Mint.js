import { Button } from '@chakra-ui/react'
import React from 'react'




const Mint = ({handleMint}) => {
  return (
    <Button onClick={handleMint}>Mint</Button>
  )
}

export default Mint