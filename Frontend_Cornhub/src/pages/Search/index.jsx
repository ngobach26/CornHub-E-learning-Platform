import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import CenterAligned from "../../components/CenterAligned";
import Layout from "../../components/Layout";

export default function Search() {
  const [results, setResults] = useState(null);
  const [searchParams] = useSearchParams();
  const renderContent = () => {
    return (
      //   <CenterAligned>
      //     <img
      //       src="https://cdn.dribbble.com/users/7813810/screenshots/18154037/media/07fdbbd1e6c3e7440bc45a6b2477219d.gif"
      //       alt="404 Not Found"
      //       style={{ width: "250px", height: "250px" }}
      //     />
      //     <p className="mt-10 text-lg font-medium">No courses found</p>
      //   </CenterAligned>
      <>
        <p className="my-5 text-2xl font-bold">Result </p>
        <div className="flex gap-10">
          <div className="w-60">info</div>
        </div>
      </>
    );
  };

  return (
    <Layout>
      <div className="px-10 my-10 xl:px-0">
        <p className="mb-5 text-2xl font-semibold">title, category</p>
      </div>
      {renderContent()}
    </Layout>
  );
}
