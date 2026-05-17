/**
 * constants.ts
 * Application-wide constants and seed data.
 */

import type { Report } from "./types";

/** Available lab/classroom locations for report submissions */
export const LOCATIONS = [
  "Lab 1",
  "Lab 2",
  "Lab 3",
  "Lab Teknik",
  "Kelas 1",
  "Kelas 2",
  "Kelas 3",
  "Kelas 4",
  "Lab Mini Perpus",
];

/** Seed data – initial reports shown on first load */
export const INITIAL_REPORTS: Report[] = [
  {
    id: "RPT-101",
    title: "PC-05 Tidak Bisa Booting",
    description: "Muncul error blue screen saat dinyalakan.",
    location: "Lab Teknik",
    category: "Hardware",
    status: "Menunggu",
    reporter: "Andi",
    date: "26 Oct 2023",
  },
  {
    id: "RPT-102",
    title: "AC Berisik",
    description: "Suara bising dari unit AC di sudut ruangan.",
    location: "Lab 1",
    category: "Fasilitas",
    status: "Disetujui",
    reporter: "Budi",
    date: "25 Oct 2023",
  },
  {
    id: "RPT-103",
    title: "Update MATLAB",
    description: "Mohon update versi MATLAB ke yang terbaru.",
    location: "Lab 2",
    category: "Software",
    status: "Progres",
    reporter: "Dosen Citra",
    date: "24 Oct 2023",
  },
  {
    id: "RPT-104",
    title: "Kabel LAN Putus",
    description: "Kabel LAN di PC-12 terkelupas.",
    location: "Lab 3",
    category: "Jaringan",
    status: "Selesai",
    reporter: "Dedi",
    date: "22 Oct 2023",
  },
];
