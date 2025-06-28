import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Калькулятор гектаров и соток.',
  description: 'Проверь размер участка за 5 секунд.',
  icons: {
    icon: "/images/resized_image.ico", // Added favicon
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
