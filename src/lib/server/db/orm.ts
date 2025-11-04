import { MikroORM } from '@mikro-orm/postgresql';
import { ENV } from '../config';

import entities from './entities'; 


export const orm = await MikroORM.init({
    entities,
    ...ENV.postgresql,
});

export default orm;