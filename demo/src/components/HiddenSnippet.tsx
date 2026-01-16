import { Animated, Box, Button } from "@adamjanicki/ui";
import { useState } from "react";
import Snippet, { type Props } from "src/components/Snippet";

export default function HiddenSnippet(props: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <Box vfx={{ axis: "x", justify: "end", width: "full" }}>
        <Button
          vfx={{ marginY: "s" }}
          onClick={() => setShow(!show)}
          variant="secondary"
          size="small"
        >
          {show ? "Hide" : "Show"} Code
        </Button>
      </Box>
      <Animated
        vfx={{ axis: "x", justify: "center", width: "full" }}
        visible={show}
        to={{ opacity: 1 }}
        from={{ opacity: 0 }}
      >
        <Snippet {...props} />
      </Animated>
    </>
  );
}
