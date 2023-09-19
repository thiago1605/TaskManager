import pgPromise from "pg-promise";
import pg from "pg-promise/typescript/pg-subset";
import { container, injectable } from "tsyringe";
import dotenv from "dotenv";

dotenv.config();

@injectable()
class PostgresConection {
  private dataBase: pgPromise.IMain<{}, pg.IClient>;
  private URL: string;

  constructor() {
    this.dataBase = pgPromise();
    this.URL = String(process.env.DATABASE_URL);
  }

  public async getConnection(): Promise<pgPromise.IDatabase<{}, pg.IClient>> {
    const db = this.dataBase({
      connectionString: this.URL,
      ssl: false,
    });
    await db.connect();

    return db;
  }
}

export const db = container.resolve(PostgresConection).getConnection();
