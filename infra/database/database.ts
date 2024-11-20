export type DBEntity = {
  id: number;
  uuid: string;
  createdAt: Date;
  updatedAt: Date | null;
};

export type DBModel<T> = T & DBEntity;

export interface DatabaseInterface {
  query<T = unknown>(sql: string): T;
  create<T>(data: T): DBModel<T>;
  read<T>(uuid: DBEntity["uuid"]): DBModel<T>;
  update<T>(uuid: DBEntity["uuid"], data: T): DBModel<T>;
  delete(uuid: DBEntity["uuid"]): boolean;
  count(): number;
  list<T>(): DBModel<T>[];
  search<T>(field: keyof T, value: unknown): DBModel<T>[];
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Database implements DatabaseInterface {
  public static instance: Database;
  private storage: Map<string, DBEntity> = new Map();

  private constructor() {}

  static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  query<T = unknown>(sql: string): T {
    console.log(`Executing SQL: ${sql}`);
    return {} as T;
  }

  create<T>(data: T): T & DBEntity {
    const id = getRandomInt(1, 1000);
    const uuid = crypto.randomUUID();
    const entity = { ...data, id, uuid } as T & DBEntity;

    this.storage.set(uuid, entity);
    return entity;
  }

  read<T>(uuid: DBEntity["uuid"]): T {
    const entity = this.storage.get(uuid);
    if (!entity) {
      throw new Error(`Entity with uuid ${uuid} not found`);
    }
    return entity as T;
  }

  update<T>(uuid: DBEntity["uuid"], data: T): T & DBEntity {
    const entity = this.storage.get(uuid);
    if (!entity) {
      throw new Error(`Entity with id ${uuid} not found`);
    }
    const updatedEntity = { ...entity, ...data } as T & DBEntity;
    this.storage.set(uuid, updatedEntity);
    return updatedEntity;
  }

  delete(uuid: DBEntity["uuid"]): boolean {
    return this.storage.delete(uuid);
  }

  count(): number {
    return this.storage.size;
  }

  list<T>(): T[] {
    return Array.from(this.storage.values()) as T[];
  }

  search<T>(field: keyof T, query: unknown): DBModel<T>[] {
    const entities = Array.from(this.storage.values()) as DBModel<T>[];
    return entities.filter((entity) => entity[field] === query);
  }
}
