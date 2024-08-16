const infoInputsBo = {
    CreatePerson: [
        { type: 'text', label: "Nombre", id: 'inNombrePersona', placeholder: "Nombre de la persona" },
        { type: 'text', label: "Apellido", id: 'inApellidoPersona', placeholder: "Apellido de la persona" },
        { type: 'number', label: "Numero", id: 'inNumeroPersona', placeholder: "Numero de la persona" },
        { type: 'select', label: "Tipo", id: 'inTipoPersona', placeholder: "Tipo de la persona" },
        { type: 'select', label: "Direccion", id: 'inDireccionPersona', placeholder: "Direccion de la persona" },
    ],
    CreateProduct: [
        { type: 'text', label: "Descripcion producto", id: 'inDescripcionProducto', placeholder: "Descripcion del producto" }
    ],
    CreateRoute: [
        { type: 'text', label: "Nombre ruta", id: 'inNombreRuta', placeholder: "Nombre de la ruta" },
        { type: 'select', label: "Calle asociada", id: 'inCalleAsociada', placeholder: "Calle asociada a la ruta" },
    ],
    CreateLocal: [
        { type: 'text', label: "Nombre local", id: 'inNombreLocal', placeholder: "Nombre del local" },
        { type: 'select', label: "Ruta asociada", id: 'inRutaAsociada', placeholder: "Ruta asociada al local" },
    ],
    CreatePayMethod: [
        { type: 'select', label: "Tipo de metodo de pago / banco", id: 'inTipoMetodoPago', placeholder: "Tipo de metodo de pago / banco" },
        { type: 'text', label: "Descripcion metodo de pago / banco", id: 'inDescripcionMetodoPago', placeholder: "Descripcion del metodo de pago" },
    ],
    ChangeStatusSeller: [
        { type: 'select', label: 'Vendedor', id: 'inVendedor', placeholder: 'Vendedor' },
        { type: 'text', label: "Estado del vendedor", id: 'inEstadoVendedor', placeholder: "Estado del vendedor", readOnly: true },
        { type: 'switch', label: "Cambiar estado", id: 'inCambiarEstado', placeholder: "Cambiar Estado del vendedor" },
    ],
    AsignarLocalVendedor: [
        { type: 'select', label: 'Vendedor', id: 'inVendedor', placeholder: 'Vendedor' },
        { type: 'select', label: 'Ruta', id: 'inRuta', placeholder: 'Ruta' },
        { type: 'select', label: 'Local', id: 'inLocal', placeholder: 'Local' },
    ],
    CreateBilling: [
        { type: 'select', label: 'Vendedor', id: 'inVendedor', placeholder: 'Vendedor' },
        { type: 'select', label: 'Tipo de pago', id: 'inTipoPago', placeholder: 'Tipo de pago de la factura' },
        { type: 'text', label: 'Fecha Limite', id: 'inFecha', placeholder: 'Fecha Limite', readOnly: true },
        { type: 'select', label: 'Cliente', id: 'inCliente', placeholder: 'Client' },
        { type: 'select', label: 'Productos', id: 'inProducto', placeholder: 'Productos' },
        { type: 'select', label: 'Presentacion', id: 'inPresentacion', placeholder: 'Presentaciones' }
    ],
    payBill: [
        { type: 'text', label: 'Id de la factura', id: 'inFactura', placeholder: 'Id de la factura a pagar', readOnly: false },
        { type: 'select', label: 'Tipo de pago', id: 'inTipoPago', placeholder: 'Tipo de pago para la factura' },
        { type: 'select', label: 'Metodo de pago', id: 'inMetodo', placeholder: 'Metodo de pago' },
        { type: 'select', label: 'Banco', id: 'inBanco', placeholder: 'Tipos de bancos disponibles' },
        { type: 'text', label: 'Monto a pagar', id: 'inMonto', placeholder: 'Monto a pagar' },
    ],
    EditarPerson: [
        { type: 'select', label: "Personas", id: 'inPersonas', placeholder: "Seleccione una persona" },
        { type: 'text', label: "Nombre", id: 'inNombrePersona', placeholder: "Nombre de la persona" },
        { type: 'text', label: "Apellido", id: 'inApellidoPersona', placeholder: "Apellido de la persona" },
        { type: 'number', label: "Numero", id: 'inNumeroPersona', placeholder: "Numero de la persona" },
        // {type: 'select', label: "Tipo", id: 'inTipoPersona', placeholder: "Tipo de la persona"},
        { type: 'select', label: "Direccion", id: 'inDireccionPersona', placeholder: "Direccion de la persona" },
    ],
    AsignarSalario: [
        { type: 'select', label: "Vendedor", id: 'inVendedor', placeholder: "Vendedor" },
        { type: 'select', label: "Tipo de salario", id: 'inTipoSalario', placeholder: "Tipo de salario" },
    ],

    editProducSale: [
        { type: 'select', label: 'Productos', id: 'inProducto', placeholder: 'Productos a la venta' },
        { type: 'select', label: 'Presentacion', id: 'inPresentacion', placeholder: 'Presentaciones del producto' },
        { type: 'text', label: 'Monto', id: 'inMonto', placeholder: 'Nuevo monto' },
    ],
    editLocal: [
        { type: 'select', label: 'Locales', id: 'inLocal', placeholder: 'Todos los locales' },
        { type: 'text', label: 'Nuevo nombre', id: 'inNombre', placeholder: 'Ingresar nuevo nombre' }
    ],
    olvidoDatos: [
        { type: 'text', label: 'Usuario', id: 'inUsuario', placeholder: 'Ingresa tu nombre de usuario' },
    ],
}

export default infoInputsBo