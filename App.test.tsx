import React from 'react'
import { render, fireEvent, NativeTestEvent } from '@testing-library/react-native'

import '@testing-library/jest-dom/extend-expect'

import AwesomeApp from './App'
//import MutationObserver from '@sheerun/mutationobserver-shim'
//import { Textarea } from 'native-base'
//window.MutationObserver = MutationObserver

import "isomorphic-fetch"

test('loads and displays login', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("SIGN IN")

    fireEvent.press(getByText('SIGN IN'))
    expect(getByText('SIGN IN'))
})
test('loads and displays create account', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("Create an Account")
    fireEvent.press(getByText('Create an Account'))
    const items2 = await findByText("Create a new account")
    expect(getByText('Create a new account'))

})

test('loads and displays forgot password', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("Forgot password?")
    fireEvent.press(getByText('Forgot password?'))
    const items2 = await findByText("Reset your password")
    expect(getByText('Reset your password'))

})
test('loads and displays confirm code', async () => {
    const { getByText, findByText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("Create an Account")
    fireEvent.press(getByText('Create an Account'))
    const items2 = await findByText("Confirm a Code")
    fireEvent.press(getByText('Confirm a Code'))
    expect(getByText('Confirm Sign Up'))

})


test('sign in', async () => {
    const { findByTestId, debug, getByText, findByPlaceholderText, findAllByPlaceholderText, findByLabelText, getByLabelText, getByTestId, findByText, getByPlaceholderText } = render(
        <AwesomeApp navigation={null} onStateChange={() => { }} />
    )
    const items = await findByText("SIGN IN")
    const items4 = await findByTestId("aws-amplify__auth--email-input")
    const items3 = await findByPlaceholderText("Enter your password")

    var email = getByTestId('aws-amplify__auth--email-input')
    var password = getByPlaceholderText('Enter your password')
    var button= getByTestId('aws-amplify__auth--sign-in-button')
    email.props.value = "george_vic_bell@hotmail.com"
    password.props.value = "Tacobell#1"
    email.props.onChangeText("george_vic_bell@hotmail.com")
    password.props.onChangeText("Tacobell#1")

    fireEvent.change(email, { target: { value: 'george_vic_bell@hotmail.com' } });
    fireEvent.change(password, { target: { value: 'Tacobell#1' } })
    fireEvent.press(button)

    const items2 = await findByText("California")
    debug()
    expect(getByText('California')).toHaveAttribute('style')
})
