export function splitStringByLabel(fullString: string, label: string) {
    return fullString.replace(label, "").trim();
}

export function splitString(fullString: string) {
    return fullString.trim().split(",");
}

export function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getFullName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}
