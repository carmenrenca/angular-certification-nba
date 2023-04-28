import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TeamDetail, Teams } from '../models/teams.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.API_KEY,
    'X-RapidAPI-Host': environment.HOST,
  });

  listTeams$ = new BehaviorSubject<TeamDetail[]>([]);

  constructor(private httpClients: HttpClient) {}

  /**
   * Gets all teams
   * @returns all teams
   */
  getAllTeams(): Observable<Teams> {
    return this.httpClients.get<Teams>(`${environment.API_URL}/teams`, {
      headers: this.headers,
    });
  }

  /**
   * Gets team by id
   * @param teamId
   * @returns team by id
   */
  getTeamById(teamId: number): Observable<TeamDetail> {
    return this.httpClients.get<TeamDetail>(
      `${environment.API_URL}/teams/${teamId}`,
      {
        headers: this.headers,
      }
    );
  }

  /**
   * Adds team
   * @param data
   */
  addTeam(data: TeamDetail) {
    this.listTeams$.next([...this.listTeams$.value, data]);
  }

  /**
   * Removes team
   * @param data
   */
  removeTeam(data: TeamDetail) {
    const filterList = this.listTeams$.value.filter(
      (item) => item.id !== data.id
    );
    this.listTeams$.next(filterList);
  }
}
