const createOptionEl = (val, text) => {
  const optionEl = document.createElement('option');
  optionEl.value = val;
  optionEl.text = text;

  return optionEl;
};

export { createOptionEl };
