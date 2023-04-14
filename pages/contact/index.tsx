import Icon from '@/components/Contact/Icon'
import { Flex, Heading, theme } from '@chakra-ui/react'
import React from 'react'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from 'react-icons/ai'
import wave from 'public/wave.svg'
import Image from 'next/image'
import ImageComponent from '@/components/ImageComponent'
import { poppins } from '../_app'

const icons = [
  {
    icon: AiFillFacebook,
    href: 'https://github.com/matthew08',
  },
  {
    icon: AiFillInstagram,
    href: 'https://github.com/matthew08',
  },
  {
    icon: AiFillTwitterCircle,
    href: 'https://github.com/matthew08',
  },
  {
    icon: AiFillLinkedin,
    href: 'https://github.com/matthew08',
  },
]

console.log(<AiFillLinkedin size="150px" />)
function index() {
  return (
    <Flex width="100%" minH="80vh" position="relative" flexDir="column">
      <Flex margin="auto" gap="80px" maxW="1000px" flexWrap="wrap">
        {icons.map((icon) => (
          <Icon href={icon.href} MediaIcon={icon.icon} />
        ))}
      </Flex>
      <Heading m="auto" textAlign="center" fontSize="3rem">
        123 Not Fake Address
        <br />
        Colombus, Ohio
      </Heading>
      <ImageComponent
        width="100%"
        src={wave}
        zIndex="-1"
        position="absolute"
        bottom="0"
      />
    </Flex>
  )
}

export default index
