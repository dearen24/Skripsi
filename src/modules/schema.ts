import {z} from "zod"

export const PenggunaSchema = z.object({
    email: z.string().email({message:"Email tidak valid!"}),
    nik: z.string().regex(new RegExp("^[0-9]*$"),{message:"NIK tidak valid!"}),
    nama: z.string({message:"Nama tidak valid!"}).max(100,{message:"Nama tidak valid!"}).min(1,{message:"Nama tidak valid!"}),
    jabatan: z.string().uuid({message:"Jabatan tidak valid!"})
});

export const JabatanSchema = z.object({
    nama: z.string({message:"Nama tidak valid!"}).max(100,{message:"Nama tidak valid!"}).min(1,{message:"Nama tidak valid!"}),
    kuotaMengawas: z.number({message:"Kuota mengawas tidak valid!"})
});

export const SemesterSchema = z.object({
    status: z.boolean({message:"Status tidak valid!"})
});

export const RuanganSchema = z.object({
    nama: z.string({message:"Nama tidak valid!"}).max(100,{message:"Nama tidak valid!"}).min(1,{message:"Nama tidak valid!"}),
    kapasitas: z.number({message:"Kapasitas tidak valid!"})
});

export const MatkulSchema = z.object({
    nama: z.string({message:"Nama tidak valid!"}).max(100,{message:"Nama tidak valid!"}).min(1,{message:"Nama tidak valid!"}),
    kode: z.coerce.string({message:"Kode tidak valid!"}).max(100,{message:"Kode tidak valid!"}).min(1,{message:"Kode tidak valid!"}),
});

export const MatkulUjianSchema = z.object({
    semester: z.string().uuid({message:"Semester tidak valid!"}),
    matkul: z.string().uuid({message:"Mata kuliah tidak valid!"}),
    jumlahPeserta: z.number({message:"Jumlah peserta tidak valid!"}),
    dosenPengajar: z.array(z.object({
        id: z.string().uuid({message:"Id dosen pengajar tidak valid!"}),
    },{message:"Mata Kuliah tidak valid"})).nonempty({message:"Dosen pengajar tidak boleh kosong"}),
});

export const UjianSchema = z.object({
    semester: z.string().uuid({message:"Semester tidak valid!"}),
    tanggal: z.string().date(),
    mulai: z.string().time({message:"Waktu mulai tidak valid!"}),
    selesai: z.string().time({message:"Waktu selesai tidak valid!"}),
    tipeujian: z.string({message:"Tipe ujian tidak valid!"}).max(100,{message:"Tipe ujian tidak valid!"}).min(1,{message:"Tipe ujian tidak valid!"}),
    metodeujian: z.string({message:"Metode ujian tidak valid!"}).max(100,{message:"Metode ujian tidak valid!"}).min(1,{message:"Metode ujian tidak valid!"}),
    shift: z.number({message:"Shift tidak valid!"}),
    matkul: z.array(z.object({
        id: z.string().uuid({message:"Id mata kuliah pengajar tidak valid!"}),
    },{message:"Mata Kuliah tidak valid"})).nonempty({message:"Mata kuliah tidak boleh kosong"}),
});

export const AturanKonsusmiSchema = z.object({
    delapanSepuluh: z.number({message:"Aturan 8 - 10 tidak valid!"}).min(0,{message:"Aturan 8 - 10 tidak valid!"}).max(1,{message:"Aturan 8 - 10 tidak valid!"}),
    sepuluhDuaBelas: z.number({message:"Aturan 10 - 12 tidak valid!"}).min(0,{message:"Aturan 10 - 12 tidak valid!"}).max(1,{message:"Aturan 10 - 12 tidak valid!"}),
    sebelasTigaBelas: z.number({message:"Aturan 11 - 13 tidak valid!"}).min(0,{message:"Aturan 11 - 13 tidak valid!"}).max(1,{message:"Aturan 11 - 13 tidak valid!"}),
    duaBelasDua: z.number({message:"Aturan 12 - 14 tidak valid!"}).min(0,{message:"Aturan 12 - 14 tidak valid!"}).max(1,{message:"Aturan 12 - 14 tidak valid!"}),
    duaEmpat: z.number({message:"Aturan 14 - 16 tidak valid!"}).min(0,{message:"Aturan 14 - 16 tidak valid!"}).max(1,{message:"Aturan 14 - 16 tidak valid!"}),
    snack: z.number({message:"Jumlah snack tidak valid!"}),
    lunch: z.number({message:"Jumlah makan siang tidak valid!"}),
});

export const KonsumsiNonPengawasSchema = z.object({
    tanggal: z.string().date(),
    semester: z.string().uuid({message:"Semester tidak valid!"}),
    masaujian: z.string({message:"Masa ujian tidak valid!"}).max(100,{message:"Masa ujian tidak valid!"}).min(1,{message:"Masa ujian tidak valid!"}),
    snack: z.number({message:"Jumlah snack tidak valid!"}),
    lunch: z.number({message:"Jumlah makan siang tidak valid!"}),
    catatan: z.string({message:"Catatan tidak valid!"}).max(100,{message:"Catatan tidak valid!"}).min(1,{message:"Catatan tidak valid!"}),
});