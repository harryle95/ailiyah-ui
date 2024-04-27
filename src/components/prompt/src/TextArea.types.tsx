import React from "react";

interface TextAreaOwnProps {
  editing?: boolean;
  prompt: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export type { TextAreaOwnProps };
