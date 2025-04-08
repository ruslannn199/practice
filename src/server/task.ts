import { RequestHandler } from "express";
import { pool } from "./db";
import { Task } from "./types";

export class TaskController {
  private constructor() {}

  public static create: RequestHandler = async (req, res) => {
    const { name, deadline, status, points } = req.body;
    const { rows } = await pool.query<Task>(
      `
      INSERT INTO tasks (id, name, deadline, status, points)
      VALUES (gen_random_uuid (), $1, $2, $3, $4)
      ON CONFLICT DO NOTHING RETURNING id, name, deadline, status, points
      `,
      [name, deadline, status, points]
    );

    res.status(201).json(rows[0]);
  };

  public static getAll: RequestHandler = async (req, res) => {
    const { rows } = await pool.query<Task>(
      `
      SELECT * FROM tasks ORDER BY deadline
      `
    );

    res.status(200).json({ items: rows });
  };

  public static getById: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { rows } = await pool.query<Task>(
      `
      SELECT * FROM tasks WHERE id = $1
      `,
      [id]
    );

    res.status(200).json(rows[0]);
  };

  public static update: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { name, deadline, status, points } = req.body;

    const { rows } = await pool.query(
      `
      UPDATE tasks SET name = $1, deadline = $2, status = $3, points = $4 WHERE id = $5
      `,
      [name, deadline, status, points, id]
    );

    res.status(200).send(rows[0]);
  };

  public static delete: RequestHandler = async (req, res) => {
    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM tasks WHERE id = $1
      `,
      [id]
    );

    res.status(204).send();
  };
}
