export const users = [{
    id: 1,
    name: 'Daniels',
    surname:'Fomins',
    email: 'danielsfomins92@gmail.com',
    objects: '1, 3, 5',
    role: 'Vadītājs'
}, {
    id: 2,
    name: 'Pēteris',
    surname: 'Asd',
    email: 'peterisasd@gmail.com',
    objects: 'Nav',
    role: 'Darbinieks'
}, {
    id: 3,
    name: 'Daniils',
    surname: 'Sredņakovs',
    email: 'daniils@gmail.com',
    objects: '1',
    role: 'Brigadieris'
}];

export const notes = [{
    id: 1,
    title: 'Pirmā piezīme',
    content: 'asdasdasd',
    createdAt: new Date("2023-11-11")
}, {
    id: 2,
    title: 'Otrā piezīme',
    content: 'asdasdasd',
    createdAt: new Date("2023-11-05")
}];

export const notifications = [{
    id: 1,
    title: 'Pirmais paziņojums',
    content: 'asdasdasd',
    createdAt: new Date("2023-11-05"),
    createdBy: users[0].name + " " + users[0].surname
}, {
    id: 2,
    title: 'Otrais paziņojums',
    content: 'asdasdasd',
    createdAt: new Date("2023-11-02"),
    createdBy: users[0].name + " " + users[0].surname
}];