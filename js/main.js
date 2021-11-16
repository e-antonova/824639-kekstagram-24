import {renderThumbnails} from './render-thumbnails.js';
import {activateFileLoader} from './form.js';
import {getServerData} from './api.js';
import {showServerErrorMessage} from './info-messages.js';
import {filterPictures} from './filter-pictures.js';

activateFileLoader();
getServerData(renderThumbnails, filterPictures, showServerErrorMessage);
