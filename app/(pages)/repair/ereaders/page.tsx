import React from "react";
import { GadgetData, GadgetDataItem } from "@/app/(utils)/types";

const { NEXT_APP_BASE_URL } = process.env;


async function getData() {
  const response = await fetch(`${NEXT_APP_BASE_URL}/api/service`)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc
  if (response.status !== 200) {
  //   // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return response.json();
}
export default async function Ereaders() {
  const data = await getData();
  return (
    <>
      <main>
        <h1>Послуги</h1>
        <ul>
          {data.length>0&&
            data
                .find((item:GadgetData) => item.category === "phone")
                .services.map((item:GadgetDataItem) => {
                  return (
                    <li className='' key={item.id}>
                      {item.name}
                    </li>
                  );
                })
            }
        </ul>
      </main>
    </>
  );
}
