export function randomString() {
    let str = "";
    for (let i = 0; i < 8; i++) {
        let rand = Math.floor(Math.random() * 36);
        if (rand < 26) {
            str += String.fromCharCode(97 + rand);
        } else {
            str += String.fromCharCode(48 + (rand - 26));
        }
    }
    return str;
}

export function emailRandom() {
    let str = "";
    for (let i = 0; i < 8; i++) {
        let rand = Math.floor(Math.random() * 36);
        if (rand < 26) {
            str += String.fromCharCode(97 + rand);
        } else {
            str += String.fromCharCode(48 + (rand - 26));
        }
    }
    return str + "@gmail.com";
}
