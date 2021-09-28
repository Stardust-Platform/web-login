<!-- README for NPM; the one for GitHub is in .github directory. -->
<div align="center">
  <a href="#">
  	<img src="https://i.giphy.com/media/z2KbVZxKCHxxIDhnsQ/giphy.webp" alt="Logo project" height="160" />
  </a>
  <br>
  <br>
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
npm install --save https://github.com/opticpower/stardust-auth.git
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

| attribute          | type    | DefaultValue | description                                  |
| ------------------ | ------- | ------------ | -------------------------------------------- |
| logoUrl            | string  | undefined    | Custom Logo Url, will override Stardust logo |
| termsServiceUrl    | string  | undefined    | Custom Terms and ServiceUrl Url              |
| privacyPolicyUrl   | string  | undefined    | Custom Terms and ServiceUrl Url              |
| containerClassName | string  | undefined    | Custom ClassName for modal container         |

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

<!-- ## API 👩‍💻
You have a small project or you'll like to share the API of your project ? This is where it's happen. -->

## Contributing 🍰
Please make sure to read the [Contributing Guide](https://github.com/auth0/open-source-template/blob/master/GENERAL-CONTRIBUTING.md) before making a pull request.

Thank you to all the people who already contributed to this project!

## Maintainers 👷

<table>
  <tr>
    <td align="center"><a href="https://github.com/SantiagoMolinaOrozco"><img src="https://avatars.githubusercontent.com/u/17752391?v=4" width="100px;" alt="SantiagoMolinaOrozco"/><br /><sub><b>Santiago Molina Orozco</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dagibu301"><img src="https://avatars.githubusercontent.com/u/47512198?v=4" width="100px;" alt="DavidGiraldo"/><br /><sub><b>David Giraldo</b></sub></a><br /><a href="#" title="Code">💻</a></td>
  </tr>
</table>

<!-- ## License ⚖️
Enter what kind of license you're using. -->

---
<div align="center">
	<b>
		<a href="https://opticpwr.com">Optic Power</a>
	</b>
</div>
