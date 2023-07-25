import dynamic from "next/dynamic";
const PDPPage = dynamic(() => import("product/plp"), { ssr: true });
const PDP = PDPPage;
PDP.getInitialProps = PDPPage.getInitialProps;
export default PDP;
