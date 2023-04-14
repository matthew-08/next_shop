import { Flex } from '@chakra-ui/react'
import React from 'react'
import { FaBeer } from 'react-icons/fa'

function index() {
  return (
    <Flex width="100%" minH="80vh">
      <Flex margin="auto" gap="80px" maxW="1000px" flexWrap="wrap">
        <FaBeer size="150px" />
        <FaBeer size="150px" />
        <FaBeer size="150px" />
        <FaBeer size="150px" />
      </Flex>
    </Flex>
  )
}

export default index
