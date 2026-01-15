import { useScrollToHash } from "@adamjanicki/ui";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import Main from "src/pages/Main";

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
