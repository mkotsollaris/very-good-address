import { NextRequest, NextResponse } from "next/server";
import countries from "../lib/countries.json";
import fetch from "unfetch";

// request to geocoding api
const getLatLong = async (address: string) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBugmuemdXwaoIsifa2YypfEK7H0g9QpSE`;
  //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
  const fetcherRes = await fetch(url).then((r) => r.json());
  return fetcherRes?.results[0]?.geometry?.location;
};

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req;
  const country = geo.country || "US";
  const city = geo.city || "San Francisco";
  const region = geo.region || "CA";
  const address = `${city},${region},${country}`;
  const location = await getLatLong(address);
  const countryInfo = countries.find((x) => x.cca2 === country);

  const currencyCode = Object.keys(countryInfo.currencies)[0];
  const currency = countryInfo.currencies[currencyCode];
  const languages = Object.values(countryInfo.languages).join(", ");
  console.log(location);
  url.searchParams.set("country", country);
  url.searchParams.set("city", city);
  url.searchParams.set("region", region);
  url.searchParams.set("currencyCode", currencyCode);
  url.searchParams.set("currencySymbol", currency.symbol);
  url.searchParams.set("name", currency.name);
  url.searchParams.set("languages", languages);
  url.searchParams.set("location", JSON.stringify(location));

  return NextResponse.rewrite(url);
}
