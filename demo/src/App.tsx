import { Box, useScrollToHash } from "@adamjanicki/ui";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import Main from "src/sections/Main";

export default function App() {
  useScrollToHash();

  return (
    <>
      <Box id="installation" aria-hidden />
      <Nav />
      <Main />
      <Footer />
    </>
  );
}
