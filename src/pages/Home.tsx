import { useState } from "react";
import { CiBrightnessUp } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import CountryList from "../components/CountryList";

export interface ICountry {
  flags: {
    png: string;
  };
  name: {
    common: string;
    official: string;
  };
  subregion: string;
  tld: string[];
  currencies: Record<string, never>;
  languages: Record<string, never>;
  population: number;
  region: string;
  capital: string;
  borders: string[];
}

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleRegionFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setLoading(true);
    axios
      .get(`https://restcountries.com/v3.1/region/${value}`)
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="bg-[#202c37]">
      <header className="flex items-center justify-between px-10 py-5 bg-[#2b3945]">
        <h2 className=" font-bold text-[#ffffff]">Where In the world?</h2>
        <CiBrightnessUp color="#fff" />
      </header>

      <div className="mt-8 px-10 flex items-center justify-between gap-7 md:flex-row sm:flex-row flex-col ">
        <div className="relative">
          <FiSearch
            color="#fff"
            className="absolute top-0 bottom-0 translate-x-[10px] translate-y-[10px]"
          />
          <input
            value={searchQuery}
            onChange={handleSearch}
            type="search"
            placeholder="Search for a country"
            className="px-8 py-2 bg-[#2b3945] text-[#ffffff] w-[100%] max-w-[350px] m-auto rounded outline-none "
          />
        </div>

        <select
          name="region"
          onChange={handleRegionFilter}
          className="bg-[#2b3945] text-[#fff] p-2 rounded outline-none cursor-pointer">
          <option value="">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <CountryList
        searchQuery={searchQuery}
        countries={countries}
        setCountries={setCountries}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Home;
