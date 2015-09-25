import {each} from 'lodash';
import {readdirSync} from 'fs';

each(readdirSync('./gulp/tasks/'), task => {
  require('./tasks/' + task);
});
