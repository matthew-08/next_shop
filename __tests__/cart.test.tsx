import { getByText, render, screen, GetByText } from '@testing-library/react'
import Sidebar from '@/components/Sidebar'
import AccountContext, {
  AuthContext,
} from '@/components/context/AccountContext'
import mockRouter from 'next-router-mock'
import { MockedProvider } from '@apollo/client/testing'
import Navbar from '@/components/Navbar'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => require('next-router-mock'))
