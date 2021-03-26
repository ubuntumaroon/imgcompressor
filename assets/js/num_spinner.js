$(document).on('click', '.number-spinner button', function () {
  var min = 1, max = 100
	var btn = $(this)
  var input = btn.closest('.number-spinner').find('input')
	var value = parseInt(input.val().trim())
	
	if (btn.attr('data-dir') == 'up') {
		value += 10
	} else {
    value -= 10
	}
  value = Math.min(max, value)
  value = Math.max(min, value)

	input.val(value);
});