# Mini Seller Console

A lightweight React application for managing leads and converting them into opportunities. Built as a technical assessment project showcasing modern React development practices.

## Features

- **Leads Management**: View, search, filter, and sort leads by various criteria
- **Lead Details**: Inline editing with validation for email and status fields
- **Lead Conversion**: Convert qualified leads into opportunities with auto-generated data
- **Opportunities Tracking**: Simple table view for converted opportunities
- **Data Persistence**: Local storage for maintaining data across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes with system preference detection

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **TanStack Query** for data fetching and caching
- **TanStack Table** for advanced table functionality
- **Radix UI** for accessible components
- **Zod** for form validation
- **Local JSON** data source with simulated API latency

## Getting Started

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Start development server:**
   ```bash
   yarn dev
   ```

3. **Build for production:**
   ```bash
   yarn build
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/                # Services and utilities
├── types/              # TypeScript type definitions
└── app/                # Application layout and entry point
```

## Key Features Implemented

✅ **MVP Requirements:**
- Leads list with search, filter, and sort
- Lead detail panel with inline editing
- Lead to opportunity conversion
- Loading, empty, and error states

✅ **Nice-to-Haves:**
- localStorage persistence for filters
- Optimistic updates with rollback
- Responsive layout (desktop → mobile)

## Data Flow

1. Loads initial data from `data-leads.json`
2. Stores in localStorage for persistence
3. Simulates API calls with 500ms delay
4. Handles 5% simulated failure rate for error testing

---

*This project demonstrates clean architecture, modern React patterns, and attention to user experience details.*
