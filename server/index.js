import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import { ALLOWED_ORIGINS } from './configs/server.config.js';
import { PORT } from './configs/server.config.js';
import connectToDb from './configs/database.config.js';
import chalk from 'chalk';
import authRouter from './routes/auth.route.js';
import patientRouter from './routes/patient.route.js';
import doctorRoute from './routes/doctor.route.js';

import passport from 'passport';

const app = express()

app.use(helmet())
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors({
  origin: ALLOWED_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}))



// database connection
connectToDb()
  .then(() => {
    console.log(
      chalk.bgMagenta("Connected to MongoDB Database successfully ✅ ✅ ")
    );
    app.listen(PORT, () => {
      console.log(
        chalk.bgGreenBright(
          `🚀 Server is listening at http://localhost:${PORT}`
        )
      );
    });
  })
  .catch((error) => {
    console.error(
      chalk.bgRed("❌Error in connecting to MongoDB Database :" + error.message)
    );
    process.exit(1); // exit the process with an error status code 1
  });

  // initialize passport
app.use(passport.initialize())

// route handlers
app.use('/api/auth', authRouter)
app.use('/api/patient', patientRouter)
app.use('/api/doctor', doctorRoute)


// initial api check
app.get("/", (req, res) => {
  return res.status(StatusCodes.OK).json({ message: "Helleuuuuu, Now Start Building controllers & services" });
});

// Error handling middleware
app.use((err, _, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});