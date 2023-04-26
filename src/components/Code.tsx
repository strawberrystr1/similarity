"use client";

import { FC, useEffect, useState } from "react";
import { Language, defaultProps } from "prism-react-renderer";
import { useTheme } from "next-themes";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import Highlight from "prism-react-renderer";

interface ICodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}

const Code: FC<ICodeProps> = ({
  code,
  show,
  language,
  animated,
  animationDelay
}) => {
  const [text, setText] = useState(animated ? "" : code);
  const { theme: applicationTheme } = useTheme();

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const interval = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(interval);
          }
        }, 15);

        return () => clearInterval(interval);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  const lines = text.split(/\r\n|\r|\n/).length;
  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={
            className +
            "transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar"
          }
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0
          }}
        >
          {tokens.map((line, i) => {
            const { key, ...rest } = getLineProps({ line, key: i });

            return (
              <div key={`line-${i}`} style={{ position: "relative" }} {...rest}>
                {line.map((token, index) => {
                  const { key, ...props } = getTokenProps({ token, i });
                  return <span key={index} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;
