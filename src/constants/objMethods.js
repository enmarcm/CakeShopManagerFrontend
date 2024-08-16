const objMethods = [
  {
    module: "billing",
    object: {
      payMethod: {
        update: {
          status: "setStatusPayMethod",
          bank: "editTo",
          methodother: "editTo",
          methodbank: "editTo",
        },
      },
    },
  },
  {
    module: "direction",
    object: {
      control: {
        update: ["editMuniOrStreet"],
      },
    },
  },
  {
    module: "local",
    object: {
      control: {
        delete: {
          route: "deleteRoute",
          local: "deleteLocal",
        },
        update: {
          local: "editTo",
          route: "editTo",
        },
      },
    },
  },
  {
    module: "person",
    object: {
      control: {
        update: {
          person: "editTo",
        },
        delete: {
          person: "editTo",
        },
      },
    },
  },
  {
    module: "sales",
    object: {
      assignment: {
        update: {
          state: "updateStateAssignment",
        }
      },
      products: {
        update: {
          presentation: "updateTo",
          product: "updateTo",
          monto: "updateTo",
        },
      },
    },
  },
  {
    module: "seller",
    object: {
      control: {
        update: {
          seller: "desactivateSeller",
        },
      },
    },
  },
];

export default objMethods;
