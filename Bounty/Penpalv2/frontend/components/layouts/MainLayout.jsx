import React from 'react'
import Navbar from '../navbar/Navbar'

export default function MainLayout({children}) {
  return (
    <div >
        <main >
            {children}
        </main>
    </div>
  )
}
