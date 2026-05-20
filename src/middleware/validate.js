function validateSchool(req, res, next) {
  const { name, address, latitude, longitude } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ error: "name is required and must be a non-empty string" });
  }

  if (!address || typeof address !== "string" || address.trim() === "") {
    return res.status(400).json({ error: "address is required and must be a non-empty string" });
  }

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (latitude === undefined || latitude === null || isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: "latitude must be a number between -90 and 90" });
  }

  if (longitude === undefined || longitude === null || isNaN(lng) || lng < -180 || lng > 180) {
    return res.status(400).json({ error: "longitude must be a number between -180 and 180" });
  }

  req.body.latitude = lat;
  req.body.longitude = lng;

  next();
}

function validateListQuery(req, res, next) {
  const { latitude, longitude } = req.query;

  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  if (!latitude || isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: "Query param 'latitude' must be a number between -90 and 90" });
  }

  if (!longitude || isNaN(lng) || lng < -180 || lng > 180) {
    return res.status(400).json({ error: "Query param 'longitude' must be a number between -180 and 180" });
  }

  req.userLat = lat;
  req.userLng = lng;

  next();
}

module.exports = { validateSchool, validateListQuery };
