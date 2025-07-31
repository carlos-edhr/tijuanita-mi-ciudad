import Navbar from "@/modules/asistentes/ui/components/navbar";
import { Footer } from "@/modules/landing/ui/components/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col ">
      <Navbar />
      {children}

      <Footer />
    </div>
  );
}
