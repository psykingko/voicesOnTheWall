# My Simple Blog

A modern, minimalist blog application built with Next.js (App Router), featuring a clean design and front-end-only data management using localStorage.

## Features

- 🏠 **Home Page**: Welcome message and list of all blog posts
- 📚 **All Blogs Page**: Paginated list with search functionality
- 📖 **Single Blog Post**: Full post view with formatted content
- ✍️ **Admin Upload**: Secure admin panel for publishing new posts
- 🔐 **Admin Authentication**: Password-protected admin access
- 💾 **Data Persistence**: Combines initial JSON data with localStorage
- 🎨 **Modern Design**: Clean, minimalist theme with Tailwind CSS
- 📱 **Responsive**: Works seamlessly on all device sizes

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **React**: 18.2
- **Styling**: Tailwind CSS
- **Data Storage**: JSON file + Browser localStorage

## Project Structure

```
prernaBlog/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── login/
│   │   │   │   └── page.js          # Admin login page
│   │   │   └── upload/
│   │   │       └── page.js          # Admin upload page
│   │   ├── blogs/
│   │   │   ├── [slug]/
│   │   │   │   └── page.js          # Single blog post page
│   │   │   └── page.js              # All blogs listing page
│   │   ├── globals.css              # Global styles
│   │   ├── layout.js                # Root layout with header/footer
│   │   └── page.js                  # Home page
│   ├── components/
│   │   ├── Header.js                # Site header component
│   │   └── Footer.js                # Site footer component
│   ├── data/
│   │   └── blogs.json               # Initial blog posts data
│   └── lib/
│       └── utils.js                 # Utility functions
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm package manager

### Installation Steps

1. **Navigate to the project directory** (if not already there):
   ```bash
   cd prernaBlog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   Or if you prefer yarn:
   ```bash
   yarn install
   ```
   Or if you prefer pnpm:
   ```bash
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Or:
   ```bash
   yarn dev
   ```
   Or:
   ```bash
   pnpm dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## How It Works

### Data Management

The application uses a hybrid approach for data storage:

1. **Initial Data**: Blog posts are stored in `src/data/blogs.json`
2. **New Posts**: Admin-uploaded posts are saved to browser localStorage
3. **Combined View**: All pages read from both sources, combining them seamlessly

### Admin Authentication

**Default Admin Password**: `admin123`

**How Admin Access Works**:

1. **Access Control**: Only authenticated admins can access `/admin/upload`
2. **Login Process**:
   - Navigate to "Admin Login" in the header
   - Enter the password: `admin123`
   - Upon successful login, you're redirected to the upload page
   - Authentication state is stored in localStorage

3. **Security Note**: 
   - This is a **front-end-only** application
   - The password is checked client-side (in `src/lib/utils.js`)
   - In a production environment, this should be handled by a secure backend
   - To change the password, edit the `checkAdminPassword` function in `src/lib/utils.js`

4. **Logout**: Click the "Logout" button on the admin upload page to end your session

### Changing the Admin Password

To change the admin password, edit `src/lib/utils.js`:

```javascript
export function checkAdminPassword(password) {
  // Change 'admin123' to your desired password
  return password === 'your-new-password';
}
```

**Important**: Since this is front-end only, anyone with access to the code can see the password. For production use, implement proper backend authentication.

## Usage Guide

### For Readers

1. **Home Page** (`/`): View welcome message and latest blog posts
2. **All Blogs** (`/blogs`): Browse all posts with pagination and search
3. **Single Post** (`/blogs/[slug]`): Read full blog post content

### For Admins

1. **Login**:
   - Click "Admin Login" in the header
   - Enter password: `admin123`
   - You'll be redirected to the upload page

2. **Publish a Blog Post**:
   - Fill in the title field
   - Write your content in the blog body textarea
   - Click "Publish Blog"
   - Your post will be saved to localStorage and appear immediately

3. **Content Formatting Tips**:
   - Use double line breaks for paragraphs
   - Use `## ` for headings
   - Use `### ` for subheadings
   - Use ` ``` ` for code blocks

## Customization

### Changing the Theme Colors

Edit `tailwind.config.js` to customize the primary color:

```javascript
colors: {
  primary: {
    // Your custom color palette
  },
}
```

### Modifying Initial Blog Posts

Edit `src/data/blogs.json` to add, remove, or modify initial blog posts.

### Changing Site Title

Edit the site title in:
- `src/components/Header.js` (displayed in header)
- `src/app/layout.js` (metadata)

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support
- JavaScript must be enabled

## Important Notes

1. **Data Persistence**: 
   - Posts saved via admin panel are stored in browser localStorage
   - Data is browser-specific (won't sync across devices/browsers)
   - Clearing browser data will remove uploaded posts

2. **Production Considerations**:
   - This is a front-end-only demo application
   - For production use, implement:
     - Backend API for data storage
     - Database for persistent storage
     - Proper authentication system
     - Server-side rendering for SEO

3. **SEO**: 
   - Consider implementing proper meta tags
   - Add sitemap generation
   - Implement server-side rendering for better SEO

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
npm run dev -- -p 3001
```

### localStorage Issues

If posts aren't saving:
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify localStorage is not disabled in browser settings

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `.next` folders
2. Run `npm install` again
3. Try building again

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please check the code comments or refer to the Next.js documentation.

---

**Enjoy blogging!** ✨

