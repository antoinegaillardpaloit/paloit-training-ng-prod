$(document).ready(function(){
  $('.custom-footer-address .col1').addClass('active selected');
  $('.custom-footer-address ul.tab-list li.tab-title-1').addClass('active selected');
  $('.custom-footer-address ul.tab-list li').click(function(){
    var tab_id = $(this).attr('data-tab');

    $('.custom-footer-address ul.tab-list li').removeClass('active');
    $('.custom-footer-address .col').removeClass('active');

    $(this).addClass('active');
    $("#"+tab_id).addClass('active');
  });
  $('.mobile-title').click(function(){
    $(this).parent().siblings().removeClass('selected');
    $(this).parent().addClass('selected');
  });
});

$('.custom-footer-address .content-row ul').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,

  responsive: [
    {
      breakpoint: 1023,
      settings: {
        dots: true,
         arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        fade: true,
        cssEase: 'linear',
         prevArrow: '<button type="button" data-role="none" class="slick-prev slick-arrow"><svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1"><title>Arrow</title><desc>Arrow</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="footer-/-mobile---V6" transform="translate(-290.000000, -474.000000)" fill="#FFFFFF" fill-rule="nonzero"><g id="Group-26" transform="translate(0.000000, 300.000000)"><g id="Group-13"><g id="location" transform="translate(20.000000, 90.000000)"><g id="icon-/-arrow-/-right-thick" transform="translate(270.000000, 84.000000)"><path d="M7.55376759,11.5282637 C7.69450263,11.6689987 7.79236936,11.8417047 7.84568531,12.0336421 C7.90169875,12.2352905 7.90169875,12.444397 7.84568531,12.6460454 C7.79236936,12.8379828 7.69450263,13.0106888 7.55376759,13.1514238 C7.33399038,13.371201 7.04714387,13.4882812 6.73632812,13.4882812 C6.42551238,13.4882812 6.13866587,13.371201 5.91888866,13.1514238 L0.364201164,7.59673634 C0.145820541,7.37835571 0.02734375,7.09401141 0.02734375,6.78515625 C0.02734375,6.47630109 0.145820541,6.19195679 0.364201164,5.97357616 L6.00091991,0.336857414 C6.21930054,0.118476791 6.50364484,0 6.8125,0 C7.10497084,0 7.37546237,0.106240152 7.58877504,0.302949277 C7.69032759,0.388339663 7.77433117,0.492705109 7.83488289,0.613808553 C7.87814501,0.700332785 7.91034441,0.791564417 7.93135905,0.886130282 C7.95097111,0.974384596 7.9609375,1.06408206 7.9609375,1.15429688 C7.9609375,1.24948133 7.94985325,1.34369749 7.92682563,1.43580797 C7.9054586,1.52127606 7.87450015,1.60383193 7.83488289,1.68306645 C7.78083246,1.79116731 7.70938251,1.88643391 7.62408009,1.97173634 L2.81066017,6.78515625 L7.55376759,11.5282637 Z" id="" transform="translate(3.994141, 6.744141) scale(-1, 1) translate(-3.994141, -6.744141) "></path></g></g></g></g></g></g></svg></button>',
      nextArrow: '<button type="button" data-role="none" class="slick-next slick-arrow"><svg width="8px" height="14px" viewBox="0 0 8 14" version="1.1"><title>Arrow</title><desc>Arrow</desc><defs></defs><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="footer-/-mobile---V6" transform="translate(-290.000000, -474.000000)" fill="#FFFFFF" fill-rule="nonzero"><g id="Group-26" transform="translate(0.000000, 300.000000)"><g id="Group-13"><g id="location" transform="translate(20.000000, 90.000000)"><g id="icon-/-arrow-/-right-thick" transform="translate(270.000000, 84.000000)"><path d="M7.55376759,11.5282637 C7.69450263,11.6689987 7.79236936,11.8417047 7.84568531,12.0336421 C7.90169875,12.2352905 7.90169875,12.444397 7.84568531,12.6460454 C7.79236936,12.8379828 7.69450263,13.0106888 7.55376759,13.1514238 C7.33399038,13.371201 7.04714387,13.4882812 6.73632812,13.4882812 C6.42551238,13.4882812 6.13866587,13.371201 5.91888866,13.1514238 L0.364201164,7.59673634 C0.145820541,7.37835571 0.02734375,7.09401141 0.02734375,6.78515625 C0.02734375,6.47630109 0.145820541,6.19195679 0.364201164,5.97357616 L6.00091991,0.336857414 C6.21930054,0.118476791 6.50364484,0 6.8125,0 C7.10497084,0 7.37546237,0.106240152 7.58877504,0.302949277 C7.69032759,0.388339663 7.77433117,0.492705109 7.83488289,0.613808553 C7.87814501,0.700332785 7.91034441,0.791564417 7.93135905,0.886130282 C7.95097111,0.974384596 7.9609375,1.06408206 7.9609375,1.15429688 C7.9609375,1.24948133 7.94985325,1.34369749 7.92682563,1.43580797 C7.9054586,1.52127606 7.87450015,1.60383193 7.83488289,1.68306645 C7.78083246,1.79116731 7.70938251,1.88643391 7.62408009,1.97173634 L2.81066017,6.78515625 L7.55376759,11.5282637 Z" id="" transform="translate(3.994141, 6.744141) scale(-1, 1) translate(-3.994141, -6.744141) "></path></g></g></g></g></g></g></svg></button>',
      }
    },

    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});