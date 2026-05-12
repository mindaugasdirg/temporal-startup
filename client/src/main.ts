import { Connection, Client } from '@temporalio/client';
import { namespace, taskQueue } from 'common/src';

async function run() {
    const connection = await Connection.connect();
    const client = new Client({ connection, namespace });

    const a = 10;
    const b = 5;

    const handle = await client.workflow.start("calculate", {
        args: [a, b],
        taskQueue: taskQueue,
        workflowId: 'workflow-' + Date.now().toString(),
    });
    
    console.log(
        `Started Workflow 1 ${handle.workflowId} with RunID ${handle.firstExecutionRunId}`
    );
    console.log(await handle.result());
    
    const c = 10;
    const d = 10;
    const handleError = await client.workflow.start("calculate", {
        args: [c, d],
        taskQueue: taskQueue,
        workflowId: 'workflow2-' + Date.now().toString(),
    });
    console.log(
        `Started Workflow 2 ${handleError.workflowId} with RunID ${handleError.firstExecutionRunId}`
    );
    console.log(await handleError.result());

    connection.close();
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});