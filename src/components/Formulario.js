import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';


const Formulario = ({crearCita}) => {
  //********Crear Stage de Citas*********//
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  //***State para mensaje de ERROR***/
  const [error, actualizarError] = useState(false);

  //Funcion que se ejecutara cada que el usuario escriba en el input****//
  const actualizarStage = (e) => {
    actualizarCita({
      ...cita, //importante tomar copia del state(siempre)
      [e.target.name]: e.target.value,
    });
  };

  //Extraer los Valores del formulario
  const { mascota, propietario, fecha, hora, sintomas } = cita; //Destructuring

  //Cuando el usuario presiona boton de agregar cita
  const submitCita = (e) => {
    e.preventDefault();

    //Validar
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return; //siempre return para evitar que el codigo sig se ejecute
    }
    //Eliminar el mensaje de error
    actualizarError(false);

    //Asignar un ID
    cita.id = uuidv4();
    console.log(cita);

    //Crear la cita
    crearCita(cita);

    //Reiniciar el Form
    actualizarCita({
      mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: "",
    });

    console.log("enviando datos");
  };

  return (
    <Fragment>
      <h2>Crear Citas</h2>

      {/* //Mostar el mensaje de Error con un ternario (true=? false=:) */}
      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form
        onSubmit={submitCita} //Funcion enviar info al presionar boton
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarStage} //Funcion de input
          value={mascota} //extrancion de la info
        />

        <label>Nombre Propietario</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Propietario de la Mascota"
          onChange={actualizarStage} //Funcion de input
          value={propietario} //extrancion de la info
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarStage} //Funcion de input
          value={fecha} //extrancion de la info
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarStage} //Funcion de input
          value={hora} //extrancion de la info
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarStage} //Funcion de input
          value={sintomas} //extrancion de la info
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </Fragment>
  );
};


Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default Formulario;