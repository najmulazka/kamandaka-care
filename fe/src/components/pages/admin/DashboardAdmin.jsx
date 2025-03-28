import HeaderAdmin from '../../fragments/HeaderAdmin';

const DashboardAdmin = () => {
  return (
    <div>
      <HeaderAdmin />
      <div className="p-6 px-8 lg:justify-center lg:flex flex-col">
        <div className="font-bold text-2xl text-center mb-4">SELAMAT DATANG DI HALAMAN ADMIN KAMANDAKA CARE</div>
        <div className="font-semibold">Ketentuan aplikasi :</div>
        <ol className="list-decimal pl-4 text-justify space-y-1 marker:font-semibold">
          <li>
            Apabila dokter membuka jadwal konsultasi di luar jam yang telah ditentukan, sistem akan menyesuaikan ke jam terdekat di bawahnya. Sebagai contoh, jika jadwal yang dimasukkan adalah pukul 14:20 - 16:40, maka sistem akan membaca
            sebagai pukul 14:00 - 16:00.
          </li>
          <li>
            Saat admin memvalidasi pembayaran untuk booking konsultasi, sistem secara otomatis akan mengirimkan tautan pertemuan (meeting link) kepada pasien dan dokter melalui email. Tautan tersebut juga dapat diakses melalui halaman
            pasien dan halaman dokter pada website.
          </li>
          <li>Ketika admin memvalidasi pembayaran untuk booking tes, pasien secara otomatis akan mendapatkan hak akses terhadap gform sesuai dengan jenis tes yang telah dipesan.</li>
          <li>Setiap pukul 05.00 WIB, akses pasien yang telah diberikan sebelumnya akan dihapus secara otomatis untuk menjaga keamanan bank soal.</li>
          <li>
            Sistem tidak dapat mendeteksi secara real-time ketika pasien telah menyelesaikan tes, sehingga dokter perlu melakukan pengecekan secara manual melalui halaman dokter dengan mengklik tombol <span className='font-semibold'>Lihat Jawaban</span>.
          </li>
          <li>Saat mengunggah gambar untuk berita atau informasi, harap gunakan resolusi gambar dengan rasio 16:6 untuk hasil yang optimal.</li>
          <li>Jika aplikasi mengalami error silahkan hubungi <a href="https://najmulazka.github.io/web-profile" className='text-sky-500 font-semibold'>Developer</a>.</li>
        </ol>
      </div>
    </div>
  );
};

export default DashboardAdmin;
