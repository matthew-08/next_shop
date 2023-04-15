import { Box, Container, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import { AiFillGithub } from 'react-icons/ai'

function Footer() {
  const [isSmallerThan500] = useMediaQuery('(max-width: 500px)')
  return (
    <Flex mt="auto" align="center" width="100%" justify="center">
      <Flex
        mt="auto"
        background="none"
        fontSize={{ sm: '1rem', md: '2rem' }}
        fontFamily="heading"
        color="blackAlpha.800"
        cursor="hover"
        as="a"
        href="https://github.com/matthew-08"
      >
        <Text mt={isSmallerThan500 ? '1rem' : '0.5rem'}>
          Created By: Matthew Crosby
        </Text>
        <AiFillGithub size="50px" />
      </Flex>
    </Flex>
  )
}

export default Footer
