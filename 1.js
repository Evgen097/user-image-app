
let n = 10;
let k = {singular: "курс", many: "курса", many2: "курсов"}

let genitive = (n, obj)=>{
    if(n === 1) return `${n} ${obj.singular}`;
    if(n < 6) return `${n} ${obj.many}`;
    return `${n} ${obj.many2}`;
}

console.log(genitive(n, k))

















// let needles = ['салат', 'помидоры'];
// let change = 'еда';
// let haystack  = 'свежие помидоры пошли в еда';
//
// let autoReplace = (needles, change, haystack)=>{
//     if(!needles || !change || !haystack) return false;
//     let h = haystack.split(' ');
//     let c = h.map(word =>{
//         if(needles.includes(word.toLowerCase())) return change;
//         return word;
//     })
//
//     return c.join(' ');
// }
// let result =  autoReplace(needles, change, haystack)
// console.log(result)


// let palmTree = (n)=> 'p'.repeat(n);
//
// console.log( palmTree(5) )


















