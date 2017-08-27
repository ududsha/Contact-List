import * as express from 'express';

import ContactCtrl from './controllers/contact';
import Contact from './models/contact';

export default function setRoutes(app) {

  const router = express.Router();

  const contactController = new ContactCtrl();

  router.route('/contacts').get(contactController.getAll);
  router.route('/contact').post(contactController.insert);
  router.route('/contact/:id').get(contactController.get);

  app.use('/api', router);

}
