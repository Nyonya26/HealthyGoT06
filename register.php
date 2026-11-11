
<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nama = trim($_POST["nama_pengguna"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];

    // Cek apakah email sudah terdaftar
    $cek = mysqli_prepare($conn,
        "SELECT email FROM pengguna WHERE email = ?"
    );

    mysqli_stmt_bind_param($cek, "s", $email);
    mysqli_stmt_execute($cek);
    $hasil = mysqli_stmt_get_result($cek);

    if (mysqli_num_rows($hasil) > 0) {
        echo "Email sudah terdaftar. Silakan gunakan email lain.";
        exit;
    }

    // Amankan password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Simpan data ke database
    $sql = "INSERT INTO pengguna
            (nama_pengguna, email, `kata sandi`)
            VALUES (?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param(
        $stmt, "sss", $nama, $email, $password_hash
    );

    if (mysqli_stmt_execute($stmt)) {
        echo "Pendaftaran berhasil!<br>";
        echo '<a href="login.html">Silakan Login</a>';
    } else {
        echo "Pendaftaran gagal: " . mysqli_error($conn);
    }
}
?>
