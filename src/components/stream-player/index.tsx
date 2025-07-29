"use client";

import { cn } from "@/lib/utils";

// import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { Chat, ChatSkeleton } from "./chat";
import { ChatToggle } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";
import { AboutCard } from "./about-card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "@/payload-types";
import { useTRPC } from "@/trpc/client";
import { useChatSidebar } from "./store/use-chat-sidebar";
import { useViewerToken } from "./hooks/use-viewer-token";

interface StreamPlayerProps {
  user: User;
  productId: string;
  // isFollowing: boolean;
}

export const StreamPlayer = ({ user, productId }: StreamPlayerProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({
      id: productId,
    }),
  );

  console.log("StreamPlayer data --------------------> ", data);

  const { token, name, identity } = useViewerToken(user.id);
  const { collapsed } = useChatSidebar((state) => state);
  // console.log("Stream ----->>>> ", stream);

  if (
    !token ||
    !name ||
    !identity
    // || !data.id
  ) {
    return <StreamPlayerSkeleton />;
  }
  return (
    <>
      {collapsed && (
        <div className="hidden lg:block fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2",
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
          <Video hostName={user.username ?? "Unknown"} hostIdentity={user.id} />
          <Header
            hostName={user.username ?? "Unknown"}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={typeof user.image === "object" ? user.image : null}
            // isFollowing={isFollowing}
            name={user.name ?? "Unknown"}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={data.name}
            thumbnailUrl={typeof data.image === "string" ? data.image : null}
          />
          <AboutCard
            hostName={user.username ?? "Unknown"}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.name ?? "Unknown"}
            // followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.username ?? "Unknown"}
            hostIdentity={user.id}
            // isFollowing={isFollowing}
            isChatEnabled={true}
            isChatDelayed={false}
            isChatFollowersOnly={false}
          />
        </div>
      </LiveKitRoom>
    </>
  );
};

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10 ">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
};
