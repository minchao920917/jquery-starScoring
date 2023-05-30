var starScoring = (function() {
    //继承
    var extend = function(subClass, superClass) {
        var F = function() {};
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
    }



    //抽象类点亮
    var Light = function(el, options) {
        this.el = $(el);
        this.item = this.el.find('.scoring-item');
        this.opts = options;
        this.add = 0;
        this.selectEvent = "mouseover";
    };
    Light.prototype.init = function() {
        this.lightOn(this.opts.num);
        if (!this.opts.readOnly) {
            this.bindEvent();
        }

    };
    Light.prototype.lightOn = function(num) {
        num = parseInt(num); //转化为整型
        this.item.each(function(index) {
            if (index >= num) {
                $(this).css('background-position', '0 -250px');
            } else {
                $(this).css('background-position', '0 0');
            }
        });
    };
    //事件
    Light.prototype.bindEvent = function() {
        //事件绑定
        var self = this;
        var itemLength = this.item.length;
        this.el.on(self.selectEvent, '.scoring-item', function(e) {
            var _num = 0;
            var $this = $(this);

            self.select(e, $this);
            _num = $(this).index() + self.add;
            self.lightOn(_num);
            self.el.trigger('select', [_num, itemLength]);
        }).on('click', '.scoring-item', function(e) {
            self.chosen(e, $(this));
            self.opts.num = $(this).index() + self.add;
            self.lightOn(self.opts.num);
            self.el.trigger('chosen', [self.opts.num, itemLength]);
        }).on('mouseout', function() {
            self.lightOn(self.opts.num);
        })
    }
    Light.prototype.select = function() {
        throw new Error("子类必须重写此方法");
    };
    Light.prototype.chosen = function() {
        throw new Error("子类必须重写此方法");
    };

    //点亮整颗
    var LightEntire = function(el, options) {
        Light.call(this, el, options) //继承父类构造函数内容
        this.selectEvent = "mouseover";
    };
    extend(LightEntire, Light);

    LightEntire.prototype.lightOn = function(num) {
        Light.prototype.lightOn.call(this, num);
    };
    LightEntire.prototype.select = function() {
        this.add = 1;
    };
    LightEntire.prototype.chosen = function() {
        this.add = 1;
    };

    // 点亮半颗
    var LightHalf = function(el, options) {
        Light.call(this, el, options)
        this.selectEvent = "mousemove";
    };
    extend(LightHalf, Light);
    LightHalf.prototype.lightOn = function(num) {
        var count = parseInt(num);
        var isHalf = num !== count;
        Light.prototype.lightOn.call(this, count);
        if (isHalf) {
            this.item.eq(count).css('background-position', '0 -125px'); //eq(n)方法，选择第n个元素,从0开始
        }

    };

    LightHalf.prototype.select = function(e, $this) {
        if (e.pageX - $this.offset().left < $this.width() / 2) {
            this.add = 0.5;
        } else if(e.pageX - $this.offset().left > $this.width() / 2){
            this.add = 1;
        }else{
            this.add = 0;
        }
    };
    LightHalf.prototype.chosen = function(e, $this) {
        if (e.pageX - $this.offset().left < $this.width() / 2) {
            this.add = 0.5;
        } else if(e.pageX - $this.offset().left > $this.width() / 2){
            this.add = 1;
        }else{
            this.add = 0;
        }
    };

    // 点亮十分之一颗
    var LightTen = function(el, options) {
        Light.call(this, el, options)
        this.selectEvent = "mousemove";
    };
    extend(LightTen, Light);
    LightTen.prototype.lightOn = function(num) {
      var count = parseInt(num);
 
      Light.prototype.lightOn.call(this, count);
      var percentage = Math.floor((num - count) * 10);
      this.item.eq(count).css('background-position', '0 -'+ 25*(10-percentage)+'px');
      
    };

    LightTen.prototype.select = function(e, $this) {
      var positionX = e.pageX - $this.offset().left;
      var itemWidth = $this.width() / 10;
      var selectedFraction = parseFloat((Math.round(positionX / itemWidth) * 0.1).toFixed(1));
      this.add = selectedFraction;
    };
    LightTen.prototype.chosen = function(e, $this) {
      var positionX = e.pageX - $this.offset().left;
      var itemWidth = $this.width() / 10;
      var selectedFraction = parseFloat((Math.round(positionX / itemWidth) * 0.1).toFixed(1));
      this.add = selectedFraction;
    };
    // 十分制
    var LightTwenty = function(el, options) {
        Light.call(this, el, options)
        this.selectEvent = "mousemove";
    };
    extend(LightTwenty, Light);
    LightTwenty.prototype.lightOn = function(num) {
      var count = parseInt(num);
 
      Light.prototype.lightOn.call(this, count);
      var percentage = Math.floor((num - count) * 10);
      this.item.eq(count).css('background-position', '0 -'+ 25*(10-percentage)+'px');
      
    };

    LightTwenty.prototype.select = function(e, $this) {
      var positionX = e.pageX - $this.offset().left;
      var itemWidth = $this.width() / 10;
      var selectedFraction = parseFloat(((positionX / itemWidth) * 0.1).toFixed(2));
      console.log('selectedFraction',selectedFraction)
      this.add = selectedFraction;
    };
    LightTwenty.prototype.chosen = function(e, $this) {
      var positionX = e.pageX - $this.offset().left;
      var itemWidth = $this.width() / 10;
      var selectedFraction = parseFloat(((positionX / itemWidth) * 0.1).toFixed(2));
      this.add = selectedFraction;
    };

    //默认参数
    var defaults = {
        mode: 'LightEntire',
        num: 0,
        readOnly: false,
        select: function() {},
        chosen: function() {},
    }

    var mode = {
        'LightEntire': LightEntire,
        'LightHalf': LightHalf,
        'LightTen': LightTen,
        'LightTwenty': LightTwenty,

    };

    //init
    var init = function(el, options) {
        options = $.extend({}, defaults, options); //初始化，默认值defaluts,如果option设置参数，则覆盖默认值
        if (!mode[options.mode]) {
            mode[options.mode] = "LightEntire";
        }
        new mode[options.mode](el, options).init();
    }
    return {
        init: init
    };

})();