import { IconButton } from '@chakra-ui/react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons/lib'
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from 'react-icons/ai'

interface Props {
  href: string
  MediaIcon: IconType
}
function Icon({ href, MediaIcon }: Props) {
  return (
    <IconButton
      aria-label="social media icon"
      as="a"
      href={href}
      cursor="hover"
      _hover={{
        background: 'none',
      }}
      background="none"
      icon={<MediaIcon size="150px" />}
    />
  )
}

export default Icon
