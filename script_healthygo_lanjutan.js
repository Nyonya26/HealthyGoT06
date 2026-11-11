
// ==========================================
// HEALTHYGO - SCRIPT UTAMA
// Timer sesuai pilihan durasi 1-30 menit
// ==========================================
alert("JAVASCRIPT HEALTHYGO TERBARU BERHASIL DIBACA!");
let timerInterval = null;
let sisaDetik = 20 * 60;
let namaLatihanDipilih = "";
let totalKalori = 0;
let totalMenit = 0;
let totalLatihan = 0;
let toastTimeout = null;
let latihanMenunggu = null;
let riwayatLatihanHariIni = [];

// ==========================================
// HALAMAN HOME
// ==========================================

function masukDashboard() {
    document.getElementById("home").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    tampilToast("Selamat datang di HealthyGo! 💛");
}

function ubahJudul() {
    document.getElementById("judulHome").innerHTML =
        "Ayo Bergerak<br>Hidup Lebih Sehat!";
    tampilToast("Judul berhasil diubah!");
}

function ubahWarna() {
    document.querySelectorAll("button").forEach(function (tombol) {
        tombol.style.backgroundColor = "#ffffff";
        tombol.style.color = "#111111";
    });
    tampilToast("Warna tombol berhasil diubah!");
}

function tampilDeskripsi() {
    const info = document.getElementById("infoOlahraga");
    if (info) info.hidden = !info.hidden;
}

// ==========================================
// PENGATURAN DURASI TIMER
// ==========================================

function ambilDurasiMenit() {
    const pilihan = document.getElementById("durasiTimer");

    if (!pilihan) return 20;

    return Number(pilihan.value) || 20;
}

function tampilkanTimer() {
    const tampilan = document.getElementById("timerDisplay");
    if (!tampilan) return;

    const menit = Math.floor(sisaDetik / 60);
    const detik = sisaDetik % 60;

    tampilan.textContent =
        String(menit).padStart(2, "0") + ":" +
        String(detik).padStart(2, "0");
}

// ==========================================
// MULAI TIMER
// ==========================================

function mulaiTimerLatihan() {
    if (timerInterval !== null) return;

    // Jika timer sudah habis, gunakan durasi pilihan terbaru
    if (sisaDetik <= 0) {
        sisaDetik = ambilDurasiMenit() * 60;
    }

    const status = document.getElementById("timerStatus");

    if (status) {
        status.textContent = namaLatihanDipilih
            ? "Latihan " + namaLatihanDipilih + " sedang berlangsung! 💪"
            : "Timer sedang berjalan! 💪";
    }

    tampilkanTimer();

    timerInterval = setInterval(function () {
        sisaDetik--;

        tampilkanTimer();

        if (sisaDetik <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            sisaDetik = 0;

            tampilkanTimer();

            if (status) {
                status.textContent =
                    "Latihan selesai! Bagus, kamu berhasil! 🎉";
            }

            selesaikanLatihan();
            tampilToast("Waktu latihan selesai! 🎉");
        }
    }, 1000);
}

// ==========================================
// JEDA TIMER
// ==========================================

function jedaTimerLatihan() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;

        const status = document.getElementById("timerStatus");

        if (status) {
            status.textContent =
                "Timer dijeda. Tekan Mulai untuk melanjutkan.";
        }

        tampilToast("Timer dijeda.");
    }
}

// ==========================================
// RESET TIMER
// ==========================================

function resetTimerLatihan() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    sisaDetik = ambilDurasiMenit() * 60;

    tampilkanTimer();

    const status = document.getElementById("timerStatus");

    if (status) {
        status.textContent =
            "Timer siap selama " + ambilDurasiMenit() + " menit.";
    }
}

// ==========================================
// MEMILIH LATIHAN
// ==========================================

function latihan(nama, menit, kalori) {
    // Hentikan timer sebelumnya
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    namaLatihanDipilih = nama;

    // Ambil durasi langsung dari dropdown
    const durasi = ambilDurasiMenit();

    // Simpan latihan sementara
    latihanMenunggu = {
        nama: nama,
        durasi: durasi,
        kalori: kalori
    };

    // Ubah durasi menjadi detik
    sisaDetik = durasi * 60;

    const namaAktif = document.getElementById("namaLatihanAktif");

    if (namaAktif) {
        namaAktif.textContent = "Latihan aktif: " + nama;
    }

    tampilkanTimer();
    mulaiTimerLatihan();

    tampilToast("Latihan " + nama + " dimulai!");
}

