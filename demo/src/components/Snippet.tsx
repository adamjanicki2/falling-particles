import "src/components/snippet.css";

import { Badge, Box, Button, classNames, Icon, ui } from "@adamjanicki/ui";
import { check, clipboard } from "@adamjanicki/ui/icons";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as light } from "react-syntax-highlighter/dist/esm/styles/prism";

export type Props = {
  className?: string;
  children: string;
  lang?: string;
};

export default function Snippet({ className, children, lang = "tsx" }: Props) {
  children = children.trim();
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Box
      vfx={{
        marginX: "auto",
        maxWidth: "full",
        width: "min",
        radius: "rounded",
        border: true,
        borderColor: "primary",
        shadow: "floating",
      }}
      className={classNames("snippet-container", className)}
    >
      <Box
        vfx={{
          axis: "x",
          align: "center",
          justify: "between",
          width: "full",
          paddingX: "s",
          paddingY: "xs",
          borderBottom: true,
          borderColor: "primary",
        }}
      >
        <ui.span vfx={{ fontSize: "s", fontWeight: 5 }}>{lang}</ui.span>
        {copied ? (
          <Badge vfx={{ axis: "x", align: "center", gap: "xs" }} type="success">
            <Icon icon={check} /> Copied
          </Badge>
        ) : (
          <Button
            vfx={{ axis: "x", align: "center", gap: "xs", paddingY: "xxs" }}
            onClick={copyCode}
            size="small"
            variant="secondary"
          >
            <Icon icon={clipboard} />
            Copy
          </Button>
        )}
      </Box>
      <ui.pre
        vfx={{
          axis: "x",
          margin: "none",
          overflow: "auto",
          padding: "s",
          width: "full",
        }}
        style={{ maxHeight: "70vh" }}
      >
        <SyntaxHighlighter
          style={light}
          language={lang}
          customStyle={{
            background: "none",
            backgroundColor: "transparent",
            padding: 0,
            margin: 0,
          }}
          className="no-bg"
        >
          {children}
        </SyntaxHighlighter>
      </ui.pre>
    </Box>
  );
}
