import React from "react";
import { GadgetData, GadgetDataItem } from "@/app/(utils)/types";
import { headers } from "next/headers";

// Inside the page component

async function getData() {
  const headersData = headers();
const protocol = headersData.get("x-forwarded-proto");
const host = headersData.get("host");
const response = await fetch(`${protocol}://${host}/api/service`);

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
