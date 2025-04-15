import { Router } from 'express';

const adminRouter = Router();
import authorize from '../middeware/admin.middleware.js';
import { getOpportunities, deleteUser, getUsers, updateOpportunityStatus } from '../controller/user.controller.js';

adminRouter.get('/users', authorize, getUsers)

adminRouter.get('/opportunities', authorize, getOpportunities)

adminRouter.delete('/user/:id', authorize, deleteUser)

adminRouter.patch('/opportunities/:id/status', authorize, updateOpportunityStatus)

export default adminRouter;