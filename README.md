
RESTful API for Authentication, User Management, and Post Operations
This README file provides an overview and guidelines for using the RESTful API designed to handle user authentication, user management, and post operations such as creation, viewing, updating, and deletion, as well as mechanisms for following and showing followed posts.
 
Introduction
This RESTful API provides endpoints for user authentication, user management, and post operations. It's designed to be intuitive, secure, and efficient for building applications requiring user authentication and interaction with posts.

Authentication
Authentication is handled using JSON Web Tokens (JWT). Upon successful authentication, a JWT token is provided, which should be included in the header of subsequent requests for authorization.

User Management
User management endpoints allow users to sign up, log in, update their profiles, and delete their accounts.

Post Operations
Post operations include creating, viewing, updating, and deleting posts. Users can interact with posts by performing these operations.

Following Mechanism
The API supports a following mechanism where users can follow other users and view posts from users they follow.

Endpoints
The following endpoints are available:

/api/auth/signup: Sign up a new user.
/api/auth/login: Log in existing user and receive JWT token.

/api/userProfile/{userId}:
GET: Get user profile.
PUT: Update user profile.
DELETE: Delete user account.

/api/post:
GET: Get all posts.
POST: Create a new post.
/api/posts/{postId}:
GET: Get details of a specific post.
PUT: Update a specific post.
DELETE: Delete a specific post.
/api/users/{userId}/follow:
POST: Follow a user.
/api/users/{userId}/unfollow:
POST: Unfollow a user.
/api/users/{userId}/following:
GET: Get posts from users followed by the specified user.
Usage.

To use the API, send HTTP requests to the appropriate endpoints using the appropriate HTTP methods (GET, POST, PUT, DELETE). Include necessary parameters and headers as required.

Ensure to handle responses appropriately, especially for authentication and error handling.
