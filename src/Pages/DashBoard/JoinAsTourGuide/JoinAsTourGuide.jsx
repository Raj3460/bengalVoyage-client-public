import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaPaperclip, FaCheckCircle } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Component/Sheard/LoadingSpinner";

const JoinAsTourGuide = () => {
  const [applicationTitle, setApplicationTitle] = useState("");
  const [motivation, setMotivation] = useState("");
  const [cvLink, setCvLink] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const axiosSecure = UseAxiosSecureApi();
  const { user } = useAuth();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (applicationData) => {
      const res = await axiosSecure.post(
        "/tour-guides-applications",
        applicationData
      );
      return res.data;
    },
    onSuccess: () => {
      setShowSuccessModal(true);
      resetForm();
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const applicationData = {
      applicantEmail: user.email,
      applicantName: user.displayName || user.email,
      applicationTitle,
      motivation,
      cvLink,
      status: "pending",
      appliedAt: new Date().toISOString(),
    };
    mutate(applicationData);
  };

  const resetForm = () => {
    setApplicationTitle("");
    setMotivation("");
    setCvLink("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-primary/10 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center bg-primary text-white p-4 rounded-full mb-4"
          >
            <FaUserTie className="text-3xl" />
          </motion.div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-600">
            Become a certified tour guide and share your passion
          </p>
        </div>

        {/* Error Message */}
        {isError && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            Error: {error.message || "Failed to submit application"}
          </div>
        )}

        {/* Application Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Application Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-800 mb-2"
              >
                Application Title
              </label>
              <input
                type="text"
                id="title"
                value={applicationTitle}
                onChange={(e) => setApplicationTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-700"
                placeholder="E.g. Experienced Nature Guide Application"
                required
              />
            </div>

            {/* Motivation */}
            <div>
              <label
                htmlFor="motivation"
                className="block text-lg font-medium text-gray-800 mb-2"
              >
                Why do you want to be a Tour Guide?
              </label>
              <textarea
                id="motivation"
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-700"
                placeholder="Tell us about your passion for guiding, relevant experience, and what makes you a great candidate..."
                required
              />
            </div>

            {/* CV Link */}
            <div>
              <label
                htmlFor="cvLink"
                className="block text-lg font-medium text-gray-800 mb-2"
              >
                Your CV/Resume Link
              </label>
              <div className="flex items-center">
                <span className="inline-flex items-center px-3 py-2 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <FaPaperclip className="mr-2" />
                  Link
                </span>
                <input
                  type="url"
                  id="cvLink"
                  value={cvLink}
                  onChange={(e) => setCvLink(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary text-gray-700"
                  placeholder="https://drive.google.com/your-cv"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload your CV to Google Drive, Dropbox, or similar and paste
                the shareable link here
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-accent hover:bg-accent/90 shadow-md hover:shadow-lg"
                }`}
              >
                {isPending ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="inline-flex items-center justify-center bg-green-100 text-green-500 p-4 rounded-full mb-4">
              <FaCheckCircle className="text-5xl" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Application Submitted!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in becoming a tour guide. Our team
              will review your application and contact you soon.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default JoinAsTourGuide;
