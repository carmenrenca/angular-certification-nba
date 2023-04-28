export interface GamesReq {
  page?: string;
  per_page?: string;
  team_ids: string;
  date?: string[];
  Seasons?: string;
}
export interface Games {
  data: Results[];
  meta: Meta;
}

export interface Results {
  id: number;
  date: Date;
  home_team: Team;
  home_team_score: number;
  period: number;
  postseason: boolean;
  season: number;
  status: Status;
  time: Status;
  visitor_team: Team;
  visitor_team_score: number;
}

export interface Team {
  id: number;
  abbreviation: string;
  city: string;
  conference: Conference;
  division: Division;
  full_name: string;
  name: string;
}

export enum Conference {
  East = 'East',
  West = 'West',
}

export enum Division {
  Atlantic = 'Atlantic',
  Central = 'Central',
  Northwest = 'Northwest',
  Pacific = 'Pacific',
  Southeast = 'Southeast',
  Southwest = 'Southwest',
}

export enum Status {
  Final = 'Final',
}

export interface Meta {
  total_pages: number;
  current_page: number;
  next_page: number;
  per_page: number;
  total_count: number;
}
