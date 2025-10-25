# NestJS Boilerplate Application

## Description
This project is a robust backend application built with NestJS, designed to provide a secure and scalable user authentication and authorization system. It facilitates a complete user onboarding flow, including registration, login, profile management, and secure access control. The application integrates with a relational database via Sequelize for data persistence and includes features for file uploads and administrative functionalities.

## Features
*   **User Management**: Registration, login, password reset, and profile updates.
*   **Role-Based Access Control (RBAC)**: Define and manage user roles and permissions.
*   **File Uploads**: Securely upload and manage user-related files (e.g., avatars).
*   **Database Integration**: Sequelize ORM for interacting with a relational database (e.g., PostgreSQL, MySQL).
*   **Admin Module**: Dedicated module for administrative tasks and user management.
*   **Modular Architecture**: Organized into distinct modules for better maintainability and scalability.
*   **Environment Configuration**: Flexible configuration using `.env` files.

## How the Application Works

The application is structured around several key modules that work together to provide a comprehensive user management and authentication system.

1.  **JWT Verification (JwtStrategy)**:
    *   The `JwtStrategy` (located in [`src/front/auth/jwt.strategy.ts`](src/front/auth/jwt.strategy.ts)) intercepts incoming requests containing a JWT.
    *   It validates the token's signature and expiration using Auth0's public keys.
    *   If the token is valid, the user's information (from the token payload) is attached to the request object, making it accessible to controllers and services.

2.  **Guards (JwtAuthGuard)**:
    *   The `JwtAuthGuard` (located in [`src/front/auth/jwt-auth.guard.ts`](src/front/auth/jwt-auth.guard.ts)) is applied to routes that require authentication.
    *   It leverages the `JwtStrategy` to ensure that only authenticated users can access protected resources.

3.  **User and Role Management (Sequelize Models)**:
    *   The application uses Sequelize ORM to interact with the database.
    *   `User` (defined in [`src/models/user.model.ts`](src/models/user.model.ts)) and `Role` (defined in [`src/models/role.model.ts`](src/models/role.model.ts)) models represent the core entities.
    *   The `RoleUser` model (defined in [`src/models/role-user.model.ts`](src/models/role-user.model.ts)) manages the many-to-many relationship between users and roles.
    *   Migrations (e.g., [`src/database/migrations/20251011064859-create-users-roles.js`](src/database/migrations/20251011064859-create-users-roles.js)) handle database schema changes, and seeders (e.g., [`src/database/seeders/20251011065502-initial-roles.js`](src/database/seeders/20251011065502-initial-roles.js)) populate initial data.

4.  **Profile Management**:
    *   The `ProfileModule` (located in [`src/front/profile/profile.module.ts`](src/front/profile/profile.module.ts)) handles operations related to user profiles, such as updating user details.
    *   `ProfileController` (located in [`src/front/profile/profile.controller.ts`](src/front/profile/profile.controller.ts)) exposes API endpoints for profile actions, and `ProfileService` (located in [`src/front/profile/profile.service.ts`](src/front/profile/profile.service.ts)) contains the business logic.

5.  **File Uploads**:
    *   The `UploadsModule` (located in [`src/front/uploads/uploads.module.ts`](src/front/uploads/uploads.module.ts)) provides functionality for users to upload files.
    *   `UploadsController` (located in [`src/front/uploads/uploads.controller.ts`](src/front/uploads/uploads.controller.ts)) handles incoming file requests, and `UploadsService` (located in [`src/front/uploads/uploads.service.ts`](src/front/uploads/uploads.service.ts)) manages the storage and retrieval of these files.

6.  **Configuration**:
    *   The application uses configuration files like [`src/config/auth0.config.ts`](src/config/auth0.config.ts) for Auth0 settings and [`src/config/database.config.ts`](src/config/database.config.ts) for database connection details.
    *   Sensitive information is managed through environment variables, typically loaded from a `.env` file.

## Installation

### Prerequisites
*   Node.js (LTS version recommended)
*   npm or Yarn
*   A relational database (e.g., PostgreSQL, MySQL)
*   An Auth0 account and application setup

### Setup Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Abdul-dewaswala/nestjs-boilerplate
    cd nestjs-boilerplate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the project root based on `.env.example` and fill in your Auth0 and database credentials.

4.  **Run database migrations:**
    ```bash
    npx sequelize-cli db:migrate
    ```

5.  **Seed initial data (optional):**
    ```bash
    npx sequelize-cli db:seed:all
    ```

6.  **Start the application:**
    ```bash
    npm run start:dev
    # or
    yarn start:dev
    ```
    The application will typically run on `http://localhost:3000`.

7.  **Start the application:**

    check api collection `http://localhost:3000/api/docs`

## Usage

Once the application is running, you can interact with its API endpoints using tools like Postman, Insomnia, or `curl`.

### Example API Endpoints:

*   **Register User**: `POST /auth/register`
*   **Login User**: `POST /auth/login`
*   **Get Profile**: `GET /profile` (requires JWT in `Authorization` header)
*   **Update Profile**: `PATCH /profile` (requires JWT)
*   **Upload Avatar**: `POST /uploads/avatar` (requires JWT and multipart/form-data)

Refer to the controller files (e.g., [`src/front/auth/auth.controller.ts`](src/front/auth/auth.controller.ts), [`src/front/profile/profile.controller.ts`](src/front/profile/profile.controller.ts)) for a complete list of available endpoints and their expected payloads.

## Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Technologies Used
*   **NestJS**: A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
*   **Sequelize**: A promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
*   **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
*   **Passport.js**: Simple, unobtrusive authentication for Node.js.
*   **JWT (JSON Web Tokens)**: A compact, URL-safe means of representing claims to be transferred between two parties.
*   **dotenv**: Loads environment variables from a `.env` file.
