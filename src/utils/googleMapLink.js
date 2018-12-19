const urlBase = 'https://www.google.com/maps/search/?api=1&query=';
const createGoogleMapLink = meetingLocation => {
  const query = encodeURIComponent(Object.values(meetingLocation).join(' '));
  return `${urlBase}${query}`;
};

export default createGoogleMapLink;
