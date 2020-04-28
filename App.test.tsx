import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import AwesomeApp from './App'
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver



test('loads and displays login', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("SIGN IN")
    fireEvent.click(getByText('SIGN IN'))
    expect(screen.getByText('SIGN IN')).toHaveAttribute('style')
})
test('loads and displays create account', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("Create an Account")
    fireEvent.click(getByText('Create an Account'))
    const items2 = await findByText("Create a new account")
    expect(screen.getByText('Create a new account')).toHaveAttribute('style')
  
})

test('loads and displays forgot password', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("Forgot password?")
    fireEvent.click(getByText('Forgot password?'))
    const items2 = await findByText("Reset your password")
    expect(screen.getByText('Reset your password')).toHaveAttribute('style')
  
})