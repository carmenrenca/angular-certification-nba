import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Games } from 'src/app/models/games.model';
import { TeamDetail } from 'src/app/models/teams.model';
import { GamesService } from 'src/app/services/games.service';
import { TeamsService } from 'src/app/services/teams.service';
@Component({
  selector: 'app-card-team',
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.scss'],
})
export class CardTeamComponent implements OnInit {
  @Input() team!: TeamDetail;
  #games!: Games;

  constructor(
    private gameService: GamesService,
    private teamServ: TeamsService,
    private router: Router
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.getResultsGames();
  }

  /**
   * Gets results games
   */
  getResultsGames() {
    this.gameService
      .getResults({
        team_ids: String(this.team.id),
      })
      .subscribe((res) => (this.games = res));
  }
  /**
   * Go to results
   */
  goToResults() {
    this.router.navigate([`results/${this.team.id}`]);
  }

  /**
    the card that has been selected is deleted
   * @param team
   */
  removeCard(team: TeamDetail) {
    this.teamServ.removeTeam(team);
  }

  get resultScored() {
    return this.games
      ? this.games.data.map((item) =>
          item.home_team_score < item.visitor_team_score ? 'L' : 'V'
        )
      : [];
  }
  /**
   * Gets pts scored
   */
  get ptsScored() {
    return this.games && this.gameService.getScored(this.games, this.team.id);
  }

  get ptsConceded() {
    return this.games && this.gameService.getConceded(this.games, this.team.id);
  }

  get urlImage() {
    return `https://interstate21.com/nba-logos/${this.team.abbreviation}.png`;
  }
  get idButtonRemove() {
    return `remove${this.team.abbreviation}`;
  }
  get games() {
    return this.#games;
  }
  set games(value: Games) {
    this.#games = value;
  }
}
