# LOANEASY CLIENT System

## Overview

The Loan Management System is a comprehensive web application designed to streamline the process of applying for loans, managing loan repayments, and administering loan applications. Built with React, it leverages Vite for rapid development and build times, ensuring a fast and efficient workflow. The application is architected with a modular approach, utilizing hooks for state management and context for user authentication and authorization.

## Features

- **User Authentication**: Secure login and signup processes with token-based authentication.
- **Loan Application**: Users can apply for loans by specifying the loan amount, term, and repayment frequency.
- **Loan Repayments**: Detailed view of loan repayments, including pending, paid, and approved statuses.
- **Admin Dashboard**: Admin users can approve loan applications and manage all loans.
- **Responsive Design**: The application is designed to be responsive, providing a seamless experience across devices.
- **Error Handling**: Robust error handling to ensure a smooth user experience.


## Tech Stack
- **Frontend**: React, Vite, Axios, TailwindCSS
- **Backend**: Node.js, Express.js (Assumed based on the API calls)
- **Database**: MongoDB (Assumed based on common practices)
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API, Hooks
- **Styling**: TailwindCSS

## Installation

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   ```

2. **Install Dependencies**:
   Navigate to the project directory and run:
   ```
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add the following variable:
   ```
   VITE_APP_BASE_URL=https://loaneasy-server.onrender.com
   ```

4. **Run the Application**:
   ```
   npm run dev
   ```
   This command starts the development server. Open `http://localhost:3000` in your browser to view the application.

## Usage

- **Login/Signup**: Navigate to the `/login` route to log in or sign up.
- **Apply for a Loan**: Navigate to the root route (`/`) to apply for a loan.
- **View Loans**: Navigate to `/allloans` to view all your loans and their repayment details.
- **Admin Dashboard**: Admin users can access the admin dashboard at `/admin` to manage loan applications.

## Admin Login

For admin login, use the following credentials:
- Email: `admin@gmail.com`
- Password: `adi123`

## Contributing

Contributions are welcome. Please feel free to submit pull requests or open issues for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
