export default function handler(req, res) {
  if (req.method === 'POST') {
    const { roomCode, player } = req.body;
    if (!rooms[roomCode]) {
      return res.status(404).json({ error: "Room tidak ditemukan" });
    }
    if (rooms[roomCode].players.length >= 2) {
      return res.status(400).json({ error: "Room penuh" });
    }
    
    rooms[roomCode].players.push(player);
    res.status(200).json({ message: "Berhasil masuk room" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
