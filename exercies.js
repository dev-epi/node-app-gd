const array1 = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const array2 = [ { id: 3, name: 'David' } , { id: 2, name: 'Charlie' }];

const mergeArrays = (array1, array2)=> {

     let result  = []
    array2.forEach((element)=>{
        let exist_id = result.find(x=> x.id == element.id)
        if(!exist_id){
            result.push(element)
        }
    })

     return result

}


// console.log(mergeArrays(array1 , array2));
const items = [
    { name: 'Apple', category: 'Fruit' },
    { name: 'Banana', category: 'Fruit' },
    { name: 'Carrot', category: 'Vegetable' },
    { name: 'Broccoli', category: 'Vegetable' }
];

const groupeditems= (items)=>{
    let grouped = { }
    items.forEach(element=>{
        if(!grouped[element.category]){
            grouped[element.category] = []

        }
        grouped[element.category].push(element)
        
    })
       
    return grouped
}

// console.log(groupeditems(items))
const scores = [
    { subject: 'Math', score: 80 },
    { subject: 'Math', score: 90 },
    { subject: 'Science', score: 85 },
    { subject: 'Science', score: 95 }
];

function calculateStatistics(array) {
    // À compléter
    let result = {}
    array.map(element=>{
        if(!result[element.subject])
        result[element.subject] = {total : 0 , count : 0}

        result[element.subject].total +=element.score   
        result[element.subject].count ++   
    })

    let avreage = {}
    for(const key in result){
        console.log(key)
        avreage[key] = result[key].total /result[key].count
    }
    return avreage
}
console.log(calculateStatistics(scores))







