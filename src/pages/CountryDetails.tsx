import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { ICountry } from "./Home";

const CountryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [CountryDetails, setCountryDetails] = useState<ICountry>(
    {} as ICountry
  );

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        setCountryDetails(response.data[0]);
      });
  }, [name]);

  return (
    <div className=" px-10 py-5">
      <div
        className="bg-[#fff] border border-[#202c37] w-[90px] p-2 flex items-center justify-center gap-2 rounded-md cursor-pointer"
        onClick={() => navigate(-1)}>
        <IoChevronBack />
        <span className="text-[#202c37] font-semibold">Back</span>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-10
        mt-10
        items-center
      ">
        <div className="w-100%">
          <img
            src={CountryDetails?.flags?.png}
            alt={CountryDetails.name?.common}
            className="w-[100%] h-[auto] rounded-md"
          />
        </div>

        <div>
          <h2 className="text-[#fff] font-bold text-3xl mb-5">
            {CountryDetails.name?.common}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p className="text-[#fff] font-semibold mb-2">
                Native Name:{" "}
                <span className="text-[#858585]">
                  {CountryDetails.name?.official}
                </span>
              </p>
              <p className="text-[#fff] font-semibold mb-2">
                Population:{" "}
                <span className="text-[#858585]">
                  {CountryDetails.population}
                </span>
              </p>
              <p className="text-[#fff] font-semibold mb-2">
                Region:{" "}
                <span className="text-[#858585]">{CountryDetails.region}</span>
              </p>
              <p className="text-[#fff] font-semibold mb-2">
                Sub Region:{" "}
                <span className="text-[#858585]">
                  {CountryDetails.subregion}
                </span>
              </p>
              <p className="text-[#fff] font-semibold mb-2">
                Capital:{" "}
                <span className="text-[#858585]">{CountryDetails.capital}</span>
              </p>
            </div>

            <div>
              <p className="text-[#fff] font-semibold mb-2">
                Top Level Domain:{" "}
                <span className="text-[#858585]">
                  {CountryDetails.tld && CountryDetails.tld[0]}
                </span>
              </p>
              <p className="text-[#fff] font-semibold mb-2">
                Currencies:{" "}
                <span className="text-[#858585]">
                  {CountryDetails.currencies &&
                    Object.values(CountryDetails.currencies)
                      .map((currency: { name: string }) => currency.name)
                      .join(", ")}
                </span>
              </p>
              <p className="text-[#fff] font-semibold mb-2">
                Languages:{" "}
                <span className="text-[#858585]">
                  {CountryDetails.languages &&
                    Object.values(CountryDetails.languages).map(
                      (language: string) => language
                    )}
                </span>
              </p>
            </div>
            <div>
              <p className="text-[#fff] font-semibold mb-2">
                Border Countries:{" "}
              </p>
              <div className="flex flex-wrap gap-2">
                {CountryDetails.borders &&
                  CountryDetails.borders.map((border: string) => (
                    <span
                      key={border}
                      className="
                          bg-[#2b3945] 
                          text-[#fff] 
                          p-2 
                          text-sm
                          rounded-md 
                          cursor-pointer
                        ">
                      {border}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
