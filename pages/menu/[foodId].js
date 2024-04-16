import DetailsPage from "@/components/templates/DetailsPage";
import { useRouter } from "next/router";
import React from "react";

function FoodDetail({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h2>Loading Page ...</h2>;
  }
  return <DetailsPage {...data} />;
}

export default FoodDetail;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const json = await res.json();
  const data = json.slice(0, 10);

  const paths = data.map((food) => ({
    params: { foodId: food.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { foodId },
  } = context;
  const res = await fetch(`${process.env.BASE_URL}/data/${foodId}`);
  const data = await res.json();

  if (!data.id) {
    return { notFound: true };
  }
  return {
    props: { data },
    revalidate:+process.env.REVALIDATE,
  };
}
