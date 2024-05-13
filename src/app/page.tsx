import { getSession, logout } from "@/actions/authentication";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if(!session) redirect('/login');

  return (
      <div>
        Dashboard
        <form action={logout}>
          <Button type="submit">Logout</Button>
        </form>
        {session.id}
      </div>
  );
}
