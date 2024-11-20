import { ServiceInterface } from "./service.interface";

export type CreateInput = {};

export type CreateOutput = {};

export class CreateService
  implements ServiceInterface<CreateInput, CreateOutput>
{
  /**
   * Executes the service
   * @todo Implement the method
   * @param CreateInput input
   * @returns CreateOutput
   * @throws Error
   */
  async execute(input: CreateInput): Promise<CreateOutput> {
    return null as unknown as CreateOutput;
  }
}
