/**
 * Get blog image path based on blog ID
 * Tries multiple naming patterns: {id}th.jpeg, {id}.jpeg, {id}.jpg, {id}.png
 */
export function getBlogImage(blogId) {
  if (!blogId) return null;
  
  // Try different naming patterns
  const patterns = [
    `${blogId}th.jpeg`,
    `${blogId}th.jpg`,
    `${blogId}th.png`,
    `${blogId}.jpeg`,
    `${blogId}.jpg`,
    `${blogId}.png`,
  ];
  
  // Return the first pattern (we'll handle missing images in the component)
  // In a real app, you might want to check if the file exists
  return `/${patterns[0]}`;
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get excerpt from content (first few lines or first 150 characters)
 */
export function getExcerpt(content, maxLength = 150) {
  if (!content) return '';
  const text = content.replace(/\n/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Get all blog posts from both JSON file and localStorage
 */
export function getAllBlogs() {
  // Get initial blogs from JSON (this would normally come from an API)
  // For now, we'll import it directly in the component
  const localStorageBlogs = getBlogsFromLocalStorage();
  return localStorageBlogs;
}

/**
 * Get blogs from localStorage
 */
export function getBlogsFromLocalStorage() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('blogPosts');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

/**
 * Save a blog post to localStorage
 */
export function saveBlogToLocalStorage(blogPost) {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingBlogs = getBlogsFromLocalStorage();
    const newBlog = {
      ...blogPost,
      id: Date.now().toString(), // Simple ID generation
    };
    existingBlogs.unshift(newBlog); // Add to beginning
    localStorage.setItem('blogPosts', JSON.stringify(existingBlogs));
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
}

/**
 * Update a blog post in localStorage
 */
export function updateBlogInLocalStorage(blogId, updatedBlog) {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingBlogs = getBlogsFromLocalStorage();
    const blogIndex = existingBlogs.findIndex(blog => blog.id === blogId);
    
    if (blogIndex === -1) {
      return false; // Blog not found in localStorage
    }
    
    existingBlogs[blogIndex] = {
      ...existingBlogs[blogIndex],
      ...updatedBlog,
      id: blogId, // Preserve the ID
    };
    
    localStorage.setItem('blogPosts', JSON.stringify(existingBlogs));
    return true;
  } catch (error) {
    console.error('Error updating blog in localStorage:', error);
    return false;
  }
}

/**
 * Delete a blog post from localStorage
 */
export function deleteBlogFromLocalStorage(blogId) {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingBlogs = getBlogsFromLocalStorage();
    const filteredBlogs = existingBlogs.filter(blog => blog.id !== blogId);
    
    if (filteredBlogs.length === existingBlogs.length) {
      return false; // Blog not found
    }
    
    localStorage.setItem('blogPosts', JSON.stringify(filteredBlogs));
    
    // Also delete associated comments
    deleteCommentsBySlug(getBlogSlugById(blogId));
    
    return true;
  } catch (error) {
    console.error('Error deleting blog from localStorage:', error);
    return false;
  }
}

/**
 * Get blog slug by ID (for deleting comments)
 */
function getBlogSlugById(blogId) {
  if (typeof window === 'undefined') return null;
  
  try {
    const blogs = getBlogsFromLocalStorage();
    const blog = blogs.find(b => b.id === blogId);
    return blog ? blog.slug : null;
  } catch (error) {
    return null;
  }
}

/**
 * Delete all comments for a specific blog post slug
 */
function deleteCommentsBySlug(postSlug) {
  if (typeof window === 'undefined' || !postSlug) return;
  
  try {
    const allComments = getAllComments();
    const filteredComments = allComments.filter(comment => comment.postSlug !== postSlug);
    localStorage.setItem('blogComments', JSON.stringify(filteredComments));
  } catch (error) {
    console.error('Error deleting comments:', error);
  }
}

/**
 * Check if a blog is editable (exists in localStorage)
 */
export function isBlogEditable(blogId) {
  if (typeof window === 'undefined') return false;
  
  const blogs = getBlogsFromLocalStorage();
  return blogs.some(blog => blog.id === blogId);
}

/**
 * Get a blog by ID from localStorage
 */
export function getBlogById(blogId) {
  if (typeof window === 'undefined') return null;
  
  const blogs = getBlogsFromLocalStorage();
  return blogs.find(blog => blog.id === blogId) || null;
}

/**
 * Combine initial JSON blogs with localStorage blogs
 */
export function combineBlogs(initialBlogs) {
  const localStorageBlogs = getBlogsFromLocalStorage();
  // Combine and sort by date (newest first)
  const allBlogs = [...localStorageBlogs, ...initialBlogs];
  return allBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Admin authentication helpers
 */
export function isAdminAuthenticated() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('adminAuthenticated') === 'true';
}

export function setAdminAuthenticated(value) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('adminAuthenticated', value ? 'true' : 'false');
}

export function checkAdminPassword(password) {
  // Default password: "admin123" (should be changed in production)
  // In a real app, this would be checked against a backend
  return password === 'admin123';
}

/**
 * Comment management functions
 */

/**
 * Get all comments from localStorage
 */
export function getAllComments() {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('blogComments');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading comments from localStorage:', error);
    return [];
  }
}

/**
 * Get comments for a specific blog post by slug
 */
export function getCommentsBySlug(postSlug) {
  const allComments = getAllComments();
  return allComments
    .filter(comment => comment.postSlug === postSlug)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first
}

/**
 * Get comment count for a specific blog post
 */
export function getCommentCount(postSlug) {
  const comments = getCommentsBySlug(postSlug);
  return comments.length;
}

/**
 * Save a comment to localStorage
 */
export function saveComment(comment) {
  if (typeof window === 'undefined') return false;
  
  try {
    const existingComments = getAllComments();
    const newComment = {
      ...comment,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9), // Unique ID
      date: new Date().toISOString(), // Full timestamp
    };
    existingComments.push(newComment);
    localStorage.setItem('blogComments', JSON.stringify(existingComments));
    return true;
  } catch (error) {
    console.error('Error saving comment to localStorage:', error);
    return false;
  }
}

/**
 * Format comment date for display
 */
export function formatCommentDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

