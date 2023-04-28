import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamDetail } from '../../models/teams.model';
import { Results } from 'src/app/models/games.model';
import { Observable, tap, map } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  /**
   * Creates an instance of results component.
   * @param route
   * @param teamServ
   * @param gamesServ
   */
  constructor(
    private route: ActivatedRoute,
    private teamServ: TeamsService,
    private gamesServ: GamesService
  ) {}

  id_team = 0;
  team$!: Observable<TeamDetail>;
  results$!: Observable<Results[]>;

  ngOnInit(): void {
    this.route.paramMap
      .pipe(tap((param) => (this.id_team = Number(param.get('id')))))
      .subscribe({
        next: () => {
          this.team$ = this.teamServ.getTeamById(this.id_team);
          this.results$ = this.gamesServ
            .getResults({
              team_ids: String(this.id_team),
            })
            .pipe(map((game) => game.data));
        },
      });
  }
}
