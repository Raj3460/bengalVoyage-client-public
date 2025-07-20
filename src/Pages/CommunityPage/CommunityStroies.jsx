import React, { useState, Fragment } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShareAlt,
  FaTimes,
  FaEye,
  FaRegEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import UseAxiosSecureApi from "../../Hooks/Api/UseAxiosSecureApi";

import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const CommunityStories = () => {
  const axiosSecure = UseAxiosSecureApi();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [selectedStory, setSelectedStory] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [activeShareMenu, setActiveShareMenu] = useState(null);
  const [currentModalImageIndex, setCurrentModalImageIndex] = useState(0);

  // Fetch all published stories
  const {
    data: stories = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["community-stories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stories");
      return res.data.data;
    },
    onError: (err) => {
      toast.error(
        "Failed to load stories: " + (err.message || "Please try again later")
      );
    },
  });

  // Like/unlike mutation
  const { mutate: likeStory } = useMutation({
    mutationFn: async (storyId) => {
      await axiosSecure.patch(`/stories/${storyId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["community-stories"]);
      toast.success("Like updated!");
    },
    onError: (err) => {
      console.error("Failed to like story:", err);
      toast.error("Failed to update like");
    },
  });

  // Add comment mutation
  const { mutate: addComment, isLoading: isCommenting } = useMutation({
    mutationFn: async ({ storyId, text }) => {
      await axiosSecure.post(`/stories/${storyId}/comments`, { text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["community-stories"]);
      setCommentText("");
      toast.success("Comment added!");
    },
    onError: (err) => {
      console.error("Failed to add comment:", err);
      toast.error("Failed to add comment");
    },
  });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() && selectedStory?._id) {
      addComment({ storyId: selectedStory._id, text: commentText });
    }
  };

  const toggleShareMenu = (storyId) => {
    setActiveShareMenu(activeShareMenu === storyId ? null : storyId);
  };

  const navigateModalImage = (direction) => {
    if (!selectedStory?.images?.length) return;
    const totalImages = selectedStory.images.length;
    setCurrentModalImageIndex(
      (prev) => (prev + direction + totalImages) % totalImages
    );
  };

  // Check if current user liked the story
  const checkIfLiked = (story) => {
    if (!user) return false;
    // Check both possible formats (email or _id)
    return story.likedBy?.some(
      (id) => id === user.email || id === user._id || id === user.id
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen-75">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-600">
        Error loading stories: {error.message || "An unknown error occurred."}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-center text-blue-700 mb-12 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Inspiring Community Stories
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.length === 0 ? (
          <div className="lg:col-span-3 text-center py-10 text-xl text-gray-600">
            No stories published yet. Be the first to share your experience!
          </div>
        ) : (
          stories.map((story) => {
            const displayImages = story.images?.slice(0, 3) || [];
            const remainingImagesCount = story.images?.length
              ? story.images.length - displayImages.length
              : 0;
            const hasMoreImages = remainingImagesCount > 0;
            const isLiked = checkIfLiked(story);

            return (
              <motion.div
                key={story._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
                variants={cardVariants}
                whileHover="hover"
                initial="hidden"
                animate="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {/* Story Image Section */}
                <div
                  className="w-full h-64 relative cursor-pointer"
                  onClick={() => {
                    setSelectedStory(story);
                    setCurrentModalImageIndex(0);
                  }}
                  aria-label={`View ${story.title} story`}
                >
                  {/* 1 IMAGE - Full width */}
                  {story.images?.length === 1 && (
                    <img
                      src={story.images[0]}
                      alt={`${story.title}`}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* 2 IMAGES - 50% each */}
                  {story.images?.length === 2 && (
                    <div className="flex h-full">
                      {story.images.map((img, idx) => (
                        <div key={idx} className="w-1/2 h-full">
                          <img
                            src={img}
                            alt={`${story.title} ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 3 IMAGES - 70% top, 30% bottom split */}
                  {story.images?.length === 3 && (
                    <div className="grid grid-rows-2 h-full gap-1">
                      {/* Top row - 70% */}
                      <div className="row-span-1">
                        <img
                          src={story.images[0]}
                          alt={`${story.title} 1`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Bottom row - two 50% images */}
                      <div className="row-span-1 flex gap-1">
                        <div className="w-1/2 h-full">
                          <img
                            src={story.images[1]}
                            alt={`${story.title} 2`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-1/2 h-full">
                          <img
                            src={story.images[2]}
                            alt={`${story.title} 3`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 4+ IMAGES - Show first 3 with +X overlay */}
                  {story.images?.length > 3 && (
                    <div className="grid grid-rows-2 h-full gap-1">
                      {/* Top row - 70% */}
                      <div className="row-span-1 relative">
                        <img
                          src={story.images[0]}
                          alt={`${story.title} 1`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Bottom row - two 50% images */}
                      <div className="row-span-1 flex gap-1">
                        <div className="w-1/2 h-full">
                          <img
                            src={story.images[1]}
                            alt={`${story.title} 2`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-1/2 h-full relative">
                          <img
                            src={story.images[2]}
                            alt={`${story.title} 3`}
                            className="w-full h-full object-cover"
                          />
                          {/* +X overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold text-xl">
                            +{story.images.length - 3}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No images fallback */}
                  {!story.images?.length && (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Story Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {story.title}
                  </h2>
                  <p className="text-gray-600 text-base mb-4 line-clamp-2 flex-grow">
                    {story.description}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center mb-4 border-t border-gray-100 pt-4">
                    <img
                      src={
                        story.author?.image ||
                        "https://via.placeholder.com/40/0A53A4/FFFFFF?text=AU"
                      }
                      alt={story.author?.name || "Author"}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-blue-300 shadow"
                      loading="lazy"
                    />
                    <div>
                      <span className="font-semibold text-gray-700 block">
                        {story.author?.name || "Anonymous"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {story.createdAt
                          ? new Date(story.createdAt).toLocaleDateString()
                          : "Unknown date"}
                      </span>
                    </div>
                  </div>

                  {/* Engagement Buttons */}
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <div className="flex space-x-5">
                      <button
                        onClick={() => likeStory(story._id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
                        aria-label={isLiked ? "Unlike story" : "Like story"}
                      >
                        {isLiked ? (
                          <FaHeart className="text-red-500 text-lg" />
                        ) : (
                          <FaRegHeart className="text-lg" />
                        )}
                        <span className="text-base">{story.likes || 0}</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedStory(story);
                          setCurrentModalImageIndex(0);
                        }}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors duration-200"
                        aria-label="View comments"
                      >
                        <FiMessageSquare className="text-lg" />
                        <span className="text-base">
                          {story.comments?.length || 0}
                        </span>
                      </button>

                      <span className="flex items-center space-x-1 text-gray-600">
                        <FaEye className="text-blue-500 text-lg" />
                        <span className="text-base">{story.views || 0}</span>
                      </span>
                    </div>

                    {/* Share Button with Dropdown */}
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleShareMenu(story._id);
                        }}
                        className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
                        aria-label="Share story"
                      >
                        <FaShareAlt className="text-lg" />
                      </button>

                      {activeShareMenu === story._id && (
                        <div
                          className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-xl p-3 z-20 border border-gray-100"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-700">
                              Share via
                            </span>
                            <button
                              onClick={() => setActiveShareMenu(null)}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label="Close share menu"
                            >
                              <FaTimes size={16} />
                            </button>
                          </div>
                          <div className="flex justify-around gap-2 mt-2">
                            <FacebookShareButton
                              url={`${window.location.origin}/stories/${story._id}`}
                              quote={story.title}
                              className="hover:scale-110 transition-transform"
                              aria-label="Share on Facebook"
                            >
                              <FacebookIcon size={36} round />
                            </FacebookShareButton>
                            <TwitterShareButton
                              url={`${window.location.origin}/stories/${story._id}`}
                              title={story.title}
                              className="hover:scale-110 transition-transform"
                              aria-label="Share on Twitter"
                            >
                              <TwitterIcon size={36} round />
                            </TwitterShareButton>
                            <WhatsappShareButton
                              url={`${window.location.origin}/stories/${story._id}`}
                              title={story.title}
                              className="hover:scale-110 transition-transform"
                              aria-label="Share on WhatsApp"
                            >
                              <WhatsappIcon size={36} round />
                            </WhatsappShareButton>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 bg-gray-100 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedStory.title}
                </h2>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6">
                {/* Author Info */}
                <div className="flex items-center mb-6">
                  <img
                    src={
                      selectedStory.author?.image ||
                      "https://via.placeholder.com/50/0A53A4/FFFFFF?text=AU"
                    }
                    alt={selectedStory.author?.name || "Author"}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-400 shadow"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                      {selectedStory.author?.name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Published:{" "}
                      {selectedStory.createdAt
                        ? new Date(selectedStory.createdAt).toLocaleDateString()
                        : "Unknown date"}
                    </p>
                  </div>
                </div>

                {/* Images Gallery */}
                {selectedStory.images?.length > 0 ? (
                  <div className="relative mb-6">
                    <img
                      src={selectedStory.images[currentModalImageIndex]}
                      alt={`${selectedStory.title} image ${
                        currentModalImageIndex + 1
                      }`}
                      className="w-full h-96 object-contain rounded-lg shadow-md bg-gray-100"
                      loading="lazy"
                    />
                    {selectedStory.images.length > 1 && (
                      <Fragment>
                        <button
                          onClick={() => navigateModalImage(-1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => navigateModalImage(1)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                          aria-label="Next image"
                        >
                          <FaChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                          {currentModalImageIndex + 1} /{" "}
                          {selectedStory.images.length}
                        </div>
                      </Fragment>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg mb-6">
                    No Images Available
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-700 text-lg mb-6 whitespace-pre-line leading-relaxed">
                  {selectedStory.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaHeart className="text-red-500 text-xl" />
                    <span className="text-lg">
                      {selectedStory.likes || 0} likes
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FiMessageSquare className="text-blue-500 text-xl" />
                    <span className="text-lg">
                      {selectedStory.comments?.length || 0} comments
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaRegEye className="text-purple-500 text-xl" />
                    <span className="text-lg">
                      {selectedStory.views || 0} views
                    </span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Comments
                  </h3>

                  {/* Comment Form */}
                  {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Add your comment..."
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                          aria-label="Comment input"
                        />
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={!commentText.trim() || isCommenting}
                        >
                          {isCommenting ? "Posting..." : "Post Comment"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-center text-gray-600 mb-6">
                      Please{" "}
                      <span className="font-bold text-blue-600">log in</span> to
                      leave a comment.
                    </p>
                  )}

                  {/* Comments List */}
                  <div className="space-y-6">
                    {selectedStory.comments?.length > 0 ? (
                      [...selectedStory.comments].reverse().map((comment) => (
                        <div
                          key={comment._id || comment.id}
                          className="flex space-x-4 items-start"
                        >
                          <img
                            src={
                              comment.author?.image ||
                              "https://via.placeholder.com/32/0A53A4/FFFFFF?text=C"
                            }
                            alt={comment.author?.name || "Commenter"}
                            className="w-10 h-10 rounded-full border border-gray-200 flex-shrink-0"
                            loading="lazy"
                          />
                          <div className="flex-1 bg-gray-100 rounded-xl p-4 shadow-sm">
                            <p className="font-bold text-gray-800 mb-1">
                              {comment.author?.name || "Anonymous"}
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                              {comment.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-2">
                              {comment.createdAt
                                ? new Date(comment.createdAt).toLocaleString()
                                : "Unknown date"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No comments yet. Be the first to comment!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityStories;
