// // function cetakPatern(baris){
// //  let pola = '';
// //  for(let i = 2; i <= baris; i++){
// //      for(let j = 2; j <= i; j++){
// //          pola += '*';
// //      }
// //      pola += '\n';
// //  }
// //  return pola;
// // }

// // // console.log(cetakPatern(10));

//prima

// function numberPrima(x){
//     let p = '';
//     for(let i = 2; i <=  x; i++){
//         let prima = 0;
//         for(let j = 1; j <= i; j++){    
//             if(i % j == 0){
//               prima = prima + 1;
//             }
//         }
//         if(prima == 2){
//             p = p + i + " ";
//             console.log(p)
//         }
//     }
// }

// numberPrima(7)

// isPrimeNumber(num){
//     let i, isPrime = 1;
//     for (i = 2; i <= (num/2); i++) {
//        if (num % i == 0){
//           isPrime = 0;
//           break;
//        }
//     }


let number = ''
function submitPrime(num){
  if((num.value < 0) || (num.value > 10)){
    return num
  } else {
    counter = 2;
    for (let i = 1; i <= numInput.value; i++) {
      for (let j = 1; j <= i; j++) {
        while(!isPrimeNumber(counter)){
            counter++;
          }
        console.log(counter)
        counter++;
      }
     '/n'
   }
   return number;
  }
}

function isPrimeNumber(num) {
   let i, isPrime = 1;
   for (i = 2; i <= (num/2); i++) {
      if (num % i == 0){
         isPrime = 0;
         break;
      }
   }
   if (isPrime == 1 || num == 2)
      return true;
   else
      return false;
}

isPrimeNumber(10)