# WriteSpace

A simple and elegant blogging platform built with React 18+, Vite, and Tailwind CSS. WriteSpace allows users to create, manage, and share their blog posts with an intuitive interface.

## Features

- **User Authentication**: Secure login and registration system
- **Blog Management**: Create, edit, and delete blog posts
- **Admin Dashboard**: Special admin panel for managing users and content
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean, intuitive interface with Tailwind CSS styling

## Tech Stack

- **Frontend**: React 18+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **State Management**: React Context and localStorage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/writespace.git
   cd writespace
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Project Structure

```
writespace/
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Avatar.jsx
│   │   ├── BlogCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── PublicNavbar.jsx
│   │   ├── StatCard.jsx
│   │   └── UserRow.jsx
│   ├── pages/               # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── Home.jsx
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ReadBlog.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── UserManagement.jsx
│   │   └── WriteBlog.jsx
│   ├── utils/               # Utility functions
│   │   ├── auth.js
│   │   └── storage.js
│   ├── App.jsx             # Main app component with routing
│   ├── index.css           # Tailwind CSS imports
│   └── main.jsx            # React entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## Usage

### Default Credentials

For quick testing, use these default credentials:

- **Admin User**:
  - Username: `admin`
  - Password: `admin123`

### User Roles

- **Regular Users**: Can create, edit, and delete their own posts
- **Admin Users**: Can manage all posts and users

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Configuration

### Environment Variables

Create a `.env` file in the root directory for environment-specific configurations:

```
VITE_API_BASE_URL=https://api.example.com
```

### Tailwind CSS

Customize the Tailwind configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Deployment

### Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [Vite](https://vitejs.dev/)