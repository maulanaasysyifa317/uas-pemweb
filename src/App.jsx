// src/App.jsx

import React, { useState, useEffect } from 'react';
import './App.css'; // Kita akan buat file CSS sederhana nanti

function App() {
  // State untuk menyimpan daftar kompetisi
  const [competitions, setCompetitions] = useState([]);
  // State untuk menunjukkan status loading
  const [loading, setLoading] = useState(true);
  // State untuk menyimpan pesan error jika terjadi
  const [error, setError] = useState(null);

  // URL dan API Key
  const API_URL = '/api/v4/competitions/';
  // GANTI DENGAN API KEY ANDA!
  const API_KEY = '3828590dfaaf471aa2c26b07b87bdc4d'; 

  // useEffect akan berjalan setelah komponen pertama kali di-render
  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            'X-Auth-Token': API_KEY,
          },
        });

        // Jika response tidak ok (misal: error 404 atau 403)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // Simpan data kompetisi ke dalam state
        setCompetitions(data.competitions);

      } catch (e) {
        // Jika terjadi error saat fetching
        console.error("Gagal mengambil data: ", e);
        setError(e.message);
      } finally {
        // Hentikan status loading, baik berhasil maupun gagal
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Dependency array kosong, artinya efek ini hanya berjalan sekali

  // Tampilkan pesan loading jika data sedang diambil
  if (loading) {
    return <div className="container"><h1>Loading...</h1></div>;
  }

  // Tampilkan pesan error jika terjadi masalah
  if (error) {
    return <div className="container"><h1>Error: {error}</h1><p>Pastikan API Key Anda sudah benar dan aktif.</p></div>;
  }

  // Render daftar kompetisi jika data berhasil diambil
  return (
    <div className="container">
      <header>
        <h1>Informasi Kompetisi Sepak Bola</h1>
      </header>
      <main className="competition-grid">
        {competitions.map((competition) => (
          <div key={competition.id} className="competition-card">
            <img 
              src={competition.emblem || 'https://via.placeholder.com/150?text=No+Emblem'} 
              alt={`Lambang ${competition.name}`} 
              className="competition-emblem"
            />
            <div className="competition-info">
              <h2>{competition.name}</h2>
              <p><strong>Area:</strong> {competition.area.name}</p>
              <p><strong>Tipe:</strong> {competition.type}</p>
              {competition.currentSeason && (
                 <p className="season-info">
                    <strong>Musim:</strong> {competition.currentSeason.startDate} s/d {competition.currentSeason.endDate}
                 </p>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;