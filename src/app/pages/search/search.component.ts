import { Component, OnInit } from '@angular/core';
import { TeamsService } from '../../services/teams.service';
import { DropdownAutocomplete } from 'src/app/shared/components/dropdown-autocomplete/interface/dropdown-autocomplete.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  #teamSelected: string = '';

  ID_INPUT: string = 'teamSelect';
  ID_BUTTONS: string = 'trackBtn';

  getTeams$!: Observable<DropdownAutocomplete[]>;

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
  getAllTeams() {
    this.getTeams$ = this.teamsService.getAllTeams().pipe(
      map((team) =>
        team.data.map((item) => {
          return { id: item.id, name: item.full_name } as DropdownAutocomplete;
        })
      )
    );
  }

  /**
   * Determines whether submit on
   */
  onSubmit() {
    if (this.teamSelected) {
      this.teamsService
        .getTeamById(Number(this.teamSelected))
        .subscribe((res) => {
          this.teamsService.addTeam(res);
        });
    }
  }

  get listTeams() {
    return this.teamsService.listTeams$;
  }

  get teamSelected() {
    return this.#teamSelected;
  }
  set teamSelected(val: string) {
    this.#teamSelected = val;
  }
}
