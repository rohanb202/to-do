import React from "react";
import { useRouter } from "next/router";

function Tag({ Icon, title, link, malState }) {
  const router = useRouter();
  const handleClick = () => {
    malState(false);
    router.push(link);
  };
  return (
    <div
      className="flex items-center justify-between space-x-10 cursor-pointer py-3 w-[10rem] flex-shrink-0"
      onClick={handleClick}
    >
      <div className="flex items-center justify-start flex-shrink-0 space-x-2">
        <Icon className="w-5" />
        <h1>{title}</h1>
      </div>
    </div>
  );
}

export default Tag;
