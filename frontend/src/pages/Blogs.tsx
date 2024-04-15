import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";

export const Blogs = () => {

  return <div>
    < Appbar />

    <div className="flex justify-center">
      <div className="max-w-xl">
        <BlogCard
          id={2}
          authorName={"Chandan Kushwaha"}
          title={"CHadna  galgotias unieraactiva"}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repudiandae dignissimos deserunt. Corrupti explicabo, dolore ipsa, mollitia fugit tempora esse, necessitatibus aperiam itaque laudantium dolorem at excepturi nihil incidunt molestias."}
          publishedDate={"2nd Feb 2024"}
        />
        <BlogCard
          id={2}
          authorName={"Chandan Kushwaha"}
          title={"CHadna  galgotias unieraactiva"}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repudiandae dignissimos deserunt. Corrupti explicabo, dolore ipsa, mollitia fugit tempora esse, necessitatibus aperiam itaque laudantium dolorem at excepturi nihil incidunt molestias."}
          publishedDate={"2nd Feb 2024"}
        />
        <BlogCard
          id={2}
          authorName={"Chandan Kushwaha"}
          title={"CHadna  galgotias unieraactiva"}
          content={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut repudiandae dignissimos deserunt. Corrupti explicabo, dolore ipsa, mollitia fugit tempora esse, necessitatibus aperiam itaque laudantium dolorem at excepturi nihil incidunt molestias."}
          publishedDate={"2nd Feb 2024"}
        />
      </div>
    </div>
  </div>
};