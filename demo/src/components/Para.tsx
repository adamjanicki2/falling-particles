type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

const Para = ({ children }: Props) => (
  <p className="f5 fw4" style={{ lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
    {children}
  </p>
);

export default Para;
