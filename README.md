**Project Portfolio: Thoughtcanva**

**Overview:**
Thoughtcanva is a collaborative platform designed to foster the exchange of ideas among users. Leveraging a robust tech stack, including Node.js, Express, MySQL, Socket.io, and React.js, the application offers a secure and dynamic environment for sharing, editing, and discussing posts in real time.

**Key Features:**
1. **Secure Authentication with JWT:**
   - Implemented robust authentication using JSON Web Tokens (JWT) to ensure a secure user experience.

2. **Post Management:**
   - Users can seamlessly share, edit, delete, and update posts, providing a comprehensive set of tools for content management.

3. **Real-time Post Timeline Updates:**
   - Integrated WebSocket functionality to deliver real-time updates on the post timeline, enhancing the interactive and dynamic nature of the platform.

Below is a table summarizing the routes and their corresponding functionality in your provided Express.js API routers.

| Route                                | HTTP Method | Middleware   | Purpose                                           |
| ------------------------------------ | ----------- | ------------ | ------------------------------------------------- |
| `/feed/posts`                        | GET         | `isAuth`      | Get all posts in the feed                         |
| `/feed/post`                         | POST        | `isAuth`      | Create a new post                                 |
| `/feed/post/:postId`                 | GET         | `isAuth`      | Get a specific post by ID                         |
| `/feed/post/:postId`                 | PUT         | `isAuth`      | Update a specific post by ID                      |
| `/feed/post/:postId`                 | DELETE      | `isAuth`      | Delete a specific post by ID                      |
| `/auth/signup`                       | PUT         |              | User registration/signup                         |
| `/auth/login`                        | POST        |              | User login                                        |
| `/auth/status`                       | GET         | `isAuth`      | Get user status                                   |
| `/auth/status`                       | PATCH       | `isAuth`      | Update user status                                |

**Middleware:**
- `isAuth`: Checks if the user is authenticated before allowing access to the route.

**Purpose:**
- The routes in the `/feed` router handle CRUD operations for posts, including authentication checks and input validation.
- The routes in the `/auth` router handle user authentication, registration, login, and status-related operations, also incorporating authentication checks and input validation.

**GitHub Repository:**
[Thoughtcanva GitHub Repository](https://github.com/Rohitkr2510/thoughtcanva)

**Setup Instructions:**
To get started with Thoughtcanva, follow these simple steps:

1. **Clone the Repository:**
   ```
   git clone https://github.com/Rohitkr2510/thoughtcanva
   ```

2. **Update Database Credentials:**
   - In the `.env` file, update the database credentials to connect to your MySQL instance.

3. **Install Dependencies:**
   ```
   npm install
   ```

4. **Start the Application:**
   ```
   npm start
   ```

5. **Access the Website:**
   - The application will be hosted on `localhost:3000`.

**Demo:**
Visit [Thoughtcanva Live Demo](#) to experience the platform in action.

**Additional Information:**
- Refer to the README.md file for detailed instructions on configuration, deployment, and contribution guidelines.
- Explore the project structure, code organization, and security measures in place.

Feel free to reach out for any inquiries or collaboration opportunities!
