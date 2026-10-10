// Seeds sample properties into the database.
// Usage: npm run seed
// Owner defaults to the first user; set SEED_OWNER_EMAIL to pick a specific one.
// Safe to re-run: properties are upserted by title, so no duplicates are created.
import mongoose from "mongoose";
import { Property } from "../models/Property.ts";
import { User } from "../models/User.ts";

const img = (id) => `https://images.unsplash.com/photo-${id}?w=1200&q=80`;

const properties = [
  {
    title: "Modern Family Home with Lake View",
    description:
      "Bright four-bedroom home with an open-plan kitchen, floor-to-ceiling windows and a private deck overlooking Lake Washington. Quiet street, close to parks and top-rated schools.",
    price: 1250000,
    address: "4521 Lake Washington Blvd S",
    city: "Seattle",
    state: "WA",
    zip: "98118",
    country: "USA",
    lat: "47.5612",
    lng: "-122.2618",
    propertyType: "house",
    totalHouseArea: 3200,
    lotArea: 7500,
    livingArea: 2900,
    livingAreaRenovated: 2900,
    bedrooms: 4,
    bathrooms: 3,
    floors: 2,
    builtYear: 2016,
    houseGrade: 9,
    furnished: "Semi Furnished",
    amenities: ["Garden", "Gym"],
    parking: "Yes",
    features: "Lake view, deck, smart thermostat, two-car garage",
    images: [img("1600596542815-ffad4c1539a9"), img("1600607687939-ce8a6c25118c"), img("1600566753190-17f0baa2a6c3")],
    status: "active",
  },
  {
    title: "Classic Craftsman in Ballard",
    description:
      "Charming 1920s craftsman with original woodwork, a renovated kitchen and a fenced backyard. Walk to Ballard Ave shops, cafes and the Sunday market.",
    price: 895000,
    address: "2810 NW 63rd St",
    city: "Seattle",
    state: "WA",
    zip: "98107",
    country: "USA",
    lat: "47.6721",
    lng: "-122.3920",
    propertyType: "house",
    totalHouseArea: 2100,
    lotArea: 4800,
    livingArea: 1950,
    livingAreaRenovated: 1950,
    bedrooms: 3,
    bathrooms: 2,
    floors: 2,
    builtYear: 1924,
    houseGrade: 7,
    furnished: "Unfurnished",
    amenities: ["Garden"],
    parking: "Yes",
    features: "Original hardwood floors, renovated kitchen, fenced yard",
    images: [img("1568605114967-8130f3a36994"), img("1570129477492-45c003edd2be")],
    status: "active",
  },
  {
    title: "Downtown Luxury Apartment",
    description:
      "High-floor two-bedroom apartment with skyline and Elliott Bay views, concierge service and a rooftop pool. Steps from Pike Place Market.",
    price: 780000,
    address: "1521 2nd Ave, Unit 2304",
    city: "Seattle",
    state: "WA",
    zip: "98101",
    country: "USA",
    lat: "47.6097",
    lng: "-122.3404",
    propertyType: "Apartment",
    totalHouseArea: 1250,
    livingArea: 1250,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    builtYear: 2019,
    houseGrade: 9,
    furnished: "Fully Furnished",
    amenities: ["Gym", "Swimming Pool"],
    parking: "Yes",
    features: "Concierge, rooftop pool, floor-to-ceiling windows, in-unit laundry",
    images: [img("1545324418-cc1a3fa10c00"), img("1522708323590-d24dbb6b0267"), img("1502672260266-1c1ef2d93688")],
    status: "active",
  },
  {
    title: "Cozy Studio near University of Washington",
    description:
      "Efficient, fully furnished studio a short walk from the UW campus and the light rail. Ideal for students or a first investment property.",
    price: 315000,
    address: "4730 University Way NE, Unit 410",
    city: "Seattle",
    state: "WA",
    zip: "98105",
    country: "USA",
    lat: "47.6634",
    lng: "-122.3130",
    propertyType: "Apartment",
    totalHouseArea: 480,
    livingArea: 480,
    bedrooms: 1,
    bathrooms: 1,
    floors: 1,
    builtYear: 2008,
    houseGrade: 6,
    furnished: "Fully Furnished",
    amenities: ["Gym"],
    parking: "No",
    features: "Near light rail, shared laundry, bike storage",
    images: [img("1560448204-e02f11c3d0e2"), img("1502672260266-1c1ef2d93688")],
    status: "active",
  },
  {
    title: "Spacious Bellevue Estate with Pool",
    description:
      "Five-bedroom estate on a large private lot with a heated pool, home theater and a chef's kitchen. Minutes from downtown Bellevue.",
    price: 2450000,
    address: "1820 104th Ave SE",
    city: "Bellevue",
    state: "WA",
    zip: "98004",
    country: "USA",
    lat: "47.5960",
    lng: "-122.2010",
    propertyType: "house",
    totalHouseArea: 4800,
    lotArea: 15000,
    livingArea: 4500,
    livingAreaRenovated: 4500,
    bedrooms: 5,
    bathrooms: 4,
    floors: 2,
    builtYear: 2012,
    houseGrade: 10,
    furnished: "Semi Furnished",
    amenities: ["Swimming Pool", "Gym", "Garden", "Play Area"],
    parking: "Yes",
    features: "Heated pool, home theater, three-car garage, wine cellar",
    images: [img("1512917774080-9991f1c4c750"), img("1600585154340-be6161a56a0c"), img("1600210492486-724fe5c67fb0")],
    status: "active",
  },
  {
    title: "Kirkland Townhouse near the Waterfront",
    description:
      "Three-level townhouse with a rooftop terrace, two blocks from Kirkland's waterfront parks and restaurants.",
    price: 1050000,
    address: "325 Kirkland Ave",
    city: "Kirkland",
    state: "WA",
    zip: "98033",
    country: "USA",
    lat: "47.6762",
    lng: "-122.2050",
    propertyType: "house",
    totalHouseArea: 2300,
    lotArea: 2000,
    livingArea: 2150,
    bedrooms: 3,
    bathrooms: 3,
    floors: 3,
    builtYear: 2018,
    houseGrade: 8,
    furnished: "Unfurnished",
    amenities: ["Play Area"],
    parking: "Yes",
    features: "Rooftop terrace, EV charger, attached garage",
    images: [img("1580587771525-78b9dba3b914"), img("1600566753190-17f0baa2a6c3")],
    status: "reserved",
  },
  {
    title: "Renovated Bungalow in Redmond",
    description:
      "Single-story bungalow, fully renovated in 2022, with a large backyard and garden beds. Close to Microsoft campus and Marymoor Park.",
    price: 920000,
    address: "8410 160th Ave NE",
    city: "Redmond",
    state: "WA",
    zip: "98052",
    country: "USA",
    lat: "47.6780",
    lng: "-122.1260",
    propertyType: "house",
    totalHouseArea: 1800,
    lotArea: 8200,
    livingArea: 1700,
    livingAreaRenovated: 1700,
    bedrooms: 3,
    bathrooms: 2,
    floors: 1,
    builtYear: 1978,
    houseGrade: 7,
    furnished: "Unfurnished",
    amenities: ["Garden"],
    parking: "Yes",
    features: "Renovated 2022, solar panels, large backyard",
    images: [img("1564013799919-ab600027ffc6"), img("1449844908441-8829872d2607")],
    status: "sold",
  },
  {
    title: "Residential Land Plot in Issaquah",
    description:
      "Half-acre buildable lot with mountain views, utilities available at the street. Zoned for single-family residential.",
    price: 385000,
    address: "Lot 14, SE Issaquah-Fall City Rd",
    city: "Issaquah",
    state: "WA",
    zip: "98029",
    country: "USA",
    lat: "47.5560",
    lng: "-121.9980",
    propertyType: "land",
    landSize: 21780,
    lotArea: 21780,
    features: "Mountain views, utilities at street, single-family zoning",
    images: [img("1500382017468-9049fed747ef")],
    status: "active",
  },
  {
    title: "Office Space in South Lake Union",
    description:
      "Modern commercial office floor with an open layout, meeting rooms and a shared rooftop. Surrounded by tech campuses and transit.",
    price: 3200000,
    address: "500 Westlake Ave N, Floor 4",
    city: "Seattle",
    state: "WA",
    zip: "98109",
    country: "USA",
    lat: "47.6235",
    lng: "-122.3389",
    propertyType: "commercial",
    totalHouseArea: 9500,
    livingArea: 9500,
    bathrooms: 4,
    floors: 1,
    builtYear: 2015,
    houseGrade: 9,
    furnished: "Fully Furnished",
    amenities: ["Gym"],
    parking: "Yes",
    features: "Open layout, 6 meeting rooms, shared rooftop, transit access",
    images: [img("1497366216548-37526070297c"), img("1486406146926-c627a92ad1ab")],
    status: "active",
  },
  {
    title: "Tacoma Starter Home",
    description:
      "Well-kept two-bedroom home with a detached garage and a sunny yard. A great first home within reach of downtown Tacoma.",
    price: 449000,
    address: "3715 N 27th St",
    city: "Tacoma",
    state: "WA",
    zip: "98407",
    country: "USA",
    lat: "47.2706",
    lng: "-122.4890",
    propertyType: "house",
    totalHouseArea: 1300,
    lotArea: 5000,
    livingArea: 1200,
    bedrooms: 2,
    bathrooms: 1,
    floors: 1,
    builtYear: 1955,
    houseGrade: 6,
    furnished: "Unfurnished",
    amenities: ["Garden"],
    parking: "Yes",
    features: "Detached garage, new roof 2021, sunny yard",
    images: [img("1570129477492-45c003edd2be"), img("1568605114967-8130f3a36994")],
    status: "active",
  },
];

async function main() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is not set");
  await mongoose.connect(process.env.MONGO_URI);

  const ownerEmail = process.env.SEED_OWNER_EMAIL;
  const owner = ownerEmail
    ? await User.findOne({ email: ownerEmail })
    : await User.findOne().sort({ _id: 1 });
  if (!owner) {
    throw new Error(
      ownerEmail
        ? `No user found with email ${ownerEmail}`
        : "No users found. Register an account first, then re-run the seed."
    );
  }
  const ownerFields = {
    ownerId: owner._id,
    name: [owner.firstName, owner.lastName].filter(Boolean).join(" "),
    email: owner.email,
    phone: "+1 206 555 0100",
  };

  const ids = [];
  for (const data of properties) {
    const doc = { ...data, ...ownerFields };
    // Validate against the schema before writing
    await new Property(doc).validate();
    const saved = await Property.findOneAndUpdate({ title: doc.title }, doc, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });
    ids.push(saved._id);
    console.log(`  ✓ ${doc.title} (${doc.status})`);
  }

  await User.updateOne(
    { _id: owner._id },
    { $addToSet: { properties: { $each: ids } } }
  );

  console.log(`\nSeeded ${ids.length} properties, owned by ${owner.email}.`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
