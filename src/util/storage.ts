export function save(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function load(key: string) {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    }
    return null;
}
