import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PostCard from "./PostCard/PostCard";
import { Loader } from "react-feather";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
// import { fetchGraphQL } from "@apis/user";

interface Post {
  id: string;
  userImage: string;
  username: string;
  content: string;
  imageUrl?: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);


  useEffect(() => {
    fetchMorePosts();
  }, []);

  // const response = async ()=> {
  //   const res = await fetchGraphQL("550e8400-e29b-41d4-a716-446655440001");
  //   console.log("the new response",res);
  // }
  
  // response();
  const fetchMorePosts = () => {
    setTimeout(() => {
      const newPosts = generateMockPosts(page);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);

      if (page >= 5) {
        setHasMore(false);
      }
    }, 1500);
  };

  const generateMockPosts = (pageNum: number): Post[] => {
    return Array(10)
      .fill(null)
      .map((_, index) => ({
        id: `${pageNum}-${index}`,
        userImage: `https://i.pravatar.cc/150?img=${Math.floor(
          Math.random() * 70
        )}`,
        username: `User ${Math.floor(Math.random() * 1000)}`,
        content: [
          "Just shipped a new feature! ",
          "Beautiful sunset today ",
          "Working on something exciting...",
          "Great meeting with the team today!",
          "Check out this amazing design",
          "Learning new technologies is fun!",
          "Coffee time ",
          "Code review session was productive",
          "Weekend project coming along nicely",
          "Just deployed to production ",
        ][Math.floor(Math.random() * 10)],
        imageUrl:
          Math.random() > 0.5
            ? `https://picsum.photos/seed/${pageNum}-${index}/600/400`
            : undefined,
      }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Feed</h1>
          <Button
            onClick={() => navigate("/profile")}
            className="bg-blue-400 p-3 rounded text-white cursor-pointer"
          >
            Your Profile
          </Button>
        </div>

        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMorePosts}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center p-4 h-screen">
              <Loader className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          }
          endMessage={
            <div className="text-center text-gray-500 p-4">
              You've caught up with all posts!
            </div>
          }
        >
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                userImage={post.userImage}
                username={post.username}
                content={post.content}
                imageUrl={post.imageUrl}
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
