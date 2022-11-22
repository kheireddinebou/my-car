export const carBrands = [
  "Land-rover",
  "Audi",
  "Bentley",
  "BMW",
  "Dodge",
  "Lamborghini",
  "Chevrolet",
  "Porsche",
  "Jaguar",
  "Mercedes-Benz",
  "Chrysler",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Donkervoort",
  "Bugatti",
  "Cadillac",
  "DS",
  "Abarth",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Honda",
  "Hummer",
  "Hyundai",
  "Infiniti",
  "Iveco",
  "Jeep",
  "Kia",
  "KTM",
  "Lada",
  "Lancia",
  "Landwind",
  "Lexus",
  "Lotus",
  "Maserati",
  "Maybach",
  "Mazda",
  "McLaren",
  "MG",
  "Mini",
  "Mitsubishi",
  "Morgan",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Rolls-Royce",
  "Rover",
  "Saab",
  "Seat",
  "Skoda",
  "Smart",
  "SsangYong",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const bodyTips = [
  {
    name: "coupe",
    img: "https://sayartii.com/static/img/car_types/coupe.svg",
  },
  {
    name: "sedan",
    img: "https://sayartii.com/static/img/car_types/sedan.svg",
  },
  {
    name: "suv",
    img: "https://sayartii.com/static/img/car_types/suv.svg",
  },
  {
    name: "hatch",
    img: "https://sayartii.com/static/img/car_types/hatch.svg",
  },
  {
    name: "wagon",
    img: "https://sayartii.com/static/img/car_types/wagon.svg",
  },
  {
    name: "pickup",
    img: "https://sayartii.com/static/img/car_types/pickup.svg",
  },
  {
    name: "minivan",
    img: "https://sayartii.com/static/img/car_types/minivan.svg",
  },
  {
    name: "commercial",
    img: "https://sayartii.com/static/img/car_types/commercial.svg",
  },
  {
    name: "other",
    img: "https://sayartii.com/static/img/car_types/other.svg",
  },
];

export const doorsNum = [2, 3, 4, 5];

export const cylinders = ["2", "3", "4", "5", "6", "8", "10", "12", "16"];

export const transmissionTypes = ["automatic", "manual"];

export const fuleTypes = ["diesel", "petrol", "electric", "hybrid", "other"];

export const colors = [
  "black",
  "blue",
  "brown",
  "gold",
  "grey",
  "orange",
  "green",
  "purple",
  "red",
  "silver",
  "white",
  "yellow",
  "other",
  "beige",
];

export const tagsType = [
  "US Spec",
  "Japanese Spec",
  "Full Option",
  "Warrantly",
  "GCC Spec",
  "Turbo",
  "Supercharger",
  "Brand New",
  "Convertible",
];

export const carDetails = [
  "Year",
  "Make",
  "Model",
  "Mileage",
  "Cylinders",
  "Transmission",
  "Type",
  "Doors",
  "Color",
  "Fuel",
];

export const sellInputs = [
  {
    label: "model",
    name: "model",
    type: "text",
    placeholder: "add Model",
  },
  {
    label: "year",
    name: "year",
    min: 1885,
    max: new Date().getFullYear() + 1,
    type: "number",
    placeholder: "Year",
  },
  {
    label: "location",
    name: "location",
    type: "text",
    placeholder: "Location",
  },
  {
    label: "price",
    name: "price",
    min: 0,
    type: "number",
    placeholder: "Price - (USD)",
  },
  {
    label: "mileage",
    name: "mileage",
    min: 0,
    type: "number",
    placeholder: "mileage",
  },
  {
    label: "phone",
    name: "phone",
    type: "text",
    placeholder: "Phone",
  },
  {
    label: "email",
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    label: "title",
    name: "title",
    type: "text",
    placeholder: "Title",
  },
];
