import { Animated, Button } from "@adamjanicki/ui";
import { useState } from "react";
import Snippet, { type Props } from "src/components/Snippet";

export default function HiddenSnippet(props: Props) {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="flex w-100 justify-end">
        <Button
          className="fw6 f7 mv2"
          style={{ padding: "3px 6px" }}
          onClick={() => setShow(!show)}
          variant="secondary"
        >
          {show ? "Hide" : "Show"} Code
        </Button>
      </div>
      <Animated
        visible={show}
        enter={{ style: { opacity: 1 } }}
        exit={{ style: { opacity: 0 } }}
      >
        <Snippet {...props} />
      </Animated>
    </>
  );
}
