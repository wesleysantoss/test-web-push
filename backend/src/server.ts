import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import webpush from 'web-push';

const app = express();
const port = 3000; 
let subscriptions: any = {};

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(cors());

app.get('/heathcheck', (req: Request, res: Response) => {
  res.send({status: true});
})

app.get('/getall-subscribes', (req: Request, res: Response) => {
  res.send(subscriptions);
})

app.post('/subscribe', (req: Request, res: Response) => {
  const subscription = req.body.subscription;
  const userId = req.body.userId;
  
  if(!subscriptions[userId]) {
    subscriptions[userId] = subscription;
  }

  res.send({status: true});
})

app.post('/send-notification', async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const title = req.body.title;
  const subscription = subscriptions[userId];

  const publicVapidKey = 'BAoZTmKIxrsse2ItKFXx3YpT6oVvuVUGCDANnq_z8EyWB0k0YRSaMuv9wGBxQQS78cZejHfrZJq23DAtVJV_M78';
  const privateVapidKey = 'Scn6YJzMOXRIXOF7UMys9Pn1-s3OEgx1XjfIAr4T_cY';

  webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey,
  );

  const notification = { title };
  await webpush.sendNotification(subscription, JSON.stringify(notification));

  res.send({status: true});
})

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});