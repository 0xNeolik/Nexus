## Router

<br>

| Route                         | HTTP Verb | Description     |
| ----------------------------- | --------- | --------------- |
| `/`                           | GET       | Index           |
| `/auth/signup`                | GET       | Signup          |
| `/auth/signup`                | POST      | Signup          |
| `/auth/login`                 | GET       | Login           |
| `/auth/login`                 | POST      | Login           |
| `/auth/logout`                | GET       | Logout          |
| `/auth/:id`                   | GET       | user-profile    |
| `/auth/edit?id=xxx`           | GET       | edit-profile    |
| `/auth/:id/edit`              | POST      | edit-profile    |
| `/auth/:id/delete`            | POST      | delete-profile  |
| `/cyber`                      | GET       | Lista de Cybers |
| `/cyber/details-cyber?id=xxx` | GET       | Detalles Cyber  |
| `/cyber/book-cyber?id=xxx`    | GET       | Reservar Cyber  |
| `/cyber/create-new-cyber`     | GET       | Crear Cyber     |
| `/cyber/create-new-cyber`     | POST      | Crear Cyber     |
| `/cyber/delete?id=xxx`        | GET       | Borrar Cyber    |
| `/cyber/edit?id=xxx`          | GET       | Editar Cyber    |
| `/cyber/:id/edit`             | POST      | Editar Cyber    |
| `/cyber/:id/book`             | POST      | Ver Reservas    |

<br>
