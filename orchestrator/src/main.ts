import { Worker } from '@temporalio/worker';
import { namespace, taskQueue } from 'common/src';

async function run() {
    // Register Workflows and Activities with the Worker and connect to
    // the Temporal server.
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows'),
        namespace,
        taskQueue,
    });

    // Start accepting tasks from the Task Queue.
    await worker.run();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});