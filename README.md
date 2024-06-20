# Yelpcamp
Key Features of YelpCamp:
User Authentication and Authorization:
Registration and Login: Users can create accounts, log in, and log out.
Authorization: Only authenticated users can post new campgrounds and reviews.
Campground Management:
Create: Users can add new campgrounds with details such as name, image, and description.
Read: Anyone can view the list of campgrounds and details about each one.
Update: Users can edit details of campgrounds they have posted.
Delete: Users can delete campgrounds they have posted.
Review System:
Users can add reviews to campgrounds.
Reviews include a rating system and text comments.
Users can delete their reviews.
User Interface:
A responsive and user-friendly interface using HTML, CSS, and frontend JavaScript.
Use of templating engines like EJS (Embedded JavaScript) for dynamic content rendering.
Data Persistence:
Use of MongoDB as the database to store user, campground, and review data.
Mongoose for object data modeling (ODM) to interact with MongoDB.
Middleware:
Use of Express middleware for session management, authentication (using Passport.js), and other functionalities.

Technologies Used:
Backend:
Node.js: Server-side JavaScript runtime.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database for storing campground and user data.
Mongoose: ODM library for MongoDB.

Frontend:
Bootstrap 5: For structuring and styling the web pages.
JavaScript: For interactivity and frontend logic.
EJS: Templating engine for rendering dynamic content.
Authentication:

Passport.js: Authentication middleware for Node.js to handle user login and registration
