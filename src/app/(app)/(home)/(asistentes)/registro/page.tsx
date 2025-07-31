// import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
// import { caller } from "@/trpc/server";
// import { redirect } from "next/navigation";

import { AsistentesView } from "@/modules/asistentes/ui/views/asistentes-view";

// export const dynamic = "force-dynamic";

const Page = async () => {
  return <AsistentesView />;
};

export default Page;
