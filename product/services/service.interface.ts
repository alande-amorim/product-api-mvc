export interface ServiceInterface<Input, Output> {
  execute(input: Input): Promise<Output> | Output;
}
