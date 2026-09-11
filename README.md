# React + Vite + Supabase Secure Task Manager

A secure and responsive task management application built with **React**, **Vite**, and **Supabase**.

This project began as a basic Task Manager and was expanded into a secure, authenticated application. Users can register, log in, manage their own tasks, filter tasks by status, and securely store task data in a Supabase PostgreSQL database.

## Live Application

**Netlify:**
https://week4-level3-supabase.netlify.app

## GitHub Repository

**GitHub:**
https://github.com/pearla-mutombo/week4-level3-supabase

## Features

### Authentication

- Email and password registration
- Email and password login
- Logout functionality
- Persistent authentication session after page refresh
- Loading state while restoring the authentication session
- Clear authentication error messages
- Displays the logged-in user's email
- Protected task interface for authenticated users
- Anonymous authentication is not enabled

### Task Management

- Create tasks with a title and description
- View tasks belonging to the logged-in user
- Mark tasks as completed or not completed
- Delete tasks
- Display the number of tasks
- Loading state while creating tasks
- Error handling for database operations
- Tasks persist after refreshing the browser
- Responsive layout for desktop, tablet, and mobile screens

### Task Filters

Users can filter their tasks by:

- **All**
- **Active**
- **Completed**

### Security

- Supabase Row Level Security (RLS) is enabled
- Every task is associated with its creator through `user_id`
- Users can only view their own tasks
- Users can only create tasks for themselves
- Users can only update their own tasks
- Users can only delete their own tasks
- RLS policies use `auth.uid()` to identify the authenticated user
- An index is included on `user_id` for user-specific queries

## Technologies Used

- React
- Vite
- JavaScript
- Supabase
- PostgreSQL
- Supabase Authentication
- Supabase Row Level Security
- CSS
- Git
- GitHub
- GitHub Actions
- Netlify

## Project Structure

```text
week4-level3-supabase/
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── Auth.jsx
│   ├── TaskManager.jsx
│   ├── main.jsx
│   └── supabaseClient.js
│
├── supabase/
│   ├── migrations/
│   │   └── 001_add_task_ownership_and_rls.sql
│   │
│   └── queries/
│       └── incomplete_tasks.sql
│
├── .github/
│   └── workflows/
│       └── linters.yml
│
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
├── package-lock.json
└── vite.config.js
```

## Supabase Database

The application uses a Supabase PostgreSQL table named `tasks`.

### Tasks Table

| Column        | Type        | Description                                         |
| ------------- | ----------- | --------------------------------------------------- |
| `id`          | bigint      | Task identifier                                     |
| `created_at`  | timestamptz | Records when the task was created                   |
| `title`       | text        | Task title                                          |
| `description` | text        | Task description                                    |
| `completed`   | boolean     | Tracks whether the task is completed                |
| `user_id`     | uuid        | Identifies the authenticated user who owns the task |

The `user_id` column references the Supabase Auth users table.

## Row Level Security

Row Level Security is enabled on the `tasks` table.

The project includes four RLS policies:

- **SELECT:** Users can view only their own tasks.
- **INSERT:** Users can create tasks only for themselves.
- **UPDATE:** Users can update only their own tasks.
- **DELETE:** Users can delete only their own tasks.

The policies use:

```sql
auth.uid() = user_id
```

This means the database itself enforces task ownership instead of relying only on frontend code.

An index is also created on `user_id` to support user-specific task queries.

The complete database migration is located at:

```text
supabase/migrations/001_add_task_ownership_and_rls.sql
```

## SQL Practice

The project includes the required SQL practice query:

```text
supabase/queries/incomplete_tasks.sql
```

The query returns incomplete tasks from newest to oldest:

```sql
SELECT id, title, created_at
FROM public.tasks
WHERE completed = false
ORDER BY created_at DESC;
```

The query was tested successfully in the Supabase SQL Editor and does not modify database data.

## Environment Variables

Supabase configuration is stored using Vite environment variables.

Create a `.env.local` file in the root of the project:

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

A `.env.example` file is included as a safe template:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Actual environment credentials are not committed to GitHub.

The `.env.local` file is included in `.gitignore`.

## Installation

Clone the repository:

```bash
git clone https://github.com/pearla-mutombo/week4-level3-supabase.git
```

Navigate into the project:

```bash
cd week4-level3-supabase
```

Install dependencies:

```bash
npm install
```

Create your `.env.local` file using the variables shown in `.env.example`.

Start the development server:

```bash
npm run dev
```

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

- **Create:** Add a new task using the task form.
- **Read:** Retrieve and display tasks from Supabase.
- **Update:** Change a task's completion status.
- **Delete:** Remove a task from the database.

All CRUD operations are protected by Supabase Row Level Security.

## Testing

The application was tested locally and in the production Netlify environment.

### Authentication Testing

The following authentication functionality was tested:

- User registration
- User login
- Logout
- Session persistence after browser refresh
- Authentication loading state
- Authentication error handling
- Logged-in user email display
- Protected task interface

### User Separation and RLS Testing

Two separate user accounts were used to verify task ownership.

A task created by one account was not visible to the other account.

This confirmed that the RLS policies successfully prevent users from viewing another user's tasks.

### Production CRUD Testing

The deployed Netlify application was tested by:

