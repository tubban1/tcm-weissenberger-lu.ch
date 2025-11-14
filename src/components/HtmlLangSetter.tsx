'use client'

import { useEffect } from 'react'

interface HtmlLangSetterProps {
  locale: string
}

export default function HtmlLangSetter({ locale }: HtmlLangSetterProps) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  
  return null
}

