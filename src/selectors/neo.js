import { createSelector } from 'reselect';

const selectNeos = state => state.get('neo');

const getNeoState = createSelector(selectNeos, state => state.toJS());

const getNeoDays = createSelector(selectNeos, state => state.get('days').toJS());

const getNeoActiveDays = createSelector(selectNeos, state => state.get('activeDays').toJS());

export { selectNeos, getNeoDays, getNeoActiveDays, getNeoState };
