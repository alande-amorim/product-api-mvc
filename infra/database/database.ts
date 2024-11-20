export type DBEntity = {
  id: string;
  uuid: string;
};

export type DBModel<T> = T & DBEntity;

export interface DatabaseInterface {
  query<T = unknown>(sql: string): T;
  create<T>(data: T): DBModel<T>;
  read<T>(key: DBEntity["id"]): DBModel<T>;
  update<T>(key: DBEntity["id"], data: T): DBModel<T>;
  delete(key: DBEntity["id"]): boolean;
  count(): number;
  list<T>(): DBModel<T>[];
}

class Database implements DatabaseInterface {
  public static instance: Database;
  private storage: Map<string, DBEntity> = new Map();

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static create(): Database {
    return new Database();
  }

  query<T = unknown>(sql: string): T {
    console.log(`Executing SQL: ${sql}`);
    return {} as T;
  }

  create<T>(data: T): T & DBEntity {
    const id = Math.random().toString(36).substring(2, 15);
    const uuid = crypto.randomUUID(); // Pode precisar de `import { randomUUID } from "crypto";`
    const entity = { ...data, id, uuid } as T & DBEntity;

    this.storage.set(id, entity);
    return entity;
  }

  read<T>(key: DBEntity["id"]): T {
    const entity = this.storage.get(key);
    if (!entity) {
      throw new Error(`Entity with id ${key} not found`);
    }
    return entity as T;
  }

  update<T>(key: DBEntity["id"], data: T): T & DBEntity {
    const entity = this.storage.get(key);
    if (!entity) {
      throw new Error(`Entity with id ${key} not found`);
    }
    const updatedEntity = { ...entity, ...data } as T & DBEntity;
    this.storage.set(key, updatedEntity);
    return updatedEntity;
  }

  delete(key: DBEntity["id"]): boolean {
    return this.storage.delete(key);
  }

  count(): number {
    return this.storage.size;
  }

  list<T>(): T[] {
    return Array.from(this.storage.values()) as T[];
  }
}
