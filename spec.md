# Project Specification: IQ Labs Innovation Portal

## 1. Project Overview
"IQ Labs" is an external-facing innovation portal for **OneAdvanced**. It serves as a showcase for experimental prototypes and alpha-stage apps ("Vibrant Alphas"). The goal is to gather early feedback from customers and internal colleagues.

**Core Value Proposition:**
- **Showcase:** A dynamic grid of innovation projects.
- **Feedback:** Users can "Pitch an Idea" (saved to DB).
- **Parity:** Visual alignment with OneAdvanced branding (Montserrat font, specific colors).

## 2. Tech Stack & Infrastructure
- **Framework:** Next.js 16+ (App Router).
- **Deployment:** Vercel (Serverless).
- **Styling:** Tailwind CSS.
- **UI Library:** Aceternity UI / Framer Motion (for "High-tech/Neon" aesthetic).
- **Font:** Montserrat (Google Fonts) - **Strict Requirement**.
- **Database:** Vercel Postgres (for "Pitch an Idea" submissions).
- **CMS:** Sanity.io (Free Tier) or hardcoded JSON for MVP (Agent choice: Sanity preferred for scalability).

## 3. Visual Design & Branding
**Aesthetic:** "High-Tech/Neon" on Dark Mode.
- **Background:** Dark "Big Stone" (#101C36) or Rich Black (#050505) with neon gradients.
- **Accents:**
  - Primary Neon: "Tangerine" (#F39300) -> Glowing Orange.
  - Secondary Neon: "Coral Red" (#FF3C36) -> Glowing Pink/Red.
  - Tertiary: Electric Purple (for depth).
- **Typography:**
  - Headings: `Montserrat` (Bold/ExtraBold).
  - Body: `Inter` or `Roboto` (Clean sans-serif, non-system default).

**Key Visuals:**
- **Hero Section:** Dynamic glowing text effect (e.g., "Vibrant Labs Portal").
- **Cards:** Glassmorphism with neon borders that react to mouse hover.

## 4. Feature Requirements

### A. Navigation Bar
- **Position:** Fixed / Sticky Top.
- **Left:** "OneAdvanced" (Text/Logo in Montserrat).
- **Center:** "IQ Labs" (distinctive branding).
- **Right:** "My Experiments" (Link).
  - *Behavior:* For MVP, this links to a `/coming-soon` placeholder page. No Auth implementation yet.

### B. Homepage (Hero + Grid)
1.  **Hero:**
    - Animated Headline: "Explore bold prototypes, shape our future products."
    - Visuals: Subtle background beams or particle effects.
2.  **Project Grid:**
    - Display "Cards" for each project.
    - **Card Data:** Title, Status Badge (Alpha/Beta/Prototype), Description, Author Name, Image.
    - **Interaction:** Hovering glows the card border. Clicking opens the Project Detail (modal or page).
    - **Data Source:** Fetch from Sanity CMS (or local `projects.json` if CMS setup fails).

### C. "Pitch an Idea" (Floating Action Button)
- **UI:** A floating button (bottom right) or prominent button in Nav.
- **Interaction:** Opens a Modal/Dialog.
- **Form Fields:**
  - Idea Title.
  - Description.
  - Your Name (Optional).
  - Email (Optional).
- **Backend:**
  - On Submit -> Server Action -> Insert into Vercel Postgres table `ideas`.
  - Show "Success" animation/toast.

### D. Project Detail View
- Since projects are hosted externally (GitHub/Live URL), the card click should either:
  1.  Open a detailed modal with the "Launch" button.
  2.  Go to a `/project/[slug]` page containing the "Launch" button and "Provide Feedback" link.

## 5. Data Schema

### Table: `ideas` (Postgres)
| Column | Type | Notes |
| :--- | :--- | :--- |
| id | SERIAL | Primary Key |
| title | TEXT | Required |
| description | TEXT | Required |
| user_name | TEXT | |
| user_email | TEXT | |
| created_at | TIMESTAMP | Default NOW() |

### CMS Schema: `project` (Sanity)
- `title` (String)
- `slug` (Slug)
- `status` (Enum: "Alpha", "Beta", "Prototype")
- `description` (Text)
- `author` (String)
- `image` (Image)
- `link_github` (URL, optional)
- `link_live` (URL, optional)

## 6. Implementation Plan (Agent Instructions)
1.  **Scaffold:** Initialize Next.js project with Tailwind and Montserrat font.
2.  **Database:** Set up Vercel Postgres and create the `ideas` table schema.
3.  **CMS:** Configure Sanity client (or create mock data file).
4.  **UI Components:**
    - Create `ProjectCard` with hover effects.
    - Create `Hero` with text animation.
    - Create `IdeaModal` with form handling.
5.  **Page Construction:** Assemble Homepage.
6.  **Animation Polish:** Add entry animations (staggered fade-in) for grid items.