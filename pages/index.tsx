import { Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuid } from 'uuid'
import { Navigation } from 'swiper'
import { useRouter } from 'next/router'
import CARO_IMAGES from '../../utils/carouselImages'
import wave from './wave.svg'
import 'swiper/css'
import 'swiper/css/navigation'

function Homepage() {
  const navigate = useRouter()
  const carouselImages = Object.values(CARO_IMAGES)
  return (
    <Flex flexDir="column" overflow="hidden" position="relative">
      <Flex justify="center" mt="4rem">
        <Flex mr="5rem" textAlign="left" flexDir="column">
          <Text fontSize="1.9rem" color="gray.800" mb="2rem">
            An unbelievable online store.
          </Text>
          <Heading fontSize="6rem" fontFamily="Poppins">
            This is
            <br />
            not a real
            <br />
            store
          </Heading>
          <Button
            padding="3rem"
            mt="auto"
            mb="1.2rem"
            fontFamily="Poppins"
            background="blackAlpha.900"
            color="white"
            _hover={{
              backgroundColor: 'blackAlpha.800',
            }}
            fontSize="2.5rem"
            borderRadius="40px"
            onClick={() => navigate('/products')}
          >
            Shop now!
          </Button>
        </Flex>
        <Flex maxW="40%">
          <Swiper navigation modules={[Navigation]}>
            {carouselImages.map((imgSrc) => (
              <SwiperSlide
                key={uuid()}
                style={{
                  borderRadius: '10px',
                }}
              >
                <Flex width="100%" height="100%">
                  <Image
                    src={imgSrc}
                    borderRadius="30px"
                    objectFit="cover"
                    maxH="540px"
                    width="100%"
                    height="100%"
                  />
                </Flex>
                ...
              </SwiperSlide>
            ))}
          </Swiper>
        </Flex>
      </Flex>
      <Image
        src={wave}
        position="fixed"
        bgPosition="absolute"
        zIndex="-1"
        transform="scaleX(-1)"
        bottom={-40}
      />
    </Flex>
  )
}

export default Homepage
