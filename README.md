Stardust Web Login Widget
=========================

[![web-login](https://github.com/Stardust-Platform/web-login/workflows/web-login/badge.svg)](https://github.com/Stardust-Platform/web-login/actions)


Table of Contents
=================

* [Stardust Web Login Widget](#stardust-web-login-widget)
* [Table of Contents](#table-of-contents)
  * [Features <g-emoji class="g-emoji" alias="sparkles" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2728.png">✨</g-emoji>](#features-)
    * [Configure](#configure)
    * [To optionally build and run project locally](#to-optionally-build-and-run-project-locally)
  * [Install into your project's package.json <g-emoji class="g-emoji" alias="octopus" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f419.png">🐙</g-emoji>](#install-into-your-projects-packagejson-)
    * [Optional NextJS support](#optional-nextjs-support)
  * [Usage <g-emoji class="g-emoji" alias="bulb" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4a1.png">💡</g-emoji>](#usage-)
  * [Examples <g-emoji class="g-emoji" alias="crayon" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f58d.png">🖍</g-emoji>](#examples-)
  * [Documentation <g-emoji class="g-emoji" alias="page_facing_up" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f4c4.png">📄</g-emoji>](#documentation-)
    * [Provider Props](#provider-props)
    * [Hook](#hook)
    * [types](#types)
    * [Useful methods](#useful-methods)
    * [Tokens](#tokens)
      * [Access Token](#access-token)
      * [Refresh Token](#refresh-token)
      * [ID Tokens](#id-tokens)
  * [Contributing <g-emoji class="g-emoji" alias="cake" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f370.png">🍰</g-emoji>](#contributing-)
* [Contributing](#contributing)

## Features ✨

* Sign in with social accounts
* Sign up with social accounts
* ...

### Configure

* [Generate a new, dedicated API Key from the Stardust Dashboard](https://dashboard.stardust.gg/)

**NOTE As of 2021-12-15 NodeJS v17 is not supported! Tested with NodeJS version 16 and 14 on all operating systems.**

```bash
cd ~/web-login
touch example/.env
echo SKIP_PREFLIGHT_CHECK=true >> example/.env
echo REACT_APP_GAME_ID=0 >> example/.env
echo REACT_APP_LINK=false >> example/.env
```

NOTE: where the value of 0 needs to be replaced by your game's id number which is a value that is greater than 1

To expose the environment variable in his nextjs example program was: To add environment variables to the JavaScript bundle, open next.config.js and add the env config:

### To optionally build and run project locally

```bash
cd ~/web-login
yarn install && yarn run build
cd ~/web-login/example
yarn install && yarn run build && yarn start
```
The start command will launch your default browser on your computer

example:

```bash
open http://localhost:3000
```
## Install into your project's package.json 🐙

```
yarn add https://github.com/Stardust-Platform/web-login.git
```

### Optional NextJS support

```module.exports = {
  env: {
    REACT_APP_GAME_ID: process.env.REACT_APP_GAME_ID,
  },
}
```

## Usage 💡

- Add Provider
- Use hook method

## Examples 🖍

- Add Provider wrapping all the application

```
import { AuthProvider } from 'web-login'
import Content from 'src/index'

const App = () => (
  <AuthProvider>
    <Content>
  </AuthProvider>
)
```

- Add hook for authentication

```
import { useAuthContext } from 'web-login';

const Main = () => {
  const { user, handleOpenModal, isOpen, handleSignOut } = useAuthContext();

  return (
    <div>
      <div>{user?.username}</div>
      <button type="button" onClick={() => handleOpenModal(!isOpen)}>
        Toggle login
      </button>
      <button type="button" onClick={handleSignOut}>
        Sign out
      </button>
    </div>
  );
};
```

## Documentation 📄

### Provider Props

```import { AuthProvider } from 'web-login'```

| attribute     | type    | DefaultValue | description                                  |
| ------------- | ------- | ------------ | -------------------------------------------- |
| isOpen        | Boolean | false        | Initialize modal open                        |
| custom        | Custom  | {}           | Custom Logo Url, Terms                       |

```Custom Type```

| attribute           | type                                            | DefaultValue | description                                                                                        |
| ------------------- | ----------------------------------------------- | ------------ | --------------------------------------------                                                       |
| logoUrl             | string                                          | undefined    | Custom Logo Url, will override Stardust logo                                                       |
| magicLinkRedirectUrl| string                                          | undefined    | Custom base Url for the link to be received by users while using email magic link sign in          |
| termsServiceUrl     | string                                          | undefined    | Custom Terms and Service Url                                                                       |
| termsServiceProps   | React.AnchorHTMLAttributes\<HTMLAnchorElement>  | undefined    | Custom Terms and Service Anchore props, utils to extend the functionality type: target = "_ blank" |
| privacyPolicyUrl    | string                                          | undefined    | Custom Privacy Policy Url                                                                          |
| privacyPolicyProps  | React.AnchorHTMLAttributes\<HTMLAnchorElement>  | undefined    | Custom Privacy Policy Anchore props, utils to extend the functionality type: target = "_ blank" |
| containerClassName  | string                                          | undefined    | Custom ClassName for modal container                                                               |

For the image provided in the LogoUrl this are the recommended dimensions:

|        | Size 1 | Size 2 | Size 3 | Size 4 | Size 5 | Size 6 | Size 7 |
| ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| Width  | 160    | 160    | 160    | 132    | 160    | 48     | 36     |
| Height | 24     | 27     | 31     | 48     | 48     | 48     | 48     |

![image](https://user-images.githubusercontent.com/47512198/134942504-bc819a27-a229-4ef0-9ddd-b3991210bab2.png)

### Hook

```import { useAuthContext } from 'web-login'```

| attribute          | type     | DefaultValue      | description                                                                  |
| ------------------ | -------  | ----------------- | ---------------------------------------------------------------------------- |
| user               | Object   | undefined         | If user is login have the user info                                          |
| isOpen             | Boolean  | false             | Initialize modal open                                                        |
| handleOpenModal    | Function | (Boolean) => void | this function receives boolean value for open or close modal and return void |
| handleSignOut      | Function | () => void        | this function close the current session                                      |

### types

```import { CognitoUserSession } from 'web-login'```

Type the current user

### Useful methods

```import { Hub } from 'web-login'```

Auth category publishes in the auth channel when signIn, signUp, and signOut events happen. You can listen and act upon those event notifications.

Example:
```
Hub.listen('auth', (data) => {
  switch (data.payload.event) {
    case 'signIn':
        console.log('user signed in');
        break;
    case 'signUp':
        console.log('user signed up');
        break;
    case 'signOut':
        console.log('user signed out');
        break;
    case 'signIn_failure':
        console.log('user sign in failed');
        break;
    case 'configured':
        console.log('the Auth module is configured');
  }
});
```

----------------------------------------------------------------

### Tokens
The two token types involved in OAuth 2 authentication are Access Token and Refresh Token.

#### Access Token
The access token is used to for authentication and authorization to get access to the resources from the resource server.

#### Refresh Token
The refresh token normally is sent together with the access token.

The refresh token is used to get a new access token, when the old one expires. Instead of the normal grant type, the client provides the refresh token, and receives a new access token.

Using refresh tokens allows for having a short expiration time for access token to the resource server, and a long expiration time for access to the authorization server.

#### ID Tokens
ID tokens are used in token-based authentication to cache user profile information and provide it to a client application, thereby providing better performance and experience. The application receives an ID token after a user successfully authenticates, then consumes the ID token and extracts user information from it, which it can then use to personalize the user's experience.

For example, if you allow users to login with Google. Once a user logs in, use the ID token to gather information such as name and email address, which you can then use to auto-generate and send a personalized welcome email.

ID Tokens should never be used to obtain direct access to APIs or to make authorization decisions.

```import { currentSession } from 'web-login'```

The Amplify method currentSession() retrieves the access, id, and refresh tokens.

Returns: Promise\<CognitoUserSession>

Example:
```
{
  "accessToken": {
    "jwtToken": "XXXX",
    "payload": {
      "auth_time": XXXX,
      "client_id": "XXXX",
      "event_id": "XXXX-XXXX-XXXX-XXXX-XXXX",
      "exp": XXXX,
      "iat": XXXX,
      "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXX",
      "jti": "XXXX-XXXX-XXXX-XXXX-XXXX",
      "scope": "aws.cognito.signin.user.admin",
      "sub": "INTERNAL USERID: XXXX-XXXX-XXXX-XXXX-XXXX",
      "token_use": "access",
      "username": "MY USERNAME"
    }
  },
  "clockDrift": 0,
  "idToken": {
    "jwtToken": "XXXX",
    "payload": {
      "aud": "XXXX",
      "auth_time": XXXX,
      "cognito:username": "MY USERNAME",
      "email": "MY EMAIL ADDRESS",
      "email_verified": true,
      "event_id": "XXXX-XXXX-XXXX-XXXX-XXXX",
      "exp": XXXX,
      "iat": XXXX,
      "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXX",
      "sub": "INTERNAL USERID: XXXX-XXXX-XXXX-XXXX-XXXX",
      "token_use": "id"
    }
  },
  "refreshToken": {
    "token": "XXXX"
  }
}
```

----------------------------------------------------------------

```import { currentUserInfo } from 'web-login'```

The Amplify method currentUserInfo() retrieves the User Attributes for the current user.

Returns: Promise/<any>

Example:
```
{
  "attributes": {
    "email": "MY EMAIL ADDRESS",
    "email_verified": true,
    "sub": "INTERNAL USERID: XXXX-XXXX-XXXX-XXXX-XXXX"
  },
  "id": "us-east-1:XXXX",
  "username": "MY USERNAME"
}
```

----------------------------------------------------------------

```import { currentAuthenticatedUser } from 'web-login'```

The Amplify method currentAuthenticatedUser() returns a combination of the result of the Auth.currentUserInfo() method, the result of the Auth.currentSession() method, and some extra information.

Returns: Promise/<CognitoUserSession | any>

Example:
```
{
  "Session": null,
  "attributes": {
    ... SAME AS AUTH.CURRENTUSERINFO()
  },
  "authenticationFlowType": "USER_SRP_AUTH",
  "client": {
    "endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
    "userAgent": "aws-amplify/0.1.x react-native"
  },
  "keyPrefix": "CognitoIdentityServiceProvider.XXXX",
  "pool": {
    "advancedSecurityDataCollectionFlag": true,
    "client": {
      "endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
      "userAgent": "aws-amplify/0.1.x react-native"
    },
    "clientId": "XXXX",
    "storage": Function MemoryStorage,
    "userPoolId": "us-east-1_XXXX"
  },
  "preferredMFA": "NOMFA",
  "signInUserSession": {
     ... THE ACCESS, ID & REFRESH TOKENS OF AUTH.CURRENTSESSION()
  },
  "storage": Function MemoryStorage,
  "userDataKey": "CognitoIdentityServiceProvider.XXXX.XXXX.userData",
  "username": "MY USERNAME"
}
```

<!-- ## API 👩‍💻
You have a small project or you'll like to share the API of your project ? This is where it's happen. -->

## Contributing 🍰
Please make sure to read the [Contributing Guide](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to this project!



# Contributing
   * Fork it
   * Create your feature branch (`git checkout -b your_github_name-feature`)
   * Commit your changes (`git commit -am 'Added some feature'`)
   * Make sure to add tests for it. This is important so we don't break it in a future version unintentionally.
   * [File an Issue](https://github.com/Stardust-Platform/web-login/web-login/issues)
   * Push to the branch (`git push origin your_github_name-feature`)
   * Create new Pull Request


