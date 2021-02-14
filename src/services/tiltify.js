export const getDonations = async (token, campaign) => {
  const url = "https://tiltify.com";
  const firstPath = `/api/v3/campaigns/${campaign}/donations?count=100`;
  const headers = new Headers({Authorization: `Bearer ${token}`});
  
  let currentPrev;
  const donations = [];
  do {
    const response = await fetch(url + (currentPrev || firstPath), {headers});

    if (!response.ok) {
      throw new Error("Token has been banned")
    }

    const {data, links: {prev}} = await response.json();
    donations.push(...data);
    currentPrev = prev;
  } while (currentPrev);

  return donations;
}