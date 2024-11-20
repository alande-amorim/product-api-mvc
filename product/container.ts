export class Container {
  private static services = new Map();

  static register<T>(name: string, service: T): void {
    Container.services.set(name, service);
  }

  static resolve<T>(name: string): T {
    const service = Container.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    return service as T;
  }
}
