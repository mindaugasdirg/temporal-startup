import { Worker } from '@temporalio/worker';
import { add, subtract, namespace, taskSimpleQueue } from 'common/src';

function flakyFunction(): Promise<void> {
    return Promise.resolve();
}

async function main() {
    const worker = await Worker.create({
        activities: {
            add,
            subtract,
        },
        namespace,
        taskQueue: taskSimpleQueue,
    });

    await worker.run();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});