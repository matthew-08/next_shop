import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 as uuid } from 'uuid'
import { Navigation } from 'swiper'
import { useRouter } from 'next/router'
import CARO_IMAGES from 'utils/carouselImages'
import ImageComponent from '@/components/ImageComponent'
import wave from 'public/wave.svg'
import 'swiper/css'
import 'swiper/css/navigation'
import Footer from '@/components/Footer'
import MobileCarousel from '@/components/Homepage/MobileCarousel'
import { poppins } from './_app'

function Homepage() {
  const router = useRouter()
  const carouselImages = Object.values(CARO_IMAGES)
  const [isSmallerThan1300] = useMediaQuery('(max-width: 1300px)')
  return (
    <Flex flexDir="column" overflow="hidden" position="relative" height="100vh">
      {isSmallerThan1300 ? (
        <MobileCarousel />
      ) : (
        <Flex justify="center" mt="4rem">
          <Flex mr="5rem" textAlign="left" flexDir="column">
            <Text fontSize="1.9rem" color="gray.800" mb="2rem">
              An unbelievable online store.
            </Text>
            <Heading fontSize="6rem" className={poppins.className}>
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
              background="blackAlpha.900"
              color="white"
              _hover={{
                backgroundColor: 'blackAlpha.800',
              }}
              fontSize="2.5rem"
              borderRadius="40px"
              onClick={() => router.push('/products')}
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
                    <ImageComponent
                      alt="carousel image"
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
      )}
      <Footer />
      <Image
        src={wave.src}
        position="absolute"
        bgPosition="absolute"
        zIndex="-1"
        transform="scaleX(-1)"
        bottom={0}
      />
    </Flex>
  )
}

export default Homepage