// ==========================================
// TAMBAH LATIHAN SENDIRI
// ==========================================

function tambahLatihanSendiri() {
    const input = document.getElementById("namaLatihan");

    if (!input) return;

    const nama = input.value.trim();

    if (nama === "") {
        tampilToast("Masukkan nama latihan terlebih dahulu!");
        input.focus();
        return;
    }

    latihan(nama, ambilDurasiMenit(), 100);

    input.value = "";
}

// ==========================================
// CATAT LATIHAN YANG SELESAI
// ==========================================

function selesaikanLatihan() {
    if (!latihanMenunggu) return;

    const selesai = latihanMenunggu;
    const sekarang = new Date();

    totalKalori += selesai.kalori;
    totalMenit += selesai.durasi;
    totalLatihan++;

    perbaruiStatistik();

    const daftar = document.getElementById("scheduleList");

    if (daftar) {
        const kosong = daftar.querySelector(".jadwal-kosong");

        if (kosong) kosong.remove();

        const item = document.createElement("p");

        item.className = "jadwal-item";
        item.textContent =
            "✅ " + selesai.nama + " — " +
            selesai.durasi + " menit (Selesai)";

        daftar.appendChild(item);
    }

    riwayatLatihanHariIni.push({
        nama: selesai.nama,
        durasi: selesai.durasi,
        kalori: selesai.kalori,
        waktu: sekarang.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit"
        })
    });

    simpanRiwayat();
    tampilkanCatatanOtomatis();

    latihanMenunggu = null;
}

// ==========================================
// SIMPAN RIWAYAT
// ==========================================

function simpanRiwayat() {
    try {
        localStorage.setItem(
            "healthyGoRiwayat",
            JSON.stringify(riwayatLatihanHariIni)
        );
    } catch (error) {
        console.log("Riwayat tidak dapat disimpan.");
    }
}

// ==========================================
// CATATAN OTOMATIS
// ==========================================

function tampilkanCatatanOtomatis() {
    let catatan = document.getElementById("catatanOtomatis");

    if (!catatan) {
        catatan = document.createElement("div");
        catatan.id = "catatanOtomatis";
        catatan.style.padding = "15px";
        catatan.style.marginTop = "12px";
        catatan.style.borderRadius = "10px";
        catatan.style.backgroundColor = "#fff9c4";

        const area = document.getElementById("catatanMinggu");

        if (area && area.parentElement) {
            area.parentElement.appendChild(catatan);
        } else {
            const daftar = document.getElementById("scheduleList");

            if (daftar && daftar.parentElement) {
                daftar.parentElement.appendChild(catatan);
            }
        }
    }

    catatan.textContent =
        "📝 Hari ini kamu telah melakukan " +
        totalLatihan + " latihan selama " +
        totalMenit + " menit.";
}

// ==========================================
// STATISTIK DAN TARGET
// ==========================================

function perbaruiStatistik() {
    document.getElementById("calories").textContent = totalKalori;

    document.getElementById("minutes").textContent =
        totalMenit + " Menit";

    document.getElementById("sessions").textContent =
        totalLatihan + " Latihan";

    const persen = Math.min(
        100,
        Math.round((totalMenit / 60) * 100)
    );

    document.getElementById("targetText").textContent =
        persen + "% target olahraga selesai.";

    document.getElementById("targetBar").style.width =
        persen + "%";
}

// ==========================================
// CATATAN MINGGUAN
// ==========================================

function simpanCatatan() {
    const area = document.getElementById("catatanMinggu");

    if (!area) return;

    try {
        localStorage.setItem("healthyGoCatatanMinggu", area.value);

        const status = document.getElementById("statusCatatan");

        if (status) {
            status.textContent = "Catatan berhasil disimpan! 💛";
        }

        tampilToast("Catatan berhasil disimpan!");
    } catch (error) {
        const status = document.getElementById("statusCatatan");

        if (status) {
            status.textContent = "Catatan tidak dapat disimpan.";
        }
    }
}

function muatCatatan() {
    try {
        const catatan = localStorage.getItem("healthyGoCatatanMinggu");
        const area = document.getElementById("catatanMinggu");

        if (catatan !== null && area) {
            area.value = catatan;
        }
    } catch (error) {
        console.log("Catatan tidak dapat dimuat.");
    }
}

