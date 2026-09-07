# React + Vite + Supabase Task Manager

A simple and responsive task management application built with **React**, **Vite**, and **Supabase**.

The application allows users to create, view, update, and delete tasks while storing task data in a Supabase PostgreSQL database.

## Features

* Create new tasks with a title and description
* View all saved tasks
* Mark tasks as completed or not completed
* Delete tasks
* Task count display
* Loading state while creating tasks
* Error handling for Supabase operations
* Responsive layout for desktop, tablet, and mobile screens
* Supabase Row Level Security (RLS) policies
* Environment variables for Supabase configuration

## Technologies Used

* React
* Vite
* JavaScript
* Supabase
* PostgreSQL
* CSS
* Git & GitHub
* GitHub Actions

## Project Structure

```text
src/
├── App.css
├── App.jsx
├── TaskManager.jsx
├── main.jsx
└── supabaseClient.js

.github/
└── workflows/
    └── linters.yml

.env.example
.gitignore
LICENSE
package.json
vite.config.js
```

## Supabase Database

The project uses a Supabase table named `tasks`.

The table contains the following columns:

| Column        | Type        | Description                                     |
| ------------- | ----------- | ----------------------------------------------- |
| `id`          | UUID        | Primary key generated automatically             |
| `title`       | text        | Task title                                      |
| `description` | text        | Task description                                |
| `completed`   | boolean     | Tracks whether the task is completed            |
| `created_at`  | timestamptz | Automatically records when the task was created |

Row Level Security is enabled for the `tasks` table with policies allowing the application to perform the required CRUD operations.

## Environment Variables

Create a `.env.local` file in the root of the project and add your own Supabase project credentials:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

A `.env.example` file is included in the repository as a template.

**Do not commit your `.env.local` file or your actual Supabase credentials to GitHub.**

## Installation

Clone the repository:

```bash
git clone https://github.com/pearla-mutombo/week4-level3-supabase.git
```

Navigate into the project:

```bash
cd week4-level3-supabase
```

Install the dependencies:

```bash
npm install
```

Create your `.env.local` file using the variables shown in `.env.example`.

Start the development server:

```bash
npm run dev
```

The application will be available through the local Vite development server.

## Available Scripts

### Start the development server

```bash
npm run dev
```

### Run the linter

```bash
npm run lint
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## CRUD Functionality

The application demonstrates all four fundamental CRUD operations:

* **Create:** Add a new task using the task form.
* **Read:** Retrieve and display tasks stored in Supabase.
* **Update:** Change a task's completion status.
* **Delete:** Remove a task from the database.

## GitHub Actions

The project includes a GitHub Actions workflow located at:

```text
.github/workflows/linters.yml
```

The workflow installs project dependencies and runs the project's linter to help verify code quality on GitHub.

## Reflection

### What I Learned

This assignment gave me a better understanding of how a React application can communicate with a real backend and database using Supabase. I learned how to create and configure a Supabase project, design a database table, enable Row Level Security, create policies, and connect the database to a React application using the Supabase JavaScript client. I also strengthened my understanding of CRUD operations by implementing Create, Read, Update, and Delete functionality and seeing how each operation affects the data stored in the database.

I also learned more about organizing a React application into reusable and maintainable pieces. Instead of keeping all of the application logic in one component, I separated the Supabase client configuration from the Task Manager interface. Working through the React state and effect logic also helped me better understand how an application can retrieve data when it loads and update the interface when database changes occur.

Another important lesson was learning how environment variables should be handled in a frontend project. Using `.env.local` for my actual Supabase credentials and `.env.example` as a safe template helped me understand how to keep configuration information out of the GitHub repository.

### Challenges I Faced

One of the biggest challenges was configuring Supabase correctly and understanding how the database, Row Level Security policies, and React application work together. I had to make sure that the `tasks` table was structured correctly and that the appropriate policies allowed the application to perform the CRUD operations it needed.

Another challenge was troubleshooting React behavior and linting issues. The React linter identified a warning related to how the initial database request was handled inside `useEffect`. I had to understand why the warning was occurring and adjust the implementation without breaking the application's functionality. After making the change, I was able to run the linter again and achieve zero warnings and zero errors.

Testing the CRUD functionality was also an important part of the learning process. I tested creating tasks, reading them from Supabase, changing their completion status, and deleting them. Going through each operation helped me understand that a successful application is not just about getting the interface to display correctly; the frontend and database must work together reliably.

### Why I Would Continue Using Supabase

I would continue using Supabase for future projects because it provides many of the backend services I need without requiring me to build and maintain an entire backend from scratch. Having a PostgreSQL database, authentication options, Row Level Security, APIs, and other backend capabilities available through one platform makes it possible to focus more of my time on building the application's features and user experience.

Supabase is also a good fit for projects like this Task Manager because the data is structured and relational, while the application needs reliable CRUD operations. The Supabase client makes it straightforward for a React application to communicate with the database, and the platform provides security features such as Row Level Security that can be expanded as an application becomes more complex.

Most importantly, this assignment showed me that Supabase can help bridge the gap between a frontend application and a real database. I can see myself continuing to use it for future React projects, prototypes, and full-stack applications because it provides a practical way to add backend functionality while keeping the development workflow relatively simple.


## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
