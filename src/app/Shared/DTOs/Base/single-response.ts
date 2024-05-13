export class SingleResponse<T> {
  status!: boolean;
  statusCode!: number;
  data!: T;
}