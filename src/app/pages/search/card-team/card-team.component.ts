import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Games, Marks } from 'src/app/models/games.model';
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
  #marks!: Marks;
  /**
   * Creates an instance of card team component.
   * @param gameService
   * @param teamServ
   * @param router
   */
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
  getResultsGames(): void {
    this.gameService
      .getResults({
        team_ids: String(this.team.id),
      })
      .pipe(finalize(() => this.calculateMarks()))
      .subscribe((res) => (this.games = res));
  }
  /**
   * Go to results
   * redirect to page results/teamId
   */
  goToResults(): void {
    this.router.navigate([`results/${this.team.id}`]);
  }

  /**
    the card that has been selected is deleted
   * @param team
   */
  removeCard(team: TeamDetail): void {
    this.teamServ.removeTeam(team.id);
  }

  /**
   * Calculates marks
   */
  calculateMarks(): void {
    this.marks = {
      conceded: this.gameService.getConceded(this.games, this.team.id),
      results: this.gameService.calculateResults(this.games, this.team.id),
      scored: this.gameService.getScored(this.games, this.team.id),
    };
  }

  /**
   * Gets url image
   */
  get urlImage(): string {
    return `https://interstate21.com/nba-logos/${this.team.abbreviation}.png`;
  }

  //------------------ ID BUTTONS ------------------
  get idButtonRemove(): string {
    return `remove${this.team.abbreviation}`;
  }
  get idShowResults(): string {
    return `results${this.team.abbreviation}`;
  }
  //------------------ MARKS OF RESULTS ------------------
  /**
   * Gets marks
   */
  get marks(): Marks {
    return this.#marks;
  }

  /**
   * Sets games
   */
  set marks(value: Marks) {
    this.#marks = value;
  }
  //------------------ GAMES ------------------

  /**
   * Gets games
   */
  get games(): Games {
    return this.#games;
  }

  /**
   * Sets games
   */
  set games(value: Games) {
    this.#games = value;
  }
}
