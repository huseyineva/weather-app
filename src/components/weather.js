import axios from "axios";
import { useState } from "react";
import { RiCelsiusFill } from "react-icons/ri";

export default function Weather() {
  const [city, setCity] = useState("");
  const [info, setInfo] = useState({});
  const [isActive, setIsActive] = useState(false);
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = async () => {
    const api = "0bea7c322dc641a01183831c8eb0aedb";
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&appid=${api}&units=metric&lang=tr`;
    await axios(baseURL)
      .then(async (data) => {
        await setInfo(data.data);
      })
      .catch((err) => console.log("Hatanız : ", err));
    setIsActive(true);
  };

  return (
    <div>
      <h1>Hava Durumu</h1>
      <div className="form">
        <div>
          <input
            value={city}
            className="inputText"
            type="text"
            placeholder="Şehri Giriniz"
            onChange={handleChange}
          />
        </div>
        <div className="btnDiv">
          <button onClick={handleClick} className="btn">
            Göster
          </button>
        </div>
      </div>
      {isActive ? (
        <div className="info">
          <p id="sehir">
            {" "}
            {info.name}, {info.sys.country}
          </p>
          <div className="genelDeger">
            <p id="sicaklik">{info.main.temp}</p>
            <RiCelsiusFill className="fa-c" />
          </div>

          <p id="havaDurumu">{info.weather[0].description}</p>
          <div className="his">
            <p id="hissedilen">Hissedilen : {info.main.feels_like}</p>
            <RiCelsiusFill className="fa-circle" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
