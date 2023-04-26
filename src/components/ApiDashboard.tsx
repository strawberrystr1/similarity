import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { formatDistance } from "date-fns";
import LargeHeading from "@/ui/LargeHeading";
import { Paragraph } from "@/ui/Paragraph";
import { Input } from "@/ui/Input";

const ApiDashboard = async () => {
  const user = await getServerSession(authOptions);
  if (!user) notFound();

  const apiKeys = await db.apiKey.findMany({
    where: {
      userId: user.user.id
    }
  });

  const activeApiKey = apiKeys.find(apiKey => apiKey.enabled);
  if (!activeApiKey) notFound();

  const userRequest = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map(e => e.id)
      }
    }
  });

  const serializableRequest = userRequest.map(req => ({
    ...req,
    timestamp: formatDistance(new Date(req.timestamp), new Date())
  }));

  return (
    <div className="container flex flex-col gap-6">
      <LargeHeading>Welcome back, {user.user.name}</LargeHeading>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <Paragraph>Yout API key:</Paragraph>
        <Input className="w-fit truncate" readOnly={true} value={activeApiKey.key} />
      </div>
    </div>
  );
};

export default ApiDashboard;