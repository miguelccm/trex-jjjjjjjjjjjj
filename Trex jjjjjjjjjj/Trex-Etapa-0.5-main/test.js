let nota = [100,87,96,80]
let soma = 0

for(let índice = 0; índice < nota.length; índice++){
    soma += nota[índice]
}

let média = soma /nota.length;
console.log(média);