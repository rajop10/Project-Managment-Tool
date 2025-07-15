// Middleware first
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Then routes
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/app', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Then the root route
app.get('/', (req, res) => {
  // Your auth check and redirect logic
});

// Finally 404 handler
app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});