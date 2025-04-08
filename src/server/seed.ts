import { pool } from "./db";
import { TaskStatus } from "./types";

export const seedData = async () => {
  const enums = [{ name: "task_status", value: Object.values(TaskStatus) }].map(
    ({ name, value }) => {
      const values = value.map((v) => `'${v}'`);
      return `
    DO $$ BEGIN
        CREATE TYPE ${name} AS ENUM (${values.join(", ")});
    EXCEPTION
        WHEN duplicate_object THEN null;
    END $$;
    `;
    }
  );

  await Promise.all(enums.map(async (query) => await pool.query(query)));

  await pool.query(`
    CREATE TABLE IF NOT EXISTS public.tasks (
        id uuid NOT NULL,
        name text NOT NULL,
        deadline timestamp NOT NULL,
        status task_status NOT NULL,
        points integer NOT NULL,
        PRIMARY KEY (id)
    );
    `);
};
