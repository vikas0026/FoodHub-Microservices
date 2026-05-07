<div align="center">

```
███████╗ ██████╗  ██████╗ ██████╗ ██╗  ██╗██╗   ██╗██████╗
██╔════╝██╔═══██╗██╔═══██╗██╔══██╗██║  ██║██║   ██║██╔══██╗
█████╗  ██║   ██║██║   ██║██║  ██║███████║██║   ██║██████╔╝
██╔══╝  ██║   ██║██║   ██║██║  ██║██╔══██║██║   ██║██╔══██╗
██║     ╚██████╔╝╚██████╔╝██████╔╝██║  ██║╚██████╔╝██████╔╝
╚═╝      ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═════╝
```

# FoodHub — Microservices Backend

**A production-grade GraphQL Federation architecture built with Apollo Gateway, JWT Auth & Node.js**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org)
[![Apollo](https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=apollographql&logoColor=white)](https://www.apollographql.com)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 🧭 Overview

FoodHub is a **fully distributed backend system** demonstrating real-world microservices engineering. Three independently deployable services — Auth, Menu, and Orders — are unified behind a single Apollo Gateway that composes them into one seamless GraphQL API.

This project was built to deeply understand how **modern distributed systems** communicate, scale, and stay secure — without the overhead of a monolith.

```
  Client Request
       │
       ▼
┌─────────────────┐
│  Apollo Gateway  │  ◄── Single GraphQL Endpoint
│  (Federation)   │
└────────┬────────┘
         │
   ┌─────┴──────┐──────────────┐
   ▼            ▼              ▼
┌──────┐   ┌────────┐   ┌──────────┐
│ Auth │   │  Menu  │   │  Orders  │
│ svc  │   │  svc   │   │   svc    │
└──────┘   └────────┘   └──────────┘
  JWT Auth   Items/        Order
  + RBAC    Categories   Lifecycle
```

---

## ✨ Key Features

| Feature | Description |
|--------|-------------|
| 🔐 **JWT Authentication** | Stateless, token-based auth with role-aware claims |
| 🛡️ **RBAC Authorization** | Role-based access control on protected mutations |
| 🌐 **Apollo Federation** | Subgraph composition via `@key` and `__resolveReference` |
| 🧩 **Modular Services** | Each service owns its schema, resolvers, and logic |
| 🔗 **Unified API** | One gateway endpoint — infinite scalability behind it |
| 🧪 **Sandbox Ready** | Fully testable via Apollo Sandbox / GraphQL Playground |
| 📦 **ES Modules** | Modern JavaScript with native module support |
| ⚡ **Nodemon DX** | Hot-reload dev workflow across all services |

---

## 🏗️ Architecture

### Services

```
foodhub/
├── gateway/                  # Apollo Gateway — composes all subgraphs
│   └── index.js
│
├── services/
│   ├── auth-service/         # Authentication & user management
│   │   ├── schema.graphql
│   │   ├── resolvers.js
│   │   └── index.js
│   │
│   ├── menu-service/         # Menu items, categories, availability
│   │   ├── schema.graphql
│   │   ├── resolvers.js
│   │   └── index.js
│   │
│   └── order-service/        # Order creation, tracking, history
│       ├── schema.graphql
│       ├── resolvers.js
│       └── index.js
│
└── package.json
```

### Federation Flow

Each service is a **standalone Apollo subgraph** that:

1. Defines its own GraphQL schema with `@key` directives
2. Implements `__resolveReference` for federated entity resolution
3. Registers with the Apollo Gateway at startup
4. Exposes only what it owns — no cross-service coupling

The **Gateway** introspects all subgraph schemas and composes them into a single supergraph schema served to clients.

---

## 🔐 Authentication & Authorization

```
POST /graphql  →  Apollo Gateway
                       │
                 Extract JWT from
                 Authorization Header
                       │
               Validate & Decode Token
                       │
           Inject { user, role } into Context
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
   Public Resolvers          Protected Mutations
  (no auth required)        (check role via context)
```

**Token Payload Example:**
```json
{
  "userId": "u_1a2b3c",
  "email": "user@foodhub.io",
  "role": "ADMIN",
  "iat": 1715000000,
  "exp": 1715086400
}
```

Protected mutations check `context.user.role` before execution, throwing `AuthenticationError` or `ForbiddenError` for unauthorized access.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/foodhub-backend.git
cd foodhub-backend

# Install dependencies for all services
npm install
```

### Running the Services

Open **four terminal tabs** and start each service:

```bash
# Terminal 1 — Auth Service (port 4001)
cd services/auth-service && npm run dev

# Terminal 2 — Menu Service (port 4002)
cd services/menu-service && npm run dev

# Terminal 3 — Order Service (port 4003)
cd services/order-service && npm run dev

# Terminal 4 — Apollo Gateway (port 4000)
cd gateway && npm run dev
```

### Access the API

Open Apollo Sandbox at:

```
http://localhost:4000/graphql
```

---

## 📡 GraphQL API Reference

### Auth Service

```graphql
# Register a new user
mutation Register {
  register(input: { name: "Jane", email: "jane@food.io", password: "secret" }) {
    token
    user { id name email role }
  }
}

# Login and receive JWT
mutation Login {
  login(email: "jane@food.io", password: "secret") {
    token
  }
}
```

### Menu Service

```graphql
# Fetch all menu items
query GetMenu {
  menuItems {
    id
    name
    price
    category
    available
  }
}

# Add item (ADMIN only)
mutation AddMenuItem {
  addMenuItem(input: { name: "Butter Chicken", price: 12.99, category: "MAIN" }) {
    id name price
  }
}
```

### Order Service

```graphql
# Place a new order (authenticated)
mutation PlaceOrder {
  createOrder(input: { items: ["item_01", "item_02"] }) {
    id
    status
    total
    createdAt
  }
}

# Track your orders
query MyOrders {
  myOrders {
    id status total items { name price }
  }
}
```

---

## 🧠 Concepts Practiced

<details>
<summary><strong>GraphQL Federation</strong></summary>

Learned how Apollo Federation enables teams to independently develop, deploy, and scale individual subgraph services that are composed into a unified supergraph by the gateway. Implemented `@key` directives for entity ownership and `__resolveReference` for cross-service entity resolution.

</details>

<details>
<summary><strong>JWT Auth Flow</strong></summary>

Built a complete stateless authentication system — token generation on login/register, token validation middleware, and context injection for downstream resolvers to access the authenticated user without re-querying a database.

</details>

<details>
<summary><strong>Role-Based Access Control</strong></summary>

Implemented fine-grained authorization by reading user roles from the GraphQL context and enforcing permissions at the resolver level. `ADMIN` roles unlock mutation access; standard users are limited to queries and their own data.

</details>

<details>
<summary><strong>Context API in GraphQL</strong></summary>

Used Apollo Server's `context` function as request-level middleware — extracting and verifying JWTs on every incoming request and making the decoded user available throughout the entire resolver chain.

</details>

<details>
<summary><strong>Microservices Communication</strong></summary>

Explored how services communicate indirectly through the gateway's schema composition rather than direct service-to-service calls, maintaining loose coupling while enabling the gateway to stitch cross-service data.

</details>

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js (ES Modules) |
| HTTP Framework | Express.js |
| API Layer | GraphQL + Apollo Server |
| Federation | Apollo Gateway + Apollo Federation |
| Authentication | JSON Web Tokens (`jsonwebtoken`) |
| Dev Experience | Nodemon |
| Cross-Origin | CORS |
| API Testing | Apollo Sandbox / GraphQL Playground |

---

## 📖 Learning Goals Achieved

- [x] GraphQL schema design (types, queries, mutations, resolvers)
- [x] Apollo Server setup and configuration
- [x] Subgraph creation with Apollo Federation directives
- [x] Gateway composition of multiple subgraphs
- [x] Stateless JWT authentication system
- [x] Middleware-level auth via GraphQL Context API
- [x] Role-based authorization on mutations
- [x] Federated entity resolution with `@key` + `__resolveReference`
- [x] Modular, scalable service architecture
- [x] End-to-end API testing via GraphQL Sandbox
- [x] Distributed backend debugging and schema validation

---

## 🗺️ Roadmap

- [ ] Add PostgreSQL / MongoDB persistence per service
- [ ] Introduce a Notification Service (WebSockets / subscriptions)
- [ ] Add rate limiting and request validation middleware
- [ ] Containerize all services with Docker Compose
- [ ] Add health check endpoints per service
- [ ] CI/CD pipeline with schema validation checks

---

<div align="center">

**Built to learn. Designed to scale.**

*FoodHub Microservices Backend — GraphQL Federation in practice*

</div>
