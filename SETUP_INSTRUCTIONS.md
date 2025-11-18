# Complete Setup Instructions

## Quick Start Guide

Follow these steps to get your blog application up and running:

### Step 1: Verify Prerequisites

Make sure you have Node.js installed (version 18.x or higher):

```bash
node --version
```

If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/)

### Step 2: Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
npm install
```

This will install all required packages:
- Next.js
- React
- Tailwind CSS
- And other dependencies

**Expected output**: You should see packages being installed. Wait for the process to complete.

### Step 3: Start Development Server

Run the development server:

```bash
npm run dev
```

**Expected output**: 
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

### Step 4: Open in Browser

Open your web browser and navigate to:
```
http://localhost:3000
```

You should see the blog homepage!

## Admin Access Setup

### How to Access Admin Panel

1. **Navigate to Admin Login**:
   - Click on "Admin Login" in the header navigation
   - Or go directly to: `http://localhost:3000/admin/login`

2. **Enter Password**:
   - Default password: `admin123`
   - Enter the password and click "Login"

3. **Access Upload Page**:
   - After successful login, you'll be redirected to `/admin/upload`
   - You can now publish new blog posts

### Changing the Admin Password

**Important**: Since this is a front-end-only application, the password is stored in the code. To change it:

1. Open `src/lib/utils.js`
2. Find the `checkAdminPassword` function (around line 99)
3. Change the password:

```javascript
export function checkAdminPassword(password) {
  // Change 'admin123' to your desired password
  return password === 'your-new-secure-password';
}
```

4. Save the file
5. The new password will be active immediately (no restart needed)

### Security Considerations

**Current Implementation**:
- Password is checked client-side
- Anyone with access to the source code can see the password
- Authentication state is stored in localStorage

**For Production Use**:
- Implement a backend API
- Use secure authentication (JWT tokens, sessions)
- Store passwords securely (hashed, never plain text)
- Use environment variables for sensitive data
- Implement proper access control

## How Admin-Only Access Works

### Authentication Flow

1. **User clicks "Admin Login"** → Redirected to `/admin/login`
2. **User enters password** → Checked against stored password
3. **If correct**:
   - `adminAuthenticated` flag set to `true` in localStorage
   - User redirected to `/admin/upload`
4. **If incorrect**:
   - Error message displayed
   - User stays on login page

### Protected Routes

The `/admin/upload` page checks authentication:

```javascript
useEffect(() => {
  if (!isAdminAuthenticated()) {
    router.push('/admin/login');
  }
}, [router]);
```

**What this means**:
- If not authenticated, users are automatically redirected to login
- Only authenticated admins can access the upload page
- Regular users cannot access `/admin/upload` directly

### Logout

- Click "Logout" button on the admin upload page
- Removes authentication from localStorage
- User is redirected to home page

## Testing the Application

### Test as a Reader

1. Visit `http://localhost:3000`
2. Browse blog posts on the home page
3. Click "All Blogs" to see paginated list
4. Use the search bar to filter posts
5. Click on any post to read the full content

### Test as an Admin

1. Go to `/admin/login`
2. Enter password: `admin123`
3. After login, go to `/admin/upload`
4. Fill in the form:
   - Title: "My First Post"
   - Content: "This is my first blog post!"
5. Click "Publish Blog"
6. You should see a success message
7. Navigate back to home page - your new post should appear!

## Common Commands

### Development
```bash
npm run dev          # Start development server
```

### Production Build
```bash
npm run build        # Create production build
npm start            # Start production server
```

### Linting
```bash
npm run lint         # Run ESLint
```

## Troubleshooting

### Issue: "Port 3000 is already in use"

**Solution**: Use a different port:
```bash
npm run dev -- -p 3001
```
Then access: `http://localhost:3001`

### Issue: "Module not found" errors

**Solution**: 
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

### Issue: Styles not loading

**Solution**:
1. Ensure Tailwind CSS is properly configured
2. Check that `postcss.config.js` exists
3. Restart the development server

### Issue: Posts not saving

**Solution**:
1. Check browser console for errors
2. Ensure localStorage is enabled in browser
3. Try in a different browser
4. Clear browser cache and try again

### Issue: Can't access admin panel

**Solution**:
1. Make sure you're logged in first (`/admin/login`)
2. Check browser console for errors
3. Clear localStorage and try logging in again
4. Verify the password is correct (default: `admin123`)

## Next Steps

1. **Customize the Design**: Edit Tailwind config and components
2. **Add More Features**: Comments, categories, tags, etc.
3. **Deploy**: Deploy to Vercel, Netlify, or your preferred hosting
4. **Add Backend**: Implement proper database and API
5. **Enhance Security**: Add proper authentication system

## Need Help?

- Check the main `README.md` for more details
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Check Tailwind CSS docs: [tailwindcss.com/docs](https://tailwindcss.com/docs)

---

**Happy Blogging!** 🚀

