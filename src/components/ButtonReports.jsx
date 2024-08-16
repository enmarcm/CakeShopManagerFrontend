//TODO: IMPORTANTE



import React, { useState, useEffect } from "react";
import fetcho from "../service/fetcho";
import "../styles/ButtonReports.css";
import ModalSession from "./ModalSession";
import ModalBase from "./ModalBase";
import { useNavigate } from "react-router";

const ButtonReports = ({ optionByPath, setLoading }) => {
  const [inputs, setInputs] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [isErrorSession, setIsErrorSession] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState("");
  const { options } = optionByPath;
  const navigate = useNavigate();

  useEffect(() => {
    if (!options) return;

    const fetchSelectOptions = async () => {
      const selectOptionCorrect = options.find((obj) => obj.type === "select");
      // console.log('EPPAAAAS', selectOptionCorrect)
      if (selectOptionCorrect) {
        const [nameModule, nameObject, nameMethod, params] =
          selectOptionCorrect.method;

        setLoading(true);
        const result = await fetcho({
          url: "/toProcess",
          method: "POST",
          body: {
            area: nameModule,
            object: nameObject,
            method: nameMethod,
            params: params,
          },
        });

        setLoading(false);

        // console.log(result)
        if (result.errorSession) setIsErrorSession(true);
        // Actualiza el estado con las opciones recibidas
        console.log('Aqui result', result)
        if (result.error || !result) {
          setModalData("Hubo un error al realizar la consulta", result?.error)
          setIsModalVisible(true)
        }

        setSelectOptions(result);
      }
    };

    // Verifica si alguna opción es de tipo "select"
    const hasSelectOption = options.some((option) => option.type === "select");

    // console.log('Aquiiii', hasSelectOption)
    if (hasSelectOption) {
      console.log('Si existe una opcion de tipo select')
      fetchSelectOptions();
    }
  }, [optionByPath]);

  const handleInputChange = ({ index, value }) => {
    // console.log('AQUI SELECT ', value)
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleButtonInput = ({ index, option }) => {
    const inputValue = inputs[index];
    // console.log(`Input ${index} value: ${inputValue}`);

    navigate(`${option.to}&params=${inputValue}`);
  };

  const handleButtonClick = ({ option }) => {
    navigate(option.to);
  };

  if (isModalVisible) return <ModalBase setIsModalVisible={setIsModalVisible} content={modalData} />
  if (isErrorSession) return <ModalSession />;

  return (
    options && (
      <div className="container-options-reports">
        <div className="container-options-card">
          {options.map((option, index) => {
            return (
              <div key={option.label} className="btn-all-products">
                {option.type === "text" ||
                  option.type === "number" ||
                  option.type === "date" ? (
                  <div className="container-buttons">
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{option.label}</div>
                    <input style={{ padding: '0.5rem', border: '1px solid #FB5361', borderRadius: '10px', marginRight: '10px' }}
                      className="input "
                      type={option.type}
                      placeholder={option.placeholder}
                      value={inputs[index] || ""}
                      onChange={(e) =>
                        handleInputChange({ index, value: e.target.value })
                      }
                    />
                    <button
                      className="btn-input"
                      onClick={() => handleButtonInput({ index, option })}
                    >
                      Enviar
                    </button>
                  </div>
                ) : option.type === "select" ? (
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{option.label}</div>
                    <select
                      className="select"
                      value={inputs[index] || ""}
                      onChange={(e) =>
                        handleInputChange({ index, value: e.target.value })
                      }
                    >
                      <option disabled value="">
                        {option.placeholder}
                      </option>
                      {selectOptions && selectOptions.map((selectOption) => (
                        <option key={selectOption.id} value={selectOption.id}>
                          {selectOption["descripcion"]}
                        </option>
                      ))}
                    </select>
                    <button
                      className="btn-input"
                      onClick={() => handleButtonInput({ index, option })}
                    >
                      Enviar
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => handleButtonClick({ option })}
                      className="btn"
                    >
                      {option.label}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ButtonReports;
