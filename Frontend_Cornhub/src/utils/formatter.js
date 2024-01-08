export function formatTime(seconds) {
    if (seconds < 60) {
        return `00:${seconds < 10 ? `0${seconds}` : seconds}`;
    } else if (seconds < 3600) {
        return new Date(seconds * 1000).toISOString().slice(14, 19);
    } else {
        return new Date(seconds * 1000).toISOString().slice(11, 19);
    }
}

export function formatPrice(price) {
    return price.toLocaleString();
}

export function convertArr(input) {
    let arr = [];
    let getStr = "";
    let check = 0;
    for (let i of input) {
        if (check === 0) {
            if (i === ',' || i === '[' || i === ']') {
                getStr = "";
                continue;
            }
        }
        getStr += i;
        if (i === '}') {
            arr.push(Object(getStr));
            check = 0;
            continue;
        }
        check = 1;
    }
    return arr;
}