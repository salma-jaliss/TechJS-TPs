console.log("Program Started");

const myPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Done!");
    }, 3000);
});

console.log("Promise pending:", myPromise);
console.log("Program in progress...");

myPromise.then(() => {
    console.log("Program complete");
});
