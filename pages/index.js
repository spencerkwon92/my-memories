import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

export default function Home() {
  const { me } = useSelector((state) => state.user);
  const { mainPost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPost?.map((ele) => {
        return <PostCard key={ele.id} post={ele} />;
      })}
    </AppLayout>
  );
}
