export class PaginationResponse<T> {
  status!: boolean;
  statusCode!: number;
  pageIndex!: number;
  pageSize!: number;
  count!: number;
  data!: T[];
}