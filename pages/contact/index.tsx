import Icon from '@/components/Contact/Icon'
import {
  Flex,
  Heading,
  SimpleGrid,
  theme,
  useMediaQuery,
} from '@chakra-ui/react'
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
import Footer from '@/components/Footer'
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
function Index() {
  const [isSmallerThan900] = useMediaQuery('(max-width: 900px)')
  const [isSmallerThan600] = useMediaQuery('(max-width: 600px)')

  const getHeight = () => {
    if (isSmallerThan600) {
      return '80vh'
    }
    if (isSmallerThan900) {
      return '70vh'
    }

    return '100vh'
  }
  return (
    <Flex width="100%" height={getHeight()} flexDir="column">
      <SimpleGrid
        width="100%"
        m="auto"
        mx="auto"
        columns={isSmallerThan600 ? 2 : 4}
        alignContent="center"
        justifyItems="center"
        maxW={isSmallerThan900 ? '100%' : '60%'}
      >
        {icons.map((icon) => (
          <Icon href={icon.href} MediaIcon={icon.icon} />
        ))}
      </SimpleGrid>
      <Heading textAlign="center" fontSize="3rem">
        123 Not Fake Address
        <br />
        Colombus, Ohio
      </Heading>
      <ImageComponent
        alt="wave"
        width="100%"
        src={wave}
        zIndex="-1"
        position="fixed"
        bottom={0}
      />
      <Footer />
    </Flex>
  )
}

export default Index
