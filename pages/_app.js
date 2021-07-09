import Head from 'next/head'
import { Navbar } from "reactstrap";
import "../styles/globals.css";
import "../components/layout.css";
import "../styles/dashboard.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head> 
        <link rel="stylesheet" href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css' />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
