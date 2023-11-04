import React from "react";
import CarouselComp from "../../components/CarouselComp";
import Layout from "../../components/Layout";
import Brand from "../../assets/image/Brand";
// import SectionList from "../../components/SectionList";

function Homepage() {
  const { applemusic, amd, mmm, github, nintendo, samsung } = Brand;
  const brands = [
    {
      icon: applemusic,
    },
    {
      icon: amd,
    },
    {
      icon: mmm,
    },
    {
      icon: github,
    },
    {
      icon: nintendo,
    },
    {
      icon: samsung,
    },
  ];

  return (
    <>
      <Layout>
        <CarouselComp />
        <div className="flex flex-col items-start mx-8 mb-8 space-y-3 mt-14">
          <h2 className="text-4xl font-bold">A broad selection of courses</h2>
          <h3 className="text-xl">
            Choose from 69,000 online video courses with new additions published
            every month
          </h3>
        </div>
        <div className="flex items-center justify-center w-full h-auto my-4 text-gray-900 bg-gray-100">
          <div className="flex flex-col items-center justify-center w-4/5 h-full my-8">
            <h2 className="text-[2rem] font-semibold">Trusted by the best</h2>
            <div className="my-2">
              Leading companies use the same courses to help employees keep
              their skills fresh.
            </div>
            <div className="flex flex-wrap justify-between w-full mt-4 ml-2">
              {brands?.map((item, index) => {
                return <div key={index}> {item.icon} </div>;
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Homepage;