// ==========================================
// TIPS OLAHRAGA
// ==========================================

function ambilTipsOlahraga() {
    const hasil = document.getElementById("hasilTips");

    if (!hasil) return;

    hasil.textContent = "Sedang menyiapkan tips...";

    const tips = [
        "Lakukan pemanasan sebelum olahraga.",
        "Minum air putih agar tubuh tetap terhidrasi.",
        "Mulailah olahraga sesuai kemampuan tubuh.",
        "Istirahat yang cukup setelah berolahraga.",
        "Lakukan peregangan untuk membantu kelenturan."
    ];

    Promise.resolve(
        tips[Math.floor(Math.random() * tips.length)]
    ).then(function (tip) {
        hasil.textContent = "💡 " + tip;
    });
}

// ==========================================
// TOAST / SNACKBAR
// ==========================================

function tampilToast(pesan) {
    const toast = document.getElementById("toast");
    const pesanToast = document.getElementById("toastPesan");

    if (!toast || !pesanToast) return;

    pesanToast.textContent = pesan;
    toast.classList.add("show");

    if (toastTimeout !== null) {
        clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(function () {
        toast.classList.remove("show");
        toastTimeout = null;
    }, 3000);
}

// ==========================================
// RESET AKTIVITAS HARI INI
// ==========================================

function resetHari() {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    totalKalori = 0;
    totalMenit = 0;
    totalLatihan = 0;
    namaLatihanDipilih = "";
    latihanMenunggu = null;
    riwayatLatihanHariIni = [];

    perbaruiStatistik();

    const daftar = document.getElementById("scheduleList");

    if (daftar) {
        daftar.innerHTML =
            '<p class="jadwal-kosong">Belum ada latihan hari ini.</p>';
    }

    const namaAktif = document.getElementById("namaLatihanAktif");

    if (namaAktif) {
        namaAktif.textContent = "Belum ada latihan dipilih.";
    }

    const catatan = document.getElementById("catatanOtomatis");

    if (catatan) catatan.remove();

    try {
        localStorage.removeItem("healthyGoRiwayat");
    } catch (error) {
        console.log("Riwayat tidak dapat dihapus.");
    }

    resetTimerLatihan();

    tampilToast("Aktivitas hari ini berhasil direset!");
}

// ==========================================
// HUBUNGKAN SEMUA TOMBOL
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
    const tombolTimer = document.getElementById("tombolTimer");
    const tombolJeda = document.getElementById("tombolJedaTimer");
    const tombolReset = document.getElementById("tombolResetTimer");
    const pilihanDurasi = document.getElementById("durasiTimer");
    const tombolTambah = document.getElementById("tambahLatihanBtn");
    const tombolCatatan = document.getElementById("simpanCatatanBtn");
    const tombolTips = document.getElementById("ambilTipsBtn");

    // Timer mulai
    if (tombolTimer) {
        tombolTimer.addEventListener("click", mulaiTimerLatihan);
    }

    // Timer jeda
    if (tombolJeda) {
        tombolJeda.addEventListener("click", jedaTimerLatihan);
    }

    // Timer reset
    if (tombolReset) {
        tombolReset.addEventListener("click", resetTimerLatihan);
    }

    // Pilihan durasi
    if (pilihanDurasi) {
        sisaDetik = Number(pilihanDurasi.value) * 60;

        pilihanDurasi.addEventListener("change", function () {
            resetTimerLatihan();
        });
    }

    // Tambah latihan sendiri
    if (tombolTambah) {
        tombolTambah.addEventListener("click", tambahLatihanSendiri);
    }

    // Simpan catatan
    if (tombolCatatan) {
        tombolCatatan.addEventListener("click", simpanCatatan);
    }

    // Ambil tips
    if (tombolTips) {
        tombolTips.addEventListener("click", ambilTipsOlahraga);
    }

    // Muat catatan
    muatCatatan();

    // Muat riwayat
    try {
        const data = localStorage.getItem("healthyGoRiwayat");

        if (data) {
            riwayatLatihanHariIni = JSON.parse(data);
        }
    } catch (error) {
        riwayatLatihanHariIni = [];
    }

    // Tampilkan durasi awal
    tampilkanTimer();
});
