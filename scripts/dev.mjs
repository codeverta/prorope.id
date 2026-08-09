import { spawn } from "node:child_process";
import process from "node:process";

const root = process.cwd();
const commands = [
  {
    name: "backend",
    command: "go",
    args: ["run", "./cmd/api"],
    cwd: `${root}/apps/backend`,
  },
  {
    name: "frontend",
    command: "pnpm",
    args: ["--dir", "apps/landing", "run", "dev"],
    cwd: root,
  },
];

const colors = { backend: "\x1b[36m", frontend: "\x1b[35m", reset: "\x1b[0m" };
const children = new Map();
let shuttingDown = false;

function log(name, message) {
  const prefix = `${colors[name]}[${name}]${colors.reset}`;
  process.stdout.write(`${prefix} ${message}\n`);
}

function stopAll(signal = "SIGTERM") {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children.values()) {
    if (!child.killed) child.kill(signal);
  }
}

for (const config of commands) {
  const child = spawn(config.command, config.args, {
    cwd: config.cwd,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  });
  children.set(config.name, child);

  child.stdout.on("data", data => {
    for (const line of data.toString().split(/\r?\n/).filter(Boolean)) log(config.name, line);
  });
  child.stderr.on("data", data => {
    for (const line of data.toString().split(/\r?\n/).filter(Boolean)) log(config.name, line);
  });
  child.on("error", error => {
    log(config.name, error.message);
    stopAll();
  });
  child.on("exit", (code, signal) => {
    children.delete(config.name);
    if (!shuttingDown) {
      log(config.name, `stopped (${signal || `exit ${code ?? 0}`}); stopping the other service.`);
      stopAll();
      process.exitCode = code || 1;
    }
    if (shuttingDown && children.size === 0) process.exit(process.exitCode || 0);
  });
}

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    log("frontend", `received ${signal}; stopping frontend and backend...`);
    stopAll(signal);
  });
}

log("frontend", "development stack started; frontend: http://localhost:3000, backend: http://localhost:8080");
