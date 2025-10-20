console.log("Program started");

const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Failed!");
    }, 2000);
    
    setTimeout(() => {
        resolve("Done!");
    }, 3000);
});

console.log("Promise pending:", myPromise);
console.log("Program in progress...");

myPromise
    .then(() => {
        console.log("Program complete");
    })
    .catch(() => {
        console.log("Program failure");
    });
