# Yelpcamp
**Key Features of YelpCamp:**

**User Authentication and Authorization:**

Registration and Login: Users can create accounts, log in, and log out.

Authorization: Only authenticated users can post new campgrounds and reviews.

**Campground Management:**

Create: Users can add new campgrounds with details such as name, image, and description.

Read: Anyone can view the list of campgrounds and details about each one.

Update: Users can edit details of campgrounds they have posted.

Delete: Users can delete campgrounds they have posted.

**Review System:**

Users can add reviews to campgrounds.
Reviews include a rating system and text comments.
Users can delete their reviews.

**User Interface:**

A responsive and user-friendly interface using HTML, CSS, and frontend JavaScript.
Use of templating engines like EJS (Embedded JavaScript) for dynamic content rendering.

**Data Persistence:**

Use of MongoDB as the database to store user, campground, and review data.
Mongoose for object data modeling (ODM) to interact with MongoDB.

M**iddleware:**

Use of Express middleware for session management, authentication (using Passport.js), and other functionalities.

**Technologies Used:**

**Backend:**

Node.js: Server-side JavaScript runtime.
Express.js: Web application framework for Node.js.
MongoDB: NoSQL database for storing campground and user data.
Mongoose: ODM library for MongoDB.

**Frontend:**

Bootstrap 5: For structuring and styling the web pages.

JavaScript: For interactivity and frontend logic.

EJS: Templating engine for rendering dynamic content.

**Authentication:**

Passport.js: Authentication middleware for Node.js to handle user login and registration

**homepage**
![Homepage](https://github.com/user-attachments/assets/bc261f6f-12b6-4199-bd4b-04e0ad20d195)

if you are a new user you can register,if you are old user you can just log in 

if you did not log in you can not create campground and add review to the other campground,but you can see the campgrounds available

![authorization](https://github.com/user-attachments/assets/309a3d8a-6599-4d09-bd1f-b18e5e1f664d)

when you login in or create a account it will redirect you to the main page it will look like

![main_page](https://github.com/user-attachments/assets/14a04daa-6b54-4704-8cd3-00e76e24f5d3)

you can see that on the top left you dont see the log in icon because the browser remebers you are logged in using session

![loginout](https://github.com/user-attachments/assets/e22b0eaf-55fc-4a74-9e68-bbeef9cce6ec)
![currentuser](https://github.com/user-attachments/assets/fa7b25b7-14d3-4422-a866-83d94072b9a9)

 if you scroll the main page you will see this where you can click the view button to view the available campsite
 
![mainpage-2](https://github.com/user-attachments/assets/4c2a55b7-8c6e-46f1-a57b-b7cf0647e68b)

once you  clicked any campground you will see like this

![campground](https://github.com/user-attachments/assets/9f2de789-a30a-4a40-8a3b-a5d3a633e894)

if you are not a owner you will not see the edit or delete button to edit or delete the campground

![isAuthor](https://github.com/user-attachments/assets/e710a916-725f-4b9b-b94f-83fa7338bbe0)

form for creating a new campground

![newcampground](https://github.com/user-attachments/assets/fac2f592-c3e2-45c1-afac-a1717b767b21)

form for editing a campground

![edit-1](https://github.com/user-attachments/assets/d81fe706-9b1e-4a4c-bff5-444e66fb833a)
![edit-2](https://github.com/user-attachments/assets/887fc026-fc7a-41ed-a415-8c9cd85c49e8)


using cloudinary to store the images

![cloudinary code](https://github.com/user-attachments/assets/fc5a3011-82d0-4853-802f-67b3d054295d)


below code is the campground route code

![camroutes](https://github.com/user-attachments/assets/79020748-0ecd-4ed2-87af-69402d5b8509)

below code is review routes

![revroutes](https://github.com/user-attachments/assets/1381130f-daba-44a7-8c9a-6b2a381a5706)

below code is the user routes
![userroutes](https://github.com/user-attachments/assets/4bc61d50-1e0e-44d6-b62a-eee66a967840)
