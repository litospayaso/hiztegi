export interface HttpRequestInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  api?: string;
}

export interface QueryParams {
  searchQuery?: string;
  search?: string;
  excludeFileType?: string;
  fileType?: string;
  skip?: number;
  take?: number;
  orderBy?: string;
  tags?: string;
  itemsPerPage?: number;
  page?: number;
  sortBy?: string;
  filter?: string;
  sortOrder?: 'Ascending' | 'Descending';
  sort?: 'desc' | 'asc';
}

export interface ProductInterface {
  
}