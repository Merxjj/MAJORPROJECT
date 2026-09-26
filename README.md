# Wanderlust

Wanderlust is a full-stack web application for creating, viewing, and managing property listings. The project is built using Node.js, Express.js, MongoDB, Mongoose, and EJS.

## Overview

Wanderlust provides a platform where users can browse property listings and manage listings through a simple web interface.

The current implementation focuses on the listing management functionality, including creating, viewing, editing, and deleting property listings.

## Features

* View all available property listings
* View details of an individual listing
* Create a new property listing
* Edit existing property listings
* Delete property listings
* Server-side rendering using EJS
* MongoDB database integration using Mongoose
* Form validation
* Error handling for invalid requests
* Reusable EJS layouts and partials
* Responsive frontend styling

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Other Tools and Libraries

* Method-Override
* Express-Error
* WrapAsync

## Project Structure

```text
Wanderlust/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   └── review.js
│
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── routes/
│   ├── listing.js
│   └── reviews.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   │
│   └── error.ejs
│
├── app.js
├── package.json
├── package-lock.json
└── schema.js
```

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Merxjj/MAJORPROJECT.git
```

### 2. Navigate to the project directory

```bash
cd MAJORPROJECT
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start MongoDB

Make sure MongoDB is installed and running on your system.

The application uses MongoDB as its database.

### 5. Start the application

```bash
node app.js
```

The application will start on the port configured in `app.js`.

Open the application in your browser using:

```text
http://localhost:8080
```

## Database

The application uses MongoDB with Mongoose for database management.

The main listing data is stored using the `Listing` model defined in:

```text
models/listing.js
```

Sample data can be initialized using the files inside the `init` directory.

## Error Handling

The project includes custom error handling using:

```text
utils/ExpressError.js
utils/wrapAsync.js
```

`wrapAsync` is used to handle asynchronous route errors, while `ExpressError` provides a structured approach for handling application errors.

## Validation

Listing data is validated before being stored in the database. The project uses schema-based validation to ensure that submitted listing information follows the required structure.

## Current Scope

The current version primarily focuses on property listing management, including:

* Creating listings
* Displaying listings
* Viewing individual listings
* Editing listings
* Deleting listings

Additional functionality can be integrated into the application as development continues.

## Future Improvements

Possible future improvements include:

* User authentication and authorization
* User-specific listing ownership
* Reviews and ratings
* Booking functionality
* Search and filtering
* Image upload and cloud storage
* Map and location integration
* Deployment to a cloud platform

## Author

**Meraj Alam**

B.Tech Computer Science and Engineering
IILM University, Greater Noida
