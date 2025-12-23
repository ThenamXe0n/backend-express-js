let pickupdetails = [
  {
    name: "driver",
    lat: 22,
    long: 75,
    id: 98,
  },

  {
    id: 1,
    name: "Central Mall Pickup",
    locationinword:"",
    lat: 28,
    long: 77,
  },
  {
    id: 2,
    name: "Airport Road Hub",
    lat: 19,
    long: 72,
  },
  {
    id: 3,
    name: "City Bus Stand",
    lat: 12,
    long: 77,
  },
  {
    id: 4,
    name: "Railway Station Point",
    lat: 22,
    long: 88,
  },
  {
    id: 5,
    name: "Tech Park Gate 3",
    lat: 17,
    long: 78,
  },
  {
    id: 6,
    name: "Old Town Square",
    lat: 26,
    long: 75,
  },
  {
    id: 7,
    name: "University Main Entrance",
    lat: 23,
    long: 72,
  },
];

let studentPickup = (req, res) => {
  let sortedStudentPickup = pickupdetails.sort((a, b) => a.long - b.long);
  res.status(200).json({ data: sortedStudentPickup });
};

export default studentPickup;
