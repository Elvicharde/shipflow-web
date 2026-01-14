## Project Overview

This is the frontend for Shipflow, a bulk shipment management system.
The backend is the source of truth for all business logic, validation,
pricing, and state transitions.

The frontend is responsible only for:

- Orchestrating UI flows
- Displaying backend state
- Sending user intent to the API

Do NOT reimplement backend logic on the frontend.

---

## Tech Stack (Strict)

- React (functional components only)
- TypeScript
- Zustand for client-side UI state
- React Query (TanStack Query) for all server state
- Axios for HTTP requests
- React Hook Form for forms
- Existing multi-step wizard abstraction must be reused

---

## State Management Rules

### Server State

- All data fetched from the backend MUST use React Query
- Examples:
  - Upload sessions
  - Shipments
  - Prices
  - Validation results
  - Purchase status

DO NOT store server responses in Zustand.

### Client State

- Zustand is used ONLY for UI and workflow state:
  - activeStep
  - stepsValidity
  - selectedShipmentId
  - UI toggles (modals, panels)

---

## Wizard Architecture (Important)

This project already has a pre-existing multi-step wizard pattern.

Assumptions:

- Wizard uses activeStep (number)
- Wizard uses stepsValidity (boolean[])
- Steps are rendered using Tabs
- Step indicators use CreateItemStepsComponent
- React Hook Form + FormProvider is used for step forms

DO NOT generate a new wizard or stepper system.
Reuse this pattern.

---

## API Access Rules

- All HTTP requests must go through a shared Axios instance
- Axios handles:
  - baseURL
  - headers
  - error normalization
- React Query handles:
  - caching
  - loading states
  - retries
  - invalidation

Components must not call Axios directly.
They must use React Query hooks or API service functions.

---

## Component Responsibilities

- Pages orchestrate flows
- Components are presentational where possible
- Services contain API calls only
- No business rules in components
- No pricing, validation, or lifecycle logic on the frontend

---

## File Structure Expectations

/pages

- Route-level components only

/components

- Reusable UI components
- No API calls here

/services

- Axios-based API functions

/stores

- Zustand stores (UI state only)

/types

- Shared TypeScript types for API responses

---

## General Rules

- Prefer clarity over cleverness
- Avoid premature abstractions
- Avoid global state unless justified
- Do not generate mock data unless explicitly requested
- Do not generate backend code

---

## Mental Model

If data comes from the backend → React Query owns it  
If data comes from a click → Zustand owns it

Violating this rule is a bug.

Routing uses React Router v6.4+ with createBrowserRouter and RouterProvider.
Do NOT use Switch, BrowserRouter JSX, or component props.
Routes must be defined as route objects.
