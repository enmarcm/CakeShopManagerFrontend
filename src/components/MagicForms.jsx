import { Switch } from "antd";
import "../styles/MagicForms.css";
import { useEffect, useRef, useState } from "react";

const MagicForms = ({ infoData, mapaInfo, eventHandlers }) => {
  const mapa = useRef(new Map());
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (mapa.current.size === infoData.length) {
      mapaInfo(mapa.current);
    }
  }, [infoData, mapaInfo]);

  return (
    <div className="container-inputs-magics">
      {infoData.map((element, key) => {
        const { type, label, id, placeholder, readOnly, ...rest } = element;
        const [isNotVisible, setIsNotVisible] = useState(false);
        const [isReadOnly, setIsReadOnly] = useState(readOnly);

        const [info, setInfo] = useState({
          value: type.toLowerCase() === "switch" ? false : "",
          options: [],
        });

        const handleChange = (e) => {
          if (eventHandlers && eventHandlers[id]) {
            eventHandlers[id](e);
          }
          if (type.toLowerCase() === "switch") {
            const newCheckedValue = !isChecked;
            setIsChecked(newCheckedValue);
            setInfo({ ...info, value: newCheckedValue });
            return;
          }
          setInfo({ ...info, value: e.target.value });
        };

        const elementFinal = (
          <div
            className={
              isNotVisible
                ? "no-visible"
                : "container-input-magic"
            }
            key={key}
          >
            <label>{label}</label>

            {type.toLowerCase() === "select" ? (
              <select
                id={id}
                value={info.value}
                onChange={handleChange}
                readOnly={isReadOnly}
                {...rest}
                className={isNotVisible ? "no-visible" : ""}
              >
                <option value="" key={`${id}-null`}>
                  Seleccione
                </option>
                {info.options}
              </select>
            ) : type.toLowerCase() === "switch" ? (
              <Switch
                id={id}
                checked={isChecked}
                value={isChecked}
                readOnly={isReadOnly}
                onChange={handleChange}
                {...rest}
              />
            ) : (
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={info.value}
                onChange={handleChange}
                readOnly={isReadOnly}
                className={isNotVisible ? "no-visible" : ""}
                {...rest}
              />
            )}
          </div>
        );

        mapa.current.set(id, { info, setInfo, setIsNotVisible, setIsReadOnly });
        return elementFinal;
      })}
    </div>
  );
};

export default MagicForms;
