"use client";

import { FormEvent, useState } from "react";
import { toast } from "@/ui/toast";
import { createApiKey } from "@/helpers/create-api-key";
import { Key } from "lucide-react";
import LargeHeading from "@/ui/LargeHeading";
import { Paragraph } from "@/ui/Paragraph";
import CopyButton from "@/components/CopyButton";
import { Input } from "@/ui/Input";
import { Button } from "./ui/Button";

const RequestApiKey = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      const generatedApiKey = await createApiKey();
      setApiKey(generatedApiKey);
    } catch (e) {
      if (e instanceof Error) {
        toast({
          title: "Error",
          message: e.message,
          type: "error"
        });

        return;
      }

      toast({
        title: "Error",
        message: "Something went wrong",
        type: "error"
      });
      setIsCreating(false);
    }
  };

  return (
    <div className="container md:max-w-2xl">
      <div className="flex flex-col gap-6 items-center">
        <Key className="mx-auto h-12 w-12 text-gray-400" />
        <LargeHeading>Request your API key</LargeHeading>
        <Paragraph>You haven&apos;t requested an API key yet.</Paragraph>
      </div>
      <form
        onSubmit={createNewApiKey}
        className="mt-6 sm:flex sm:items-center"
        action="#"
      >
        <div className="relative rounded-md shadow-md sm:win-w-0 sm:flex-1">
          {apiKey ? (
            <CopyButton
              className="absolute inset-y-0 right-0 animate-in fade-in duration-300"
              type="button"
              valueToCopy={apiKey}
            />
          ) : null}
          <Input
            readOnly={true}
            value={apiKey ?? ""}
            placeholder="Request an API key to display here!"
          />
        </div>
        <div className="mt-3 flex justify-center sm:mt-0 sm:ml-4 sm:flex-shrink-0">
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;
