import CategoriesPage from "@/components/templates/CategoriesPage";
import React from "react";

function index({ data }) {
  return <CategoriesPage data={data}/>;
}

export default index;

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();

  const filteredData = data.filter((item) => {
    const difficultyResult = item.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty
    );

    const timeResult = item.details.filter((detail) => {
      const cookingTime = detail["Cooking Time"] || "";
      const [timeDetail] = cookingTime.split(" ");
      // const timeDetail = cookingTime.split(" ")[0];
      if (time === "less" && timeDetail && +timeDetail <= 30) {
        return detail;
      } else if (time === "more" && timeDetail && +timeDetail > 30) {
        return detail;
      }
    });
    // console.log(item);
    if (time && difficulty && timeResult.length &&  difficultyResult.length) {
      return item;
    } else if (!time && difficulty && difficultyResult.length) {
      return item;
    } else if (time && !difficulty.length && timeResult) {
      return item;
    }
  });

  return {
    props: { data: filteredData },
  };
}
