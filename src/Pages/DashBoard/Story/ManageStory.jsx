import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import StoryCard from "./StoryCard";
import { useEffect } from "react";

const ManageStory = () => {
  
  
  const { user , loading} = useAuth();
  const axiosSecure = UseAxiosSecureApi();

  const {
    data: stories = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["stories", user?.email],
      enabled: !!user?.email && !loading,
    queryFn: () =>
      axiosSecure
        .get(`/stories/user/${user?.email}`)
        .then((res) => res.data.data),
  });






useEffect(() => {
  if (!loading && user?.email) {
    console.log("Running refetch for user:", user.email);
    refetch();
  }
}, [user?.email, loading, refetch]);



  if (isLoading || loading)
    {
    return <LoadingSpinner />;
    }
      

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Stories</h1>

      {stories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl">You haven't created any stories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <StoryCard key={story._id} story={story} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageStory;
