'use client'

import type { AttendanceDTO } from '@/types/attendanceDTO'
import Script from 'next/script'
import { useEffect, useRef, useState } from 'react'
import type { IWlPropsDTO } from './types/wlPropsDTO'

export default function WlExtensionLoader({ onOpenAttendance }: IWlPropsDTO) {
  const initializedRef = useRef(false)
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    if (!scriptReady || initializedRef.current) return
    if (!window.WlExtension || typeof window.WlExtension.initialize !== 'function') {
      console.warn('[DEBUG] WlExtension ainda não está disponível.')
      return
    }

    initializedRef.current = true // evita reexecução

    window.WlExtension.initialize({
      events: {
        onOpenAttendance: (attendance: AttendanceDTO) => {
          window.currentAttendance = attendance
          onOpenAttendance?.(attendance)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: attendance }))
        },
        onFocusAttendance: (attendance: AttendanceDTO) => {
          window.currentAttendance = attendance
          onOpenAttendance?.(attendance)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: attendance }))
        },
        onCloseAttendance: () => {
          window.currentAttendance = null
          onOpenAttendance?.(null)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: null }))
        },
        onOpenHistoricAttendance: (attendance: AttendanceDTO) => {
          window.currentAttendance = attendance
          onOpenAttendance?.(attendance)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: attendance }))
        },
        onCloseHistoricAttendance: () => {
          window.currentAttendance = null
          onOpenAttendance?.(null)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: null }))
        },
        onChatPage: () => {
          window.currentAttendance = null
          onOpenAttendance?.(null)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: null }))
        },
        onHistoricPage: () => {
          window.currentAttendance = null
          onOpenAttendance?.(null)
          window.dispatchEvent(new CustomEvent('attendanceChanged', { detail: null }))
        },
      },
      buttons: {
        'attendance-view': [
          {
            text: 'Exportar Atendimento',
            callback: () => {
              const current = window.currentAttendance
              if (!current) {
                window.WlExtension?.alert?.({
                  message: 'Abra um atendimento para exportar.',
                  variant: 'warning',
                })
                return
              }
              // Aqui você pode chamar a função para exportar, passando "current"
            },
          },
        ],
      },
    })
  }, [scriptReady, onOpenAttendance])

  return (
    <Script
      src="https://fileschat.sfo2.cdn.digitaloceanspaces.com/public/libs/wlclient.js"
      strategy="afterInteractive"
      onLoad={() => setScriptReady(true)}
    />
  )
}
