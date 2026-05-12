import { Worker } from '@temporalio/worker';
import { multiply, divide, namespace, flakyFunction, taskComplexQueue } from 'common/src';

async function main() {
    const worker = await Worker.create({
        activities: {
            multiply,
            divide,
            flakyFunction
        },
        namespace,
        taskQueue: taskComplexQueue,
    });

    await worker.run();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});