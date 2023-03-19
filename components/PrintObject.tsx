import React, { FC } from "react";

export interface PrintObjectProps {
  content: object;
}

export const PrintObject: FC<PrintObjectProps> = ({ content }) => {
  const formattedContent: string = JSON.stringify(content, null, 2);

  return <pre>{formattedContent}</pre>;
};
