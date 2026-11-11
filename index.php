<?php
session_start();

$isDashboard = isset($_GET["dashboard"]) && $_GET["dashboard"] === "true";

if ($isDashboard && !isset($_SESSION["username"])) {
    header("Location: login.php");
    exit;
}

$username = $_SESSION["username"] ?? "Teman HealthyGo";
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HealthyGo - Teman Olahraga Harianmu</title>
  
  <link rel="stylesheet" href="style_healthygo_lanjutan.css">
</head>
<script src="script_healthygo_lanjutan.js?v=3"></script>
<body>
      <!-- SEMUA KONTEN HTML HEALTHYGO KAMU TETAP DI SINI -->
    <!-- JAVASCRIPT -->
    <script src="script_healthygo_lanjutan.js?v=3"></script>
</body>
</html>
<div class="wrap">

    <!-- HALAMAN HOME -->
    <section id="home">
        <div class="hero">
            <div class="hero-content">
                <div class="logo">HealthyGo 💛</div>

                <h1 id="judulHome">Teman Olahraga<br>Harianmu</h1>

                <p>
                    Atur rutinitas olahraga, tentukan target kebugaran,
                    dan pantau kemajuan kesehatanmu setiap hari
                    bersama HealthyGo.
                </p>

                <div class="dom-buttons">
                    <button type="button" onclick="ubahJudul()">Ubah Judul</button>
                    <button type="button" onclick="ubahWarna()">Ubah Warna Tombol</button>
                    <button type="button" onclick="tampilDeskripsi()">Info Olahraga</button>
                </div>

                <p id="infoOlahraga" hidden>
                    Olahraga rutin membantu menjaga stamina dan kebugaran tubuh.
                </p>

               <button class="start" type="button"
    onclick="window.location.href='login.php'">
    Mulai Hidup Sehatmu
</button>
            </div>

            <img src="image.png" alt="Ilustrasi olahraga">
        </div>
    </section>

    <!-- DASHBOARD -->
    <section id="dashboard">
        <h2 class="dash-title">
    Halo, <?= htmlspecialchars($username) ?>! 👋
</h2>
     <p class="dash-sub">Yuk tetap aktif dan capai target olahraga hari ini.</p>

        <!-- TARGET HARIAN -->
        <div class="target">
            Target Hari Ini
            <small id="targetText">0% target olahraga selesai.</small>
            <div class="target-line">
                <i id="targetBar"></i>
            </div>
        </div>

        <!-- STATISTIK -->
        <div class="stats">
            <div class="stat">
                🔥 <strong id="calories">0</strong>
                Kalori Terbakar
            </div>
            <div class="stat">
                ⏱️ <strong id="minutes">0 Menit</strong>
                Total Waktu Olahraga
            </div>
            <div class="stat">
                🏆 <strong id="sessions">0 Latihan</strong>
                Latihan Dipilih
            </div>
        </div>

               <!-- TIMER -->
        <div class="timer-box" style="position: relative; z-index: 9999;">
            <h3>⏱️ Timer Latihan HealthyGo</h3>

            <label for="durasiTimer">Pilih durasi latihan:</label>

            <select id="durasiTimer"
                style="position: relative; z-index: 10000; pointer-events: auto; width: 100%; cursor: pointer;">
                <option value="1">1 menit</option>
                <option value="5">5 menit</option>
                <option value="10">10 menit</option>
                <option value="15">15 menit</option>
                <option value="20" selected>20 menit</option>
                <option value="25">25 menit</option>
                <option value="30">30 menit</option>
            </select>

            <p id="namaLatihanAktif">Belum ada latihan dipilih.</p>

            <div id="timerDisplay">20:00</div>

            <p id="timerStatus" aria-live="polite">
                Pilih latihan untuk memulai hitung mundur.
            </p>

            <div class="timer-actions">
                <button type="button" id="tombolTimer">▶ Mulai</button>
                <button type="button" id="tombolJedaTimer">⏸ Jeda</button>
                <button type="button" id="tombolResetTimer">↻ Atur Ulang</button>
            </div>
        </div>

        <!-- JADWAL -->
        <h3 class="title">Jadwal Hari Ini</h3>
        <div class="schedule" id="scheduleList">
            <p class="jadwal-kosong">Belum ada latihan hari ini.</p>
        </div>

        <!-- KEMAJUAN MINGGUAN -->
        <h3 class="title">Kemajuan Harian</h3>
        <div class="week">
            <div class="day">Senin<div class="bar"><i></i></div></div>
            <div class="day">Selasa<div class="bar"><i></i></div></div>
            <div class="day">Rabu<div class="bar"><i></i></div></div>
            <div class="day">Kamis<div class="bar"><i></i></div></div>
            <div class="day">Jumat<div class="bar"><i></i></div></div>
            <div class="day">Sabtu<div class="bar"><i></i></div></div>
            <div class="day">Minggu<div class="bar"><i></i></div></div>
        </div>

        <!-- CATATAN MINGGUAN -->
        <h3 class="title">Catatan Minggu Ini</h3>
        <div class="weekly-notes">
            <label for="catatanMinggu">Tulis catatan atau target olahraga:</label>
            <textarea id="catatanMinggu" rows="4"
                placeholder="Contoh: olahraga 20 menit setiap hari."></textarea>
            <button type="button" id="simpanCatatanBtn">Simpan Catatan</button>
            <p id="statusCatatan">Catatan tersimpan di browser setelah disimpan.</p>
        </div>

        <!-- PILIHAN LATIHAN -->
        <h3 class="title">Pilih Latihan</h3>
        <div class="exercise-grid">
            <div class="exercise">
                <h3>🏃 Kardio</h3>
                <p>Meningkatkan stamina dan kesehatan jantung.</p>
                <button type="button" onclick="latihan('Kardio', 20, 60)">
                    Mulai Latihan
                </button>
            </div>

            <div class="exercise">
                <h3>💪 Latihan Kekuatan</h3>
                <p>Meningkatkan kekuatan tubuh dan otot.</p>
                <button type="button"
                    onclick="latihan('Latihan Kekuatan', 30, 220)">
                    Mulai Latihan
                </button>
            </div>

            <div class="exercise">
                <h3>🧘 Peregangan</h3>
                <p>Membantu meningkatkan kelenturan tubuh.</p>
                <button type="button" onclick="latihan('Peregangan', 10, 60)">
                    Mulai Latihan
                </button>
            </div>
        </div>

        <!-- TAMBAH LATIHAN SENDIRI -->
        <div class="controls">
            <label for="namaLatihan">Nama latihan sendiri:</label>
            <input type="text" id="namaLatihan" placeholder="Contoh: Bersepeda">
            <button type="button" id="tambahLatihanBtn">Tambah Latihan</button>
        </div>

        <!-- TIPS -->
        <h3 class="title">Tips Olahraga</h3>
        <button type="button" id="ambilTipsBtn">Ambil Tips Olahraga</button>
        <p id="hasilTips">Klik tombol untuk mendapatkan tips olahraga.</p>

        <!-- RESET -->
        <button class="reset" type="button" onclick="resetHari()">
            Reset Hari Ini
        </button>
        <button type="button"
        onclick="window.location.href='logout.php'">
    Logout
</button>
    </section>
</div>

<!-- TOAST -->
<div id="toast" class="toast" role="status" aria-live="polite">
    <span id="toastPesan"></span>
</div>

<script src="script_healthygo_lanjutan.js"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
    const parameter = new URLSearchParams(window.location.search);

    if (parameter.get("dashboard") === "true") {
        document.getElementById("home").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    }
});
</script>

</body>
</html>