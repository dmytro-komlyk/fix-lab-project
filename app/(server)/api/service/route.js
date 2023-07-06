import { NextResponse } from "next/server";

const base = [
  {
    id: "1",
    category: "phone",
    services: [
      {
        id: "101",
        name: "Діагностика",
        price: "Безкоштовно",
      },
      {
        id: "102",
        name: "Заміна скла",
        price: "від 200грн",
      },
      {
        id: "103",
        name: "Заміна екрану",
        price: "від 200грн",
      },
      {
        id: "104",
        name: "Заміна батареї",
        price: "від 200грн",
      },
      {
        id: "105",
        name: "Заміна роз'єму зарядки",
        price: "від 200грн",
      },
      {
        id: "106",
        name: "Ремонт після води",
        price: "від 200грн",
      },
      {
        id: "107",
        name: "Заміна динаміка",
        price: "від 200грн",
      },
      {
        id: "108",
        name: "Заміна мікрофона",
        price: "від 200грн",
      },
      {
        id: "108",
        name: "Заміна камери",
        price: "від 200грн",
      },
      {
        id: "109",
        name: "Прошивка / розблокування",
        price: "від 200грн",
      },
      {
        id: "110",
        name: "Ремонт кнопок",
        price: "від 200грн",
      },
      {
        id: "111",
        name: "Ремонт материнської плати",
        price: "від 200грн",
      },
      {
        id: "112",
        name: "Заміна / Ремонт корпусу",
        price: "від 200грн",
      },
    ],
  },
];
export function getAllServices() {
  return base;
}

// Notice the function definition:
export async function GET(req, res) {
  // ...
  return NextResponse.json(getAllServices());
}
