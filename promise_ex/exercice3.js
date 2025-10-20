console.log("Program started");

const firstPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, 3000);
});

console.log("Promise pending:", firstPromise);
console.log("Program in progress...");

firstPromise
    .then(() => {
        console.log("Step 1 complete");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Step 2 complete");
            }, 3000);
        });
    })
    .then((message) => {
        console.log(message);
    });
