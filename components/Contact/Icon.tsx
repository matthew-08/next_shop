import { IconButton, useMediaQuery } from '@chakra-ui/react'
import { IconType } from 'react-icons/lib'

interface Props {
  href: string
  MediaIcon: IconType
}
function Icon({ href, MediaIcon }: Props) {
  const [isSmallerThan700] = useMediaQuery('(max-width: 700px)')

  return (
    <IconButton
      aria-label="social media icon"
      as="a"
      href={href}
      cursor="hover"
      width={isSmallerThan700 ? '100px' : '150px'}
      height="100%"
      _hover={{
        background: 'none',
      }}
      background="none"
      icon={<MediaIcon size={isSmallerThan700 ? '100px' : '150px'} />}
    />
  )
}

export default Icon
