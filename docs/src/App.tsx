import Main from "src/pages/Main";
import Nav from "src/components/Nav";
import Footer from "src/components/Footer";
import { useScrollToHash } from "@adamjanicki/ui";

export default function App() {
  useScrollToHash();

  return (
    <>
      <div id="installation" aria-hidden />
      <Nav />
      <Main />
      <Footer />
    </>
  );
}
