import utils from '../helpers/utils';
import textData from '../helpers/data/textData';
import display from './display';

const submitForm = (e) => {
  e.preventDefault();
  const formText = $('#form-text').val();
  textData.setText(formText);
  display.showDisplay();
};

const displayForm = () => {
  let domString = '';
  domString += '<form>';
  domString += '<div class="form-group">';
  domString += '<label for="form-text">Text</label>';
  domString += '<input type="text" class="form-control" id="form-text" placeholder="bla bla bla">';
  domString += '</div>';
  domString += '<button id="really-nice-form-button" type="submit" class="btn btn-primary">Submit</button>';
  domString += '</form>';
  utils.printToDom('form-container', domString);
  $('#really-nice-form-button').click(submitForm);
};

export default { displayForm };
