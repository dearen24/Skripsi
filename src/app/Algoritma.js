// Algo untuk alokasi dosen ke ujian dengan cara batch
let arr = [];//array yg didapet dari server
let arrDosen = [];//array semua dosen
for(let i = 0;i<arr.length;i++){//masukin dosen ke array yg indexnya itu idnya
    arrDosen[arr[i].id] = arr[i]; 
}
let currIdDosen = [];//simpan iddosen terakhir yg ditambahin, klo pertama kali -1

function countMengawas(idDosen,idInput){//ambil id dosen yg ditambahin dan idInput fieldnya
    arrDosen[idDosen].kuotaMengawas-=1;//kurangin kuota ngawas dosen yg ditambahin
    if(currIdDosen.length!=0){//klo bukan pertama kali tambahin lagi kuota ngawas dosen yg sebelumnya 
       arrDosen[currIdDosen[idInput]].kuotaMengawas+=1;
    }
    currIdDosen[idInput] = idDosen;//id dosen yg skrg disimpen ke array yg indexnya idInputnya
}

// Algo untuk implement hitung konsumsi otomatis yg rule nya di store di database (MATRIX)
// Object aturan = [];
for(loop untuk semua tanggal){
    //ambil dosen yg ada di tanggal itu
    for(loop untuk semua dosen yg ada di tgl itu){
        // untuk setiap dosen diambil jadwalnya dan di bikin object sesuai dengan item setiap aturannya
        for(loop untuk semua aturan yg ada){
            // klo ada yg sama langsung masukin ke database abistu break loopnya
            // dimasukin di database ngikutin aturanya dia snack apa lunch
        }
    }
}

//klo ganti jadwal kasi pilihan konsumsi nya mau diitungin ulang apa ga, klo udh mepet sma waktu
//tanyain ke ko riki batas ubah konsumis karena ada kasus kalo konsumsinya dgantinya mepet 1 bisa diganti 1 nya ga bisa
//pake 2 role cuma admin sma staff tapi adminya cuma bole 1 akun aja