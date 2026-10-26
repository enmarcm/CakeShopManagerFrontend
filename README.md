# 🎂 CakeShop Manager

> Sistema de gestión de ventas para una pastelería: vendedores, zonas, ingresos, reportes diarios, y mensajería y llamadas en tiempo real entre el administrador y los vendedores. Proyecto universitario.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=flat-square&logo=antdesign&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=flat-square&logo=socketdotio&logoColor=white)
![Express](https://img.shields.io/badge/Express-000?style=flat-square&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

**Backend:** [enmarcm/CakeShopManagerBackend](https://github.com/enmarcm/CakeShopManagerBackend) · **Portfolio:** [enmarcm.site](https://enmarcm.site)

<!-- TODO: capturas -->
| Dashboard | Ventas | Chat en vivo |
|---|---|---|
| ![](docs/screenshots/dashboard.png) | ![](docs/screenshots/sales.png) | ![](docs/screenshots/chat.png) |

## ✨ Funcionalidades

- Gestión de vendedores y de las zonas asignadas a cada uno.
- CRUD de productos (tortas) y administración de ganancias.
- Reportes diarios exportables a **PDF** (pdfmake) y **Excel** (exceljs).
- Gráficos de ingresos (lightweight-charts).
- **Mensajería y llamadas en tiempo real** con Socket.IO.
- Login, registro y sesiones con cookies. Validación con Yup.
- Componentes propios, sin librería de UI de terceros para la lógica principal.

## 🛠️ Stack

| Capa | Tecnologías |
|---|---|
| Frontend | React, Vite, React Router, Ant Design / React-Bootstrap, socket.io-client |
| Backend | Node.js, Express, express-session, Socket.IO, Zod, bcrypt, Nodemailer |
| Base de datos | PostgreSQL (`pg-pool`) |

## 🚀 Puesta en marcha

```bash
# Backend (ver su README para el .env y la DB)
git clone https://github.com/enmarcm/CakeShopManagerBackend && cd CakeShopManagerBackend
npm install && npm start

# Frontend
git clone https://github.com/enmarcm/CakeShopManagerFrontend && cd CakeShopManagerFrontend
npm install && npm run dev
```

<!-- TODO: documentar la variable de la URL del backend si la hay -->

---

🇬🇧 *Sales management system for a cake shop (university project): sellers, zones, revenue, daily PDF/Excel reports, plus real-time chat and calls via Socket.IO. React + Vite frontend; Express + PostgreSQL backend.*
