import React from 'react';
import { getAllServices } from '@/pages/api/service';

export async function getServerSideProps() {
  const allServices = getAllServices();
  return {
    props: { base: allServices },
  };
}
export default function Phone() {
  return (
    <>
      <main>
        <h1>Послуги</h1>

        {/* {base.length
          ? base
              .filter((item) => item.category === 'phone')[0]
              .services.map((item) => {
                return <li>{item.name}</li>;
              })
          : 'loading'} */}
      </main>
    </>
  );
}
