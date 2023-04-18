import React from 'react'
import { Flex, Button, Heading, useMediaQuery } from '@chakra-ui/react'
import CARO_IMAGES from 'utils/carouselImages'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import { poppins } from '@/pages/_app'
import ImageComponent from '../ImageComponent'

const carouselImages = Object.values(CARO_IMAGES)

function MobileCarousel() {
  const router = useRouter()
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)')
  return (
    <Flex maxW="100%" position="relative" justify="center" align="center">
      <Flex
        mr="5rem"
        textAlign="left"
        flexDir="column"
        position="absolute"
        zIndex="2"
        m="auto"
      >
        <Heading
          fontSize={isSmallerThan700 ? '3rem' : '6rem'}
          className={poppins.className}
          color="white"
        >
          This is
          <br />
          not a real
          <br />
          store
        </Heading>
        <Button
          padding={isSmallerThan700 ? '2rem' : '3rem'}
          mt="auto"
          mb="1.2rem"
          background="blackAlpha.900"
          color="white"
          _hover={{
            backgroundColor: 'blackAlpha.800',
          }}
          fontSize={isSmallerThan700 ? '1.5rem' : '2.5rem'}
          borderRadius="40px"
          onClick={() => router.push('/products')}
        >
          Shop now!
        </Button>
      </Flex>
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
                objectFit="cover"
                maxH="540px"
                width="100%"
                height="100%"
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  )
}

export default MobileCarousel
