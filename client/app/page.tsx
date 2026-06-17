import { getSessionMe } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getSessionMe();
  if (!user) {
    redirect("/login");
  }
  return <main>{`Hello, ${user.data.email}`}</main>;
}
