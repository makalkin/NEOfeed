import client from './client';

export const getNeoFeed = ({ startDate, endDate }) =>
  client.get('neo/rest/v1/feed?', {
    params: {
      detailed: true,
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate && endDate.format('YYYY-MM-DD'),
    },
  });
