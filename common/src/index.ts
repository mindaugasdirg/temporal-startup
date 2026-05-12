export function add(a: number, b: number): Promise<number> {
    return Promise.resolve(a + b);
}

export function subtract(a: number, b: number): Promise<number> {
    return Promise.resolve(a - b);
}

export function multiply(a: number, b: number): Promise<number> {
    return Promise.resolve(a * b);
}

export function divide(a: number, b: number): Promise<number> {
    if (b === 0) {
        return Promise.reject(new DivisionByZeroError("Division by zero"));
    }
    return Promise.resolve(a / b);
}

export function flakyFunction(): Promise<void> {
    return new Promise((resolve, reject) => {
        const random = Math.random();
        if (random < 0.5) {
            resolve();
        } else {
            reject(new FlakyError("Flaky function failed"));
        }
    });
}

export class FlakyError extends Error {}
export class DivisionByZeroError extends Error {}

export const taskQueue = "my-queue";
export const taskSimpleQueue = "my-queue";
export const taskComplexQueue = "my-queue";
export const namespace = "default";
