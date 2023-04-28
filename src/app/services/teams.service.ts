import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TeamDetail, Teams } from '../models/teams.model';

/**
 * service that manages all operations related to equipment information
 */
@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  headers = new HttpHeaders({
    'X-RapidAPI-Key': environment.API_KEY,
    'X-RapidAPI-Host': environment.HOST,
  });

  #listTeams: TeamDetail[] = [];
  constructor(private httpClients: HttpClient) {}

  /**
   *  method that returns all teams
   * @returns all teams
   */
  getAllTeams(): Observable<Teams> {
    return this.httpClients.get<Teams>(`${environment.API_URL}/teams`, {
      headers: this.headers,
    });
  }

  /**
   * Gets team by id
   *  returns a specific device searched for by its identifier
   * @param teamId  equipment identifier
   * @returns  team detail
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
   * method that adds a team to the list
   * @param data equipment data to be saved
   */
  addTeam(data: TeamDetail): void {
    this.listTeams.push(data);
  }

  /**
   * removes a specific team from the list
   * @param teamId  equipment identifier
   */
  removeTeam(teamId: number): void {
    const index: number = this.listTeams.findIndex(
      (item) => item.id === teamId
    );
    this.listTeams.splice(index, 1);
  }

  //------------------ GET & SET OF LIST TEAMS ----------------

  /**
   * Gets list teams
   */
  get listTeams(): TeamDetail[] {
    return this.#listTeams;
  }

  /**
   * Sets list teams
   */
  set listTeams(value: TeamDetail[]) {
    this.#listTeams = value;
  }
}
