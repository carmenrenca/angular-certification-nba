import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Games, GamesReq, TypesResults } from '../models/games.model';
import { Observable } from 'rxjs';
import { LastsDates } from '../shared/utils/lastsDates';
import { DatePipe } from '@angular/common';
/**
 * service that manages all operations related to matches, scores, etc.
 */
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
   * returns the information on the results of a team for a specific days
   * @param reqParams
   * @returns returns game information
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
   * returns the date transformed to string and in a format 'yyyy/mm/dd'.
   * @param date  date to be converted
   * @returns
   */
  transformDate(date: Date): string | null {
    return new DatePipe('en-US').transform(date, 'yyyy/MM/dd');
  }

  /**
   * calculates the points scored for a given team
   * @param games list of games
   * @param teamId  team code
   * @returns
   */
  getScored(games: Games, teamId: number): number {
    const results =
      games &&
      games.data.map((item) => {
        return item.visitor_team.id === teamId
          ? item.visitor_team_score
          : item.home_team_score;
      });
    return this.calculateAvg(results);
  }

  /**
   * calculates the points conceded for a given team
   * @param games list of games
   * @param teamId team code
   * @returns
   */
  getConceded(games: Games, teamId: number): number {
    const results =
      games &&
      games.data.map((item) => {
        return item.visitor_team.id !== teamId
          ? item.visitor_team_score
          : item.home_team_score;
      });
    return this.calculateAvg(results);
  }

  /**
   * method that calculates the average number of points
   * @param results list of all results
   * @returns
   */
  calculateAvg(results: number[] = []) {
    const poinstTotal = results.reduce((v1, v2) => {
      return v1 + v2;
    }, 0);
    return Math.round(poinstTotal / results.length);
  }

  /**
   * a method that calculates wins and losses against other teams, taking into account whether the team plays at home or away.
   * get points of team
   * @param games list of games
   * @param teamId team code
   * @returns returns L (loser) or V (winner)
   */
  calculateResults(games: Games, teamId: number): string[] {
    return (
      games &&
      games.data.map((item) =>
        (item.home_team.id === teamId &&
          item.home_team_score > item.visitor_team_score) ||
        (item.visitor_team.id === teamId &&
          item.visitor_team_score > item.home_team_score)
          ? TypesResults.WINNER
          : TypesResults.LOSER
      )
    );
  }
}
