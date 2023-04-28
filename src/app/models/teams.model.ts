export interface Teams {
  data: TeamDetail[];
  meta: Meta;
}

export interface TeamDetail {
  id: number;
  abbreviation: string;
  city: string;
  conference: Conference;
  division: string;
  full_name: string;
  name: string;
}

export interface Meta {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}

export enum Conference {
  East = 'East',
  West = 'West',
}
