// Модуль, который отвечает за редактирование изображения
const SCALE_STEP = 25;
const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;

const FILTERS_CONFIG = {
  chrome: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'grayscale',
    unit: '',
  },

  sepia: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'sepia',
    unit: '',
  },

  marvin: {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    style: 'invert',
    unit: '%',
  },

  phobos: {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    style: 'blur',
    unit: 'px',
  },

  heat: {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    style: 'brightness',
    unit: '',
  },
};

const imgUploadPreview = document.querySelector('.img-upload__preview img');

const scaleControl = document.querySelector('.scale');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleHiddenInput = document.querySelector('#scale__hidden');

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

// Редактирование масштаба изображения
const increaseScale = () => {
  if (scaleHiddenInput.value !== '1') {
    scaleHiddenInput.value = `${Number(scaleHiddenInput.value) + (MIN_SCALE_VALUE / MAX_SCALE_VALUE)}`;
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + SCALE_STEP}%`;
    imgUploadPreview.style.transform = `scale(${scaleHiddenInput.value})`;
  }
};

const decreaseScale = () => {
  if (scaleHiddenInput.value !== '0.25') {
    scaleHiddenInput.value = `${Number(scaleHiddenInput.value) - (MIN_SCALE_VALUE / MAX_SCALE_VALUE)}`;
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - SCALE_STEP}%`;
    imgUploadPreview.style.transform = `scale(${scaleHiddenInput.value})`;
  }
};

scaleControl.addEventListener('click', (evt) => {
  if (evt.target === scaleControlBigger) {
    increaseScale();
  }
  if (evt.target === scaleControlSmaller) {
    decreaseScale();
  }
});

const changeImageScale = () => {
  scaleControlValue.value = '100%';
  scaleHiddenInput.value = '1';
  imgUploadPreview.style.transform = `scale(${scaleHiddenInput.value})`;
};

// Редактирование визуальных эффектов изображения
const setEffect = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions(effect.options);
  effectLevelSlider.noUiSlider.on('update', (values, handle) => {
    imgUploadPreview.style.filter = `${effect.style}(${values[handle]}${effect.unit})`;
    effectLevelValue.value = values[handle];
  });
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const onEffectsChange = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add(`effects__preview--${evt.target.value}`);
    if (evt.target.value === 'none') {
      imgUploadPreview.style.filter = 'none';
      effectLevelValue.value = 'none';
      effectLevelFieldset.style.display = 'none';
    } else if (evt.target.value === 'chrome') {
      effectLevelFieldset.style.display = 'block';
      setEffect(FILTERS_CONFIG.chrome);
    } else if (evt.target.value === 'sepia') {
      effectLevelFieldset.style.display = 'block';
      setEffect(FILTERS_CONFIG.sepia);
    } else if (evt.target.value === 'marvin') {
      effectLevelFieldset.style.display = 'block';
      setEffect(FILTERS_CONFIG.marvin);
    } else if (evt.target.value === 'phobos') {
      effectLevelFieldset.style.display = 'block';
      setEffect(FILTERS_CONFIG.phobos);
    } else if (evt.target.value === 'heat') {
      effectLevelFieldset.style.display = 'block';
      setEffect(FILTERS_CONFIG.heat);
    }
  }
};

const unsetEffect = () => {
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = 'none';
  effectLevelValue.value = 'none';
  imgUploadPreview.classList.add('effects__preview--none');
};

export {effectLevelFieldset, changeImageScale, onEffectsChange, unsetEffect};
