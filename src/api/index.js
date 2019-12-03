import createClient from './client';
const BASE_URL = 'https://api.carpooling.daidox.pt';

const createSDK = () => {
  const client = createClient({ baseUrl: BASE_URL });

  return {
    groups: {
      get: () => client.get('/groups'),
      post: body => client.post('/groups', body),
      by: id => ({
        get: () => client.get(`/groups/${id}`),
        drivers: {
          get: () => client.get(`/groups/${id}/drivers`),
          post: body => client.post(`/groups/${id}/drivers`, body),
        },
        cycles: {
          get: () => client.get(`/groups/${id}/cycles`),
          post: body => client.post(`/groups/${id}/cycles`, body),
        },
        trips: {
          get: () => client.get(`/groups/${id}/changes`),
          post: body => client.post(`/groups/${id}/changes`, body),
        }
      }),
    }
  }
}


export default createSDK();