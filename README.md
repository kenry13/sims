<div align="center">

# 📦 SIMS
### Smart Inventory Management System

![Laravel](https://img.shields.io/badge/Laravel-v10-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-v18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Inertia](https://img.shields.io/badge/Inertia.js-v1-9553E9?style=for-the-badge)

Aplikasi manajemen inventaris berbasis web yang dibangun dengan stack modern Laravel + React + Inertia.js. Dirancang untuk memudahkan pengelolaan stok barang, pencatatan transaksi masuk/keluar, serta pemantauan stok secara real-time.

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Struktur Database](#-struktur-database)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Cara Instalasi](#-cara-instalasi)
- [Cara Menjalankan Project](#-cara-menjalankan-project)
- [Akun Default](#-akun-default)
- [Struktur Folder](#-struktur-folder)
- [Pengembang](#-pengembang)

---

## 🧩 Tentang Proyek

SIMS (Smart Inventory Management System) adalah aplikasi web untuk mengelola inventaris barang secara efisien. Aplikasi ini mendukung dua level akses pengguna yaitu **Admin** dan **User (Staff Gudang)**, dengan fitur pencatatan barang masuk/keluar yang otomatis memperbarui stok, serta notifikasi ketika stok barang mendekati batas minimum.

Proyek ini dikembangkan menggunakan metode **Agile** dengan siklus sprint mingguan selama 7 minggu.

---

## ✨ Fitur

### 👑 Admin
- Manajemen data barang (CRUD) lengkap dengan kode unik dan satuan
- Manajemen kategori barang
- Manajemen data supplier
- Pencatatan barang masuk & keluar
- Pemantauan stok real-time dengan indikator status (Aman / Menipis)
- Dashboard ringkasan inventaris

### 👤 User (Staff Gudang)
- Melihat daftar barang dan status stok
- Mencatat barang masuk dan keluar
- Melihat riwayat transaksi

### ⚙️ Sistem
- Autentikasi (Login / Logout) dengan middleware role
- Stok otomatis bertambah saat barang masuk
- Stok otomatis berkurang saat barang keluar
- Validasi stok — tidak bisa keluar melebihi stok tersedia
- Peringatan stok menipis otomatis
- Pagination pada semua halaman daftar

---

## 🛠️ Teknologi yang Digunakan

| Kategori | Teknologi | Versi |
|---|---|---|
| Backend Framework | Laravel | 10.x |
| Frontend Library | React.js | 18.x |
| Bridge (SSR-free SPA) | Inertia.js | 1.x |
| CSS Framework | Tailwind CSS | 3.x |
| Build Tool | Vite | 5.x |
| Database | MySQL | 8.0 |
| Auth Scaffolding | Laravel Breeze | 2.x |
| Package Manager (PHP) | Composer | 2.x |
| Package Manager (JS) | NPM | 10.x |
| Server Development | Laragon | 6.x |

---

## 🗄️ Struktur Database

```
users           → data pengguna + role (admin/user)
categories      → kategori barang
suppliers       → data supplier
items           → data barang (stok, min_stok, satuan)
stock_ins       → riwayat barang masuk
stock_outs      → riwayat barang keluar
```

**Relasi Antar Tabel:**
- `items` → belongs to `categories` dan `suppliers`
- `stock_ins` → belongs to `items` dan `users`
- `stock_outs` → belongs to `items` dan `users`

---

## 💻 Persyaratan Sistem

Pastikan perangkat kamu sudah terinstal:

- [Laragon](https://laragon.org/download/) (sudah termasuk PHP 8.2+, MySQL, Apache)
- [Composer](https://getcomposer.org/) 2.x
- [Node.js](https://nodejs.org/) 18+ dan NPM
- [Git](https://git-scm.com/)

---

## 🚀 Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/sims.git
cd sims
```

> Ganti `username` dengan username GitHub kamu.

### 2. Install Dependensi PHP

```bash
composer install
```

### 3. Install Dependensi JavaScript

```bash
npm install
```

### 4. Salin File Environment

```bash
cp .env.example .env
```

### 5. Generate Application Key

```bash
php artisan key:generate
```

### 6. Konfigurasi Database

Buka file `.env`, sesuaikan bagian berikut:

```env
APP_NAME=SIMS
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sims_db
DB_USERNAME=root
DB_PASSWORD=
```

> Password root Laragon defaultnya kosong.

### 7. Buat Database

Buka **phpMyAdmin** di Laragon lalu buat database baru bernama `sims_db`.

Atau lewat terminal:

```bash
mysql -u root -e "CREATE DATABASE sims_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 8. Jalankan Migrasi & Seeder

```bash
php artisan migrate --seed
```

Perintah ini akan membuat semua tabel dan mengisi data awal (kategori, supplier, barang, dan akun default).

---

## ▶️ Cara Menjalankan Project

Jalankan dua perintah ini di **dua terminal terpisah**:

**Terminal 1 — Backend Laravel:**
```bash
php artisan serve
```

**Terminal 2 — Frontend Vite (React):**
```bash
npm run dev
```

Kemudian buka browser dan akses:

```
http://localhost:8000
```

---

## 🔑 Akun Default

Setelah menjalankan seeder, tersedia dua akun untuk login:

| Role | Email | Password |
|---|---|---|
| Admin | admin@sims.com | password |
| User | user@sims.com | password |

---

## 📁 Struktur Folder

```
sims/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       ├── DashboardController.php
│   │       ├── CategoryController.php
│   │       ├── SupplierController.php
│   │       ├── ItemController.php
│   │       ├── StockInController.php
│   │       └── StockOutController.php
│   └── Models/
│       ├── User.php
│       ├── Category.php
│       ├── Supplier.php
│       ├── Item.php
│       ├── StockIn.php
│       └── StockOut.php
├── database/
│   ├── migrations/       ← struktur tabel database
│   └── seeders/          ← data awal
├── resources/
│   └── js/
│       ├── Layouts/
│       │   └── AuthenticatedLayout.jsx  ← layout sidebar utama
│       └── Pages/
│           ├── Dashboard.jsx
│           ├── Items/
│           │   ├── Index.jsx
│           │   ├── Create.jsx
│           │   └── Edit.jsx
│           ├── Categories/
│           │   ├── Index.jsx
│           │   ├── Create.jsx
│           │   └── Edit.jsx
│           ├── Suppliers/
│           │   ├── Index.jsx
│           │   ├── Create.jsx
│           │   └── Edit.jsx
│           ├── StockIns/
│           │   ├── Index.jsx
│           │   └── Create.jsx
│           └── StockOuts/
│               ├── Index.jsx
│               └── Create.jsx
└── routes/
    └── web.php           ← definisi semua route
```

---

## 👨‍💻 Pengembang

Dikembangkan sebagai tugas mata kuliah Pemrograman Web Lanjutan dengan metode pengembangan **Agile (7 Sprint)**.

---

<div align="center">

Dibuat dengan ❤️ menggunakan Laravel & React

</div>