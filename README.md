# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

**Host**: smtpout.secureserver.net

- **Port**: 465 (SSL) or 587 (TLS)
- **Username**: Your full email address
- **Password**: Your email account's password

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MetalBrain Server - Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="text-align: center; background-color: #fff; padding: 20px; margin: 50px auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 80%; max-width: 600px;">
    <h1 style="color: #4CAF50;">Hey! Successfully Verified!</h1>
    <p>Please proceed to login by clicking <a href="/sign-in" style="color: #2196F3; text-decoration: none;">sign-in</a></p>
    <p>Happy to have you onboard! :)</p>
    <div style="margin-top: 20px; font-size: 0.9rem; color: #555;">
      <p>Version: 1.0.0</p>
      <p>Author: <a href="#" style="color: #2196F3; text-decoration: none;">Babatunde Kalejaiye - MetaBrain Inc</a></p>
    </div>
  </div>
</body>
</html>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MetalBrain Server</title>
</head>
<body>
  <h1>You have been successfully verified.</h1>
  <p>Please proceed to login by clicking <a href="/sign-in">sign-in</a></p>
  <p> Happy to have your onboard! :) </p>
  <p>Version: 1.0.0</p>
  <p>Author: <a href="/*">Babatunde Kalejaiye: MetaBrain Inc</a></p>
</body>
</html>

<!DOCTYPE html>
<html>
<head>
<title>FindSomeOne</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8" >
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style type="text/css">
body {
  /*background: linear-gradient(90deg, white, gray);*/
  background-color: #eee;
}

body, h1, p {
font-family: "Helvetica Neue", "Segoe UI", Segoe, Helvetica, Arial, "Lucida Grande", sans-serif;
font-weight: normal;
margin: 0;
padding: 0;
text-align: center;
}

.container {
margin-left: auto;
margin-right: auto;
margin-top: 177px;
max-width: 1170px;
padding-right: 15px;
padding-left: 15px;
}

.row:before, .row:after {
display: table;
content: " ";
}

h1 {
font-size: 48px;
font-weight: 300;
margin: 0 0 20px 0;
}

.lead {
font-size: 21px;
font-weight: 200;
margin-bottom: 20px;
}

p {
margin: 0 0 10px;
}

a {
color: #3282e6;
text-decoration: none;
}
</style>

</head>

<body>
<div class="container text-center" id="error">

  <svg height="100" width="100">
    <circle cx="50" cy="50" r="31" stroke="#679b08" stroke-width="9.5" fill="none" />
    <circle cx="50" cy="50" r="6" stroke="#679b08" stroke-width="1" fill="#679b08" />
    <line x1="50" y1="50" x2="35" y2="50" style="stroke:#679b08;stroke-width:6" />
    <line x1="65" y1="35" x2="50" y2="50" style="stroke:#679b08;stroke-width:6" />
    <path d="M59 65 L83 65 L75 87 Z" fill="#679b08" />
    <rect width="20" height="9" x="70" y="56" style="fill:#eee;stroke-width:0;" />
  </svg>
  <div class="row">
    <div class="col-md-12">
      <div class="main-icon text-success"><span class="uxicon uxicon-clock-refresh"></span></div>
      <h1>FindSomeOne powered by metalbrain.</h1>
      <p class="lead">If you're a <strong>MEMBER</strong>, <a href="/cpanel">log in</a> to access your portal</p>
      <p class="lead">If you are a <strong>visitor</strong>, Check back again!..Coming soon!</p>
    </div>
  </div>

</div>

</body>
</html>
