"use client";

import { ButtonHTMLAttributes, FC } from "react";
import { Button } from "@/ui/Button";
import { toast } from "@/ui/toast";
import { Copy } from "lucide-react";

interface ICopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<ICopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);
        toast({
          message: "API copied to clipboard",
          title: "Copied!",
          type: "success"
        });
      }}
      variant="ghost"
      className={className}
    >
      <Copy className="h-5 w-5" />
    </Button>
  );
};

export default CopyButton;
