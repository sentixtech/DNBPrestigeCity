(function($) {
    $.fn.extend({
        latae: function(options) {
            var defaults = {
                max_height: 350,
                margin: 4,
                target: 'picture',
                loader: 'img/loader.gif',
                displayTitle: false
            };
            var m_options = $.extend(defaults, options);
            return this.each(function() {
                var regs = m_options;
                var obj = $(this);
                var gallery = {
                    nb_picts: 0,
                    picts: {},
                    width: 0,
                    load_index: 0,
                    loader: null,
                    line: {
                        items: [],
                        height: regs.max_height,
                        width: 0
                    },
                    init: function() {
                        gallery.initPictures();
                        gallery.picts = $('figure.' + regs.target);
                        gallery.width = Math.floor(obj.width());
                        gallery.nb_picts = gallery.picts.length;
                        gallery.setGalleryProperties();
                        gallery.buildLoader();
                        gallery.hidePictures();
                        gallery.initDisplayFigcaption();
                        gallery.initTriggers();
                        obj.trigger('init', obj);
                    },
                    initPictures: function() {
                        obj.find('.' + regs.target).each(function() {
                            var elem = $(this);
                            if (elem.is('img')) {
                                var url = elem.attr('src');
                                var title = (elem.attr('alt') != undefined && elem.attr('alt') != '') ? elem.attr('alt') : ((elem.data('title') != undefined && elem.data('title') != '') ? elem.data('title') : '');
                                var o_figure = $('<figure>', {
                                    'data-url': url,
                                    class: regs.target
                                });
                                gallery.addFigureProperties(o_figure);
                                var o_figcaption = $('<figcaption>');
                                gallery.addFigcaptionProperties(o_figcaption);
                                o_figcaption.html(title);
                                o_figure.append(o_figcaption);
                                elem.after(o_figure);
                                elem.remove();
                            } else if (elem.is('figure')) {
                                gallery.addFigureProperties(elem);
                                var title = (elem.data('title') != undefined && elem.data('title') != '') ? elem.data('title') : '';
                                var o_figcaption = $('<figcaption>');
                                gallery.addFigcaptionProperties(o_figcaption);
                                o_figcaption.html(title);
                                elem.append(o_figcaption);
                            }
                        });
                    },
                    setGalleryProperties: function() {
                        var width = obj.width();
                        gallery.width = width;
                        obj.css({
                            'boxSizing': 'content-box',
                            width: width
                        });
                    },
                    addFigureProperties: function(o_figure) {
                        var defaults = {
                            position: 'relative',
                            float: 'left',
                            height: 'auto',
                            margin: '0 0 4px 0',
                            width: 'auto'
                        };
                        var properties = $.extend(defaults, regs.figure);
                        o_figure.css(properties);
                    },
                    addFigcaptionProperties: function(o_figcaption) {
                        var defaults = {
                            display: 'none',
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            'text-align': 'center',
                            backgroundColor: "rgba(0,0,0,0.3)",
                            color: '#fff',
                            padding: '5px 0'
                        };
                        var properties = $.extend(defaults, regs.figcaption);
                        o_figcaption.css(properties);
                    },
                    initDisplayFigcaption: function() {
                        if (regs.displayTitle) {
                            gallery.picts.bind({
                                mouseenter: function() {
                                    $(this).find('figcaption').slideDown();
                                },
                                mouseleave: function() {
                                    $(this).find('figcaption').slideUp();
                                }
                            });
                        }
                    },
                    buildLoader: function() {
                        var o_loader = $('<div>', {
                            class: 'loader'
                        });
                        o_loader.css({
                            position: 'relative',
                            textAlign: 'center',
                            width: '100%'
                        });
                        var o_img = $('<img>', {
                            src: regs.loader
                        });
                        o_img.css({
                            display: 'block',
                            margin: '0 auto',
                            position: 'relative'
                        });
                        o_loader.append(o_img);
                        gallery.loader = o_loader;
                        obj.append(gallery.loader);
                    },
                    restart: function() {
                        gallery.setGalleryProperties();
                        gallery.load_index = 0;
                        gallery.picts.css('marginRight', 0);
                        gallery.hidePictures();
                        gallery.line = {
                            items: [],
                            height: regs.max_height,
                            width: 0
                        };
                        obj.trigger('restart', obj);
                    },
                    hidePictures: function() {
                        obj.find('.picture img').remove();
                        obj.find('.picture').hide();
                    },
                    buildLine: function() {
                        gallery.redimLinePicts();
                        var margins = (gallery.line.items.length - 1) * parseInt(regs.margin);
                        if ((gallery.line.width + margins) > gallery.width) {
                            var coeff = (gallery.width - margins) / gallery.line.width;
                            gallery.displayLine(coeff, true);
                            gallery.clearLine();
                        } else if (gallery.load_index == gallery.nb_picts) {
                            gallery.displayLine(1, false);
                            gallery.clearLine();
                        }
                        gallery.loadPicture();
                    },
                    clearLine: function() {
                        gallery.line.items = [];
                        gallery.line.height = regs.max_height;
                        gallery.line.width = 0;
                    },
                    displayLine: function(coeff, adjust) {
                        var c = coeff || 1;
                        gallery.line.width = 0;
                        var count = gallery.line.items.length;
                        for (i in gallery.line.items) {
                            var item = gallery.line.items[i];
                            var elem = item.picture;
                            var image = item.picture.find('img');
                            var i_height = Math.ceil(item.height * c);
                            var i_width = Math.ceil(item.width * c);
                            gallery.line.width += i_width;
                            if (i == count - 1 && adjust == true) {
                                var adjust_x = gallery.line.width - gallery.width + ((count - 1) * regs.margin);
                                i_width -= adjust_x;
                            }
                            image.attr('height', i_height);
                            image.attr('width', i_width);
                            image.css({
                                display: 'block'
                            });
                            if (count > 1 && i != (count - 1)) elem.css('marginRight', regs.margin);
                            elem.show();
                        };
                    },
                    redimLinePicts: function() {
                        gallery.line.width = 0;
                        var count = gallery.line.items.length;
                        for (i in gallery.line.items) {
                            var item = gallery.line.items[i];
                            if (item.height < gallery.line.height) {
                                gallery.line.height = item.height;
                                gallery.redimLinePicts();
                                return false;
                            } else {
                                if (item.height > gallery.line.height) {
                                    var coeff = gallery.line.height / item.height;
                                    item.height = gallery.line.height;
                                    item.width = Math.floor(item.width * coeff);
                                }
                                gallery.line.width += item.width;
                            }
                        };
                    },
                    loadPicture: function() {
                        var item_line = {};
                        item_line.picture = $(gallery.picts[gallery.load_index]) || null;
                        gallery.load_index++;
                        if (item_line.picture.length == 0) return false;
                        var url = item_line.picture.data('url').replace(/(^url\()|(\)$|[\"\'])/g, '');
                        var o_image = $('<img>');
                        o_image.appendTo(item_line.picture);
                        var _img = new Image();
                        _img.onload = function() {
                            if (gallery.load_index == (gallery.nb_picts - 1)) gallery.loader.hide();
                            o_image.attr('src', url);
                            item_line.height = (_img.height > regs.max_height) ? regs.max_height : _img.height;
                            item_line.width = (_img.height > regs.max_height) ? Math.floor((regs.max_height / _img.height) * _img.width) : _img.width;
                            gallery.line.items.push(item_line);
                            obj.trigger('loadPicture', o_image);
                        }
                        _img.src = url;
                    },
                    initTriggers: function() {
                        obj.bind('init', function(event) {
                            gallery.loadPicture();
                            if (regs.init && $.isFunction(regs.init)) regs.init(event, gallery);
                        });
                        obj.bind('restart', function(event) {
                            gallery.loadPicture();
                            if (regs.resize && $.isFunction(regs.resize)) regs.resize(event, gallery);
                        });
                        obj.bind('loadPicture', function(event, img) {
                            gallery.buildLine();
                            if (regs.loadPicture && $.isFunction(regs.loadPicture)) regs.loadPicture(event, img);
                        });
                        var rtime;
                        var timeout = false;
                        var delta = 200;
                        $(window).resize(function() {
                            rtime = new Date();
                            if (timeout === false) {
                                timeout = true;
                                setTimeout(resizeEnd, delta);
                            }
                        });

                        function resizeEnd() {
                            obj.css('width', '');
                            if (new Date() - rtime < delta) {
                                setTimeout(resizeEnd, delta);
                            } else {
                                timeout = false;
                                gallery.restart();
                            }
                        }
                    },
                };
                $(function() {
                    gallery.init();
                });
            });
        }
    });
})(jQuery);