try {
  var arrayA = []
  var arrayB = []
  for (i=0;i<20;i++) {
    var varA = i%5
    var varB = Math.floor(i/5)
    arrayB.push(varB)
  }
} catch (error) {
  console.error(error)
}
console.log(arrayB)