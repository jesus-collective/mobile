import config from '../jest-puppeteer.config';
import puppeteer from 'puppeteer';
import expect from 'expect-puppeteer'
import { setDefaultOptions } from 'expect-puppeteer'
import { Auth } from 'aws-amplify';
import Amplify from 'aws-amplify';
import awsConfig from '../src/aws-exports';
import 'isomorphic-fetch';
console.log(awsConfig)
Amplify.configure(awsConfig);

async function deleteAuthUser() {
    try {
        const user = await Auth.currentAuthenticatedUser();
        const delStat = await user.deleteUser()
        console.log(delStat)
        return delStat
    }
    catch (e) {
        console.log(e);
    }
}
async function DeleteUser(user, password) {
    console.log("hello2")
    try {
        await Auth.signIn(user, password);
        return deleteAuthUser();
    }
    catch (e) {
        console.log(e);
    }
}
setDefaultOptions({ timeout: 100000 })

const login = async (page) => {
    await page.goto('https://localhost:5000');
    await page.screenshot({ path: 'screenshot.png' });
    await expect(page).toFill('input[placeholder="Enter your email"]', "george.bell@jesuscollective.com")
    await expect(page).toFill('input[placeholder="Enter your password"]', "TestTest#1")
    await expect(page).toClick('div', { text: "SIGN IN" })
    await page.screenshot({ path: 'screenshot.png' });
}
const signUp = async (page) => {
    await page.goto('https://localhost:5000');
    await page.screenshot({ path: 'screenshot.png' });
    await page.click('[data-testid="aws-amplify__auth--sign-up-button"]')
    //    await expect(page).toClick('div', { dataTestId: "" })
    await expect(page).toFill('input[placeholder="Email"]', "george.bell@jesuscollective.com")
    await expect(page).toFill('input[placeholder="Password"]', "TestTest#1")
    await expect(page).toFill('input[placeholder="Phone Number"]', "555-555-5555")
    await expect(page).toFill('input[label="First Name"]', "Test")
    await expect(page).toFill('input[label="Last Name"]', "User1")
    await page.evaluate(() => {
        document.querySelector('[data-testid="aws-amplify__auth--sign-up-button"]').scrollIntoView();
    });
    await page.screenshot({ path: 'screenshot.png' });
    await page.click('[data-testid="aws-amplify__auth--sign-up-button"]')

    //await expect(page).toClick({ type: 'xpath', value: '.\\a' })
    await page.screenshot({ path: 'screenshot.png' });

    await expect(page).toFill('input[placeholder="Enter your email"]', "george.bell@jesuscollective.com")

}

beforeAll(() => {
    return DeleteUser("george.bell@jesuscollective.com", "TestTest#1")

})
it(`should match a text element`, async () => {
    const page = await browser.newPage();
    //await login(page)
    await signUp(page)
    await page.close();
    //const z2 = await page.close()
}, 5000000)
