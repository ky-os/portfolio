# Project Brief: Admin Dashboard & CMS Integration

## 1. Executive Summary
This project aims to develop a secure, protected Admin Dashboard for the portfolio website. This dashboard will serve as a Content Management System (CMS), enabling the portfolio owner to manage dynamic content (Skills, Projects, Experience, Bookmarks) in real-time without requiring code changes or deployments.

## 2. Problem Statement
Currently, updating portfolio content requires manual edits to the source code (`lib/data.ts`) and a subsequent deployment. This process is:
- **Inefficient:** Simple text changes require a full build pipeline.
- **Risky:** Direct code edits increase the chance of introducing syntax errors or breaking the layout.
- **Rigid:** There is no interface for drafting or previewing content before it goes live.

## 3. Proposed Solution
Develop a dedicated `/admin` route within the existing Next.js application.
- **Secure Authentication:** Protect routes using Clerk or Convex Auth.
- **Data Management:** CRUD interfaces for Skills, Projects, Experience, and Bookmarks.
- **Real-time Updates:** Leverage Convex's reactive backend to reflect changes immediately.

## 4. Target Users
- **Primary User:** Portfolio Owner (Admin) - Technical proficiency: High.
- **Secondary Users:** Recruiters/Visitors (Consumers of the data).

## 5. User Stories
### Authentication
- **US 1.1:** As an Admin, I want to log in securely so that unauthorized users cannot modify data.
- **US 1.2:** As an Admin, I want to be redirected to login if accessing protected routes.

### Content Management
- **US 2.1 (Skills):** Manage technical skills (Languages, Frameworks, Tools).
- **US 2.2 (Projects):** Create/Edit project entries with rich details and tech stacks.
- **US 2.3 (Experience):** Manage professional timeline (Roles, Companies, Dates).
- **US 2.4 (Bookmarks):** Curate resources and featured content.

### System Behavior
- **US 3.1:** Changes should be reflected immediately on the public site without rebuilds.

## 6. Technical Requirements
### Frontend
- **Framework:** Next.js 15 (App Router).
- **Rendering:** **Server Components (RSC) First**. Client Components only for interactive leaves.
- **UI Library:** `shadcn/ui`.
- **Styling:** Tailwind CSS v4.

### Backend & Database
- **Platform:** Convex.
- **Schema:** `skills`, `projects`, `experiences`, `bookmarks`, `featuredCompany`.
- **API:** Convex Queries & Mutations.

### Infrastructure
- **Auth:** Clerk or Convex Auth.
- **Hosting:** Vercel.
