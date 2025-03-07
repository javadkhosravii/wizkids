# Wizkids Management App

A modern web application for managing Wizkids profiles. This project demonstrates authentication, state management with Redux Toolkit, and a sleek UI built using ShadCN design components and Tailwind CSS.



Introduction
The Wizkids Management App is designed to help manage user profiles (referred to as Wizkids) in a simple yet scalable application. It includes features such as firing/unfiring users, editing profiles, and automatically removing wizkids after a set period. The project is built using modern web development practices and tools.

## Features

- **User Authentication:** Secure login and logout functionality.
- **Profile Management:** Create, update, and delete Wizkid profiles.
- **State Management:** Centralized state management using Redux Toolkit.
- **Automated Cleanup:** Automatically purge fired profiles after a configurable time period.
- **Responsive UI:** Built with ShadCN design components and Tailwind CSS for a modern, responsive interface.
- **Conditional Rendering:** Different views for authenticated users and guests, including informative toast notifications.


## Technologies Used

- **Next.js:** A React framework for server-side rendering and fast web applications.
- **React:** A JavaScript library for building user interfaces.
- **Redux Toolkit:** Simplifies Redux state management.
- **TypeScript:** Provides static typing for improved code quality.
- **ShadCN UI:** A component library that integrates well with Tailwind CSS to deliver a clean, modern design.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Sonner:** For toast notifications.
- **Other:** Standard web technologies like HTML5, CSS3, and JavaScript.


Install Dependencies:

bash
Copy
npm install
# or
yarn install


Start the development server:

bash
Copy
npm run dev
# or
yarn dev

Testing the Features:

Log in as an authenticated user.
Create or update Wizkid profiles.
Fire a Wizkid to test the automated remove functionality.
As a guest, notice that some features are restricted and a toast message will prompt you to sign in.
