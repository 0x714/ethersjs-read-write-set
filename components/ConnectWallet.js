import { Box, Button, Link } from '@chakra-ui/react';

import React from 'react'

const ConnectWallet = ({connectWallet, hasMetamask }) => {
    return (
        <div>
            {
        //Check if message failed
        hasMetamask ? (
          <Button onClick={connectWallet}>
              Connect Wallet
          </Button>
        ) : (
          <Box> Please install Metamask or another web3 provider. <Link isExternal="true" href="https://metamask.io/">https://metamask.io/</Link> </Box>
        )
      }
        </div>
  )
}

export default ConnectWallet