-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 11, 2026 at 07:36 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthygo_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `catatan`
--

CREATE TABLE `catatan` (
  `id_catatan` int NOT NULL,
  `id_pengguna` int NOT NULL,
  `isi_catatan` text NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `catatan`
--

INSERT INTO `catatan` (`id_catatan`, `id_pengguna`, `isi_catatan`, `tanggal`) VALUES
(1, 1, 'Hari ini saya telah melakukan olahraga kardio selama 30 menit', '2026-06-06');

-- --------------------------------------------------------

--
-- Table structure for table `latihan`
--

CREATE TABLE `latihan` (
  `id_latihan` int NOT NULL,
  `nama_latihan` varchar(100) NOT NULL,
  `deskripsi` text NOT NULL,
  `kalori_per_menit` decimal(6,5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `latihan`
--

INSERT INTO `latihan` (`id_latihan`, `nama_latihan`, `deskripsi`, `kalori_per_menit`) VALUES
(1, 'Kardio', 'Menyehatkan Jantung: Memperkuat otot jantung dan menurunkan risiko penyakit kardiovaskular, hipertensi, serta stroke.\r\n\r\nMembakar Kalori & Membantu Kontrol Berat Badan: Efektif membakar lemak dan meningkatkan metabolisme tubuh.\r\n\r\nMeningkatkan Kapasitas Paru-Paru: Memperbaiki sistem pernapasan dan stamina tubuh agar tidak mudah lelah.\r\n\r\nMengontrol Gula Darah & Kolesterol: Meningkatkan sensitivitas insulin dan membantu menurunkan kadar kolesterol jahat (LDL).\r\n\r\nMeningkatkan Suasana Hati (Mood): Merangsang pelepasan hormon endorfin yang mengurangi stres, kecemasan, dan memperbaiki kualitas tidur.', '4.00000'),
(2, 'Latihan Kekuatan', 'Memperkuat Otot & Tulang: Meningkatkan massa otot dan kepadatan tulang.\r\n\r\nMeningkatkan Metabolisme: Membakar kalori lebih banyak, bahkan saat beristirahat.\r\n\r\nMenjaga Postur & Keseimbangan: Memperbaiki postur tubuh dan mengurangi risiko cedera/jatuh.\r\n\r\nMengontrol Gula Darah: Meningkatkan sensitivitas insulin dan kesehatan fungsi tubuh.', '3.00000'),
(3, 'Peregangan', 'Meningkatkan Kelenturan: Menjaga sendi dan otot tetap lentur serta bebas bergerak.\r\n\r\nMencegah Cedera: Menyiapkan otot sebelum beraktivitas dan mengurangi ketegangan.\r\n\r\nMelancarkan Sirkulasi: Mempercepat aliran darah ke otot untuk mempercepat pemulihan.\r\n\r\nMeringankan Nyeri & Stres: Mengurangi kaku otot dan meredakan ketegangan tubuh.', '2.00000');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int NOT NULL,
  `nama_pengguna` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `kata sandi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `nama_pengguna`, `email`, `kata sandi`) VALUES
(1, 'Sikri Mawid Susanti Benu', 'sikri26@gmail.com', 'Contoh_123');

-- --------------------------------------------------------

--
-- Table structure for table `pengingat`
--

CREATE TABLE `pengingat` (
  `id_pengingat` int NOT NULL,
  `id_pengguna` int NOT NULL,
  `id_jadwal` int NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pengingat`
--

INSERT INTO `pengingat` (`id_pengingat`, `id_pengguna`, `id_jadwal`, `status`) VALUES
(1, 1, 1, 'Aktif');

-- --------------------------------------------------------

--
-- Table structure for table `riwayat_olahraga`
--

CREATE TABLE `riwayat_olahraga` (
  `id_riwayat` int NOT NULL,
  `id_pengguna` int NOT NULL,
  `id_latihan` int NOT NULL,
  `durasi` int NOT NULL,
  `total_kalori` decimal(8,5) NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `riwayat_olahraga`
--

INSERT INTO `riwayat_olahraga` (`id_riwayat`, `id_pengguna`, `id_latihan`, `durasi`, `total_kalori`, `tanggal`) VALUES
(1, 1, 1, 30, '120.00000', '2026-06-06');

-- --------------------------------------------------------

--
-- Table structure for table `waktu_olahraga`
--

CREATE TABLE `waktu_olahraga` (
  `id_jadwal` int NOT NULL,
  `id_pengguna` int NOT NULL,
  `id_latihan` int NOT NULL,
  `hari` varchar(20) NOT NULL,
  `waktu` time NOT NULL,
  `durasi` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `waktu_olahraga`
--

INSERT INTO `waktu_olahraga` (`id_jadwal`, `id_pengguna`, `id_latihan`, `hari`, `waktu`, `durasi`) VALUES
(1, 1, 1, 'senin', '07:30:00', 30),
(2, 1, 1, 'senin', '07:30:00', 30);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catatan`
--
ALTER TABLE `catatan`
  ADD PRIMARY KEY (`id_catatan`),
  ADD KEY `id_penggunaan` (`id_pengguna`);

--
-- Indexes for table `latihan`
--
ALTER TABLE `latihan`
  ADD PRIMARY KEY (`id_latihan`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `alamat email` (`email`);

--
-- Indexes for table `pengingat`
--
ALTER TABLE `pengingat`
  ADD PRIMARY KEY (`id_pengingat`),
  ADD KEY `fk_pengingat_jadwal` (`id_jadwal`),
  ADD KEY `fk_pengingat_pengguna` (`id_pengguna`);

--
-- Indexes for table `riwayat_olahraga`
--
ALTER TABLE `riwayat_olahraga`
  ADD PRIMARY KEY (`id_riwayat`),
  ADD KEY `id_penggunaan` (`id_pengguna`),
  ADD KEY `id_latihan` (`id_latihan`);

--
-- Indexes for table `waktu_olahraga`
--
ALTER TABLE `waktu_olahraga`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_latihan` (`id_latihan`),
  ADD KEY `fk_waktu_pengguna` (`id_pengguna`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catatan`
--
ALTER TABLE `catatan`
  MODIFY `id_catatan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pengingat`
--
ALTER TABLE `pengingat`
  MODIFY `id_pengingat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `riwayat_olahraga`
--
ALTER TABLE `riwayat_olahraga`
  MODIFY `id_riwayat` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `waktu_olahraga`
--
ALTER TABLE `waktu_olahraga`
  MODIFY `id_jadwal` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `catatan`
--
ALTER TABLE `catatan`
  ADD CONSTRAINT `fk_catatan_pengguna` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `pengingat`
--
ALTER TABLE `pengingat`
  ADD CONSTRAINT `fk_pengingat_jadwal` FOREIGN KEY (`id_jadwal`) REFERENCES `waktu_olahraga` (`id_jadwal`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_pengingat_pengguna` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `riwayat_olahraga`
--
ALTER TABLE `riwayat_olahraga`
  ADD CONSTRAINT `fk_riwayat_ke_latihan` FOREIGN KEY (`id_latihan`) REFERENCES `latihan` (`id_latihan`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_riwayat_pengguna` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `waktu_olahraga`
--
ALTER TABLE `waktu_olahraga`
  ADD CONSTRAINT `fk_waktu_latihan` FOREIGN KEY (`id_latihan`) REFERENCES `latihan` (`id_latihan`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_waktu_pengguna` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
