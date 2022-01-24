let db = {
  testimonials: [
    { id: 1, author_id: 6, text: 'This company is worth every coin!' },
    {
      id: 2,
      author_id: 1,
      text: 'They really know how to make you happy.',
    },
  ],
  concerts: [
    {
      performer: 'John Doe',
      genre: 'Rock',
      price: 25,
      day: 1,
      image: '/img/uploads/1fsd324fsdg.jpg',
    },
    {
      performer: 'Rebekah Parker',
      genre: 'R&B',
      price: 25,
      day: 1,
      image: '/img/uploads/2f342s4fsdg.jpg',
    },
    {
      performer: 'Maybell Haley',
      genre: 'Pop',
      price: 40,
      day: 1,
      image: '/img/uploads/hdfh42sd213.jpg',
    },
  ],
  seats: [
    {
      day: 1,
      seat: 3,
      client_id: 1,
    },
    {
      day: 1,
      seat: 9,
      client_id: 5,
    },
    {
      day: 1,
      seat: 10,
      client_id: 3,
    },
    {
      day: 1,
      seat: 26,
      client_id: 4,
    },
    {
      day: 2,
      seat: 1,
      client: 3,
    },
    {
      day: 2,
      seat: 2,
      client_id: 2,
    },
  ],
  clients: [
    { name: 'Amanda Doe', email: 'amandadoe@example.com' },
    { name: 'Molier Lo Celso', email: 'moiler.lo.celso@example.com' },
    { name: 'Felix McManara', email: 'felxim98@example.com' },
    { name: 'Fauna Keithrins', email: 'mefauna312@example.com' },
    { name: 'Curtis Johnson', email: 'curtisj@example.com' },
    { name: 'John Doe', email: 'johndoe@example.com' },
  ],
};

const json = JSON.stringify(db);

module.exports = db;
