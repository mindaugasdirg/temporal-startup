import { proxyActivities } from "@temporalio/workflow";
import { ApplicationFailure } from '@temporalio/common';
import * as functions from "common/src";

async function tryAction<R>(name: string, action: () => Promise<R>): Promise<R> {
    try {
        return await action();
    } catch (err) {
        throw new ApplicationFailure(`${name} failed. Error: ${err}`);
    }
}

// Calculates 2(a+b)/(a-b)
export async function calculate(numberA: number, numberB: number): Promise<number> {
    const { add, divide } = proxyActivities<typeof functions>({
        // RetryPolicy specifies how to automatically handle retries if an Activity fails.
        retry: {
            initialInterval: '1 second',
            maximumInterval: '2 seconds',
            backoffCoefficient: 2,
            maximumAttempts: 1000,
            nonRetryableErrorTypes: ["DivisionByZeroError"],
        },
        startToCloseTimeout: '1 minute',
        taskQueue: functions.taskSimpleQueue
    });
    const { subtract, multiply, flakyFunction } = proxyActivities<typeof functions>({
        // RetryPolicy specifies how to automatically handle retries if an Activity fails.
        retry: {
            initialInterval: '1 second',
            maximumInterval: '2 seconds',
            backoffCoefficient: 2,
            maximumAttempts: 1000,
            nonRetryableErrorTypes: ["DivisionByZeroError"],
        },
        startToCloseTimeout: '1 minute',
        taskQueue: functions.taskComplexQueue
    });

    const combined = await tryAction("add", () => add(numberA, numberB));
    const lowerHalf = await tryAction("subtract", () => subtract(numberA, numberB));
    const upperHalf = await tryAction("multiply", () => multiply(2, combined));
    await tryAction("flakyFunction", () => flakyFunction());
    return await tryAction("divide", () => divide(upperHalf, lowerHalf));
}