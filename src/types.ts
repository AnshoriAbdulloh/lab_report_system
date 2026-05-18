/**
 * types.ts
 * Shared type definitions for the Lab Report System.
 * All components import their types from this single source of truth.
 */

/** Status lifecycle of a report: Menunggu → Disetujui → Progres → Selesai */
export type ReportStatus = "Menunggu" | "Disetujui" | "Progres" | "Selesai";

/** User roles available in the system */
export type Role = "User" | "Teknisi";

/** Display modes for the report list */
export type ViewMode = "list" | "grid";

/** Represents a logged-in user with their assigned role */
export interface AuthUser {
  username: string;
  role: Role;
}

/** Core data structure for a facility report */
export interface Report {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  status: ReportStatus;
  reporter: string;
  date: string;
}
