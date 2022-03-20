export function validInput(elems) {
    let flag = false
    let count = 0;
    for (let item in elems) {
        for (let elem of elems[item]) {
            if (elem.trim() != "") {
                count++
                if (count === Object.keys(elems).length) {
                    flag = true
                }
            }
        }
    }
    return flag
}

export function isEmptyInput(data) {
    let flag = false;

    data.length >= 3 ? flag = true : false;

    return flag;
}