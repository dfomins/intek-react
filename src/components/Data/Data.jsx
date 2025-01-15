import userImage from "../../images/profile/profile-picture.jpg";

export const users = [
  {
    id: 1,
    name: "Daniels",
    surname: "Fomins",
    email: "danielsfomins92@gmail.com",
    birthDate: new Date("2002-11-29"),
    objects: [1, 3, 5],
    role: "Vadītājs",
    image: userImage,
    works: [
      {
        hours: 8,
        date: new Date("2024-11-22"),
      },
      {
        hours: 6,
        date: new Date("2024-11-21"),
      },
    ],
  },
  {
    id: 2,
    name: "Pēteris",
    surname: "Asd",
    email: "peterisasd@gmail.com",
    birthDate: new Date("2002-12-01"),
    objects: [null],
    role: "Darbinieks",
    image: userImage,
  },
  {
    id: 3,
    name: "Daniils",
    surname: "Sredņakovs",
    email: "daniils@gmail.com",
    birthDate: new Date("2001-03-08"),
    objects: [1],
    role: "Brigadieris",
    image: userImage,
  },
  {
    id: 4,
    name: "Berthe",
    surname: "Hyde-Chambers",
    email: "bhydechambers2@cdc.gov",
    birthDate: new Date("1961-07-19"),
    objects: [1, 2],
    role: "Brigadieris",
    image: userImage,
  },
  {
    id: 5,
    name: "Moshe",
    surname: "Nowill",
    email: "mnowill3@huffingtonpost.com",
    birthDate: new Date("1966-05-01"),
    objects: [1],
    role: "Brigadieris",
    image: userImage,
  },
  {
    id: 6,
    name: "Renee",
    surname: "Isted",
    email: "risted4@seesaa.net",
    birthDate: new Date("1950-09-27"),
    objects: [2, 8],
    role: "Brigadieris",
    image: userImage,
  },
  {
    id: 7,
    name: "Janis",
    surname: "Isaacs",
    email: "jisaacs5@tmall.com",
    birthDate: new Date("1988-12-28"),
    objects: [3, 5],
    role: "Brigadieris",
    image: userImage,
  },
  {
    id: 8,
    name: "Eadie",
    surname: "MacAndrew",
    email: "emacandrew6@creativecommons.org",
    birthDate: new Date("1951-10-10"),
    objects: [2],
    role: "Brigadieris",
    image: userImage,
  },
  {
    id: 9,
    name: "Dominica",
    surname: "Loughnan",
    email: "doloughnan7@blogs.com",
    birthDate: new Date("1961-03-30"),
    objects: [7],
    role: "Darbinieks",
    image: userImage,
  },
  {
    id: 10,
    name: "Eal",
    surname: "Roggero",
    email: "eroggero8@baidu.com",
    birthDate: new Date("1976-04-24"),
    objects: [1, 2],
    role: "Darbinieks",
    image: userImage,
  },
  {
    id: 11,
    name: "Jeniffer",
    surname: "Doog",
    email: "jdoog9@hexun.com",
    birthDate: new Date("1956-08-27"),
    objects: [8],
    role: "Darbinieks",
    image: userImage,
  },
];

export const notes = [
  {
    id: 1,
    title: "Paraugs",
    content: "Paraugs",
    createdAt: new Date("2023-11-11"),
  },
  {
    id: 2,
    title: "Izlietotie stikla vates ruļļi",
    content: "54 - 5. gab. 36 - 3. gab. 105 - 10. gab.",
    createdAt: new Date("2023-11-05"),
  },
];

export const notifications = [
  {
    id: 1,
    title: "Svarīgs paziņojums par ierašanos darbā",
    content: "asdasdasd",
    createdAt: new Date("2023-11-05"),
    createdBy: users[0].name + " " + users[0].surname,
  },
  {
    id: 2,
    title: "Otrais paziņojums",
    content: "asdasdasd",
    createdAt: new Date("2023-11-02"),
    createdBy: users[0].name + " " + users[0].surname,
  },
];

import aizsilaIelasObjectImage from "../../images/buildings/aizsila_ielas_objekts.jpg";
import katoluIelasObjectImage from "../../images/buildings/katolu_ielas_objekts.jpg";
import maskavasIelasObjectImage from "../../images/buildings/maskavas_ielas_objekts.jpg";

export const buildings = [
  {
    id: 1,
    title: "Aizsila ielas objekts",
    street: "Aizsila iela 4",
    city: "Rīga",
    description: "Daudzdzīvokļu mājas būvniecība",
    image: aizsilaIelasObjectImage,
  },
  {
    id: 2,
    title: "Katoļu ielas objekts",
    street: "Katoļu iela 31",
    city: "Rīga",
    description: null,
    image: katoluIelasObjectImage,
  },
  {
    id: 3,
    title: "Maskavas ielas objekts",
    street: "Maskavas iela 200",
    city: "Rīga",
    description: null,
    image: maskavasIelasObjectImage,
  },
];
