import React from 'react';
import * as ExcelJS from 'exceljs/dist/exceljs.min.js';
import { saveAs } from 'file-saver';
import ButtonVe from './ButtonVe';

const GeneratorExcel = ({ headers, data, titulo }) => {

    const handleClick = () => {
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet(titulo);

        // Agregar encabezados al archivo Excel
        worksheet.columns = headers.map(header => ({ header, key: header }));

        // Agregar datos al archivo Excel
        data.forEach((row, i) => {
            worksheet.addRow({ ...row, index: i + 1 });
        });

        // Generar archivo Excel y descargar
        workbook.xlsx.writeBuffer().then(buffer => {
            let blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${titulo}.xlsx`);
        });
    };

    return (
        <ButtonVe content={'Generar Excel'} click={handleClick} />
    );
};

export default GeneratorExcel;
