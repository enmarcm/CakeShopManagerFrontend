import { object, string, number, boolean } from "yup";

const schemaCreatePerson = object({
  inNombrePersona: string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El nombre solo puede contener letras"),
  inApellidoPersona: string()
    .required("El apellido es requerido")
    .min(3, "El apellido debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El apellido solo puede contener letras"),
  inDireccionPersona: number().integer().required("La dirección es requerida"),
  inNumeroPersona: string()
    .required("El número es requerido")
    .matches(
      /^(0412|0424|0426|0416|0414)\d{7}$/,
      "Número de teléfono inválido"
    ),
  inTipoPersona: number().integer().required("El tipo es requerido"),
});

export const validateCreateperson = async ({ data }) => {
  try {
    const result = await schemaCreatePerson.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const schemaCreateProduct = object({
  inDescripcionProducto: string()
    .required("La descripción es requerida")
    .min(3, "La descripción debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "La descripción solo puede contener letras"),
});

export const validateCreateProduct = async ({ data }) => {
  try {
    const result = await schemaCreateProduct.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const schemaCreateRoute = object({
  inNombreRuta: string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El nombre solo puede contener letras"),
  inCalleAsociada: number().integer().required("La calle es requerida"),
});

export const validateCreateRoute = async ({ data }) => {
  try {
    const result = await schemaCreateRoute.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const schemaChangeStatusSeller = object({
  inEstadoVendedor: string().min(3, "La razón debe tener al menos 3 letras"),
  inCambiarEstado: boolean().required("El estado es requerido"),
  inVendedor: number()
    .transform((value) => (!isNaN(value) ? Number(value) : value))
    .required("El vendedor es requerido"),
});

export const validateChangeStatusSeller = async ({ data }) => {
  try {
    const result = await schemaChangeStatusSeller.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const schemaCreateLocal = object({
  inNombreLocal: string().min(3).required("El nombre es requerido"),
  inRutaAsociada: number()
    .transform((value) => (!isNaN(value) ? Number(value) : value))
    .required("La ruta es requerida"),
});

export const validateCreateLocal = async ({ data }) => {
  try {
    const result = await schemaCreateLocal.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const schemaCreatePayMethod = object({
  inDescripcionMetodoPago: string()
    .min(3)
    .required("La descripción es requerida"),
  inTipoMetodoPago: number()
    .transform((value) => (!isNaN(value) ? Number(value) : value))
    .required("El tipo es requerido"),
});

export const validateCreatePayMethod = async ({ data }) => {
  try {
    const result = await schemaCreatePayMethod.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

const chemaEditPerson = object({
  inNombrePersona: string()
    .required("El nombre es requerido")
    .min(3, "El nombre debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El nombre solo puede contener letras"),
  inApellidoPersona: string()
    .required("El apellido es requerido")
    .min(3, "El apellido debe tener al menos 3 letras")
    .matches(/^[a-zA-Z\s]*$/, "El apellido solo puede contener letras"),
  inDireccionPersona: number()
    .transform((value) => (!isNaN(value) ? Number(value) : value))
    .required("La dirección es requerida"),
  inNumeroPersona: string()
    .required("El número es requerido")
    .matches(
      /^(0412|0424|0426|0416|0414)\d{7}$/,
      "Número de teléfono inválido"
    ),
  inPersonas: number()
    .transform((value) => (!isNaN(value) ? Number(value) : value))
    .required("El id es requerido"),
});

const schemaEditLocal = object({
  inLocal: number()
    .required('Debe seleccionar un local'),
  inNombre: string()
    .required('Es requerido un nuevo nombre para actualizar el local eligido')
})

export const validateEditLocal = async ({ data }) => {
  try {
    const result = schemaEditLocal.validate(data, {
      abortEarly: false
    })
    return result;
  } catch (error) {
    return { error: error.message }
  }
}

export const validateEditPerson = async ({ data }) => {
  try {
    const result = await chemaEditPerson.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
}
const schema = object({
  inVendedor: number().transform((value) => (!isNaN(value) ? Number(value) : value))
    .required("El id es requerido"),
  inTipoSalario: number().transform((value) => (!isNaN(value) ? Number(value) : value)).min(0).required("El id es requerido"),
})

export const validateAsignSalary = async ({ data }) => {
  try {
    const result = await schema.validate(data, {
      abortEarly: false,
    });
    return result;
  } catch (error) {
    return { error: error.message };
  }
}