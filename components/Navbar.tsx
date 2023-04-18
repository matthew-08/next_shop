import {
  Heading,
  HStack,
  List,
  ListItem,
  Button,
  useMediaQuery,
  useDisclosure,
  Circle,
  chakra,
  Flex,
} from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import { v4 as uuid } from 'uuid'
import Link from 'next/link'
import { UserCartContext } from '@/components/_Context/CartContext'
import shopcart from '../public/shopping-cart.svg'
import Sidebar from './Sidebar/Sidebar'
import ImageComponent from './ImageComponent'

const navbarLinks = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'Products',
    to: '/products',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]

function Navbar() {
  const [isSmallerThan1200] = useMediaQuery('(max-width: 1200px)')
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)')
  const [isSmallerThan1500] = useMediaQuery('(max-width: 1500px)')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const { cart } = useContext(UserCartContext)
  return (
    <Flex
      as="nav"
      background="blackAlpha.900"
      width="100%"
      minH="200px"
      alignItems="center"
      px={isSmallerThan1500 ? '5rem' : '15rem'}
      py={isSmallerThan1200 ? '1rem' : '0rem'}
      color="cyan.100"
      align="center"
      flexDir={isSmallerThan1200 ? 'column' : 'row'}
    >
      <Heading
        fontSize={isSmallerThan700 ? '2.7rem' : '5rem'}
        color="cyan.100"
        mr="auto"
        fontFamily="heading"
        fontWeight="bold"
        margin={isSmallerThan1200 ? 'auto' : ''}
      >
        UnrealStore
      </Heading>
      <Flex flexDir={isSmallerThan700 ? 'column' : 'row'} align="center">
        <HStack
          as={List}
          mt="1rem"
          color="white"
          fontSize={isSmallerThan700 ? '1.5rem' : '2rem'}
          spacing="2rem"
          mr="1rem"
          mb={isSmallerThan700 ? '1.2rem' : '0.5rem'}
          ml="auto"
        >
          {navbarLinks.map((link) => (
            <ListItem
              fontFamily="heading"
              color="cyan.100"
              _hover={{
                color: 'cyan.200',
              }}
              key={uuid()}
              as={Link}
              href={link.to}
            >
              {link.name}
            </ListItem>
          ))}
        </HStack>
        <Button
          background="none"
          _hover={{ background: 'none' }}
          ref={btnRef}
          onClick={onOpen}
          position="relative"
        >
          {cart && (
            <Circle
              position="absolute"
              bottom={-4}
              left={2}
              size="30px"
              backgroundColor="red.400"
            >
              {cart?.cartItems.length}
            </Circle>
          )}
          <ImageComponent
            alt="cart"
            src={shopcart}
            borderRadius="full"
            boxSize={isSmallerThan700 ? '55px' : '70px'}
            background="white"
            padding="0.8rem"
            cursor="pointer"
          />
        </Button>
      </Flex>
      <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </Flex>
  )
}

export default Navbar
