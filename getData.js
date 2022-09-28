const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const { getCookieData } = require('./chromeBrowser');

const getOrders = async () => {
  try {
    const cookie_data =
      'amplitude_id_c110169fac0dd2b32727081d8c7869f8doordash.com=eyJkZXZpY2VJZCI6ImU4MDZiNTNhLTBkNGEtNGM2ZC05ZmUwLTIyZmQwNzllYTM5YVIiLCJ1c2VySWQiOiIxMTAzOTg0ODIzIiwib3B0T3V0IjpmYWxzZSwic2Vzc2lvbklkIjoxNjY0MTkwODEwMzU4LCJsYXN0RXZlbnRUaW1lIjoxNjY0MTkwODIyNjM0LCJldmVudElkIjo0NSwiaWRlbnRpZnlJZCI6NCwic2VxdWVuY2VOdW1iZXIiOjQ5fQ==; __stripe_mid=f80b42be-97ca-4dc5-818b-96ecfad9f3482c20fe; __stripe_sid=ff64347a-2600-49ba-88a1-a67d27a19a9cf14997; _clsk=q73ryl|1664190818438|4|0|d.clarity.ms/collect; _uetvid=3b474e203d8c11edbc23b70f130e940f; _uetsid=3b4727f03d8c11ed8d7a7705462f837a; _gat_UA-36201829-16=1; _ga_J4BQM7M3T2=GS1.1.1664190801.1.0.1664190809.52.0.0; dd_language=en-US; amplitude_idundefineddoordash.com=eyJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOm51bGwsImxhc3RFdmVudFRpbWUiOm51bGwsImV2ZW50SWQiOjAsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjowfQ==; _gid=GA1.2.1686887214.1664190802; ajs_user_id=%221103984823%22; __cf_bm=NtnpkARaRUMBiuIjwUa.EJ6UjNq2qTX08oZjM.Zc9I0-1664190808-0-AWNbPvXXKGEO+yfN+bkGle47bqL/nkUxS2c8rFCURtz6Ypyh8TH0hVepjdgGPfnRVQB5fsWoOH8Bw/7PN7/TU9s=; _fbp=fb.1.1664190801793.1795216336; _gat_UA-36201829-6=1; _gcl_au=1.1.931436948.1664190801; IR_16838=1664190817810%7C0%7C1664190817810%7C%7C; dd_session_id=sx_0e2ee9f983084223812ef8c5c4ac76e4; _ga=GA1.2.1437008083.1664190801; optimizelyEndUserId=oeu1664190801081r0.9118051372091904; IR_gbd=doordash.com; _scid=92579cfa-9ecc-48d8-80d9-dfc5d6b38b02; __cf_bm=0fwUguzqdPUC1ZdFuzXc2X.JwbxUbmersiGlNggdYCc-1664190799-0-AcsbbGSXhz4D4vhs6lEsa29k/lbUkO0Z60eJKjW3lq3gDIWEzpFF+3M+/YBDDwPQNDqwfJ5znkfUP7RKGP8Zszb/7DDJhzCtDWikBZJFd2ou; __cfruid=6266a2ee02597ad4e7ef982e3ad534027be81706-1664190815; _cfuvid=JGEYwDxQK9KoIHzutWO7BnNAJi9pnfCfCdirHsfNg3k-1664190799124-0-604800000; portal-web.sid=s%3Ak2vPJUq6PSKN0ZUDA8ZOH6BCa_bxu1ga.j7eS4ag%2Fs7DuFrYTlKGFNV8o0gp68HoGIwLd01D2YZE; _clck=1gksc90|1|f57|0; __cfruid=7fe89a0201f9dd67b49f0e523b7f7d32b628f3ba-1664190799; ajs_anonymous_id=%2220b12b44-d565-4edb-910d-bf5812ec153e%22;; __cf_bm=Cz.XtVmcghy5yCryM3zaaSbA9MqivKy821F8MilFryk-1664190891-0-AQ4Z9Y8T1vs7qIVjKZtHh00m6MQq/U7c8w5lA5PggBlSfiRVOYu5MdI+5yPYZgmxZLnVonCY9/qnJ0GCnbR7yTU=; dd_session_id=sx_6be2facae4ff43e1ae5f5acfcb3aa646; portal-web.sid=s%3A2T-vHEPVvIfTYBMqa-biFUTKNCexPxrI.XX9FR21%2BFaDsxVLAWK%2F5fVkobSShs0nPfsxIWUrJUNc; XSRF-TOKEN=e7c90a4c-191b-487d-9690-56ce23c503e1';
    // console.log('cookie data in getData-----', cookie_data);

    // "dateGte": "2022-09-18T18:30:00.000Z",
    //   "dateLt": "2022-09-25T18:29:59.999Z",
    var raw = {
      businessId: 11067120,
      type: 'history',
      dateGte: '2022-09-18T18:30:00.000Z',
      dateLt: '2022-09-25T18:29:59.999Z',
      limit: 20,
    };

    const headers = {
      'Content-Type': 'application/json',
      cookie: `${cookie_data}`,
      path: '/merchant-analytics-service/api/v1/get_orders',
      origin: 'https://www.doordash.com',
      pragma: 'no-cache',
      referer:
        'https://merchant-portal.doordash.com/merchant/orders?business_id=11067120',
      Connection: 'keep-alive',
    };

    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(raw),
    };

    const response = await fetch(
      'https://merchant-portal.doordash.com/merchant-analytics-service/api/v1/get_orders',
      requestOptions
    );
    const data = await response.text();
    

    return data;
  } catch (error) {
    return error;
  }
};
module.exports = {
  getOrders,
};
