/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : Leverage
* Version  : 1.1.0
* Author   : Codings
* Support  : adm.codings@gmail.com
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Responsive Menu
3. Navigation 
4. Slides 
5. Progress Bar
6. Shuffle
7. Sign and Register Form
8. Multi-Step Form 
9. Simple Form
10. Recaptcha
11. Cookie Notice

----------------------------------------------*/

/*----------------------------------------------
1. Preloader
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    let preloader = $('.preloader');

    setTimeout(function() {
        preloader.addClass('ready');
        
    }, preloader.data('timeout'))
})

/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');
        navbar.clone().appendTo(menu);

        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
    }

    navResponsive();

    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {
        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })

    
    $('.menu .nav-item.dropdown').each(function() {
        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (e) {

        if($(this).hasClass('prevent')) {
            e.preventDefault();
        }

        var nav_link = $(this);

        nav_link.next().toggleClass('show');

        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
})

/*----------------------------------------------
3. Navigation
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var navbar   = $('.navbar');
    var toTop    = $('#scroll-to-top');

    $(document).ready(function() {
        if (position > 0) {
            navbar.addClass('navbar-sticky');
        }

        toTop.hide();
    })

    $(window).scroll(function () {

        let scroll = $(window).scrollTop();

        if (!navbar.hasClass('relative')) {

            // Down
            if (scroll > position && window.screen.width > 767) {

                if(navbar.hasClass('navbar-fixed')) {
                    navbar.addClass('navbar-sticky visible');
                } else {
                    navbar.removeClass('visible').addClass('navbar-sticky');
                }                

                toTop.fadeOut('fast');

            // Up
            } else {

                // Top
                if (position < 76) {
                    navbar.removeClass('navbar-sticky').removeClass('visible');                

                    if(navbar.hasClass('navbar-no-fixed')) {
                        navbar.addClass('navbar-sticky').addClass('visible');
                    }

                } else {                   

                    if(!navbar.hasClass('navbar-no-fixed')) {
                        navbar.addClass('navbar-sticky').addClass('visible');
                    }
                }

                if (position > 1023 && window.screen.width > 767) {
                    toTop.fadeIn('fast');

                } else {
                    toTop.fadeOut('fast');
                }
            }
            position = scroll;
        }
    })

    $('.nav-link').each(function() {
        let href = $(this).attr('href');
        if (href.length > 1 && href.indexOf('#') != -1) {
            $(this).addClass('smooth-anchor');
        }
    })

    $(document).on('click', '.smooth-anchor', function (e) {
        e.preventDefault();

        let href = $(this).attr('href');
        
        if (href.length > 1 && href.indexOf('#') != -1) {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 500);
        }
    })

    $('.dropdown-menu').each(function () {

        let dropdown = $(this);

        dropdown.hover(function () {
            dropdown.parent().find('.nav-link').first().addClass('active');

        }, function () {
            dropdown.parent().find('.nav-link').first().removeClass('active');
        })
    })
})

/*----------------------------------------------
4. Slides
----------------------------------------------*/

