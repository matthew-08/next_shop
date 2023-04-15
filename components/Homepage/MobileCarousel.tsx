import React from 'react'
import { Flex } from '@chakra-ui/react'
import CARO_IMAGES from 'utils/carouselImages'
import { SwiperSlide, Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import { v4 as uuid } from 'uuid'
import ImageComponent from '../ImageComponent'

const carouselImages = Object.values(CARO_IMAGES)

function MobileCarousel() {
  return (
    <Flex maxW="100%">
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
  )
}

export default MobileCarousel
