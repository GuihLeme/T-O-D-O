import Head from 'next/head';

import { ThemeProvider } from '../hooks/theme';
import { RepositoryProvider } from '../hooks/repositories';

import '../styles/sass/Main.scss';

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider>
      <RepositoryProvider>
        <Head>
          <title>To Do | FrontEndMentor</title>
        </Head>
        <Component {...pageProps} />
      </RepositoryProvider>
    </ThemeProvider>
  )

}

export default App
