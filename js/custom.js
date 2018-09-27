(function ($) {
    $(function () {
        $("#go-top, .go-top").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() >= 800) {
                $('#go-top').show();
            } else {
                $('#go-top').hide();
            }
        });

        $(document).on('click', '.nav-toggle', function () {
            $('#menu').toggleClass('is-active');
        })
        //----sticky-header
        if ($('.sticky-header').length) {
            var _this = $('.sticky-header');
            _this.after("<div class='after-fixed'></div>");
            if (window.innerWidth < 768) {
                $('.after-fixed').css('padding-top', $('.fixed').height());
            }

            // var stickyPos = _this.offset().top;
            // $(window).scroll(function () {
            //     if (window.innerWidth > 992) {
            //         if ($(window).scrollTop() >= stickyPos) {
            //             _this.addClass('fixed');
            //             $('.after-fixed').css('padding-top', $('.fixed').height());
            //         } else {
            //             _this.removeClass('fixed');
            //             $('.after-fixed').css('padding-top', '0px');
            //         }
            //     } else {
            //         _this.removeClass('fixed');
            //         $('.after-fixed').css('padding-top', '0px');
            //     }
            // })
        }


        //js-tab
        /* 
        .js-tab
            ul.js-tabnav
                a[href="#tab1"]
                a[href="#tab2"]
            .js-tab-content
                #tab1.tab-panel.fade.in
                #tab2.tab-panel.fade
        */
        $('.js-tab').each(function () {
            var _this = $(this);
            var nav = _this.find('.js-tabnav');
            $(nav).on("click", "a[href^='#']", function (e) {
                e.preventDefault();
                if ($(this).parent().hasClass('active')) {
                    return;
                }
                $(nav).find('.active').removeClass('active');
                $(this).parent().addClass('active');
                var target = $($(this).attr('href'));
                target.siblings().removeClass('in');
                setTimeout(() => {
                    target.siblings().removeClass('active');
                }, 100);
                target.addClass('active');
                setTimeout(() => {
                    target.addClass('in');
                }, 100);
            })
        })
    })

    //goto #id
    $(window).on('load', function () {
        $("a.go-to[href^='#']").click(function (e) {
            e.preventDefault();
            $('#menu').removeClass('is-active');
            let target = $($(this).attr('href'));
            if (target.length) {
                var fixedHeight = $('.fixed').height() || 0;
                var pos = target.offset().top - fixedHeight;
                $("html, body").animate({
                    scrollTop: pos
                }, "slow");
            }
        });
    })

    //contact-form
    $(function () {
        $('#contact-submit').click(function (e) {
            e.preventDefault();
            $('.required-notice').remove();
            var required = $('.contact--form input, .contact--form select, .contact--form textarea').filter('[required]:visible');
            var checkRequired = true;
            var requiredText = '<span class="required-notice">required!</span>';
            var requiredEmail = '<span class="required-notice">Wrong email!</span>';

            //loop field
            required.each((i, elem) => {
                var $elem = $(elem);
                $elem.attr('style', '');
                var value = $elem.val();
                if (!value || value == "0") {
                    checkRequired = false;
                    $elem.css('border-color', '#ff0000');
                    $elem.before(requiredText);
                }

                // validateEmail
                if ($elem.attr("type") == "email") {
                    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!emailRegex.test(value)) {
                        checkRequired = false;
                        $elem.css('border-color', '#ff0000');
                        $elem.before(requiredEmail);
                    }
                }

            });

            //return if required field  empty
            if (!checkRequired) {
                return;
            }
            var _this = $(this);
            $('#js_mail_result').addClass('show');

            $.ajax({
                url: 'gmail.php',
                type: 'POST',
                data: {
                    send_mail: true,
                    request: $('#request').val(),
                    name: $('#name').val(),
                    company: $('#company').val(),
                    email: $('#email').val(),
                    question: $('#question').val(),
                },
                success: function (res) {
                    $("#js_mail_result").html('<div class="mail_result">' + res + '<input type="reset" class="contact_reset" value="Done!"/></div>');
                },
                error: function (xhr, status, err) {
                    $("#js_mail_result").html('<div class="mail_result">' + status + ': Something wrong!' + '<input type="reset" class="contact_reset" value="request again"/></div>');
                    console.log(xhr, status, err);
                }
            })

        })
        $(document).on('click', '.contact_reset', function () {
            $('#js_mail_result').removeClass('show')
        })
    })

    //slider--------------------------------
    $(function () {
        $(".js-slider-main").owlCarousel({
            items: 1,
            responsive: {
                // breakpoint from 1200 up
                1200: {
                    item: 1
                },
                768: {
                    items: 1
                },
                0: {
                    dots: false,
                    nav: false
                }
            },
            slideBy: 1,
            loop: true,
            rewind: false,
            autoplay: true,
            autoplayTimeout: 4000,
            autoplayHoverPause: true,
            smartSpeed: 500, //slide speed smooth

            dots: true,
            dotsEach: true,
            nav: false,
            // navText: ['‹', '›'],
            // dotsContainer: '#main-custom-dots',
            // navText: ['<img src="img/but-p.png"/>', '<img src="img/but-n.png"/>'],
            // navText: ['<i class="fa fa-chevron-left"><i/>', '<i class="fa fa-chevron-right"><i/>'],
            margin: 0,
        });
    })



})(jQuery)


//maps
function myMap() {
    var myLatLng = {
        lat: 35.527735,
        lng: 139.699773
    };

    var mapProp = {
        center: new google.maps.LatLng(myLatLng),
        zoom: 16,
        styles: [
            {
                elementType: 'labels.text.fill',
                stylers: [{
                    color: '#7c9eb0'
                }]
            },
            {
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#ecf1f3'
                }]
            },
            {
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#98bbce'
                }]
            },
            
            // {
            //   featureType: '-----------------',
            //   elementType: 'geometry.fill',
            //   stylers: [{color: '#00ff00'}]
            // },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#c1d1d9'
                }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#ffffff'
                }]
            },

            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{
                    color: '#80a0b2'
                }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#d5dfe5'
                }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{
                    color: '#638ba1'
                }]
            },
        ]
        
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
    marker.setMap(map);
}