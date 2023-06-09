import { getByText, render, screen, GetByText } from '@testing-library/react'
import Sidebar from '@/components/Sidebar/Sidebar'
import AccountContext, {
  AuthContext,
} from '@/components/_Context/AccountContext'
import mockRouter from 'next-router-mock'
import { MockedProvider } from '@apollo/client/testing'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => require('next-router-mock'))

describe('navbar', () => {
  it('renders heading text', () => {
    render(<Navbar />)
    const heading = screen.getByText('UnrealStore')
    expect(heading).toBeInTheDocument()
  })

  it('navigates to products', () => {
    mockRouter.push('/')
    render(<Navbar />)
    expect(mockRouter).toMatchObject({
      asPath: '/',
    })
    userEvent.click(screen.getByText('Products'))
    mockRouter.push('/products')
    expect(mockRouter).toMatchObject({
      asPath: '/products',
    })
  })
})
