export const users = [{
    id: 1,
    name: 'Daniels',
    surname:'Fomins',
    email: 'danielsfomins92@gmail.com',
    birthDate: new Date("2002-11-29"),
    objects: '1, 3, 5',
    role: 'Vadītājs'
}, {
    id: 2,
    name: 'Pēteris',
    surname: 'Asd',
    email: 'peterisasd@gmail.com',
    birthDate: new Date("2002-12-01"),
    objects: 'Nav',
    role: 'Darbinieks'
}, {
    id: 3,
    name: 'Daniils',
    surname: 'Sredņakovs',
    email: 'daniils@gmail.com',
    birthDate: new Date("2001-03-08"),
    objects: '1',
    role: 'Brigadieris'
}, {
    id: 4,
    name: 'Berthe',
    surname: 'Hyde-Chambers',
    email: 'bhydechambers2@cdc.gov',
    birthDate: new Date("1961-07-19"),
    objects: '2',
    role: 'Brigadieris'
}, {
    id: 5,
    name: 'Moshe',
    surname: 'Nowill',
    email: 'mnowill3@huffingtonpost.com',
    birthDate: new Date("1966-05-01"),
    objects: '1',
    role: 'Brigadieris'
}, {
    id: 6,
    name: 'Renee',
    surname: 'Isted',
    email: 'risted4@seesaa.net',
    birthDate: new Date("1950-09-27"),
    objects: '8',
    role: 'Brigadieris'
}, {
    id: 7,
    name: 'Janis',
    surname: 'Isaacs',
    email: 'jisaacs5@tmall.com',
    birthDate: new Date("1988-12-28"),
    objects: '2',
    role: 'Brigadieris'
}, {
    id: 8,
    name: 'Eadie',
    surname: 'MacAndrew',
    email: 'emacandrew6@creativecommons.org',
    birthDate: new Date("1951-10-10"),
    objects: '2',
    role: 'Brigadieris'
}, {
    id: 9,
    name: 'Dominica',
    surname: 'Loughnan',
    email: 'doloughnan7@blogs.com',
    birthDate: new Date("1961-03-30"),
    objects: '8',
    role: 'Darbinieks'
}, {
    id: 10,
    name: 'Eal',
    surname: 'Roggero',
    email: 'eroggero8@baidu.com',
    birthDate: new Date("1976-04-24"),
    objects: '2',
    role: 'Darbinieks'
}, {
    id: 11,
    name: 'Jeniffer',
    surname: 'Doog',
    email: 'jdoog9@hexun.com',
    birthDate: new Date("1956-08-27"),
    objects: '8',
    role: 'Darbinieks'
}]

export const notes = [{
    id: 1,
    title: 'Pirmā piezīme',
    content: 'asdasdasd',
    createdAt: new Date('2023-11-11')
}, {
    id: 2,
    title: 'Otrā piezīme',
    content: 'asdasdasd',
    createdAt: new Date('2023-11-05')
}];

export const notifications = [{
    id: 1,
    title: 'Pirmais paziņojums',
    content: 'asdasdasd',
    createdAt: new Date('2023-11-05'),
    createdBy: users[0].name + ' ' + users[0].surname
}, {
    id: 2,
    title: 'Otrais paziņojums',
    content: 'asdasdasd',
    createdAt: new Date('2023-11-02'),
    createdBy: users[0].name + ' ' + users[0].surname
}];