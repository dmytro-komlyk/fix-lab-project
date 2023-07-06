import React from "react";
import axios from "axios";

const { NEXT_APP_BASE_URL } = process.env;
async function getData() {
  const res = await axios.get(`${NEXT_APP_BASE_URL}/api/service`);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  // Recommendation: handle errors
  if (res.status !== 200) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.data;
}
export default async function Phone() {
  const data = await getData();
  return (
    <>
      <main>
        <h1>Послуги</h1>
        <ul>
          {data.length
            ? data
                .filter((item) => item.category === "phone")[0]
                .services.map((item) => {
                  return <li key={item.id}>{item.name}</li>;
                })
            : "loading"}
        </ul>
      </main>
    </>
  );
}
