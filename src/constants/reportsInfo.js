const pathInfo = [
    {
        path: 'routes',
        module: 'local',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todas las rutas',
                to: `?filter=routes&context=route&method=getAllOf&params=route&typeParams=of`
            },
            {
                type: 'select',
                method: ['local', 'control', 'getAllOf', { of: 'local' }],
                placeholder: 'Ingrese nombre de local',
                label: 'Por nombre de local',
                to: `?filter=routes&context=route&method=getRouteBy&params=local&typeParams=option&typeParams=params`
            },
        ]

    },
    {
        path: 'products',
        module: 'sales',
        object: 'products',
        options: [
            {
                type: 'button',
                label: 'Todos los productos',
                typeParam: 'option',
                to: `?filter=products&context=product&method=getall&params=productsale&typeParams=option`
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', { option: 'presentation' }],
                placeholder: 'Seleccione presentacion',
                label: 'Producto por presentacion especifica',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=presentation&typeParams=condition&typeParams=params`
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Producto por monto especifico',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=amount&typeParams=condition&typeParams=params`
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Producto menor al monto',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=lessthanamount&typeParams=condition&typeParams=params`
            },
            {
                type: 'number',
                placeholder: 'Ingrese monto',
                label: 'Producto mayor al monto',
                to: `?filter=products&context=product&method=getAllProductByCondition&params=largerthanamount&typeParams=condition&typeParams=params`
            },

        ]
    },
    {
        path: 'local',
        module: 'local',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todos los locales',
                to: `?filter=local&context=local&method=getAllOf&params=local&typeParams=of`
            },
            {
                type: 'text',
                placeholder: 'Ingrese persona',
                label: 'Local por persona',
                to: `?filter=local&context=local&method=getLocalBy&params=person&typeParams=by&typeParams=params`
            },
            {
                type: 'select',
                method: ['local', 'control', 'getAllOf', { of: 'route' }],
                placeholder: 'Ingrese route',
                label: 'Local por ruta',
                to: `?filter=local&context=local&method=getLocalBy&params=route&typeParams=by&typeParams=params`
            },
        ]
    },
    {
        path: 'billing',
        module: 'billing',
        object: 'bill',
        options: [
            {
                type: 'text',
                label: 'Todos las facturas por cliente',
                placeholder: 'Ingrese nombre',
                to: '?filter=billing&context=billing&method=seeBillsBy&params=client&typeParams=option&typeParams=params'
            },
            {
                type: 'text',
                label: 'Todos las facturas por vendedor',
                placeholder: 'Ingrese nombre',
                to: '?filter=billing&context=billing&method=seeBillsBy&params=seller&typeParams=option&typeParams=params'
            },
            {
                type: 'number',
                label: 'Todas los pagos de una factura',
                placeholder: 'Ingrese id de factura',
                to: '?filter=billing&context=billing&method=getPaysByBill&typeParams=idBill'
            },
            {
                type: 'select',
                label: 'Todos las facturas por estado',
                method: ['billing', 'bill', 'getAll', { option: 'status' }],
                placeholder: 'Seleccione estatus',
                to: '?filter=billing&context=billing&method=seeBillsBy&params=status&typeParams=option&typeParams=params'
            },
            {
                type: 'date',
                label: 'Fecha especifica',
                placeholder: 'Ingrese fecha',
                to: '?filter=billing&context=billing&method=seeBillsBy&params=date&typeParams=option&typeParams=params'
            },
            {
                type: 'button',
                label: 'Todos los deudores',
                placeholder: 'Presione',
                to: '?filter=billing&context=billing&method=getAll&params=debt&typeParams=option'
            },
            {
                type: 'number',
                label: 'Items de una factura',
                placeholder: 'Ingrese id de factura',
                to: '?filter=billing&context=billing&method=getItemsByBill&typeParams=id'
            }
        ]
    },
    {
        path: 'sales',
        module: 'billing',
        object: 'bill',
        options: [
            {
                error: 'Aqui faltan los metodos correspondientes'
            }
        ]
    },
    {
        path: 'debtors',
        module: 'billing',
        object: 'bill',
        options: [
            {
                error: 'Aqui faltan los metodos correspondientes'
            }
        ]
    },
    {
        path: 'seller',
        module: 'seller',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todos los vendendores',
                to: '?filter=seller&context=seller&method=getSellersBy&params=default&typeParams=option&typeParams=params'
            },
            {
                type: 'select',
                method: ['local', 'control', 'getAllOf', { of: 'route' }],
                placeholder: 'Seleccione una ruta',
                label: 'Vendedores por ruta',
                to: '?filter=seller&context=seller&method=getSellersBy&params=route&typeParams=option&typeParams=params'
            },
            {
                type: 'button',
                label: 'Vendedores por venta',
                to: '?filter=seller&context=seller&method=getSellersBy&params=sells&typeParams=option&typeParams=params'
            },
        ]
    },
    {
        path: 'person',
        module: 'person',
        object: 'control',
        options: [
            {
                type: 'button',
                label: 'Todos las persona',
                to: '?filter=person&context=person&method=getAllOf&params=person&typeParams=option'
            },
            {
                type: 'select',
                method: ['directions', 'control', 'getAll', { direction: 'address' }],
                placeholder: 'Seleccion direccion',
                label: 'Persona por direccion',
                to: '?filter=person&context=person&method=getAllOf&params=getAllPersonWithAddress&typeParams=option'
            },
            {
                type: 'button',
                label: 'Todos los tipos de persona',
                to: '?filter=person&context=person&method=getAllOf&params=typePerson&typeParams=option'
            },
            {
                type: 'button',
                label: 'Todos las direcciones de personas',
                to: '?filter=person&context=person&method=getAllOf&params=address&typeParams=option'
            },
        ]
    },
    {
        path: 'payMethod',
        module: 'billing',
        object: 'payMethod',
        options: [
            {
                type: 'button',
                label: 'Todos lo metodos de pago',
                to: '?filter=payMethod&context=status&method=getBy&params=getAllMethods'
            },
            {
                type: 'button',
                label: 'Todos lo metodos de pago habilitados',
                to: '?filter=payMethod&context=status&method=getBy&params=methodActives'
            },
            {
                type: 'button',
                label: 'Todos lo metodos desahabilitados',
                to: '?filter=payMethod&context=status&method=getBy&params=getInactiveMethods'
            },
            {
                type: 'button',
                label: 'Metodos de pago banco',
                to: '?filter=payMethod&context=methodbank&method=getBy&params=methodBanks'
            },
            {
                type: 'button',
                label: 'Otros metodos no de bancos',
                to: '?filter=payMethod&context=methodother&method=getBy&params=methodOthers'
            },

        ]
    },
    {
        path: 'assingments',
        module: 'sales',
        object: 'assignments',
        options: [
            {
                type: 'button',
                label: 'Todas las asignaciones',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=nameclientmid'
            },
            {
                type: 'text',
                placeholder: 'Ingrese nombre de cliente',
                label: 'Todas las asignaciones por cliente',
                to: '?filter=assingments&context=state&method=getAllAssignment'
            },
            {
                type: 'text',
                placeholder: 'Ingrese nombre de vendedor',
                label: 'Todas las asignaciones por vendedor',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=namesellermid'
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', 'product'],
                placeholder: 'Seleccione el producto',
                label: 'Todas las asignaciones por producto',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=nameproductmid'
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', 'presentation'],
                placeholder: 'Seleccion la presentacion',
                label: 'Todas las asignaciones por presentacion',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=namepresentationtmid'
            },
            {
                type: 'date',
                placeholder: 'Ingrese la fecha',
                label: 'Asignaciones por fecha',
                to: '?filter=assingments&context=state&method=getAssignmentByCondition&params=date'
            },
        ]
    },
    {
        path: 'presentations',
        module: 'sales',
        object: 'assignments',
        options: [
            {
                type: 'button',
                label: 'Todas las presentaciones',
                to: '?filter=presentations&context=presentation&method=getAll&params=presentation'
            },
            {
                type: 'select',
                method: ['sales', 'products', 'getAll', 'product'],
                placeholder: 'Seleccione producto',
                label: 'Todas las presentaciones de un producto',
                to: '?filter=presentations&context=presentation&method=getAllPresentationByProduct'
            },
        ]
    }

]

export default pathInfo;