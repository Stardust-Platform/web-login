<!-- README for NPM; the one for GitHub is in .github directory. -->
<div align="center">
  <p>
    <b>Stardust Auth</b>
  </p>
  <p>
     <i>This project is Stardust library for web auth</i>
  </p>
  <p>
    <!-- [![Build Status](https://travis-ci.com/opticpwr/stardust-auth.svg?branch=master)](https://travis-ci.com/opticpwr/stardust-auth)
    [![NPM version](https://img.shields.io/npm/v/stardust-auth?style=flat-square)](https://img.shields.io/npm/v/stardust-auth?style=flat-square)
    [![Package size](https://img.shields.io/bundlephobia/min/stardust-auth)](https://img.shields.io/bundlephobia/min/stardust-auth)
    [![Dependencies](https://img.shields.io/david/opticpwr/stardust-auth.svg?style=popout-square)](https://david-dm.org/opticpwr/stardust-auth)
    [![devDependencies Status](https://david-dm.org/opticpwr/stardust-auth/dev-status.svg?style=flat-square)](https://david-dm.org/opticpwr/stardust-auth?type=dev)
    [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
    [![Twitter](https://img.shields.io/twitter/follow/luctstt.svg?label=Follow&style=social)](https://twitter.com/luctstt) -->
  </p>
</div>

---

## **Content**

* [Features](##features)
* [Install](##install)
* [Usage](##usage)
* [examples](##examples)
* [Documentation](##documentation)
* [API](##Api)
* [Contributing](##contributing)
* [Maintainers](##maintainers)

## Features ✨

* Sign in with social accounts
* Sign up with social accounts
* ...

## Install 🐙

```
npm install --save https://github.com/Stardust-Platform/stardust-auth/stardust-auth.git
```
```
yarn add https://github.com/Stardust-Platform/stardust-auth/stardust-auth.git
```

## Usage 💡

- Add Provider
- Use hook method

## Examples 🖍

- Add Provider wrapping all the application

```
import { AuthProvider } from 'stardust-auth'
import Content from 'src/index'

const App = () => (
  <AuthProvider>
    <Content>
  </AuthProvider>
)
```

- Add hook for authentication

```
import { useAuthContext } from 'stardust-auth';

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

```import { AuthProvider } from 'stardust-auth'```

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

```import { useAuthContext } from 'stardust-auth'```

| attribute          | type     | DefaultValue      | description                                                                  |
| ------------------ | -------  | ----------------- | ---------------------------------------------------------------------------- |
| user               | Object   | undefined         | If user is login have the user info                                          |
| isOpen             | Boolean  | false             | Initialize modal open                                                        |
| handleOpenModal    | Function | (Boolean) => void | this function receives boolean value for open or close modal and return void |
| handleSignOut      | Function | () => void        | this function close the current session                                      |

### types

```import { CognitoUserSession } from 'stardust-auth'```

Type the current user

### Useful methods

```import { Hub } from 'stardust-auth'```

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

```import { currentSession } from 'stardust-auth'```

The Auth.currentSession() method retrieves the access, id, and refresh tokens.

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

```import { currentUserInfo } from 'stardust-auth'```

The Auth.currentUserInfo() method retrieves the User Attributes for the current user.

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

```import { currentAuthenticatedUser } from 'stardust-auth'```

The Auth.currentAuthenticatedUser() method returns a combination of the result of the Auth.currentUserInfo() method, the result of the Auth.currentSession() method, and some extra information.

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
   * [File an Issue](https://github.com/Stardust-Platform/stardust-auth/stardust-auth/issues)
   * Push to the branch (`git push origin your_github_name-feature`)
   * Create new Pull Request


