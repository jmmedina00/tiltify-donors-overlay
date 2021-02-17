import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { getDonations } from './tiltify';

describe('Tiltify service', () => {
  const tokenSuccess = 'SUCCESS';
  const tokenFail = 'FAIL';

  const campaigns = {
    1234: {
      data: [
        { id: 3, name: 'Lorem', amount: 10 },
        { id: 2, name: 'ipsum', amount: 20 },
        { id: 1, name: 'dolor', amount: 30 },
      ],
      links: {
        prev: '',
      },
    },
    4567: [
      {
        data: [
          { id: 9, name: 'Lorem', amount: 10 },
          { id: 8, name: 'ipsum', amount: 20 },
          { id: 7, name: 'dolor', amount: 30 },
        ],
        links: {
          prev: '/api/v3/campaigns/4567/donations?count=100&before=1',
        },
      },
      {
        data: [
          { id: 6, name: 'sit', amount: 10 },
          { id: 5, name: 'amet', amount: 20 },
          { id: 4, name: 'This', amount: 30 },
        ],
        links: {
          prev: '/api/v3/campaigns/4567/donations?count=100&before=2',
        },
      },
      {
        data: [
          { id: 3, name: 'is', amount: 10 },
          { id: 2, name: 'a', amount: 20 },
          { id: 1, name: 'test', amount: 30 },
        ],
        links: {
          prev: '',
        },
      },
    ],
  };

  const server = setupServer(
    rest.get(
      'https://tiltify.com/api/v3/campaigns/:campaignId/donations',
      (req, res, ctx) => {
        const {
          params: { campaignId },
          headers: {
            map: { authorization: auth },
          },
        } = req;

        if (auth !== `Bearer ${tokenSuccess}`) {
          return res(ctx.status(403), ctx.json({ error: 'Forbidden' }));
        }

        const selectedCampaign = campaigns[campaignId];
        const before = +req.url.searchParams.get('before');
        const response = Array.isArray(selectedCampaign)
          ? selectedCampaign[before]
          : selectedCampaign;

        return response
          ? res(ctx.status(200), ctx.json(response))
          : res(ctx.status(404), ctx.json({ error: 'Not found' }));
      }
    )
  );

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('fetches donations from a campaign as-is if the token is correct', async () => {
    const donations = await getDonations(tokenSuccess, '1234');
    expect(donations).toEqual([
      { id: 3, name: 'Lorem', amount: 10 },
      { id: 2, name: 'ipsum', amount: 20 },
      { id: 1, name: 'dolor', amount: 30 },
    ]);
  });

  test('combines several pages of donations into a single array', async () => {
    const donations = await getDonations(tokenSuccess, '4567');
    expect(donations).toEqual([
      { id: 9, name: 'Lorem', amount: 10 },
      { id: 8, name: 'ipsum', amount: 20 },
      { id: 7, name: 'dolor', amount: 30 },
      { id: 6, name: 'sit', amount: 10 },
      { id: 5, name: 'amet', amount: 20 },
      { id: 4, name: 'This', amount: 30 },
      { id: 3, name: 'is', amount: 10 },
      { id: 2, name: 'a', amount: 20 },
      { id: 1, name: 'test', amount: 30 },
    ]);
  });

  test("throws an Error if token isn't accepted (the most likely thing to go wrong)", async () => {
    await expect(getDonations(tokenFail, '1234')).rejects.toThrow(
      'Token has been banned'
    );
  });
});
