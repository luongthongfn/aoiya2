// on ready
$(function () {
    //go-top button
    $("#go-top, .go-top").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });

    // var $posToShow = $('.slide').height() - $(window).height() + 200;
    // $(window).scroll(function () {
    //     if ($(window).scrollTop() >= $posToShow) {
    //         $('#go-top').show();
    //     } else {
    //         $('#go-top').hide();
    //     }
    // });


    //mobile nav button
    $(document).on('click', '.nav-toggle', function () {
        $('#menu').toggleClass('is-active');
    })

    //----sticky-header
    if ($('.sticky-header').length) {
        var _this = $('.sticky-header');
        var afterFixed = $('.js-after-fixed');
        // _this.after(afterFixed);
        if (afterFixed) {
            afterFixed.css('padding-top', $('.fixed').height());
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


    //==== js-tab ====//
    // .js-tab
    //     ul.js-tabnav
    //         a[href="#tab1"]
    //         a[href="#tab2"]
    //     .js-tab-content
    //         #tab1.tab-panel.fade.in
    //         #tab2.tab-panel.fade



    $('.js-tab').each(function () {
        var _this = $(this);
        var nav = _this.find('.js-tabnav');
        var handleClick = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
        $(nav).on(handleClick, "a[href^='#']", function (e) {

            e.preventDefault();
            if ($(this).parent().hasClass('active')) {
                return;
            }
            $(nav).find('.active').removeClass('active');
            $(this).parent().addClass('active');


            var target = $($(this).attr('href'));
            target.siblings().removeClass('in');
            setTimeout(function () {
                target.siblings().removeClass('active');
            }, 100);
            target.addClass('active');
            setTimeout(function () {
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

        var target = $($(this).attr('href'));
        if (target.length) {
            var fixedHeight = $('.fixed').height() || 0;
            var pos = target.offset().top - fixedHeight;
            $("html, body").animate({
                scrollTop: pos
            }, "slow");
        }
    });
})

//custom-select
$(function () {
    var input = $('#request'),
        inputHidden = $('#request_hidden'),
        $select = $('.custom-select'),
        _open = function () {
            $select.addClass('select-open')
        },
        _close = function () {
            $select.removeClass('select-open')
        },
        _changeSlected = function (elem) {
            $select.find('li').removeClass('selected');
            $(elem).addClass('selected');
        },
        _update = function (val) {
            val = val || "項目を選択してください"
            input.text(val);
            inputHidden.val(val);
            // console.log(inputHidden.val());
            _validate();

        },
        _validate = function () {
            if (input.text().trim() == "項目を選択してください") {
                inputHidden.addClass('has-error');
                inputHidden.val('');
            } else {
                inputHidden.removeClass('has-error');
            }
        };

    //handle
    input.on('click', function () {
        _open();
    })

    $select.on('click', 'li', function () {
        var val = $(this).data('value');
        _changeSlected(this);
        _update(val);
        _close();
    })

    $(document).on('click touchstart', function (event) {
        // Check if clicked outside target
        if (!($(event.target).closest(".custom-select").length)) {
            // Hide target
            _close();
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
        $('.contact-submit .fa').addClass('fa-spin fa-spinner');

        $.ajax({
            url: 'gmail.php',
            type: 'POST',
            data: {
                send_mail: true,
                request: $reqVal,
                name: $nameVal,
                company: $companyVal,
                email: $emailVal,
                question: $questionVal,
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
        $reqVal = $('input[name = "request_hidden"]').val(); //from custom-select
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

    //validate
    $.validator.setDefaults({
        submitHandler: function () {
            alert("submitted!");
        }
    });
    $("#contact--form").validate({
        focusInvalid: false,
        ignore: '',
        rules: {
            //key is name of input
            request_hidden: "required",
            name: "required",
            company: "required",
            email: {
                required: true,
                email: true,
                maxlength: 255
            },
            question: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            //key is name of input
            request_hidden: "",
            // request: "お問い合わせ項目を選択してください。",
            name: "お名前を入力してください。",
            company: "貴社名を入力してください。",
            email: {
                required: "メールアドレスを入力してください。",
                email: "正しいメールアドレスを入力してください。",
                maxlength: "正しいメールアドレスを入力してください。"
            },
            question: {
                required: "お問い合わせ内容を入力してください。",
                minlength: "少なくとも二文字以上"
            }
        },

        errorElement: "span",
        errorContainer: '.notice-error',
        errorPlacement: function (error, element) {
            // Add the class to the error element
            error.addClass("required-notice");

            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass("has-error");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass("has-error")
        },
        submitHandler: function () {
            setPreviewValue();
            $('#js_contact_confirm').addClass('show');
        }
    });

    // --------------------- add event ---------------------------------
    // --------------------- add event ---------------------------------
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

// select date 
$(function () {
    if ($('#js-select-date').length) {
        var Year = $('#year'),
            Month = $('#month'),
            Day = $('#day'),
            daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            thisYear = new Date().getFullYear(),
            reCruitFrom = thisYear - 60,
            reCruitTo = thisYear - 20,
            listYear = [],
            isLeapYear = function (year) {
                return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
            },
            appendOption = function (elm, value) {
                var value = value || '';
                elm.append(`<option value="${value}" >${value}</option>`);
            },
            changeMonth = function () {
                var yealVal = Year.val(),
                    monthVal = Month.val(),
                    dayVal = Day.val(),
                    dayInMonth;
                if (monthVal == 2) {
                    isLeapYear(yealVal) ? daysInMonth[1] = 29 : daysInMonth[1] = 28;
                }
                totalDay = daysInMonth[monthVal - 1];

                if (!monthVal) {
                    return;
                } else {
                    //selected < days in month
                    var lastOptionVal = Day.find('option').last().val();
                    if (lastOptionVal < totalDay) {
                        while (lastOptionVal < totalDay) {
                            appendOption(Day, ++lastOptionVal)
                        }
                    } else if (lastOptionVal > totalDay) {
                        while (lastOptionVal > totalDay) {
                            Day.find('option').last().remove();
                            lastOptionVal--;
                        }
                    }
                    return;
                }
            },
            testSelectDate = function () {
                $('body').append('<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>');
                setTimeout(() => {
                    var yealVal = Year.val(),
                        monthVal = Month.val(),
                        dayVal = Day.val(),
                        date = moment(`${dayVal}.${monthVal}.${yealVal}`, 'DD.MM.YYYY');
                    console.log('test select :', date.isValid());
                }, 500);
            };

        for (var i = reCruitFrom; i <= reCruitTo; i++) {
            listYear.push(i);
        }


        //init render:

        //-render year
        appendOption(Year);
        listYear.forEach(function (item, index) {
            //render year
            appendOption(Year, item);
        })

        //-render month
        appendOption(Month);
        for (let i = 1; i <= 12; i++) {
            appendOption(Month, i)
        }

        //-render day
        appendOption(Day);
        for (let i = 1; i <= 31; i++) {
            appendOption(Day, i)
        }

        //handle
        Year.on('change', changeMonth);
        Month.on('change', changeMonth);

        //test
        // $('#year, #month, #day').on('change', testSelectDate);

    }
})

var validateInput = function () {

}
//step nav
$('.step-nav').on('click', "a", function () {
    var targetHref = $(this).attr('href');
    if (targetHref == "#tab2" && !validateInput()) {
        return;
    }
    var target = $(targetHref);
    target.siblings().removeClass('in');
    setTimeout(function () {
        target.siblings().removeClass('active');
    }, 100);
    target.addClass('active');
    setTimeout(function () {
        target.addClass('in');
    }, 100);

    // $(`a[href='${target}']`).trigger('click');
    var nav = $('.js-tabnav');
    $(nav).find('.active').removeClass('active');
    nav.find(`a[href="${targetHref}"]`).parent().addClass('active')

})
//maps
function myMap() {

    var mapElem = document.getElementById("googleMap");
    if (mapElem) {
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
        var map = new google.maps.Map(mapElem, mapProp);
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Hello World!'
        });
        marker.setMap(map);
    }
}

$('.btn-gray').click(function (e) {
    e.preventDefault();
    $.ajax({
        url: 'https://yubinbango.github.io/yubinbango-data/data/321.js',
        type: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true'
        },
        data: {
            
        },
        success: function (res) {
            $('.contact-submit .fa').removeClass('fa-spinner fa-spin').addClass('fa-check');
            document.getElementsByClassName("contact--form")[0].reset();
        }
    })
})

var postal_code = require('japan-postal-code');

postal_code.get('1000001', function(address) {
  console.log(address.prefecture); // => "東京都"
  console.log(address.city); // => "千代田区"
  console.log(address.area); // => "千代田"
  console.log(address.street); // => ""
});