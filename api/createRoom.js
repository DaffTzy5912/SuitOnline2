const rooms = {}; // Database sementara di server

export default function handler(req, res) {
  if (req.method === 'POST') {
    const roomCode = Math.random().toString(36).substring(2, 8); // Generate kode unik
    rooms[roomCode] = { players: [], choices: {} };
    res.status(200).json({ roomCode });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
