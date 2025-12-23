export const CNAME = 'NearWe'

export const TABS = [
  { name: "Home", icon: "M224 115.55V208a16 16 0 0 1-16 16H168a16 16 0 0 1-16-16V168a8 8 0 0 0-8-8H112a8 8 0 0 0-8 8v40a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16V115.55a16 16 0 0 1 5.17-11.78l80-75.48.11-.11a16 16 0 0 1 21.53 0 .11.11 0 0 1 0 0l80 75.48A16 16 0 0 1 224 115.55Z", path: "/" },
  { name: "Bookings", icon: "M208 32H184V24a8 8 0 0 0-16 0v8H88V24a8 8 0 0 0-16 0v8H48A16 16 0 0 0 32 48v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16ZM72 48v8a8 8 0 0 0 16 0V48h80v8a8 8 0 0 0 16 0V48h24v32H48V48Z", path: "/bookings" },
  {
    name: "Host Event",
    icon: null,
    path: "/create_event",
    customIcon: true
  },
  { name: "Messages", icon: "M140 128a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm-56-12a12 12 0 1 0 12 12 12 12 0 0 0-12-12Zm88 0a12 12 0 1 0 12 12 12 12 0 0 0-12-12Zm60 12A104 104 0 0 1 79.12 219.82L45.07 231.17a16 16 0 0 1-20.24-20.24l11.35-34.05A104 104 0 1 1 232 128Zm-16 0a88 88 0 1 0-164.19 44.06a8 8 0 0 1 .66 6.54L40 216l37.4-12.47a7.85 7.85 0 0 1 2.53-.42 8 8 0 0 1 4 1.08A88 88 0 0 0 216 128Z", path: "/messages" },
  { name: "Profile", icon: "M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0C63.78 166.78 40.31 185.66 25.08 212a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56A56.06 56.06 0 0 1 72 96Z", path: "/profile" }
];

export const APP_ROUTE_OPTIONS = [
  {
    label: "Home (Tabs)",
    value: "/(tabs)",
  },
  {
    label: "Requests Screen",
    value: "/requests",
  },
  {
    label: "Events Listing",
    value: "/(tabs)/events",
  },
  {
    label: "Profile",
    value: "/(tabs)/profile",
  },
  {
    label: "Specific Event (Example)",
    value: "/event/123", // later make dynamic
  },
];
