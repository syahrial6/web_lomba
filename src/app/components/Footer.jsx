import React from 'react'
import Link from 'next/link'


const Footer = () => {
  return (
    <footer className="bg-blue-600 font-Poppins text-white py-8">
    <div className="container mx-auto px-4 w-[85vw] grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h2 className="text-2xl font-bold">Website Rekomendasi Mata Pelajaran Peminatan Siswa</h2>
        <p className="mt-2 text-sm">
        Rekomendasi dan saran pemilihan mata pelajaran peminatan kurikulum merdeka berdasarkan nilai rapor dan jurusan perkuliahan pilihan dengan Artificial Inteligence (AI).
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Navigasi</h3>
        <ul className="space-y-2">
          <li>
            <Link href={"/"} className="hover:underline">
              Beranda
            </Link>
          </li>
          <li>
            <Link href={"/login"} className="hover:underline">
              Login
            </Link>
          </li>
          <li>
            <Link href="/register" className="hover:underline">
              Registrasi
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">
            Facebook
          </a>
          <a href="#" className="hover:text-gray-300">
            Instagram
          </a>
          <a href="#" className="hover:text-gray-300">
            Twitter
          </a>
        </div>
      </div>
    </div>

    <div className="mt-8 border-t border-blue-500 pt-4 text-center text-sm">
      &copy; 2025 Al-Fityan School Kubu Raya. All rights reserved.
    </div>
  </footer>
  )
}

export default Footer
