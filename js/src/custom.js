/*
 /* simple modal window script
 */

var mrModal = {
    // define basic elements
    overlay: $('<div id="mr-overlay" class="mr-modal__overlay"></div>'),
    content: $('<div id="mr-wrapper" class="mr-modal__wrapper"><div id="mr-content" class="mr-modal__content"></div><div id="mr-close" class="mr-modal__close">X</div></div>'),

    
    // load external user profile data
    // and show modal window
    openUserId: function(userId) {

        // just basic functionaly with static data
        $.get('user-profile.html', function(data) {
            data = data.replace("{{user.id}}", userId); // just to make one thing dynamic
            $('#mr-content').empty().append(data);
        })
                .fail(function() {
                    $('#mr-content').empty().append('We failed and we are really sorry.');
                });

        this.overlay.fadeIn(500);
    },
    
    
    init: function(elem) {

        console.log('Hello Hussars! Console.log() is handy but this should be removed on production or before commit.');
        console.log('Just wanted to say hello ;)');

        $('body').append(this.overlay);
        $('#mr-overlay').append(this.content).hide();

        // define close action
        $('#mr-close').click(function() {
            $('#mr-overlay').fadeOut(500, function() {
                $('#mr-content').empty();
            });

        });

        // add event to open modals
        $('body').on('click', elem, function(e) {
            e.preventDefault();
            mrModal.openUserId($(this).attr('data-userid'));
        });
    }
};

// trigger function
mrModal.init("a[rel='author']");




/*
 /* load more questions
 */

var mrMore = {
    // basic settings
    container: '',
    currentPage: 1,
    pageSize: 3,
    moreLink: $('<a href="#" id="mrm-link" class="mr-more__link">Load more</a>'),
    
    
    decode: function(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    },
    
    
    // load question from stackexchange using api        
    loadMore: function() {
        var url = 'https://api.stackexchange.com/2.2/questions?page=' + this.currentPage + '&pagesize=' + this.pageSize + '&todate=1434412800&order=desc&sort=activity&tagged=javascript&site=stackoverflow';
        var _this = this;

        // just basic functionality with partly dynamic data in template
        $.get(url, function(data) {
            var questions = data.items;
            var $more = $("#more-content");

            // mustache template used to display data
            questions.forEach(function(question) {
                var view = {
                    profile_image: question.owner.profile_image,
                    link: question.link,
                    author_link: question.owner.link,
                    answer_count: question.answer_count,
                    user_id: question.owner.user_id,
                    display_name: question.owner.display_name,
                    title: _this.decode(question.title),
                    question_id: question.owner.question_id
                };

                $.get("templates/question.html", function(data) {
                    var output = Mustache.render(data, view);
                    $more.append(output);
                });

            });
        })
                .fail(function() {
                    $(_this.container).append('We couldn\'t get data from stackExchange API');
                });
        this.currentPage = this.currentPage + 1;
    },
    
    
    init: function(settings) {
        this.container = settings.container;

        // create and and load more data link
        $(this.container).append('<div id="more-content"></div>');
        $(this.container).append(this.moreLink);

        // for further pagination functionality
        this.currentPage = $(this.container).attr('data-current-page') + 1;

        // set how many question load per click
        this.pageSize = $(this.container).attr('data-page-size');

        var _this = this;
        this.moreLink.on('click', function(e) {
            e.preventDefault();
            _this.loadMore();
        });
    }
};

// trigger load more function
mrMore.init({container: '.main-container'});


