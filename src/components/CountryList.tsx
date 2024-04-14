import axios from "axios";
import { useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { ICountry } from "../pages/Home";

type CountryListProps = {
  searchQuery: string;
  countries: ICountry[];
  setCountries: React.Dispatch<React.SetStateAction<ICountry[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const CountryList: React.FC<CountryListProps> = ({
  searchQuery,
  countries,
  setCountries,
  loading,
  setLoading,
}) => {
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
        setLoading(false);
      })
      .finally(() => setLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchCountry = (countries: ICountry[]) => {
    return countries.filter((country) => {
      return country.name.common
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
  };

  return (
    <div className="mt-20 px-10">
      {loading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <BounceLoader color="hsl(0, 0%, 100%)" />
        </div>
      ) : (
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            gap-10
        ">
          {searchCountry(countries).length > 0 ? (
            searchCountry(countries).map((country) => (
              <div
                className="bg-[#2b3945] max-w-[250px] w-[100%] m-auto rounded-md cursor-pointer"
                key={country.name.common}>
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="block w-[100%] h-[8rem] object-cover rounded-t-md"
                />

                <div className="p-4">
                  <h2 className="text-[#fff] font-bold mb-2">
                    {country.name.common}
                  </h2>
                  <p className="text-[#fff] font-medium text-sm">
                    Population:{" "}
                    <span className="font-light text-[#858585]">
                      {" "}
                      {Number(country.population).toLocaleString()}
                    </span>{" "}
                  </p>
                  <p className="text-[#fff] font-medium text-sm">
                    Region:{" "}
                    <span className="font-light text-[#858585]">
                      {country.region}
                    </span>{" "}
                  </p>
                  <p className="text-[#fff] font-medium text-sm">
                    Capital:{" "}
                    <span className="font-light text-[#858585]">
                      {" "}
                      {country.capital}
                    </span>{" "}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#fff] text-center w-full">No country found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryList;
