const getToken = () => {
  if (typeof window === 'undefined' || !window) {
    return null
  }
  const token = localStorage.getItem('token')
  if (token) {
    return token
  }

  return null
}

export default getToken
