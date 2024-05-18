import { getSession } from "@/actions/authentication";
import Menubar from "@/components/shared/menubar";
import Navbar from "@/components/shared/navbar";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if(!session) redirect('/login');
  return (
    <>
      <div className="flex">
        <Menubar />
        <div className="w-full">
        <Navbar />
        {children}
        </div>
      </div>
    </>
  );
}
