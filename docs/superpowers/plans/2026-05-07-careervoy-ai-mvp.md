# CareerVoy AI MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the P0 (MVP) version of the CareerVoy AI web application, a "Community + Monetization" platform for job seekers and side-hustlers.

**Architecture:** The application will be a standard monolithic repository (monorepo) containing two main packages: a `frontend` Single Page Application (SPA) built with React and a `backend` REST API server built with Node.js and Express.

**Tech Stack:**
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript, MongoDB (with Mongoose)
- **Testing:** Jest, React Testing Library, Supertest

---

## Part 1: Backend Setup

### Task 1: Initialize Backend Project

**Files:**
- Create: `backend/package.json`
- Create: `backend/tsconfig.json`
- Create: `backend/src/server.ts`

- [ ] **Step 1: Create backend directory and initialize npm**

Run in worktree root (`.worktrees/feature-initial-development`):
```bash
mkdir backend && cd backend && npm init -y
```
Expected: `package.json` is created inside the `backend` directory.

- [ ] **Step 2: Install initial dependencies**

Run in `backend` directory:
```bash
npm install express mongoose dotenv
npm install -D typescript @types/express ts-node-dev nodemon
```
Expected: Dependencies are added to `package.json`.

- [ ] **Step 3: Create `tsconfig.json`**

Run in `backend` directory:
```bash
npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true
```
Expected: `tsconfig.json` is created with appropriate settings.

- [ ] **Step 4: Add npm scripts to `package.json`**

Modify: `backend/package.json`
Add the following scripts to the `scripts` section:
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/server.js",
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts"
},
```

- [ ] **Step 5: Create a basic Express server**

Create `backend/src/server.ts`:
```typescript
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('CareerVoy AI Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app; // Export for testing
```

- [ ] **Step 6: Run the server to verify it works**

Run in `backend` directory:
```bash
npm run dev
```
Expected: The console should log `Server is running on port 3001`. Visiting `http://localhost:3001` in a browser should show "CareerVoy AI Backend is running!".

- [ ] **Step 7: Commit the initial backend setup**

```bash
git add .
git commit -m "feat(backend): initialize node.js express typescript project"
```

### Task 2: Setup Backend Testing with Jest and Supertest

**Files:**
- Create: `backend/jest.config.js`
- Create: `backend/src/server.test.ts`

- [ ] **Step 1: Install testing dependencies**

Run in `backend` directory:
```bash
npm install -D jest @types/jest ts-jest supertest @types/supertest
```

- [ ] **Step 2: Create Jest configuration**

Create `backend/jest.config.js`:
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.ts'],
};
```

- [ ] **Step 3: Add test script to `package.json`**

Modify: `backend/package.json`
Add the following to the `scripts` section:
```json
"test": "jest"
```

- [ ] **Step 4: Write the first failing test**

Create `backend/src/server.test.ts`:
```typescript
import request from 'supertest';
import app from './server';

describe('GET /', () => {
  it('should return 200 OK with a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('CareerVoy AI Backend is running!');
  });
});

describe('GET /api/non-existent-route', () => {
  it('should return 404 Not Found', async () => {
    const res = await request(app).get('/api/non-existent-route');
    expect(res.statusCode).toEqual(404);
  });
});
```
The second test will fail because we haven't implemented a 404 handler.

- [ ] **Step 5: Run tests to verify one fails**

Run in `backend` directory:
```bash
npm test
```
Expected: The `GET /` test should PASS. The `GET /api/non-existent-route` test should FAIL.

- [ ] **Step 6: Implement a 404 handler to make tests pass**

Modify: `backend/src/server.ts`
Add this code right before `app.listen()`:
```typescript
// Handle 404
app.use((req: Request, res: Response) => {
  res.status(404).send("Not Found");
});
```
This is a simple implementation. We can improve it later.

- [ ] **Step 7: Run tests to verify they pass**

Run in `backend` directory:
```bash
npm test
```
Expected: All tests should PASS.

- [ ] **Step 8: Commit the testing setup**

```bash
git add .
git commit -m "test(backend): setup jest and supertest"
```

---
## Part 2: Frontend Setup

### Task 3: Initialize Frontend Project with Vite and React

**Files:**
- Create: `frontend/` (entire directory structure)

- [ ] **Step 1: Scaffold React project with Vite**

Run in worktree root (`.worktrees/feature-initial-development`):
```bash
npm create vite@latest frontend -- --template react-ts
```
Expected: A new `frontend` directory with a React+TypeScript project.

- [ ] **Step 2: Install Tailwind CSS**

Run in `frontend` directory:
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Expected: `tailwind.config.js` and `postcss.config.js` are created.

- [ ] **Step 3: Configure Tailwind CSS**

Modify `frontend/tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
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

Modify `frontend/src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 4: Verify Tailwind is working**

Modify `frontend/src/App.tsx`:
```tsx
function App() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-blue-600 underline">
        CareerVoy AI Frontend
      </h1>
    </div>
  )
}

export default App
```

- [ ] **Step 5: Run the dev server**

Run in `frontend` directory:
```bash
npm run dev
```
Expected: Vite starts the server. Opening the URL should show the blue, bold, underlined title.

- [ ] **Step 6: Commit the initial frontend setup**
```bash
git add .
git commit -m "feat(frontend): initialize react vite typescript tailwind project"
```

## Part 3: Backend - User Authentication (P0)

... more tasks to be added here for auth, community, etc.
