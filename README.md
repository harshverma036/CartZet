# CartZet
CartZet is an e-commerce website made with MERN Stack.

## Installation

Install server side dependencies to run project locally: -

```bash
cd CartZet
npm install
```

Install client side dependencies to run project locally: -

```bash
cd CartZet/client
npm install
```

## Run Locally

To run server locally: -

```bash
cd CartZet
npm run dev
```

This command will start client and server side servers.
Visit http://localhost:3000/

## Data Import/Destroy

Import dummy data to work with Run: -

```bash
cd CartZet
npm run import:data
```

If you want to delete all imported data. Run: -

```bash
cd CartZet
npm run destroy:data
```
## Environment Variables

To run project locally you need to set .env file with some environment variables.
Create .env file in Root directory. And set the value of the following variables.

```bash
NODE_ENV = development
PORT = 5000
mongodb_URI = 
JWT_SECRET = 
```

Enter mongodb URI to to connect with database. And any random text to JWT_SECRET
