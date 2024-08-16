
//Se especifica este formato de esta manera ya que es el valido para la base de datos
// const format = 'mm/dd/yyyy'

const getDateNow = (format, daysLate) => {
    let date = new Date();

    date.setDate(date.getDate() + daysLate);

    //*Crear las partes de la fecha
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();

    // Reemplazar para cambiar el formato y los separadores
    format = format.toLowerCase();
    format = format.replace("dd", day);
    format = format.replace("mm", month);
    format = format.replace("yyyy", year);

    return format;
};

export default getDateNow;