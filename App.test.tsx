import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import AwesomeApp from './App'
import MutationObserver from '@sheerun/mutationobserver-shim'
window.MutationObserver = MutationObserver

jest.mock('axios')

test('loads and displays login', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("SIGN IN")
    fireEvent.click(getByText('SIGN IN'))
    expect(screen.getByText('SIGN IN')).toHaveAttribute('style')
})