1. Creating four tasks.
2. Viewing all four tasks.
3. Marking one task as completed.
4. Using the Completed filter.
5. Using the Active filter.
6. Deleting one task.
7. Confirming the total changed from four tasks to three tasks.
8. Refreshing the browser.
9. Confirming the same three tasks remained after refresh.
10. Confirming that two tasks remained In Progress and one remained Completed.

These tests confirmed that the production application communicates correctly with Supabase and that task data persists in the database.

## GitHub Workflow

Development was completed using a feature branch and pull request workflow.

The authentication and security work was developed on:

```text
feature/auth-and-rls
```

The feature branch was submitted through a pull request into `main`.

The pull request included:

- Authentication
- User-specific task ownership
- Row Level Security
- Database migration
- SQL practice query
- Authentication styling
- Testing information

The pull request was successfully merged into `main`.

GitHub Actions was configured to run the project linter.

The workflow is located at:

```text
.github/workflows/linters.yml
```

The project passed the lint checks with zero warnings and zero errors.

The production build also completed successfully.

## Deployment

The application is deployed to Netlify.

Production deployment is configured to use the `main` branch.

The required Supabase environment variables were configured in Netlify so authentication and database functionality work in production.

**Live application:**

https://week4-level3-supabase.netlify.app

## Reflection

### What I Learned

This assignment helped me move beyond building a frontend interface and taught me how to connect a React application to a real backend with authentication, a PostgreSQL database, and database-level security.

One of the most important things I learned was how Supabase Authentication works with a React application. I learned how to register users, log users in and out, restore an existing session after a page refresh, display the authenticated user's email, and protect the task interface so that it is only available to logged-in users.

I also learned much more about Row Level Security. Before this assignment, I understood the basic idea of database security, but this project helped me understand how important it is to enforce security at the database level. I learned how to connect each task to a specific authenticated user using `user_id` and how to use `auth.uid()` inside Supabase policies to make sure users can only access their own records.

Another major lesson was understanding how the frontend, authentication system, database, and security policies all work together. A task can be created successfully in React, but the database still needs to determine whether the authenticated user is allowed to create, view, update, or delete that task.

I also strengthened my understanding of CRUD operations, React state management, `useEffect`, environment variables, Git branches, pull requests, GitHub Actions, and deployment with Netlify.

### What I Added in This Assignment

I expanded the original Task Manager into a secure authenticated application.

The major additions included:

- Email/password registration
- Email/password login
- Logout functionality
- Persistent authentication sessions
- Authentication loading states
- Authentication error handling
- Logged-in user email display
- Protected task management
- User-specific task ownership
- Supabase Row Level Security
- SELECT, INSERT, UPDATE, and DELETE policies
- `user_id` database index
- All, Active, and Completed task filters
- Database migration
- SQL practice query
- Production deployment with Netlify
- Production authentication and CRUD testing
- GitHub Actions linting workflow
- Updated environment variable configuration

### Key Takeaways

My biggest takeaway from this assignment is that building a working application is more than creating an interface that looks good.

The database and security rules are equally important.

I learned that authentication identifies the user, but Row Level Security is what helps enforce what that user is actually allowed to access. This helped me understand why security should not depend only on frontend code.

I also learned the importance of testing an application from the user's perspective. Testing two different accounts helped me verify that one user's tasks were not visible to another user. Testing the production site also showed me why an application should be tested after deployment instead of assuming that a successful local build guarantees a successful production application.

Another important takeaway was learning to use GitHub branches and pull requests as part of a professional development workflow. Creating a feature branch, testing the changes, reviewing the pull request, and merging the completed work into `main` gave me more experience with a professional software development process.

### Challenges I Faced and How I Overcame Them

One of my biggest challenges was understanding how authentication, user ownership, and Row Level Security needed to work together. I had to make sure that every new task included the authenticated user's `user_id` and that the database policies matched that ownership. I overcame this by testing the policies directly in Supabase and then testing the application with two separate user accounts.

Another challenge was replacing the original public task policies with secure authenticated policies. I learned that simply adding authentication to the frontend is not enough if the database still allows unrestricted access. I removed the old public policies and verified that the new policies used `auth.uid()` to restrict access to each user's own tasks.

I also encountered React linting issues while working with the initial task-loading logic. Instead of ignoring the warning, I investigated the cause and changed the implementation so that the component could safely load its data without producing lint warnings. The final project passed the linter with zero warnings and zero errors.

Deployment presented another challenge. The Netlify production deployment initially pointed to the feature branch instead of the final `main` branch. I identified the problem, changed the production branch configuration to `main`, and triggered the correct production deployment. I then tested the live application again to make sure the deployed version included the final authentication styling and functionality.

Testing the final production application also taught me the importance of verifying data persistence. After creating, completing, and deleting tasks, I refreshed the live application and confirmed that the correct three remaining tasks were still present with their completion states preserved.

### Why I Would Continue Using Supabase

I would continue using Supabase because it provides several important backend services in one platform. It provides PostgreSQL database functionality, authentication, APIs, Row Level Security, and other backend tools without requiring me to build an entire backend from scratch.

Supabase was especially useful for this project because the Task Manager needed both authentication and user-specific database security. The combination of Supabase Authentication and Row Level Security allowed me to build a more secure application while continuing to work primarily with React.

This assignment showed me that Supabase can help bridge the gap between a frontend application and a real production database. I can see myself using Supabase in future React projects and full-stack applications where authentication, structured data, and secure database access are important.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
