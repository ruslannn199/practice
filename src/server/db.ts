import { Pool, types } from "pg";

types.setTypeParser(types.builtins.TIME, (timeStr) => timeStr);
types.setTypeParser(types.builtins.TIMESTAMP, (timeStr) => timeStr);
types.setTypeParser(types.builtins.TIMESTAMPTZ, (timeStr) => timeStr);

export const pool = new Pool({
  user: "rootUser",
  host: "127.0.0.1",
  database: "todo",
  password: "somePwd",
  port: 5555,
});
