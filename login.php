
<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"] ?? "";
    $password = $_POST["password"] ?? "";

    if (!empty($email) && !empty($password)) {
        $_SESSION["username"] = $email;

        header("Location: index.php?dashboard=true");
        exit;
    }
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login HealthyGo</title>
    <link rel="stylesheet" href="auth.css">
</head>
<body>

<div class="auth-container">
    <div class="auth-card">

        <h1>HealthyGo 💛</h1>
        <h2>Selamat Datang!</h2>
        <p>Silakan login untuk memulai hidup sehatmu.</p>

        <form method="POST" action="login.php">

            <label>Email</label>
            <input type="email" name="email"
                   placeholder="Masukkan email" required>

            <label>Password</label>
            <input type="password" name="password"
                   placeholder="Masukkan password" required>

            <button type="submit">Login</button>

        </form>

        <p>Belum punya akun?
            <a href="register.html">Daftar Sekarang</a>
        </p>
<a href="index.php">Kembali ke Beranda</a>

    </div>
</div>

</body>
</html>
