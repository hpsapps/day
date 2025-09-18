# Teacher Roster Tool — Setup Guide

This guide provides clear, reproducible steps (with bash commands) to set up the project from scratch.  
Follow them in order. Each step is self-contained so an AI agent can execute them accurately.

---

## 1. Create and Initialise Project

```bash
# create and move into project folder
mkdir teacher-roster && cd teacher-roster

# initialise git repo
git init

# create vite + react + typescript project
npm create vite@latest . -- --template react-ts

# install dependencies
npm install
```

---

## 2. Configure Tailwind and Shadcn

```bash
# install tailwind + postcss
npm install tailwindcss postcss autoprefixer

# initialise tailwind config
npx tailwindcss init -p

# install shadcn-ui
npx shadcn-ui init
```

### Update `tailwind.config.ts`

```ts
import { type Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
```

### Update `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 3. Install Core Shadcn Components

```bash
npx shadcn-ui add button card input calendar popover
```

(You can add more later such as `table`, `tabs`, or `dialog` for the Settings page.)

---

## 4. Create Mockup Home Page

Create `src/pages/Home.tsx`:

```tsx
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Teacher Roster Tool</h1>
        <p className="text-gray-600">Manage absences, duties, and timetables</p>
      </header>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Mockup</h2>
          <p className="text-gray-700 mb-4">
            This is a placeholder for the main roster page.
          </p>
          <Button>Click Me</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 5. Wire Up Routing

```bash
npm install react-router-dom
```

Update `src/main.tsx`:

```tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
```

---

## 6. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` to see the **Teacher Roster Tool** mockup page.

---

## ✅ Next Steps

- Add a **Settings page** for uploading teacher/class/roster data.  
- Replace mockup data with JSON imports.  
- Plan for future integrations (Firebase storage, Google login auth, spreadsheet upload forms).  

