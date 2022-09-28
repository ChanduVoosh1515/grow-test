const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
// const { COMMON_MAIL } = require('../config/config');

const COMMON_MAIL = 'roopansh@voosh.in';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://mail.google.com/'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), './token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), './google_credentials.json');

// ? Reads previously authorized credentials from the save file.
const loadSavedCredentialsIfExist = async () => {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
};

// ? Serializes credentials to a file compatible with GoogleAUth.fromJSON.
const saveCredentials = async (client) => {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
};

//?Load or request or authorization to call APIs.
const authorize = async () => {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
};

// ? Get Mail Message
const getMessageFromId = async ({ userId, id, auth }) => {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({
    userId,
    id,
  });
  return res.data;
};

// ? Lists the labels in the user's account.
const listLabels = async (auth) => {
  const gmail = google.gmail({ version: 'v1', auth });
  const {
    data: { messages },
  } = await gmail.users.messages.list({
    userId: COMMON_MAIL,
    q: 'from:no-reply@doordash.com',
  });
  
  if (!messages || messages.length === 0) {
    console.log('No Messages found.');
    return;
  }

  const search_message = messages.map(async (message, index) => {
      const message_content = await getMessageFromId({
        id: message.id,
        userId: COMMON_MAIL,
        auth,
      });

      console.log({
        fullData:message_content,
        headers:message_content.payload.headers
      })
      let sample = message_content.snippet.split('Your verification code is: ');
        return sample[1]
  });

    const promised_message = await Promise.all(search_message);
    let finalValue = promised_message[0];
    return finalValue.substring(0,6)
};

const emailAuthentication = async () => {
  return await authorize().then(listLabels).catch(console.error);
};

module.exports = {
  emailAuthentication,
};
