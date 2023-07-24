import App from "next/app";
import dynamic from "next/dynamic";
import "./globals.css";

const Layout = dynamic(() => import("shell/layout"), { ssr: true });

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
