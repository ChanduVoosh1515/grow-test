require('chromedriver');
const { emailAuthentication } = require('../emailAuthentication');

const { By } = require('selenium-webdriver');
let swd = require('selenium-webdriver');
const { drive } = require('googleapis/build/src/apis/drive');

let driver = new swd.Builder().forBrowser('chrome').build();

const credentials = {
  userName: 'roopansh@voosh.in',
  password: 'Voosh@123',
};

const getCookieData = async () => {
  try {
    await driver.get(
      'https://www.doordash.com/merchant'
    );

    await driver.sleep(2000);
    await driver
      .findElement(
        By.css("input[data-anchor-id='IdentityLoginPageEmailField']")
      )
      .sendKeys(credentials.userName);

    await driver.sleep(2000);

    await driver
      .findElement(
        By.css('input[data-anchor-id="IdentityLoginPagePasswordField"]')
      )
      .sendKeys(credentials.password);

    await driver.sleep(2000);

    await driver
      .findElement(By.css('button[data-anchor-id="IdentityLoginSigninButton"]'))
      .click();

    // await driver.sleep(5000);

    // const getOtp  = await emailAuthentication();

    // await driver.sleep(20000);

    // await driver
    //   .findElement(By.css("input[id = 'FieldWrapper-2']"))
    //   .sendKeys(getOtp);

    //   await driver.sleep(2000);

    // // id = 'FieldWrapper-2';
    // await driver
    //   .findElement(By.css('button[kind="BUTTON/PRIMARY"]'))
    //   .click();

    await driver.sleep(10000);

    await driver.get('https://www.doordash.com/merchant/orders?business_id=11067120');
    await driver.sleep(10000);

    const session_data = await driver.getSession();
    const cookie = await driver.manage().getCookies();

    let strCookie = '';
    cookie.forEach((single) => {
        console.log(single.name)
        console.log(single.value);
        console.log(`${single.name}=${single.value};`);
      strCookie += `${single.name}=${single.value}; `;
    });
    console.log("Cookies Payload ----------------------",strCookie);
    return {
      cookie_data: strCookie,
      session_data: session_data,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getCookieData,
};
