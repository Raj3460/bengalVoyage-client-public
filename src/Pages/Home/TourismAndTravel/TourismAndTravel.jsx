import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useQuery } from "@tanstack/react-query";
import PackageCard from "./PackageCard";
// import GuideCard from "./GuideCard";
import UseAxiosSecureApi from "../../../Hooks/Api/UseAxiosSecureApi";

/**
 * TravelGuideTabs
 * 
 * Two‑tab section: "Our Packages" & "Meet Our Tour Guides".
 * Fetches random data via secure Axios instance + TanStackQuery.
 * Automatically re‑fetches the tab’s data when the tab is clicked.
 */
const TravelGuideTabs = () => {
  // custom hook that returns the pre‑configured axios instance
  const axiosSecure = UseAxiosSecureApi();

  /** Packages — random 3 each request */
  const {
    data: packages = [],
    isLoading: packagesLoading,
    refetch: refetchPackages,
    error: packagesError,
  } = useQuery({
    queryKey: ["randomPackages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages/random?count=3");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5min
  });
  console.log(packages);

  /** Guides — random 6 each request */
  // const {
  //   data: guides = [],
  //   isLoading: guidesLoading,
  //   refetch: refetchGuides,
  //   error: guidesError,
  // } = useQuery({
  //   queryKey: ["randomGuides"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/tour-guides/random?count=6");
  //     return res.data;
  //   },
  //   staleTime: 1000 * 60 * 5,
  // });

  // // Loading & error states
  // if (packagesLoading || guidesLoading) {
  //   return <div className="text-center py-10 font-medium">Loading...</div>;
  // }
  // if (packagesError || guidesError) {
  //   return (
  //     <div className="text-center text-red-600 py-10">
  //       Something went wrong. Please try again later.
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">
        Tourism &amp; Travel Guide
      </h2>

      <Tabs>
        <TabList className="text-xl">
          {/* clicking the tab also triggers a fresh random fetch */}
          <Tab onClick={refetchPackages}>Our Packages</Tab>
          <Tab 
          // onClick={refetchGuides}
          >Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 ">
            {packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </div>
        </TabPanel>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-4">
            {/* {guides.map((guide) => (
              <GuideCard key={guide._id} guide={guide} />
            ))} */}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TravelGuideTabs;