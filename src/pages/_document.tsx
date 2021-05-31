import Document, { Html , Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  render() {
    const setInitialTheme = `
      function getUserPreference() {
        if(window.localStorage.getItem('@TODO:Theme')) {
          return window.localStorage.getItem('@TODO:Theme');
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      }

      document.body.dataset.theme = getUserPreference();
    `;

    return (
      <Html lang="en">
        <Head />
        <body>
          <script dangerouslySetInnerHTML={{__html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
