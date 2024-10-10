# Deskripsi
Terdapat dua cara untuk menjalankan program. Yaitu dengan menggunakan batch file atau secara manual. Akan dijelaskan untuk setiap caranya.
1. Menggunakan Batch File.
2. Secara manual.

Jika menggunakan Batch File, maka program langsung berjalan dan membuka browser dengan alamat url dari perangkat lunak. 

# Requirement
- Node.js
- NPM
- Docker and Docker Compose

# Cara Instalasi dan Menjalankan Program
## Batch File
Pastikan berada pada direktori letak program berada sebelum menjalankan Batch File agar program dapat berjalan dengan baik. Jika sudah berada pada direktori
program berada maka dapat langsung menjalankan Batch File yaitu Run App.bat.

##Manual
Untuk dapat menjalankan program secara manual dapat mengikuti langkah-langkah berikut:
1. Pastikan sudah memiliki source code program.
2. Pastikan sudah berada pada direktori program.
3. Jalankan **docker compose up -d** untuk menjalankan container database.
4. Jalankan **npx prisma migrate dev** untuk melakukan migrasi dari skema ke basis data.
5. Jalankan npm run dev untuk menjalankan program.
6. Buka **http://localhost:3000** pada browser.
7. Jika ingin melihat database dengan prisma studio, jalankan **npx prisma studio** dan buka **http://localhost:5555** pada browser.

#Cara Menjalankan Program
Jika program sudah di-install, untuk menjalankan program dapat mengikuti langkah-langkah berikut:
1. docker compose up -d.
2. npm run dev.

#User Manual (Cara Penggunaan)
Untuk panduan penggunaan perangkat lunak dapat mengikuti langkah-langkah berikut:
1. Mengelola Master data
Untuk mengelola master data dapat mengikut langkah-langkah berikut. Master data adalah data-data utama yang akan dibutuhkan untuk
melakukan alokasi pengawas ujian dan fitur-fitur lainnya.
    1. Menambahkan master data
        1. Membuka menu untuk data yang akan dikelola.
        2. Memilih untuk menambahkan data.
        3. Mengisi data-data yang dibutuhkan.
        4. Menambahkan data yang baru.
    2. Mengubah master data
        1. Membuka menu untuk data yang akan dikelola.
        2. Memilih data yang akan diubah.
        3. Mengisi data-data yang yang diubah.
        4. Simpan perubahan pada data yang diubah.
    3. Menghapus master data
        1. Membuka menu untuk data yang akan dikelola.
        2. Memilih data yang akan dihapus.
        3. Memilih 'Ya' pada konfirmasi penghapusan data.

2. Melakukan Alokasi Ruangan
    1. Memilih semester, masa ujian dan tanggal untuk ujian-ujian yang ingin dialokasikan ruangan.
    2. Memilih ujian yang ingin dialokasikan ruangannya.
    3. Memilih ruangan-ruangan yang akan digunakan.

3. Melakukan Alokasi Pengawas
    1. Memilih semester, masa ujian dan tanggal untuk ujian-ujian yang ingin dialokasikan pengawas.
    2. Memilih ujian yang ingin dialokasikan pengawasnya.
    3. Mengalokasikan pengawas untuk setiap ruangan yang digunakan.

4. Menukar Pengawas
    1. Membuka menu untuk melakukan pertukaran pengawas.
    2. Memilih pengawas-pengawas yang ingin ditukar.
    3. Buat pertukaran pengawas.

5. Mengganti Pengawas
    1. Membuka menu untuk melakukan pergantian pengawas.
    2. Memilih jadwal dan juga pengawas penggantinya.
    3. Buat pergantian pengawas.

6. Membuat Rekap Mengawas
    1. Membuka menu rekap mengawas.
    2. Memilih semester dan masa ujian yang akan dibuat rekap mengawasnya.
    3. Buat rekap mengawas.

