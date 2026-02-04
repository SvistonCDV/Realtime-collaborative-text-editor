import { Hocuspocus } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://collab:collab123@localhost:5432/collab_editor',
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected at:', res.rows[0].now);
    }
});

const server = new Hocuspocus({
    port: parseInt(process.env.PORT) || 1234,

    async onRequest({ request, response }) {
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    },

    extensions: [
        new Database({
            fetch: async ({ documentName }) => {
                console.log(`Fetching document: ${documentName}`);

                try {
                    const result = await pool.query(
                        'SELECT data FROM documents WHERE name = $1',
                        [documentName]
                    );

                    if (result.rows.length > 0) {
                        console.log(`Document found: ${documentName}`);
                        return result.rows[0].data;
                    }

                    console.log(`New document: ${documentName}`);
                    return null;
                } catch (error) {
                    console.error(`Error fetching document ${documentName}:`, error.message);
                    return null;
                }
            },

            store: async ({ documentName, state }) => {
                console.log(`Storing document: ${documentName}`);

                try {
                    await pool.query(
                        `INSERT INTO documents (name, data) 
             VALUES ($1, $2) 
             ON CONFLICT (name) 
             DO UPDATE SET data = $2, updated_at = CURRENT_TIMESTAMP`,
                        [documentName, state]
                    );
                    console.log(`Document saved: ${documentName}`);
                } catch (error) {
                    console.error(`Error storing document ${documentName}:`, error.message);
                }
            },
        }),
    ],

    async onConnect({ documentName, socketId }) {
        console.log(`User connected to "${documentName}" (socket: ${socketId})`);
    },

    async onDisconnect({ documentName, socketId }) {
        console.log(`User disconnected from "${documentName}" (socket: ${socketId})`);
    },
});

server.listen().then(() => {
    console.log(`
╔════════════════════════════════════════════════════╗
║  Hocuspocus Server Running                      ║
║  WebSocket: ws://localhost:${server.configuration.port}               ║
║  Database: PostgreSQL                           ║
╚════════════════════════════════════════════════════╝
  `);
});
