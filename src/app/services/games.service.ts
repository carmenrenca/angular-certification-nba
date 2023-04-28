import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Games, GamesReq } from '../models/games.model';
import { Observable } from 'rxjs';
import { LastsDates } from '../shared/utils/lastsDates';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.API_KEY,
    'X-RapidAPI-Host': environment.HOST,
  });
  constructor(private httpClients: HttpClient) {}
  private DEFAULT_LAST_DAYS = 12;

  /**
   * Gets results
   * @param reqParams
   * @returns
   */
  getResults(
    reqParams: GamesReq,
    lastDays = this.DEFAULT_LAST_DAYS
  ): Observable<Games> {
    let params: HttpParams = new HttpParams();
    const dates = LastsDates.getLastDates(lastDays).map((date) =>
      this.transformDate(date)
    );
    dates?.forEach((date) => {
      params = params.append('dates[]', `${date}`);
    });

    params = params.append('team_ids[]', reqParams.team_ids);

    return this.httpClients.get<Games>(`${environment.API_URL}/games`, {
      headers: this.headers,
      params: params,
    });
  }

  /**
   * Transforms date
   * @param date
   * @returns
   */
  transformDate(date: Date) {
    return new DatePipe('en-US').transform(date, 'yyyy/MM/dd');
  }

  /**
   * Gets scored
   * @param games
   * @param teamId
   * @returns
   */
  getScored(games: Games, teamId: number) {
    const results = games.data.map((item) => {
      return item.visitor_team.id === teamId
        ? item.visitor_team_score
        : item.home_team_score;
    });
    return results.reduce((v1, v2) => {
      return v1 + v2;
    }, 0);
  }

  /**
   * Gets conceded
   * @param games
   * @param teamId
   * @returns
   */
  getConceded(games: Games, teamId: number) {
    const results = games.data.map((item) => {
      return item.visitor_team.id !== teamId
        ? item.visitor_team_score
        : item.home_team_score;
    });
    return results.reduce((v1, v2) => {
      return v1 + v2;
    }, 0);
  }
}
