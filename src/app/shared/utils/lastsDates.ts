export class LastsDates {
  /**
   * Gets last dates
   * the last x days of the current date are returned
   * @param numDays
   */
  static getLastDates(numDays: number) {
    let listDates: Date[] = [];
    for (let i = 1; i <= numDays; i++) {
      const date = new Date();

      date.setDate(date.getDate() - i);
      listDates = [...listDates, date];
    }
    return listDates;
  }
}
