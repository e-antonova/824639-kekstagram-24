import {renderThumbnails} from './render-thumbnails.js';
import {openForm} from './form.js';
import {getServerData} from './api.js';
import {showServerErrorMessage} from './info-messages.js';

openForm();
getServerData(renderThumbnails, showServerErrorMessage);