jQuery(function ($) {

    setTimeout(function() {
        $('.no-slider .left').addClass('init');
        $('.no-slider .right').addClass('init');
    }, 1200)

    var animation = function(slider) {

        let image = $(slider + ' .swiper-slide-active img');
        let title = $(slider + ' .title');
        let description = $(slider + ' .description');
        let btn = $(slider + ' .btn');
        let nav = $(slider + ' nav');

        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');

        setTimeout(function() {
            image.toggleClass('aos-animate');
            title.toggleClass('aos-animate');
            description.toggleClass('aos-animate');
            btn.toggleClass('aos-animate');
            nav.toggleClass('aos-animate');

            AOS.refresh();

        }, 100)

        if ($('.full-slider').hasClass('animation')) {

            $('.full-slider .left').addClass('off');
            $('.full-slider .left').removeClass('init');
            $('.full-slider .right').addClass('off');
            $('.full-slider .right').removeClass('init');

            setTimeout(function() {
                $('.full-slider .left').removeClass('off');
                $('.full-slider .right').removeClass('off');
            }, 200)

            setTimeout(function() {
                $('.full-slider .left').addClass('init');
                $('.full-slider .right').addClass('init');
            }, 1000)

        } else {
            $('.full-slider .left').addClass('init');
            $('.full-slider .right').addClass('init');
        }
    }

    var fullSlider = new Swiper('.full-slider', {

        autoplay: {
            delay: 10000,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: {
            el: '.full-slider .swiper-pagination',
            clickable: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        on: {
            init: function() {
                animation('.full-slider');
                let pagination = $('.full-slider .swiper-pagination');
                pagination.hide();

                setTimeout(function() {
                    pagination.show();
                }, 2000)

            },
            slideChange: function() {
                animation('.full-slider')
            }
        }
    })

    var midSlider = new Swiper('.mid-slider', {

        autoplay: false,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        pagination: {
            el: '.mid-slider .swiper-pagination',
            clickable: true
        }
    })

    var midSliderSimple = new Swiper('.mid-slider-simple', {

        autoplay: false,
        loop: false,
        centerInsufficientSlides: true,
        slidesPerView: 1,
        spaceBetween: 30,
        breakpoints: {
            767: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        pagination: {
            el: '.mid-slider-simple .swiper-pagination',
            clickable: true
        }
    })

    var minSlider = new Swiper('.min-slider', {

        autoplay: {
            delay: 5000,
        },
        loop: false,
        centerInsufficientSlides: true,
        slidesPerView: 2,
        spaceBetween: 15,
        breakpoints: {
            424: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1023: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            1199: {
                slidesPerView: 5,
                spaceBetween: 15
            }
        },
        pagination: false,
    })

    var noSlider = new Swiper('.no-slider', {

        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: function() {
                animation('.no-slider')
            }
        }
    })
})

/*----------------------------------------------
5. Progress Bar
----------------------------------------------*/

jQuery(function($) {

    'use strict';

    function initCounter(section, item, duration) {

        $(document).one('inview', item, function(event, inview) {

            if (inview) {            
    
                $(item).each(function() {
    
                    var percent = $(this).data('percent');
                    var pcolor  = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
                    var scolor  = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color');
    
                    if ( $(section).hasClass('odd')) {
                        var tmode = 'rgba(255, 255, 255, 0.075)';
                    } else {
                        var tmode = 'rgba(0, 0, 0, 0.075)';
                    }
    
                    if ( $(section).hasClass('preloader') || $(section).hasClass('skills')) {
                        var symbol = '<i>%</i>';
                    } else {
                        var symbol = '';
                    }

                    if(section == '.counter.funfacts') {
                        var height = 70;
                    } else {
                        var height = 120;
                    }
    
                    $(this).radialProgress({
                        value: (percent / 100),
                        size: height,
                        thickness: 10,
                        lineCap: 'butt',
                        emptyFill: tmode,
                        animation: { 
                            duration: duration, 
                            easing: "radialProgressEasing" 
                        },
                        fill: {
                            gradient: [[pcolor, 0.1], [scolor, 1]], 
                            gradientAngle: Math.PI / 4
                        }
                    }).on('radial-animation-progress', function(event, progress) {
                        $(this).find('span').html(Math.round(percent * progress) + symbol);
                    })
                })
            }
        })
    }
    
    let preloader = $('.preloader');
    let preloader_timeout = ( preloader.data('timeout') - 300);

    initCounter('.counter.preloader', '.counter.preloader .radial', preloader_timeout);
    initCounter('.counter.funfacts', '.counter.funfacts .radial', 5000);
    initCounter('.counter.skills', '.counter.skills .radial', 5000);
})

/*----------------------------------------------
6. Shuffle
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    $('.filter-section').each(function(index) {

        var count = index + 1;

        $(this).find('.filter-items').removeClass('filter-items').addClass('filter-items-'+count);
        $(this).find('.filter-item').removeClass('filter-item').addClass('filter-item-'+count);
        $(this).find('.filter-sizer').removeClass('filter-sizer').addClass('filter-sizer-'+count);
        $(this).find('.btn-filter-item').removeClass('btn-filter-item').addClass('btn-filter-item-'+count);
        
        var Shuffle = window.Shuffle;
        var Filter  = new Shuffle(document.querySelector('.filter-items-'+count), {
            itemSelector: '.filter-item-'+count,
            sizer: '.filter-sizer-'+count,
            buffer: 1,
        })
    
        $('.btn-filter-item-'+count).on('change', function (e) {
    
            var input = e.currentTarget;
            
            if (input.checked) {
                Filter.filter(input.value);
            }
        })
    })
})

/*----------------------------------------------
7. Sign and Register Form
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    $(document).on('click', 'a[data-target="#register"]', function() { 
        $('#sign').modal('hide');
    })

    $(document).on('click', 'a[data-target="#sign"]', function() { 
        $('#register').modal('hide');
    })

})

/*----------------------------------------------
8. Multi-Step Form
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    $(document).on('blur', '#leverage-form .field-email', function() {
            
        let url     = $('#leverage-form').attr('action');
        let email   = $('#leverage-form .field-email').val();
        let wpnonce = $('#leverage_form_wpnonce').val();
        let data    = { 
            'email':email, 
            'action':'leverage_contact_form', 
            'section':'leverage_form', 
            'leverage_form_wpnonce':wpnonce
        };

        $.valid_email = false;

        $.post(url, data, function(response) {
            try {
                JSON.parse(response);
                var obj = JSON.parse(response);
                
                if(obj.status == 'invalid' && obj.fields.email == true) {
                    $('#leverage-form .field-email').removeClass('valid').addClass('invalid');

                } else {
                    $('#leverage-form .field-email').removeClass('invalid').addClass('valid');
                    $.valid_email = true;
                }

            } catch (e) {
                alert('Sorry. We are experiencing problems with our server. Come back later to send your message.');
            }
        })
    })

    var current_fs, next_fs, previous_fs;
    var left, opacity, scale;
    var animating;

    function next(button, group, show, hide) {

        $(document).on('click', button, function () {
            $(group + ' .form-control').each(function () {
                var minlength = $(this).data('minlength');

                if ($(this).val() == null || $(this).val() == '') {
                    var value = 0;

                } else {
                    var value = $(this).val().length;
                }

                if (Number(minlength) <= Number(value)) {
                    $(this).removeClass('invalid').addClass('valid');

                } else {
                    $(this).removeClass('valid').addClass('invalid');
                }

                if($.valid_email === false) {
                    $('#leverage-form .field-email').removeClass('valid').addClass('invalid');
                }
            })

            let field = $(group).find('.form-control').length;
            let valid = $(group).find('.valid').length;

            if(!$('#leverage-form .field-email').length) {
                $.valid_email = true;
            }

            if (field == valid && $.valid_email == true) {

                if($('.multi-step-form').data('steps') == 1) {
                    var sendButton = '#step-next-1';

                } else if($('.multi-step-form').data('steps') == 2) {
                    var sendButton = '#step-next-2';

                } else {
                    var sendButton = '#step-next-3';
                }

                if (button == sendButton) {
                    $('.progressbar').addClass('complete');
                }

                if (button == sendButton) {

                    let height = $('.multi-step-form .success.message').parents().eq(1).height();
                    let message = $('.multi-step-form .success.message');                            
                    message.css('height', height);  
                    message.addClass('active'); 
                    
                    $('.form-content').hide();
                    
                    $('.multi-step-form').submit();
                }

                if (animating) return false;

                animating = true;

                current_fs = $(this).parents().eq(1);
                next_fs = $(this).parents().eq(1).next();
                $('.multi-step-form .progressbar li').eq($('fieldset').index(next_fs)).addClass('active');
                next_fs.show();

                current_fs.animate({
                    opacity: 0
                }, {
                    step: function (now, mx) {
                        scale = 1 - (1 - now) * 0.2;
                        left = (now * 50) + '%';
                        opacity = 1 - now;

                        current_fs.css({
                            'transform': 'scale(' + scale + ')',
                            'position': 'absolute'
                        })

                        next_fs.css({
                            'left': left,
                            'opacity': opacity
                        })
                    },
                    duration: 600,
                    complete: function () {
                        current_fs.hide();
                        animating = false;
                    },
                    easing: 'easeInOutBack'
                })

                $(hide).hide();
                $(show).show();
            }
        })
    }   

    function submissionDone() {                
        if(leverage_form.hasClass('redirect-sending')) {
            window.location.href = leverage_form.data('redirect');
        } else {     
            let wait = $('.multi-step-form .success.message .wait');
            let done = $('.multi-step-form .success.message .done');

            wait.hide();
            done.show();            
        } 
    }

    // Progressbar
    $('.multi-step-form .progressbar li').first().addClass('active');

    $('.multi-step-form .progressbar li').each(function(index) {
        $('.multi-step-form').attr('data-steps', (index+1));
    })

    // Step Image [ID]
    $('.multi-step-form .step-image').each(function(index) {
        $(this).attr('id', 'step-image-'+(index+1));

        if(index) {
            $('#step-image-2, #step-image-3, #step-image-4').hide(); 
        }
    })

    // Step Title [ID]
    $('.multi-step-form .step-title').each(function(index) {
        $(this).attr('id', 'step-title-'+(index+1));

        if(index) {
            $('#step-title-2, #step-title-3').hide(); 
        }
    })

    // Step Group [ID]
    $('.multi-step-form .step-group').each(function(index) {
        $(this).attr('id', 'step-group-'+(index+1));
    })

    // Step Next [ID]
    $('.multi-step-form .step-next').each(function(index) {
        $(this).attr('id', 'step-next-'+(index+1));
    })
    
    // Step Prev [ID]
    $('.multi-step-form .step-prev').each(function(index) {
        $(this).attr('id', 'step-prev-'+(index+2));
    })

    next('#step-next-1', '#step-group-1', '#step-image-2, #step-title-2', '#step-image-1, #step-title-1');
    next('#step-next-2', '#step-group-2', '#step-image-3, #step-title-3', '#step-image-2, #step-title-2');
    next('#step-next-3', '#step-group-3', '#step-image-4', '#step-image-3');

    function prev(button, show, hide) {

        $(document).on('click', button, function () {

            if (animating) return false;
            animating = true;

            current_fs = $(this).parents().eq(1);
            previous_fs = $(this).parents().eq(1).prev();

            $('.multi-step-form .progressbar li').eq($('fieldset').index(current_fs)).removeClass('active');

            previous_fs.show();
            current_fs.animate({
                opacity: 0
            }, {
                step: function (now, mx) {

                    scale = 0.8 + (1 - now) * 0.2;
                    left = ((1 - now) * 50) + '%';
                    opacity = 1 - now;

                    current_fs.css({
                        'left': left
                    })

                    previous_fs.css({
                        'transform': 'scale(' + scale + ')',
                        'opacity': opacity
                    })
                },
                duration: 600,
                complete: function () {

                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            })

            $(hide).hide();
            $(show).show();

            if (button == '#step-prev-3') {
                $('.multi-step-form .progressbar').removeClass('complete');
            }
        })
    }

    prev('#step-prev-2', '#step-image-1, #step-title-1', '#step-image-2, #step-title-2');
    prev('#step-prev-3', '#step-image-2, #step-title-2', '#step-image-3, #step-title-3');

    // Submission
    var leverage_form     = $('#leverage-form');

    leverage_form.submit(function(e) {
        e.preventDefault();

        if ($('input[name="reCAPTCHA"]').length) {
            let reCAPTCHA = $('input[name="reCAPTCHA"]');

            grecaptcha.ready(function() {
                grecaptcha.execute(reCAPTCHA.data('key'), { action: "create_comment" }).then(function(token) { 
                    reCAPTCHA.val(token); 
                }) 
            })
        }

        var url = leverage_form.attr('action');

        $.ajax({
            type: 'POST',
            url: url,
            data: leverage_form.serialize(),
            success: function() {                
                submissionDone();
            }
        })
    })
})

/*----------------------------------------------
9. Simple Form
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    function sendForm(ID) {

        var form  = $(ID);
        var input = $(ID+' .form-control')
        var btn   = $(ID+' .btn');
        var alert = $(ID+' .form-alert');

        alert.hide();

        $(document).on('click', ID+' .btn', function() {
            $(this).addClass('effect-motion-bg');
            form.submit();
        })

        form.submit(function(e) {
            e.preventDefault();

            if ($('input[name="reCAPTCHA"]').length) {
                let reCAPTCHA = $('input[name="reCAPTCHA"]');
    
                grecaptcha.ready(function() {
                    grecaptcha.execute(reCAPTCHA.data('key'), { action: "create_comment" }).then(function(token) { 
                        reCAPTCHA.val(token); 
                    }) 
                })
            }

            var url = form.attr('action');

            $.ajax({
                type: 'POST',
                url: url,
                data: form.serialize(),
                success: function(response) {                    

                    try {
                        JSON.parse(response);
                        var obj = JSON.parse(response);

                        if (obj.status == 'success') {
                            setTimeout(function() {
                                btn.removeClass('effect-motion-bg');
                                input.val('').removeClass('invalid').removeClass('valid');
                                alert.text(obj.info).removeClass('invalid').addClass('valid').fadeIn();
                            }, 1200);

                        } else if(obj.status == 'invalid') {
                            setTimeout(function() {
                                btn.removeClass('effect-motion-bg');
                                alert.text(obj.info).removeClass('valid').addClass('invalid').fadeIn();
                            }, 1200);

                            input.each(function() {
                                let input_name = $(this).attr('name');                     

                                if(obj.fields[input_name] == true) {
                                    $(ID+' .field-'+input_name).removeClass('valid').addClass('invalid'); 
                                } else { 
                                    $(ID+' .field-'+input_name).removeClass('invalid').addClass('valid');
                                }
                            })
                        } else {
                            btn.removeClass('effect-motion-bg');
                            input.val('').removeClass('invalid').removeClass('valid');
                            alert.text(obj.info).removeClass('valid').addClass('invalid').fadeIn();                        
                        
                        } 

                    } catch (e) {
                        btn.removeClass('effect-motion-bg');
                        input.val('').removeClass('invalid').removeClass('valid');
                        alert.text('Sorry. We were unable to send your message.').removeClass('valid').addClass('invalid').fadeIn();
                    }
                }
            })
        })
    }

    sendForm('#leverage-simple-form');
    sendForm('#leverage-subscribe');
})

/*----------------------------------------------
10. Recaptcha
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    if ($('input[name="reCAPTCHA"]').length) {

     let siteKey = "6Lf-NwEVAAAAAPo_wwOYxFW18D9_EKvwxJxeyUx7"; // Put your site key here
     
     if(siteKey) { 
         $('input[name="reCAPTCHA"]').attr("data-key", siteKey); 
         grecaptcha.ready(function() { 
             grecaptcha.execute(siteKey, { action: "create_comment" }).then(function(token) { 
                 $('input[name="reCAPTCHA"]').val(token); 
                }) 
            }) 
        } 
    }
})

/*----------------------------------------------
11. Cookie Notice
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    let cookieNotice = true;

    if(cookieNotice) {

        // Translate
        gdprCookieNoticeLocales.en = {
            description: 'We use cookies to offer you a better browsing experience, personalise content and ads, to provide social media features and to analyse our traffic. Read about how we use cookies and how you can control them by clicking Cookie Settings. You consent to our cookies if you continue to use this website.',
            settings: 'Cookie settings',
            accept: 'Accept cookies',
            statement: 'Our cookie statement',
            save: 'Save settings',
            always_on: 'Always on',
            cookie_essential_title: 'Essential website cookies',
            cookie_essential_desc: 'Necessary cookies help make a website usable by enabling basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.',
            cookie_performance_title: 'Performance cookies',
            cookie_performance_desc: 'These cookies are used to enhance the performance and functionality of our websites but are non-essential to their use. For example it stores your preferred language or the region that you are in.',
            cookie_analytics_title: 'Analytics cookies',
            cookie_analytics_desc: 'We use analytics cookies to help us measure how users interact with website content, which helps us customize our websites and application for you in order to enhance your experience.',
            cookie_marketing_title: 'Marketing cookies',
            cookie_marketing_desc: 'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.'
        }

        gdprCookieNotice({
            locale: 'en', // This is the default value
            timeout: 2000, // Time until the cookie bar appears
            expiration: 30, // This is the default value, in days
            domain: window.location.hostname, // If you run the same cookie notice on all subdomains, define the main domain starting with a .
            implicit: true, // Accept cookies on page scroll automatically
            statement: 'https://leverage.codings.dev', // Link to your cookie statement page
            performance: ['JSESSIONID'], // Cookies in the performance category.
            analytics: ['ga'], // Cookies in the analytics category.
            marketing: ['SSID'] // Cookies in the marketing category.
        })
    }
})

/*----------------------------------------------
99. Temp
----------------------------------------------*/
$(function() {

    'use strict';

    // Change Purchase Button
    if ( window.location.search == '?v=wordpress' && window.location.href.indexOf('docs') === -1 ) {

        // Change All Href
        $('a').each(function() {

            var href = $( this ).attr('href');

            if ( href != undefined ) {

                if ( href.indexOf('#') > -1 || href.indexOf('assets') > -1 || href == 'https://themeforest.net/checkout/from_item/25988106?license=regular' ) {

                    // Default                    

                } else {

                    $( this ).attr('href', href+'?v=wordpress');

                }
            }
        })        

        $('a[href="https://themeforest.net/checkout/from_item/25988106?license=regular"]').attr('href', 'https://themeforest.net/checkout/from_item/26643749?license=regular');
    }
})