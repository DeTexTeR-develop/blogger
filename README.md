# Blogger

A clean, full-stack blogging platform built with Node.js, Express, MongoDB, and EJS. Users can create accounts, write and publish blog posts, and manage their own content.

---

## Features

- **Authentication** — register, log in, and log out with cookie-based JWT sessions
- **Blog management** — create, read, edit, and delete blog posts
- **Ownership enforcement** — only the author of a post can edit or delete it
- **Protected routes** — unauthenticated users are redirected to login instead of seeing errors
- **Profile editing** — update username, last name, and email
- **Responsive UI** — Bootstrap 5 dark theme with a consistent design across all pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Auth | JWT via cookie (`detexter-auth-kit`) |
| Styling | Bootstrap 5.3.8 (dark theme) |
| Dev server | Nodemon |

---

## Project Structure

```
├── config/
│   └── dbConnection.js       # Mongoose connection
├── controllers/
│   ├── blogs.js              # Blog CRUD logic
│   └── users.js              # User auth and profile logic
├── middleware/
│   ├── auth.js               # JWT cookie verification
│   └── requireAuth.js        # Route guard — redirects to login
├── models/
│   ├── blogs.js              # Blog schema (auto-slug on title)
│   └── users.js              # User schema (hashed password)
├── routes/
│   ├── blogs.js              # Blog routes
│   └── users.js              # User routes
├── views/
│   ├── partials/
│   │   ├── head.ejs          # Bootstrap CSS
│   │   ├── navbar.ejs        # Shared navigation bar
│   │   ├── scripts.ejs       # Bootstrap JS
│   │   └── theme.ejs         # Shared dark theme styles
│   ├── home.ejs              # Landing page
│   ├── blogs.ejs             # Blog list view
│   ├── blog.ejs              # Single blog post view
│   ├── create_blog.ejs       # Create blog form
│   ├── edit_blog.ejs         # Edit blog form
│   ├── login.ejs             # Login form
│   ├── signup.ejs            # Sign up form
│   └── edit_user.ejs         # Edit profile form
├── .env                      # Environment variables (not committed)
├── index.js                  # App entry point
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd blogging_project
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the project root

```env
MONGO_URL=mongodb://localhost:27017/blogger
JWT_SECRET=your_super_secret_key
```

4. Start the development server

```bash
npm run dev
```

The app will be running at `http://localhost:8000`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens |

---

## Routes

### User Routes (`/user`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/user/sign-up` | — | Render sign up form |
| POST | `/user/sign-up` | — | Create new account |
| GET | `/user/login` | — | Render login form |
| POST | `/user/login` | — | Authenticate user |
| GET | `/user/logout` | — | Clear session cookie |
| GET | `/user/edit-user` | ✓ | Render edit profile form |
| POST | `/user/update-user` | ✓ | Update profile |
| DELETE | `/user/delete-user/:id` | ✓ | Delete account |

### Blog Routes (`/blogs`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/blogs` | — | List all blogs |
| GET | `/blogs/create` | ✓ | Render create form |
| POST | `/blogs` | ✓ | Publish new blog |
| GET | `/blogs/:slug` | — | View single blog |
| GET | `/blogs/:slug/edit` | ✓ | Render edit form (author only) |
| POST | `/blogs/:slug/edit` | ✓ | Update blog (author only) |
| POST | `/blogs/:slug/delete` | ✓ | Delete blog (author only) |

---

## Scripts

```bash
npm start       # Start with Node
npm run dev     # Start with Nodemon (auto-restart on changes)
```
