import { cpus } from 'os';
import cluster from 'cluster';
import http from 'http';
import { app } from '../app/app';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

if (cluster.isPrimary) {
  let clustersCount = cpus().length;

  for (let i = 0; i < clustersCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    console.log(`Worker ${worker.process.pid} finished. Exit code: ${code}`);
  });
} else {
  server.listen(PORT, () =>
    console.log(`Worker ${cluster.worker?.id} is listening port ${PORT}. Pid: ${process.pid}`)
  );
}
