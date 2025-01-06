import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Contacts() {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 56.65592489680563,
    lng: 23.733927880516042,
  };

  const [reasonSelect, setReasonSelect] = useState("null");
  const [textAreaText, setTextAreaText] = useState("");
  const [errors, setErrors] = new useState({});

  const handleSelectChange = (e) => {
    setReasonSelect(e.target.value);
  };

  const handleTextAreaChange = (e) => {
    setTextAreaText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (reasonSelect === "null") {
      newErrors.reasonSelect = "Jāizvēlās iemesls.";
    }
    if (textAreaText.trim().length < 10) {
      newErrors.textAreaText = "Ziņai jābūt garākai par 10 simboliem.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log({ reasonSelect, textAreaText });
      setReasonSelect("null");
      setTextAreaText("");
    }
  };

  const GoogleMapWithMarker = () => {
    const { isLoaded, loadError } = useLoadScript({
      googleMapsApiKey: "AIzaSyAhucz4NELppEqcUcJjudbqqyu2bt91m7c",
    });

    if (loadError) return <div>Error</div>;
    if (!isLoaded) return <div>Loading</div>;

    return (
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        <Marker position={center} />
      </GoogleMap>
    );
  };

  return (
    <div className="panel-width my-14">
      <h1 className="page-title">Kontakti</h1>
      <div className="grid grid-cols-2 mb-12">
        <div className="flex justify-center items-center p-5 bg-system-green text-white">
          <div>
            <div className="flex gap-2 items-center mb-2">
              <FontAwesomeIcon icon={faPhone} className="text-xl" />
              <p>+371 12345678</p>
            </div>
            <div className="flex gap-2 items-center mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
              <p>info@intek.lv</p>
            </div>
            <div className="flex gap-2 items-center">
              <FontAwesomeIcon icon={faLocationDot} className="text-xl" />
              <p>Jelgava, Lielā iela 2</p>
            </div>
          </div>
        </div>
        <div>{GoogleMapWithMarker()}</div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="page-title">Sazinieties ar mums</h1>
        <div className="w-full p-12 bg-system-green">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-white">Iemesls</label>
                <select className="system-input mb-1" value={reasonSelect} onChange={handleSelectChange}>
                  <option value="null" disabled>
                    Izvēlēties vienu
                  </option>
                  <option value="tech">Tehniska problēma</option>
                  <option value="recommendation">Ieteikums</option>
                </select>
                {errors.reasonSelect && <span className="text-sm text-white">{errors.reasonSelect}</span>}
              </div>
              <div className="flex flex-col mb-3">
                <label className="mb-1 text-white">Ziņa</label>
                <textarea className="system-input h-[200px] mb-2 resize-none" value={textAreaText} onChange={handleTextAreaChange} />
                {errors.textAreaText && <span className="text-sm text-white">{errors.textAreaText}</span>}
              </div>
            </div>
            <button type="submit" className="px-5 py-2 bg-white hover:bg-[#c8d8e4] duration-300 rounded-sm">
              Sūtīt
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
