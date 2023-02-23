export function splitStringByLabel(fullString: string, label: string){
    return fullString.replace(label, "").trim();
}

export function splitString(fullString: string) {
    return fullString.trim().split(",");
}