"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Define available languages and their translations
const translations = {
  en: {
    dashboard: "Dashboard",
    staff: "Staff Management",
    students: "Student Management",
    reports: "Reports & Analytics",
    fees: "Fee Management",
    calendar: "Calendar & Events",
    messages: "Messaging System",
    notifications: "Notifications",
    email: "Email",
    profile: "Profile",
    settings: "Settings",
    totalStudents: "Total Students",
    totalTeachers: "Total Teachers",
    attendanceRate: "Attendance Rate",
    pendingFees: "Pending Fees",
    fromLastMonth: "from last month",
    collectedThisMonth: "collected this month",
    overview: "Overview",
    analytics: "Analytics",
    reports: "Reports",
    monthlyAttendance: "Monthly Attendance",
    feeCollection: "Fee Collection",
    recentAlerts: "Recent Alerts",
    performanceByGrade: "Performance by Grade",
    downloadReport: "Download Report",
    addNew: "Add New",
  },
  fr: {
    dashboard: "Tableau de bord",
    staff: "Gestion du personnel",
    students: "Gestion des étudiants",
    reports: "Rapports et analyses",
    fees: "Gestion des frais",
    calendar: "Calendrier et événements",
    messages: "Système de messagerie",
    notifications: "Notifications",
    email: "E-mail",
    profile: "Profil",
    settings: "Paramètres",
    totalStudents: "Nombre total d'étudiants",
    totalTeachers: "Nombre total d'enseignants",
    attendanceRate: "Taux de présence",
    pendingFees: "Frais en attente",
    fromLastMonth: "par rapport au mois dernier",
    collectedThisMonth: "collectés ce mois-ci",
    overview: "Aperçu",
    analytics: "Analyses",
    reports: "Rapports",
    monthlyAttendance: "Présence mensuelle",
    feeCollection: "Perception des frais",
    recentAlerts: "Alertes récentes",
    performanceByGrade: "Performance par niveau",
    downloadReport: "Télécharger le rapport",
    addNew: "Ajouter nouveau",
  },
  rw: {
    dashboard: "Ikibaho",
    staff: "Imicungire y'abakozi",
    students: "Imicungire y'abanyeshuri",
    reports: "Raporo n'isesengura",
    fees: "Imicungire y'amafaranga",
    calendar: "Kalendari n'ibikorwa",
    messages: "Uburyo bwo kohereza ubutumwa",
    notifications: "Imenyesha",
    email: "Imeli",
    profile: "Umwirondoro",
    settings: "Igenamiterere",
    totalStudents: "Umubare w'abanyeshuri bose",
    totalTeachers: "Umubare w'abarimu bose",
    attendanceRate: "Igipimo cyo kwitabira",
    pendingFees: "Amafaranga ategereje",
    fromLastMonth: "kuva mu kwezi gushize",
    collectedThisMonth: "yakusanyijwe uku kwezi",
    overview: "Incamake",
    analytics: "Isesengura",
    reports: "Raporo",
    monthlyAttendance: "Kwitabira kwa buri kwezi",
    feeCollection: "Gukusanya amafaranga",
    recentAlerts: "Imenyesha vya vuba",
    performanceByGrade: "Imikorere ku rwego",
    downloadReport: "Kuramo raporo",
    addNew: "Ongeraho gishya",
  },
  es: {
    dashboard: "Panel de control",
    staff: "Gestión de personal",
    students: "Gestión de estudiantes",
    reports: "Informes y análisis",
    fees: "Gestión de tarifas",
    calendar: "Calendario y eventos",
    messages: "Sistema de mensajería",
    notifications: "Notificaciones",
    email: "Correo electrónico",
    profile: "Perfil",
    settings: "Configuración",
    totalStudents: "Total de estudiantes",
    totalTeachers: "Total de profesores",
    attendanceRate: "Tasa de asistencia",
    pendingFees: "Tarifas pendientes",
    fromLastMonth: "desde el mes pasado",
    collectedThisMonth: "recaudado este mes",
    overview: "Visión general",
    analytics: "Análisis",
    reports: "Informes",
    monthlyAttendance: "Asistencia mensual",
    feeCollection: "Cobro de tarifas",
    recentAlerts: "Alertas recientes",
    performanceByGrade: "Rendimiento por grado",
    downloadReport: "Descargar informe",
    addNew: "Añadir nuevo",
  },
}

// Create the language context
type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")

  // Load saved language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
