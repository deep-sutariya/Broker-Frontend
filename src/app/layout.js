"use client"
import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react';
import InputCard from '@/components/InputCard';
import { ReduxProvider } from '@/redux/provider';

export const metadata = {
  title: 'Broker Diary',
  description: 'Broker Diary',
}

export default function RootLayout({ children }) {

  const [inputCard, setInputCard] = useState(false);
  useEffect(() => {
    if (inputCard) {
      document.getElementById("content").classList.add("blurry");
    } else {
      document.getElementById("content").classList.remove("blurry");
    }
  }, [inputCard])
  return (
    <html lang="en">
      <body id='body' className='bg-offwhite sm:w-[85%] h-[100vh] mx-auto font-basic '>
        <ReduxProvider>
            {
              inputCard ? <div className="fixed inset-0 mb-32 sm:mb-0 flex items-center justify-center z-50">
                <div className="w-[90%] sm:w-[85%] mx-auto shadow-lg">
                  <InputCard setInputCard={setInputCard} />
                </div>
              </div>
                : <></>
            }
            <div className="fixed top-[90%] left-[83%] sm:top-[87%] sm:left-[87%] shadow-xl z-50 rounded-[40%] px-4 py-2 lg:px-5 lg:py-3 bg-blue cursor-pointer" onClick={() => setInputCard(!inputCard)}>
              <h1 className="text-xl md:text-3xl font-bold text-common">+</h1>
            </div>

            <div id='content' className='flex flex-col w-full mx-auto h-[100vh]'>
              <Navbar />
              {children}
              <Footer />
            </div>
        </ReduxProvider>
      </body>
    </html >
  )
}