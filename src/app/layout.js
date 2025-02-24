import Provider from "./components/Provider";
import "./globals.css";

export const metadata = {
  title: "Sistem Rekomendasi Minat Bakat Siswa",
  description: "Sistem Rekomendasi Minat Bakat Siswa adalah sebuah sistem yang dapat memberikan rekomendasi minat bakat siswa berdasarkan nilai-nilai yang dimiliki oleh siswa.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
