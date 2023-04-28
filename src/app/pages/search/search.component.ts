import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { TeamDetail } from 'src/app/models/teams.model';
import { TeamsService } from '../../services/teams.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  #teamSelected: string = '';

  ID_INPUT: string = 'teamSelect';
  ID_BUTTONS: string = 'trackBtn';

  getTeams$!: Observable<TeamDetail[]>;

  constructor(private teamsService: TeamsService) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.getAllTeams();
  }

  /**
   * Gets all teams
   */
  getAllTeams(): void {
    this.getTeams$ = this.teamsService.getAllTeams().pipe(
      map((team) =>
        team.data.map((item) => {
          return item;
        })
      )
    );
  }

  /**
   * Determines whether submit on
   */
  onSubmit(): void {
    if (this.teamSelected) {
      this.teamsService
        .getTeamById(Number(this.teamSelected))
        .subscribe((res) => {
          this.teamsService.addTeam(res);
        });
    }
  }

  /**
   * Gets list teams
   */
  get listTeams(): TeamDetail[] {
    return this.teamsService.listTeams;
  }

  /**
   * Gets team selected
   */
  get teamSelected(): string {
    return this.#teamSelected;
  }

  /**
   * Sets team selected
   */
  set teamSelected(val: string) {
    this.#teamSelected = val;
  }
}
