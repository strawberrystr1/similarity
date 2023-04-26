"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import SimpleBar from "simplebar-react";
import Code from "@/components/Code";
import { nodejs, python } from "@/helpers/documentation-code";

const DocumentationTabs = ({}) => {
  return (
    <Tabs defaultValue="nodejs" className="max-w-2xl w-full">
      <TabsList>
        <TabsTrigger value="nodejs">NodeJs</TabsTrigger>
        <TabsTrigger value="python">Python</TabsTrigger>
      </TabsList>
      <TabsContent value="nodejs" className="overflow-y-auto">
        <Code language="javascript" code={nodejs} show={true} animated={true} />
      </TabsContent>
      <TabsContent value="python" className="overflow-y-auto">
        <Code language="python" code={python} show={true} animated={true} />
      </TabsContent>
    </Tabs>
  );
};

export default DocumentationTabs;
