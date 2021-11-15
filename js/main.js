import {renderThumbnails} from './render-thumbnails.js';
import {activateFileLoader} from './form.js';
import {getServerData} from './api.js';
import {showServerErrorMessage} from './info-messages.js';

activateFileLoader();
getServerData(renderThumbnails, showServerErrorMessage);
