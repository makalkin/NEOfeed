import _ from 'lodash';

export class NeoService {
  constructor(days = []) {
    this.setDays(days);
  }

  isHazardous(day) {
    return _.includes(this.hazardousDays, day);
  }

  static getMaxEstimatedDiameterOfTheDay(day) {
    return _.maxBy(day.neos, neo => neo.estimated_diameter.kilometers.estimated_diameter_max)
      .estimated_diameter.kilometers.estimated_diameter_max;
  }

  static closestNeoOfTheDay(day) {
    return _.chain(day.neos)
      .map(neo => neo.close_approach_data)
      .flatten()
      .map(approach => approach.miss_distance.kilometers)
      .sort()
      .head()
      .value();
  }

  static fastestNeoOfTheDay(day) {
    return _.chain(day.neos)
      .map(neo => neo.close_approach_data)
      .flatten()
      .map(approach => approach.relative_velocity.kilometers_per_hour)
      .sort()
      .last()
      .value();
  }

  update = () => {
    this.hazardousDays = _.chain(this.days)
      .sortBy(day => NeoService.getPotentialHazardsForTheDay(day))
      .slice(this.days.length - 2, this.days.length)
      .value();
  };

  setDays = (days) => {
    this.days = days;

    this.update();
  };

  static getPotentialHazardsForTheDay(day) {
    return _.filter(day.neos, neo => neo.is_potentially_hazardous_asteroid).length;
  }
}
