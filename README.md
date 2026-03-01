# 📚 Islamic Book Store

A beautiful, modern static website for an Islamic bookstore. Built with pure HTML and CSS, no frameworks or backend required.

## 🌐 Live Demo

- **GitHub Pages:** [https://muhammadsamiullah0786.github.io/islamic-book-store/](https://muhammadsamiullah0786.github.io/islamic-book-store/)
- **Vercel:** [https://website-two-delta-38.vercel.app](https://website-two-delta-38.vercel.app)
- **GitHub Repository:** [https://github.com/muhammadsamiullah0786/islamic-book-store](https://github.com/muhammadsamiullah0786/islamic-book-store)

## ✨ Features

- 📖 Multiple pages (Shop, Product, Cart, Checkout, Blog, About, Contact, FAQ, Account)
- 🎨 Modern dark theme with gradient effects
- 📱 Fully responsive design
- ⚡ Fast and lightweight (no JavaScript required)
- 🔗 Clean internal navigation

## 🚀 Local Development

### Option 1: VS Code Live Server (Recommended)

1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` and select **"Open with Live Server"**
4. Your browser will open at `http://localhost:5500`

### Option 2: Python HTTP Server

```bash
# Python 3
cd website
python -m http.server 8000

# Then visit http://localhost:8000
```

### Option 3: Node.js HTTP Server

```bash
# Install http-server globally
npm install -g http-server

# Run in project directory
cd website
http-server -p 8000

# Then visit http://localhost:8000
```

## 📦 Project Structure

```
website/
├── index.html          # Homepage
├── shop.html           # Product listing
├── product.html        # Product details
├── cart.html           # Shopping cart
├── checkout.html       # Checkout page
├── about.html          # About us
├── contact.html        # Contact form
├── blog.html           # Blog listing
├── post.html           # Blog post
├── faq.html            # FAQ page
├── account.html        # User account
├── css/
│   └── styles.css      # Main stylesheet
└── assets/
    ├── book-1.jpg      # Book cover placeholder
    ├── book-2.jpg      # Book cover placeholder
    ├── book-3.jpg      # Book cover placeholder
    └── hero.jpg        # Hero image
```

## 🌍 Deployment Instructions

### Deploy to GitHub Pages

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Islamic Book Store"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/islamic-book-store.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **main** branch and **/ (root)** folder
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/islamic-book-store/`

### Deploy to Netlify

#### Option A: Drag & Drop (Easiest)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the entire `website` folder onto the page
3. Your site goes live instantly with a random URL
4. (Optional) Change the site name in **Site settings** → **Site details**

#### Option B: GitHub Integration (Recommended)

1. Push your code to GitHub (see GitHub Pages steps above)
2. Go to [Netlify](https://app.netlify.com/)
3. Click **"Add new site"** → **"Import an existing project"**
4. Connect your GitHub account
5. Select your `islamic-book-store` repository
6. Configure build settings:
   - **Build command:** Leave empty (static site)
   - **Publish directory:** `.` (root directory)
7. Click **"Deploy site"**
8. Your site goes live at: `https://random-name.netlify.app`
9. (Optional) Configure custom domain in **Site settings** → **Domain management**

### Deploy to Vercel

1. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from CLI:**
   ```bash
   cd website
   vercel
   # Follow the prompts
   ```

3. **Or deploy via GitHub:**
   - Go to [Vercel](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects static site configuration
   - Click **Deploy**
   - Your site goes live at: `https://islamic-book-store.vercel.app`

## 🔧 Configuration

### Updating Content

- **Images:** Replace files in `assets/` folder with your own book covers and images
- **Text:** Edit HTML files directly to change content
- **Styles:** Modify `css/styles.css` to customize colors, fonts, and layout

### Color Scheme

The site uses CSS variables for easy theming. Edit `:root` in `css/styles.css`:

```css
:root {
  --bg: #0b0f0e;          /* Background color */
  --surface: #0f1614;      /* Card background */
  --text: #e7f2ee;         /* Text color */
  --brand: #1ed6a8;        /* Primary brand color */
  --brand-2: #7ce6cc;      /* Secondary brand color */
}
```

## 📝 Notes

- This is a **static frontend** - no backend or database included
- All links are relative for easy deployment
- Cart and checkout are UI-only (no payment processing)
- Replace placeholder images in `assets/` with real book covers

## 📄 License

This project is open source and available for personal and commercial use.

---

Built with ❤️ for the Islamic community
