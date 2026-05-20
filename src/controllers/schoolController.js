const pool = require("../config/db");

function haversineDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;

  try {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), latitude, longitude]
    );

    res.status(201).json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

async function listSchools(req, res) {
  const { userLat, userLng } = req;

  try {
    const [rows] = await pool.execute("SELECT * FROM schools");

    const sorted = rows
      .map((school) => ({
        ...school,
        distance: haversineDistance(userLat, userLng, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.json({ schools: sorted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

module.exports = { addSchool, listSchools };
