$(document).ready(function () {
  // Simulate a click on the "Home" button when the page loads
  $('#home').click()

  // Handle clicks on other navigation items as before
  $('nav li').click(function () {
    // Remove the "active" class from all navigation items
    $('nav li').removeClass('active')

    // Add the "active" class to the clicked item
    $(this).addClass('active')

    // Load content using AJAX
    $.ajax({
      type: 'GET',
      url: 'includes/ext-content/' + $(this).data('content') + '.html',
      dataType: 'html',
      success: function (response) {
        $('.ext-content').html(response)
      },
    })
  })
})

$(document).ready(function () {
  // Initial state: hide the title and label

  // Click event for the "Home" link
  $('#home').click(function () {
    console.log('Home clicked')
    $('.siteHeader_title, .siteHeader_label').removeClass('hidden')
    // Reset the position of the side menu
    $('#sideMenu').removeClass('move-to-top')
  })

  // Click events for other links
  $('#about, #projects, #contact').click(function () {
    console.log('About/Projects/Contact clicked')
    $('.siteHeader_title, .siteHeader_label').addClass('hidden')
    // Move the side menu to the top by changing its position
    $('#sideMenu').addClass('move-to-top')
  })
})
