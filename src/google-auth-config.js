import { UserManager, /*WebStorageStateStore*/ } from 'oidc-client';

const config = {
  authority: 'https://accounts.google.com',
  client_id: '817800941798-4gmmj8e767irbnd110ooaqa09fbk4l6k.apps.googleusercontent.com',
  client_secret: "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",
  redirect_uri: 'http://localhost:8080/callback_google', // URI de redirection de votre application Vue.js
  response_type: 'code',
  scope: 'openid profile email'
  //,userStore: new WebStorageStateStore({ store: window.localStorage }),
};

const userManager = new UserManager(config);
export default userManager;
