import cluster from "cluster";
import os from "os";

export default (callback = null) => {
  const cpus = os.cpus().length;

  if (cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
      const worker = cluster.fork();

      worker.on("message", (message) => {
        console.log(`[${worker.process.pid} to MASTER]`, message);
      });
    }

    cluster.on("exit", (worker) => {
      console.warn(`[${worker.process.pid}]`, {
        message: "Process terminated. Restarting.",
      });

      cluster.fork();
    });
  } else {
    if (callback) callback();
  }
};