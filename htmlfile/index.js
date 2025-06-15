function add() {
    console.log("add executing.........")
    return function () {
        console.log("ineer function")
        return function () {
            console.log("inner to inner")
            return "hello"
        }

    }
    return "hello"
}
console.log(add()()())