import Menubar from "@/components/shared/menubar";
import Navbar from "@/components/shared/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex">
        <Menubar />
        <Navbar />
      </div>
        {children}
    </>
  );
}
