
import type { Metadata } from 'next'
import { Inter, Margarine } from 'next/font/google'
import './globals.css'
//import './app/globals.css'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase' 
import { SessionContextProvider } from '@supabase/auth-helpers-react'; 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: ' Marketplace',
  description: 'Buy and sell businesses online',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionContextProvider supabaseClient={supabase} initialSession={session}>
          <main className="min-h-screen flex flex-col">
            <div className="flex-1 container py-8">{children}</div>
            
            
            <footer className="border-t">
              <div className="container py-4 text-center text-sm text-muted-foreground">
             © {new Date().getFullYear()}  Marketplace. All rights reserved.
              </div>
            </footer>
          </main>
          
        </SessionContextProvider>
      </body>
    </html>
  )
}