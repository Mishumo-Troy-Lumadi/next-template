'use client'

import type { Route } from 'next'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useMemo } from 'react'

export default function NavLink<T extends string>({
  href,
  children,
  className,
  exact,
  prefetch,
  title,
}: PropsWithChildren<{
  className?: string
  href: Route<T> | URL
  title?: string
  exact?: boolean
  prefetch?: boolean
}>) {
  const pathname = usePathname()

  const active = useMemo(() => {
    if (exact) return pathname === href
    return pathname.startsWith(href.toString())
  }, [exact, href, pathname])

  return (
    <Link
      href={href}
      className={className}
      prefetch={prefetch}
      data-active={active}
    >
      {children}
      {title && <span className='sr-only'>{title}</span>}
    </Link>
  )
}
