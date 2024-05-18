import { getSession, logout } from "@/actions/authentication";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
      <div>
        Dashboard
      </div>
  );
}
