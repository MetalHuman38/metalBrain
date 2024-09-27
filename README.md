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

INSERT INTO user_activities (user_id, activity, activity_type, created_at, metadata) VALUES
(1, 'created a post', 'post', CONCAT(CURDATE(), ' 10:00:00'), '{"post_id":101}'),
(2, 'liked a post', 'like', CONCAT(CURDATE(), ' 10:15:00'), '{"post_id":101}'),
(1, 'commented on a post', 'comment', CONCAT(CURDATE(), ' 10:25:00'), '{"post_id":101, "comment_id":202}'),
(3, 'followed a user', 'follow', CONCAT(CURDATE(), ' 10:30:00'), '{"user_id":2}'),
(3, 'unfollowed a user', 'unfollow', CONCAT(CURDATE(), ' 10:35:00'), '{"user_id":2}'),
(1, 'liked a comment', 'like', CONCAT(CURDATE(), ' 11:00:00'), '{"post_id":101, "comment_id":202}'),
(2, 'liked a comment', 'like', CONCAT(CURDATE(), ' 11:15:00'), '{"post_id":101, "comment_id":202}'),
(1, 'liked a comment', 'like', CONCAT(CURDATE(), ' 11:30:00'), '{"post_id":101, "comment_id":202}'),
(2, 'liked a comment', 'like', CONCAT(CURDATE(), ' 11:45:00'), '{"post_id":101, "comment_id":202}');
