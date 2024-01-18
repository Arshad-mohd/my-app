
const fruitBasket = ['Lemon', 'Apple', 'Lemon', 'Kiwi', 'Apple', 'Bannana', 'Lemon', 'Apple', 'Lemon', 'Apple', 'Lemon', 'Kiwi', 'Apple', 'Bannana', 'Lemon', 'Apple', 'Guava'];


const countMap = new Map();

fruitBasket.forEach(item => {
    const currentCount = countMap.has(item) ? countMap.get(item) : 0;
    countMap.set(item, currentCount + 1);
});

console.log([...countMap.entries()]);