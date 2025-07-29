// "use client";
// import { useTransition } from "react";

// import { useRouter } from "next/navigation";
// // import { onFollow, onUnfollow } from "@/actions/follow";
// import { toast } from "sonner";
// import { Skeleton } from "../ui/skeleton";
// // import { useCurrentUser } from "@/hooks/use-current-user";
// interface ActionsProps {
//   hostIdentity: string;
//   // isFollowing: boolean;
//   isHost: boolean;
// }

// export const Actions = ({
//   hostIdentity,
//   // isFollowing,
//   isHost,
// }: ActionsProps) => {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const user = useCurrentUser();
//   const userId = user?.id;

//   const handleFollow = () => {
//     startTransition(() => {
//       onFollow(hostIdentity)
//         .then((data) =>
//           toast.success(`Ahora sigues a ${data.following.username}.`),
//         )
//         .catch(() => toast.error("Algo salió mal."));
//     });
//   };

//   const handleUnfollow = () => {
//     startTransition(() => {
//       onUnfollow(hostIdentity)
//         .then((data) =>
//           toast.success(`Dejaste de seguir a ${data.following.username}.`),
//         )
//         .catch(() => toast.error("Algo salió mal."));
//     });
//   };

//   const toggleFollow = () => {
//     if (!userId) {
//       //redirect user
//       return router.push("/sign-in");
//     }

//     if (!isHost) return;

//     // if (isFollowing) {
//     //   handleUnfollow();
//     // } else {
//     //   handleFollow();
//     // }
//   };
//   return (
//     <></>
//     // <Button
//     //   disabled={isPending || isHost}
//     //   onClick={toggleFollow}
//     //   variant="primary"
//     //   size="sm"
//     //   className="w-full lg:w-auto"
//     // >
//     //   <Heart
//     //     className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
//     //   />
//     //   {isFollowing ? "Dejar de seguir" : "Seguir"}
//     // </Button>
//   );
// };

// export const ActionsSkeleton = () => {
//   return <Skeleton className="h-10 w-full lg:w-24" />;
// };
