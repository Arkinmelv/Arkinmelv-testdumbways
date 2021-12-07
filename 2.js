function dumbwaysJos(x){
    const maxDiscount = 20000;
    const minimBelanja = 50000;
    const diskon = 0.211;

    if(x < minimBelanja){
        return 0;
    }

    const jumlahDiskon = x * diskon;
    if(jumlahDiskon > maxDiscount){
        return maxDiscount;
    }
    var totalBayar = x - jumlahDiskon;
    var kembalian = jumlahDiskon;
    console.log('jumlah belanja :' + ' '  + x)
    console.log('yang harus dibayar :'+ ' '  + totalBayar);
    console.log('diskon :'+ ' '  + parseInt(jumlahDiskon, 10)) ;
    console.log('kembalian :'+ ' '  + kembalian);
}

dumbwaysJos(60000)

console.log(`==================================`)
function dumbwaysMantap(x){
    const maxDiscount = 40000;
    const minimBelanja = 80000;
    const diskon = 0.30;

    if(x < minimBelanja){
        return 0;
    }

    const jumlahDiskon = x * diskon;
    if(jumlahDiskon > maxDiscount){
        return maxDiscount;
    }
    var totalBayar = x - jumlahDiskon;
    var kembalian = jumlahDiskon;
    console.log('jumlah belanja :'+ ' ' + x)
    console.log('yang harus dibayar :'+ ' '  + totalBayar);
    console.log('diskon :'+ ' '  + parseInt(jumlahDiskon, 10)) ;
    console.log('kembalian : '+ ' '  + kembalian);
}

dumbwaysMantap(100000)