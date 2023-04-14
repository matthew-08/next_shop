import { Box, Container, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

function Footer() {
  return (
    <Flex mt="auto" align="center" width="100%" justify="center">
      <Flex
        mt="auto"
        background="none"
        fontSize="1.5rem"
        fontFamily="heading"
        color="blackAlpha.800"
        cursor="hover"
        as="a"
        href="https://github.com/matthew-08"
      >
        <Text mt="0.5rem">Created By: Matthew Crosby</Text>
        <AiFillGithub size="50px" />
      </Flex>
    </Flex>
  )
}

export default Footer
