// import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
// import { caller } from "@/trpc/server";
// import { redirect } from "next/navigation";

import { VoluntariosView } from "@/modules/voluntarios/ui/views/voluntarios-view";

// export const dynamic = "force-dynamic";

const Page = async () => {
  return <VoluntariosView />;
};

export default Page;
