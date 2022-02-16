(function($) {
    'use strict';

    /**
     * @property colors
     * @description SET colors for charts, includes system colors and pastel colors for charts
     * @returns {array} - array of colors/colours
     */
    var body = $("body") , windowWidth = window.innerWidth;
    window.colors = [
        "#687ae8",
        "#12bfbb",
        "#ffb058",
        "#2991cf",
        "#87b8d4",
        "#109693",
        "#f29494",
        "#527cf9",
        "#7140d1",
        "#e79e4e",
        "#52b4ee",
        "#6ed7e0",
        "#8fa6b4",
        "#ffcfcf",
        "#28304e",
        "#95aac9",
        "#f2545b",
        "#f7bc06",
        "#00cc99",
        "#19b5fe",
        "#E3EBF6"
    ];

    /**
     * @description sidebar operations like sliding sidebar,toggle and responsive options
     * @param {(Element|jQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
     * @requires jQuery
     */

    // sidebar mouse events
    $(document).on("mouseenter", "body:not(.sidebar-pinned) .admin-sidebar", function (e) {
        if (windowWidth >= 1200) {
            $(this).addClass("sidebar-show");
            
        }
    });
    $(document).on("mouseleave", "body:not(.sidebar-pinned) .admin-sidebar", function (e) {
        if (windowWidth >= 1200) {
            $(this).removeClass("sidebar-show");
        }
    });

    //sidebar pin - toggle sidebar pin
    $(document).on("click", ".admin-pin-sidebar", function (e) {
        e.preventDefault();
        body.toggleClass("sidebar-pinned");
        $(this).toggleClass("pinned");
        // trigger resize event for charts to redraw if required
        window.dispatchEvent(new Event('resize'));
    });

    // append backdrop for mobile
    body.append('<div class="sidebar-backdrop "></div>');

    // close event on mobile by clicking close button or backdrop
    $(document).on("click", " .admin-close-sidebar ,.sidebar-backdrop", function (e) {
        e.preventDefault();
        body.removeClass("sidebar-open");

    });

    /**
     * @description Sidebar Multilevel Menu
     * @param {(Element|jQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
     * @requires jQuery
     */
    $(document).on("click", ".open-dropdown", function (e) {
        e.preventDefault();
        if (!$(this).next().is(":visible")) {
            //opens the adjacent list to the target
            $(this).next().slideDown();
            $(this).parent().addClass("opened");
        }
        else {
            //closes the adjacent list to the target
            $(this).next().slideUp();
            $(this).parent().removeClass("opened");
        }
    });
   
    /**
     * @description Override Default Behaviour for scroll
     * @param {(Element|jQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
     * @requires jquery.bootstrap
     */
    $('.modal').on('show.bs.modal', function (e) {
        if($(e.currentTarget).attr("data-popup")){
            body.addClass("body-scrollable");
        }
    });
    $('.modal').on('hidden.bs.modal', function (e) {
        body.removeClass("body-scrollable");
    });

    /**
     * @description Initialize custom scrollbar
     * @param {(Element|jQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
     * @requires jquery.scrollbar plugin
     */
    $(".js-scrollbar").scrollbar();
	
	
	 
    /**
     * @description toggles the target class with class given in toggleclass attr
     * * @param {(Element|jQuery)} [context] - A DOM Element, Document, or jQuery to use as context.
     * @requires jQuery
     */
    $(document).on("click", "[data-toggleclass]", function (e) {
        e.preventDefault();
        $($(this).attr("data-target")).toggleClass($(this).attr("data-toggleClass"));
    });
    
    
})(window.jQuery);
