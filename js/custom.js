(function ($) {
    //doccument.ready
    $(function () {
        //go-top button
        $("#go-top, .go-top").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
        $posToShow = $('.slide').height() - $(window).height() + 200;
        $(window).scroll(function () {
            if ($(window).scrollTop() >= $posToShow) {
                $('#go-top').show();
            } else {
                $('#go-top').hide();
            }
        });


        //mobile nav button
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

        var $reqVal,
            $nameVal,
            $companyVal,
            $emailVal,
            $questionVal;
        //dialog confirm send mail
        var submitCallBack = function () {
            $('.contact-submit .fa').addClass('fa-spinner');

            $.ajax({
                url: 'http://aoiya.192.168.0.165.xip.io/gmail.php',
                type: 'POST',
                data: {
                    send_mail: true,
                    request  : $reqVal,
                    name     : $nameVal,
                    company  : $companyVal,
                    email    : $emailVal,
                    question : $questionVal,
                },
                success: function (res) {
                    $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-check');
                    document.getElementsByClassName("contact--form")[0].reset();
                },
                error: function (xhr, status, err) {
                    console.log(xhr, status, err);
                    $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-exclamation');
                }
            })

        }

        var closeCallBack = function () {
            $('#js_mail_result').removeClass('show');
        }

        var setPreviewValue = function () {
            $reqVal = $('#request').val();
            $nameVal = $('#name').val();
            $companyVal = $('#company').val();
            $emailVal = $('#email').val();
            $questionVal = $('#question').val();

            $('.review-request .review-text').text($reqVal);
            $('.review-name .review-text').text($nameVal);
            $('.review-company .review-text').text($companyVal);
            $('.review-email .review-text').text($emailVal);
            $('.review-question .review-text').text($questionVal);
        }

        //add event
        $('#contact-submit').click(function (e) {
            e.preventDefault();
            $('.required-notice').remove();
            var required = $('.contact--form input, .contact--form select, .contact--form textarea').filter('[required]:visible');
            var requiredText = '<span class="required-notice">※この項目は必須です。</span>';
            var requiredEmail = '<span class="required-notice">有効なメールアドレスを入力してください。</span>';
            var checkRequired = true;
            
            //loop field, validate
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

            setPreviewValue();
            $('#js_contact_confirm').addClass('show');
        })
        $('.btn_accept_send').click(function () {
            submitCallBack();
            $('#js_contact_confirm').removeClass('show');
        })
        $('.btn_cancel_send').click(function () {
            closeCallBack();
            $('#js_contact_confirm').removeClass('show');
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
        styles: [{
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